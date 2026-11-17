"""Collect review candidates; never edit live news/column data or publish articles.

Only the standard library is needed. Live NAVER collection is permission-gated
because retaining search results in a Git repository needs provider permission.
"""
from __future__ import annotations

import argparse
from collections import Counter
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime
import hashlib
import html
import json
import os
from pathlib import Path
import re
import sys
import time
from urllib.error import HTTPError, URLError
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
KST = timezone(timedelta(hours=9))
NAVER_ENDPOINT = "https://naverapihub.apigw.ntruss.com/search/v1/news"
STATUSES = ("게시 후보", "확인 필요", "기존 게시", "제외 후보")


def clean(value):
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]*>", "", str(value or "")))).strip()


def normalize_url(value):
    """Canonicalize known tracking/mobile variants without following redirects."""
    value = html.unescape(str(value or "")).strip()
    parts = urlsplit(value)
    if parts.scheme not in ("http", "https") or not parts.hostname:
        return ""
    host = parts.hostname.lower()
    path = parts.path.rstrip("/") or "/"
    query = dict(parse_qsl(parts.query, keep_blank_values=True))
    if host in ("n.news.naver.com", "news.naver.com", "m.news.naver.com"):
        match = re.search(r"/(?:mnews/)?article/(\d+)/(\d+)", path)
        aid, oid = query.get("aid"), query.get("oid")
        if match:
            oid, aid = match.groups()
        if aid and oid:
            return f"https://n.news.naver.com/article/{oid}/{aid}"
    host = host.removeprefix("www.")
    if host.startswith("m.") and host[2:] in ("etoday.co.kr", "news2day.co.kr", "g-enews.com"):
        host = host[2:]
    tracking = {"sid", "ref", "inflow", "fbclid", "gclid", "feature"}
    pairs = sorted((k, v) for k, v in parse_qsl(parts.query, keep_blank_values=True)
                   if not k.lower().startswith("utm_") and k.lower() not in tracking)
    return urlunsplit(("https", host, path, urlencode(pairs), ""))


def parse_date(value):
    if not value:
        return None
    try:
        result = parsedate_to_datetime(str(value))
    except (ValueError, TypeError, OverflowError):
        try:
            result = datetime.fromisoformat(str(value).replace("Z", "+00:00"))
        except ValueError:
            return None
    return result.replace(tzinfo=KST) if result.tzinfo is None else result.astimezone(KST)


def matched(text, terms):
    return [term for term in terms if term.casefold() in text.casefold()]


def load_published(root, config):
    urls, titles = {}, {}
    for board, page in (("news", "news-view.html"), ("column", "column-view.html")):
        for path in sorted((root / "data" / board).glob("view_*.json")):
            post = json.loads(path.read_text(encoding="utf-8-sig"))
            record = {
                "title": post.get("title", ""),
                "url": f"{config['site_url']}/pages/community/{page}?post={path.stem}",
            }
            key = normalize_url(post.get("link", ""))
            if key:
                urls[key] = record
            titles.setdefault(clean(post.get("title")).casefold(), []).append(record)
    return urls, titles


def classify(item, config, published, now):
    title = clean(item.get("title"))
    description = clean(item.get("description"))
    text = f"{title} {description}"
    original = normalize_url(item.get("originallink"))
    link = normalize_url(item.get("link"))
    date = parse_date(item.get("pubDate"))
    people = matched(text, config["faculty"])
    entities = matched(text, config["entity_terms"])
    institutions = matched(text, config["institution_terms"])
    topics = matched(text, config["topic_terms"])
    excluded = matched(text, config["exclude_terms"])
    urls, titles = published
    existing = next((urls[key] for key in (original, link) if key in urls), None)
    same_titles = titles.get(title.casefold(), [])
    reasons, checks = [], ["원문에서 실제 보도일·매체·관련 인물 및 내용 확인"]
    status = "확인 필요"
    if existing:
        status, reasons = "기존 게시", ["기존 게시물의 원문 링크와 일치"]
    elif date and (date > now + timedelta(days=1) or date < now - timedelta(days=config["lookback_days"])):
        status, reasons = "제외 후보", ["설정한 검색 기간 밖의 날짜"]
    elif excluded:
        status, reasons = "제외 후보", ["제외 표현 일치: " + ", ".join(excluded)]
    elif entities:
        status, reasons = "게시 후보", ["학과·연구소·사업 명칭 일치: " + ", ".join(entities)]
    elif institutions and topics:
        status, reasons = "게시 후보", ["대학명 + 관련 분야 일치: " + ", ".join(institutions + topics)]
    elif people and (institutions or topics):
        status, reasons = "게시 후보", ["교수진 이름 + 대학·관련 분야 일치: " + ", ".join(people + institutions + topics)]
        checks.append("동명이인 여부와 원문 소속 확인")
    elif people:
        reasons = ["교수진 이름만 일치: " + ", ".join(people)]
        checks.append("동명이인·소속·방산 관련 여부 확인")
    elif institutions or topics:
        reasons = ["일부 표현만 일치하여 연관성 확인 필요: " + ", ".join(institutions + topics)]
    else:
        status, reasons = "제외 후보", ["설정된 학과·연구소·교수진·대학·관련 분야 표현이 없음"]
    if not date:
        checks.append("날짜를 해석할 수 없음")
        if status == "게시 후보":
            status = "확인 필요"
    if not original and not link:
        checks.append("유효한 기사 링크가 없음")
        if status != "기존 게시":
            status = "확인 필요"
    if same_titles and not existing:
        checks.append("기존 게시물과 제목이 같음: 다른 언론사 보도인지 확인 (자동 제외하지 않음)")
    is_column = bool(matched(title, config["column_markers"]))
    board = "기고·칼럼 후보 — 필자 확인 필요" if is_column else "언론보도 후보 — 원문 확인 필요"
    if is_column:
        checks.append("기고 표기만으로 교수님 직접 작성 여부를 확정하지 않음: 원문 필자 확인")
    host = urlsplit(original or link).hostname or ""
    source = next((name for domain, name in config["source_names"].items()
                   if host == domain or host.endswith("." + domain)), "매체 확인 필요")
    identity = original or link or title
    return {
        "id": hashlib.sha256(identity.encode()).hexdigest()[:12],
        "title": title or "제목 확인 필요", "description": description,
        "original_url": original, "url": link, "date": date.isoformat() if date else "확인 필요",
        "source": source, "status": status, "reasons": reasons, "checks": checks,
        "board": board, "people": people, "queries": [item.get("query", "")],
        "existing": [existing] if existing else same_titles,
    }


def build_report_data(items, config, published, now):
    grouped = []
    aliases = {}
    for item in items:
        row = classify(item, config, published, now)
        keys = {key for key in (row["original_url"], row["url"]) if key}
        previous = next((aliases[key] for key in keys if key in aliases), None)
        if previous is not None:
            previous["queries"] = sorted(set(previous["queries"] + row["queries"]))
            for key in keys:
                aliases[key] = previous
            continue
        grouped.append(row)
        for key in keys:
            aliases[key] = row
    return sorted(grouped, key=lambda row: (row["date"] != "확인 필요", row["date"]), reverse=True)


def markdown(value):
    return html.escape(clean(value)).replace("|", "&#124;").replace("[", "&#91;").replace("]", "&#93;").replace("`", "&#96;").replace("@", "&#64;")


def link_label(url, label):
    # Avoid Markdown/HTML injection from external search fields.
    safe = url.replace("(", "%28").replace(")", "%29").replace("<", "%3C").replace(">", "%3E")
    return f"[{label}](<{safe}>)" if normalize_url(url) else "링크 확인 필요"


def render_report(rows, now, demo=False):
    counts = Counter(row["status"] for row in rows)
    label = "샘플 검토 화면 (실제 검색·게시 자료 아님)" if demo else "주간 기사 검토"
    lines = [f"# {label}", "", f"생성: {now.astimezone(KST):%Y-%m-%d %H:%M} KST", "",
             " / ".join(f"{status} {counts[status]}건" for status in STATUSES), "",
             "프로그램은 제목·검색 설명의 단어 일치만 판단합니다. AI 판단이나 본문 검증 결과가 아닙니다.",
             "검색 날짜는 검색 서비스 제공 시각이므로 실제 게재일과 다를 수 있습니다.",
             "이 PR은 검토자료만 포함합니다. 승인하거나 병합해도 홈페이지 기사가 게시되지 않습니다.",
             "게시하려면 원문 검토 후 승인한 후보 ID를 전달하여 별도의 게시물 변경을 만드세요.", ""]
    for status in STATUSES:
        section = [row for row in rows if row["status"] == status]
        collapsed = status in ("기존 게시", "제외 후보")
        if collapsed:
            lines += ["<details>", f"<summary>{status} {len(section)}건 펼쳐보기</summary>", ""]
        else:
            lines += [f"## {status} ({len(section)}건)", ""]
        if not section:
            lines += ["해당 없음", ""]
        for row in section:
            lines += [f"### {markdown(row['title'])}", "",
                      f"- 후보 ID: `{row['id']}`",
                      f"- 날짜: {markdown(row['date'])} / 매체: {markdown(row['source'])}",
                      f"- 원문: {link_label(row['original_url'] or row['url'], '기사 열기')}",
                      f"- 발견 검색어: {markdown(', '.join(row['queries']))}",
                      f"- 선정·분류 이유: {markdown('; '.join(row['reasons']))}",
                      f"- 제안 게시판: {markdown(row['board'])}",
                      f"- 필자: 확인 필요 / 일치 이름: {markdown(', '.join(row['people']) or '없음')}",
                      f"- 확인사항: {markdown('; '.join(row['checks']))}"]
            for existing in row["existing"]:
                lines += [f"- 기존 게시물: {link_label(existing['url'], markdown(existing['title']))}"]
            lines += ["- [ ] 게시 승인", "- [ ] 제외", "- [ ] 보류", ""]
        if collapsed:
            lines += ["</details>", ""]
    lines += ["## 검색 범위의 한계", "",
              "검색어·API 결과 개수·제목/설명 범위 때문에 누락과 오분류가 있을 수 있습니다.",
              "다른 언론사에서 같은 행사를 보도한 기사는 링크가 다르면 유지합니다.", ""]
    return "\n".join(lines)


def request_json(url, headers):
    # Never print response bodies/headers: provider errors may contain secrets.
    for attempt in range(3):
        try:
            with urlopen(Request(url, headers=headers), timeout=30) as response:
                return json.load(response)
        except HTTPError as error:
            if (error.code == 429 or error.code >= 500) and attempt < 2:
                time.sleep(2 ** attempt)
                continue
            raise RuntimeError(f"검색 요청 실패 (HTTP {error.code}). 인증 정보·한도를 확인하세요.") from None
        except (URLError, TimeoutError):
            if attempt < 2:
                time.sleep(2 ** attempt)
                continue
            raise RuntimeError("검색 서버 연결 실패. 잠시 후 재실행하세요.") from None


def collect_naver(config):
    if os.environ.get("NAVER_NEWS_STORAGE_ALLOWED") != "true":
        raise RuntimeError("실제 검색 중단: 검색결과를 GitHub에 저장할 수 있다는 제공자의 허용을 먼저 확인하세요. "
                           "확인된 경우에만 NAVER_NEWS_STORAGE_ALLOWED=true를 설정하세요.")
    client_id, secret = os.environ.get("NAVER_CLIENT_ID"), os.environ.get("NAVER_CLIENT_SECRET")
    if not client_id or not secret:
        raise RuntimeError("실제 검색 중단: NAVER_CLIENT_ID, NAVER_CLIENT_SECRET이 필요합니다. 코드에 키를 넣지 마세요.")
    if any(ord(char) < 33 or ord(char) > 126 for char in client_id + secret):
        raise RuntimeError("인증키에 공백·줄바꿈 또는 잘못된 문자가 있습니다. Secret 값을 확인하세요.")
    headers = {"X-NCP-APIGW-API-KEY-ID": client_id, "X-NCP-APIGW-API-KEY": secret}
    queries = list(config["queries"])
    if config.get("search_faculty"):
        queries += [(name + " " + config.get("faculty_query_suffix", "")).strip() for name in config["faculty"]]
    queries = list(dict.fromkeys(queries))
    display = int(config["results_per_query"])
    pages = int(config["pages_per_query"])
    if not 1 <= display <= 100 or not 1 <= pages <= 10 or len(queries) * pages > 1000:
        raise RuntimeError("호출량 설정 오류: 페이지당 1~100건, 검색어당 1~10페이지, 실행당 최대 1,000회입니다.")
    items = []
    for query in queries:
        for page in range(pages):
            params = urlencode({"query": query, "display": display, "start": page * display + 1, "sort": "date"})
            data = request_json(f"{NAVER_ENDPOINT}?{params}", headers)
            if not isinstance(data.get("items"), list):
                raise RuntimeError("검색 응답 형식 오류: 검토자료를 만들지 않고 종료합니다.")
            batch = data["items"]
            items += [dict(item, query=query) for item in batch]
            if len(batch) < display:
                break
            time.sleep(0.15)
    return items


def demo_items(now):
    date = now.isoformat()
    return [
        {"title": "[샘플] 전북대, 방산기업과 채용연계 협력", "link": "https://example.com/news/1", "pubDate": date, "query": "전북대 방산"},
        {"title": "[샘플] 전북대, 방산기업과 채용연계 협력", "link": "https://example.com/news/1?utm_source=search", "pubDate": date, "query": "전북대학교 방위산업"},
        {"title": "[샘플] 전북대, 방산기업과 채용연계 협력", "link": "https://example.org/news/2", "pubDate": date, "query": "전북대 방산"},
        {"title": "[샘플] [기고] 장원준, K-방산 경쟁력", "link": "https://example.com/news/3", "pubDate": date, "query": "장원준"},
        {"title": "[샘플] 강은호 행사 참석", "link": "https://example.com/news/4", "pubDate": date, "query": "강은호"},
        {"title": "[샘플] 지역 축제 개막", "link": "https://example.com/news/5", "pubDate": date, "query": "전북대 방산"},
        {"title": "[샘플] 전북대 방산 기존 게시물 링크 확인", "link": "https://www.etnews.com/20261116000165?utm_source=search", "pubDate": date, "query": "전북대 방산"},
    ]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--mode", choices=("demo", "naver"), default="demo")
    parser.add_argument("--config", type=Path, default=ROOT / ".github/news-review-config.json")
    parser.add_argument("--output", type=Path, default=ROOT / ".news-review/report.md")
    parser.add_argument("--now", help="ISO date/time override, for repeatable demos")
    args = parser.parse_args()
    config = json.loads(args.config.read_text(encoding="utf-8-sig"))
    now = parse_date(args.now) if args.now else datetime.now(KST)
    if now is None:
        parser.error("--now 날짜 형식이 올바르지 않습니다.")
    items = demo_items(now) if args.mode == "demo" else collect_naver(config)
    rows = build_report_data(items, config, load_published(ROOT, config), now)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(render_report(rows, now, args.mode == "demo"), encoding="utf-8")
    print(f"검토자료 생성 완료: {len(rows)}건 ({args.mode})")


if __name__ == "__main__":
    try:
        main()
    except (RuntimeError, ValueError) as error:
        print(str(error), file=sys.stderr)
        sys.exit(1)
