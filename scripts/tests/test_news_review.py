import importlib.util
import contextlib
import io
import json
import os
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch

SCRIPT = Path(__file__).resolve().parents[1] / "news_review.py"
spec = importlib.util.spec_from_file_location("news_review", SCRIPT)
review = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = review
spec.loader.exec_module(review)
publish_spec = importlib.util.spec_from_file_location("publish_news_review", SCRIPT.with_name("publish_news_review.py"))
publisher = importlib.util.module_from_spec(publish_spec)
publish_spec.loader.exec_module(publisher)


class NewsReviewTest(unittest.TestCase):
    def setUp(self):
        self.config = json.loads((review.ROOT / ".github/news-review-config.json").read_text(encoding="utf-8"))
        self.now = review.parse_date("2026-11-17T09:17:00+09:00")

    def item(self, **changes):
        value = {"title": "전북대 방산 채용연계", "description": "", "link": "https://example.com/1",
                 "pubDate": self.now.isoformat(), "query": "전북대 방산"}
        value.update(changes)
        return value

    def row(self, item, published=None):
        return review.classify(item, self.config, published or ({}, {}), self.now)

    def test_naver_mobile_and_tracking_match(self):
        self.assertEqual(review.normalize_url("https://n.news.naver.com/mnews/article/469/0000953681?sid=100"),
                         review.normalize_url("https://news.naver.com/main/read.naver?oid=469&aid=0000953681"))
        self.assertEqual(review.normalize_url("http://www.sedaily.com/article/20114981?ref=naver&utm_source=xx"),
                         "https://sedaily.com/article/20114981")

    def test_same_event_different_media_kept(self):
        items = [self.item(), self.item(link="https://other.example/1"),
                 self.item(link="https://example.com/1?utm_source=xx", query="장원준")]
        rows = review.build_report_data(items, self.config, ({}, {}), self.now)
        self.assertEqual(len(rows), 2)
        self.assertIn("장원준", rows[0]["queries"])

    def test_published_url_and_title_only_not_confused(self):
        existing = {"url": "https://defense.jbnu.ac.kr/old", "title": "전북대 방산 채용연계"}
        published = ({"https://example.com/1": existing}, {existing["title"].casefold(): [existing]})
        self.assertEqual(self.row(self.item(), published)["status"], "기존 게시")
        row = self.row(self.item(link="https://other.example/1"), published)
        self.assertEqual(row["status"], "게시 후보")
        self.assertTrue(any("제목이 같음" in check for check in row["checks"]))

    def test_homonym_requires_review(self):
        row = self.row(self.item(title="강은호 행사 참석"))
        self.assertEqual(row["status"], "확인 필요")
        self.assertTrue(any("동명이인" in check for check in row["checks"]))

    def test_opinion_quote_not_assumed_column(self):
        row = self.row(self.item(title="K방산 도약, 장원준 교수 의견 인용"))
        self.assertTrue(row["board"].startswith("언론보도"))
        column = self.row(self.item(title="[기고] 장원준 K방산 도약"))
        self.assertIn("필자 확인 필요", column["board"])

    def test_old_future_and_unknown_dates(self):
        for date in ("2026-09-01T00:00:00+09:00", "2027-01-01T00:00:00+09:00"):
            self.assertEqual(self.row(self.item(pubDate=date))["status"], "제외 후보")
        self.assertEqual(self.row(self.item(pubDate="invalid"))["status"], "확인 필요")

    def test_excluded_candidates_not_silently_discarded(self):
        row = self.row(self.item(title="지역 축제 개막"))
        self.assertEqual(row["status"], "제외 후보")
        report = review.render_report([row], self.now)
        self.assertIn("제외 후보 1건 펼쳐보기", report)
        self.assertIn("지역 축제 개막", report)

    def test_invalid_link_and_markdown_are_safe(self):
        row = self.row(self.item(title="전북대 방산 [x](javascript:evil) <script>x</script>", link="javascript:evil"))
        self.assertEqual(row["status"], "확인 필요")
        report = review.render_report([row], self.now)
        self.assertNotIn("<script>", report)
        self.assertNotIn("[x](javascript:", report)
        self.assertIn("링크 확인 필요", report)

    def test_live_collection_needs_permission_and_credentials(self):
        with patch.dict(os.environ, {}, clear=True), patch.object(review, "request_json") as request:
            with self.assertRaisesRegex(RuntimeError, "허용"):
                review.collect_naver(self.config)
            request.assert_not_called()
        with patch.dict(os.environ, {"NAVER_NEWS_STORAGE_ALLOWED": "true"}, clear=True):
            with self.assertRaisesRegex(RuntimeError, "NAVER_CLIENT_ID"):
                review.collect_naver(self.config)

    def test_partial_api_failure_does_not_return_partial_results(self):
        env = {"NAVER_NEWS_STORAGE_ALLOWED": "true", "NAVER_CLIENT_ID": "test", "NAVER_CLIENT_SECRET": "test"}
        config = dict(self.config, queries=["first", "second"], search_faculty=False)
        with patch.dict(os.environ, env, clear=True), patch.object(review, "request_json", side_effect=[
            {"items": [self.item()]}, RuntimeError("API failed")
        ]):
            with self.assertRaisesRegex(RuntimeError, "API failed"):
                review.collect_naver(config)

    def test_repository_index_matches_current_posts(self):
        urls, _ = review.load_published(review.ROOT, self.config)
        self.assertIn("https://sedaily.com/article/20114981", urls)
        self.assertIn("view_46", urls["https://sedaily.com/article/20114981"]["url"])

    def test_publish_changes_only_one_review_file_on_live_default_branch(self):
        calls = []

        def fake_api(repository, token, method, path, data=None):
            calls.append((method, path, data))
            if path == "":
                return {"default_branch": "main"}
            if path == "git/ref/heads/main":
                return {"object": {"sha": "live-main-sha"}}
            if path == "pulls":
                return {"html_url": "https://example.com/pull/1"}
            return {}

        with tempfile.TemporaryDirectory() as directory:
            report_path = Path(directory) / "report.md"
            report_path.write_text("# 샘플 검토자료", encoding="utf-8")
            env = {"GITHUB_REPOSITORY": "owner/repo", "GH_TOKEN": "test",
                   "GITHUB_RUN_ID": "100", "GITHUB_RUN_ATTEMPT": "1"}
            with patch.dict(os.environ, env, clear=True), patch.object(publisher, "api", side_effect=fake_api), \
                    patch.object(sys, "argv", ["publish_news_review.py", "--report", str(report_path), "--mode", "demo"]), \
                    contextlib.redirect_stdout(io.StringIO()):
                publisher.main()
        writes = [(path, data) for method, path, data in calls if method in ("PUT", "POST")]
        self.assertEqual(len(writes), 3)
        self.assertEqual(writes[0][1]["sha"], "live-main-sha")
        self.assertTrue(writes[1][0].startswith("contents/.news-review/reports/"))
        self.assertNotIn("data/news", writes[1][0])
        self.assertEqual(writes[2][1]["base"], "main")
        self.assertTrue(writes[2][1]["draft"])
        self.assertTrue(writes[2][1]["title"].startswith("[샘플]"))

    def test_live_credentials_not_exposed_on_invalid_header(self):
        env = {"NAVER_NEWS_STORAGE_ALLOWED": "true", "NAVER_CLIENT_ID": "test", "NAVER_CLIENT_SECRET": "secret\nvalue"}
        with patch.dict(os.environ, env, clear=True), patch.object(review, "request_json") as request:
            with self.assertRaisesRegex(RuntimeError, "잘못된 문자") as caught:
                review.collect_naver(self.config)
            self.assertNotIn("secret", str(caught.exception))
            request.assert_not_called()


if __name__ == "__main__":
    unittest.main()
