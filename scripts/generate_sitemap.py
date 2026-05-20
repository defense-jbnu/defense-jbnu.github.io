from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path
from xml.sax.saxutils import escape


SITE_URL = "https://defense.jbnu.ac.kr"
ROOT = Path(__file__).resolve().parents[1]

EXCLUDED_HTML = {
    "pages/community/view.html",
    "pages/community/news-view.html",
    "pages/community/column-view.html",
}

PRIORITY = {
    "index.html": "1.0",
    "pages/about/intro.html": "0.9",
    "pages/about/org.html": "0.8",
    "pages/about/location.html": "0.7",
    "pages/major/advanced.html": "0.9",
    "pages/major/convergence.html": "0.8",
    "pages/major/graduate.html": "0.8",
    "pages/major/contract_grad.html": "0.7",
    "pages/program/intro.html": "0.7",
    "pages/program/defense-manager.html": "0.7",
    "pages/program/apply.html": "0.7",
    "pages/research/fields.html": "0.8",
    "pages/research/cluster.html": "0.8",
    "pages/research/partners.html": "0.7",
    "pages/research/joint.html": "0.7",
    "pages/people/faculty.html": "0.7",
    "pages/people/staff.html": "0.6",
    "pages/community/notice.html": "0.8",
    "pages/community/news.html": "0.7",
    "pages/community/column.html": "0.7",
    "pages/community/gallery.html": "0.6",
    "sitemap.html": "0.5",
}

CHANGEFREQ = {
    "index.html": "weekly",
    "pages/community/notice.html": "weekly",
    "pages/community/news.html": "weekly",
    "pages/community/column.html": "weekly",
}


def lastmod_for(path: Path) -> str:
    return datetime.fromtimestamp(path.stat().st_mtime).date().isoformat()


def loc_for(relative_path: str) -> str:
    if relative_path == "index.html":
        return f"{SITE_URL}/"
    return f"{SITE_URL}/{relative_path}"


def static_pages() -> list[dict[str, str]]:
    pages: list[dict[str, str]] = []
    html_paths = [ROOT / "index.html", *sorted((ROOT / "pages").rglob("*.html")), ROOT / "sitemap.html"]

    for path in html_paths:
        relative_path = path.relative_to(ROOT).as_posix()
        if relative_path in EXCLUDED_HTML:
            continue

        pages.append(
            {
                "loc": loc_for(relative_path),
                "lastmod": lastmod_for(path),
                "changefreq": CHANGEFREQ.get(relative_path, "monthly"),
                "priority": PRIORITY.get(relative_path, "0.6"),
            }
        )

    return pages


def post_pages() -> list[dict[str, str]]:
    sources = [
        ("data/notice/list.json", "pages/community/"),
        ("data/news/list.json", "pages/community/"),
        ("data/column/list.json", "pages/community/"),
    ]
    pages: list[dict[str, str]] = []

    for list_path, prefix in sources:
        path = ROOT / list_path
        if not path.exists():
            continue

        items = json.loads(path.read_text(encoding="utf-8"))
        for item in items:
            link = item.get("link", "")
            if not link or link.startswith(("http://", "https://")):
                continue

            pages.append(
                {
                    "loc": f"{SITE_URL}/{prefix}{link}",
                    "lastmod": lastmod_for(path),
                    "changefreq": "monthly",
                    "priority": "0.6",
                }
            )

    return pages


def render_url(page: dict[str, str]) -> str:
    return "\n".join(
        [
            "    <url>",
            f"        <loc>{escape(page['loc'])}</loc>",
            f"        <lastmod>{page['lastmod']}</lastmod>",
            f"        <changefreq>{page['changefreq']}</changefreq>",
            f"        <priority>{page['priority']}</priority>",
            "    </url>",
        ]
    )


def main() -> None:
    pages = static_pages() + post_pages()
    body = "\n".join(render_url(page) for page in pages)
    sitemap = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{body}
</urlset>
"""
    (ROOT / "sitemap.xml").write_text(sitemap, encoding="utf-8", newline="\n")


if __name__ == "__main__":
    main()
