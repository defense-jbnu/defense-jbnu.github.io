"""Open a review-only PR using GitHub's API. Never merge or change site data."""
from __future__ import annotations

import argparse
import base64
from datetime import datetime, timedelta, timezone
import json
import os
from pathlib import Path
import re
import sys
from urllib.error import HTTPError, URLError
from urllib.parse import quote
from urllib.request import Request, urlopen


def api(repository, token, method, path, data=None):
    request = Request(
        f"https://api.github.com/repos/{repository}/{path}",
        data=json.dumps(data, ensure_ascii=False).encode() if data is not None else None,
        method=method,
        headers={"Authorization": f"Bearer {token}", "Accept": "application/vnd.github+json",
                 "X-GitHub-Api-Version": "2022-11-28", "Content-Type": "application/json"},
    )
    try:
        with urlopen(request, timeout=30) as response:
            return json.load(response)
    except HTTPError as error:
        raise RuntimeError(f"GitHub 요청 실패 (HTTP {error.code}). Actions의 PR 생성 권한과 실행 로그를 확인하세요.") from None
    except (URLError, TimeoutError):
        raise RuntimeError("GitHub 연결 실패. 검토 브랜치가 남아 있는지 확인한 뒤 재실행하세요.") from None


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--report", type=Path, required=True)
    parser.add_argument("--mode", choices=("demo", "naver"), required=True)
    args = parser.parse_args()
    repository = os.environ.get("GITHUB_REPOSITORY", "")
    token = os.environ.get("GH_TOKEN", "")
    run_id = os.environ.get("GITHUB_RUN_ID", "")
    attempt = os.environ.get("GITHUB_RUN_ATTEMPT", "1")
    if not re.fullmatch(r"[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+", repository) or not token:
        raise RuntimeError("GITHUB_REPOSITORY와 GH_TOKEN이 필요합니다.")
    if not run_id.isdigit() or not attempt.isdigit():
        raise RuntimeError("GitHub Actions 실행 ID를 확인할 수 없습니다.")
    report = args.report.read_text(encoding="utf-8")
    now = datetime.now(timezone(timedelta(hours=9)))
    suffix = f"{now:%Y%m%d}-{run_id}-{attempt}"
    branch = f"automation/news-review/{suffix}"
    # Read the live base, not the checked-out implementation branch. The new PR
    # contains exactly one report file, even while testing on a feature branch.
    repo = api(repository, token, "GET", "")
    base = repo["default_branch"]
    ref = api(repository, token, "GET", f"git/ref/heads/{quote(base, safe='')}")
    api(repository, token, "POST", "git/refs", {"ref": f"refs/heads/{branch}", "sha": ref["object"]["sha"]})
    path = f".news-review/reports/{suffix}.md"
    api(repository, token, "PUT", f"contents/{path}", {
        "message": f"docs: {now:%Y-%m-%d} 기사 검토자료 ({args.mode})",
        "content": base64.b64encode(report.encode()).decode(), "branch": branch,
    })
    demo = "[샘플] " if args.mode == "demo" else ""
    # Keep long reports in the changed Markdown file rather than exceed PR limits.
    body = ("이 PR은 **기사 검토자료만 포함**합니다. 실제 게시물은 변경하지 않았습니다.\n\n"
            f"[전체 검토자료 열기](https://github.com/{repository}/blob/{branch}/{path})\n\n"
            "후보별 원문·선정 이유·중복 여부를 확인하고 승인/제외/보류를 표시해주세요.\n"
            "승인할 후보 ID를 댓글로 남겨주시면 게시물 반영 작업에 사용할 수 있습니다.\n\n"
            "**이 PR의 승인이나 병합만으로 기사가 홈페이지에 게시되지는 않습니다.**\n\n"
            + report[:50000])
    pr = api(repository, token, "POST", "pulls", {
        "title": f"{demo}[기사 검토] {now:%Y-%m-%d}", "body": body,
        "head": branch, "base": base, "draft": True,
    })
    url = pr["html_url"]
    print(f"검토용 PR 생성: {url}")
    if summary := os.environ.get("GITHUB_STEP_SUMMARY"):
        with open(summary, "a", encoding="utf-8") as output:
            output.write(f"\n[검토용 PR 열기]({url})\n")


if __name__ == "__main__":
    try:
        main()
    except (RuntimeError, ValueError) as error:
        print(str(error), file=sys.stderr)
        sys.exit(1)
