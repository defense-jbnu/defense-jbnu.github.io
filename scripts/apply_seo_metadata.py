from __future__ import annotations

import json
import re
from pathlib import Path


SITE_URL = "https://defense.jbnu.ac.kr"
SITE_NAME = "전북대학교 K-방위산업연구소"
OG_IMAGE = f"{SITE_URL}/assets/img/main/main_bg.jpg"
ROOT = Path(__file__).resolve().parents[1]

META = {
    "index.html": ("전북대학교 K-방위산업연구소", "전북대학교 K-방위산업연구소는 첨단 방위산업 교육, 연구, 산학협력과 지역 방산 클러스터 조성을 추진하는 교육·연구 거점입니다.", ["홈"]),
    "pages/about/intro.html": ("연구소 소개 | 전북대학교 K-방위산업연구소", "전북대학교 K-방위산업연구소의 비전, 주요 협력 성과, 방산 클러스터 추진 내용을 소개합니다.", ["연구소 소개"]),
    "pages/about/org.html": ("인사말 및 조직도 | 전북대학교 K-방위산업연구소", "전북대학교 K-방위산업연구소의 인사말, 조직 구성, 운영 체계를 확인할 수 있습니다.", ["연구소 소개", "인사말 및 조직도"]),
    "pages/about/location.html": ("찾아오시는 길 | 전북대학교 K-방위산업연구소", "전북대학교 K-방위산업연구소 위치, 교통편, 캠퍼스 접근 정보를 안내합니다.", ["연구소 소개", "찾아오시는 길"]),
    "pages/major/advanced.html": ("첨단방위산업학과 | 전북대학교 K-방위산업연구소", "전북대학교 첨단방위산업학과의 학부 교육과정, 교육 목표, 진로 및 연계 프로그램을 소개합니다.", ["교육 프로그램", "첨단방위산업학과"]),
    "pages/major/convergence.html": ("방위산업융합전공 | 전북대학교 K-방위산업연구소", "방위산업융합전공의 교육과정, 참여 학문 분야, 융합형 인재 양성 방향을 안내합니다.", ["교육 프로그램", "방위산업융합전공"]),
    "pages/major/graduate.html": ("첨단방산AI융합대학원 | 전북대학교 K-방위산업연구소", "첨단방산AI융합대학원의 교육과정, 산학협력, 글로벌 연계 및 연구 분야를 소개합니다.", ["교육 프로그램", "첨단방산AI융합대학원"]),
    "pages/major/contract_grad.html": ("계약정원제 | 전북대학교 K-방위산업연구소", "전북대학교 K-방위산업연구소의 계약정원제 운영 방향과 방산 분야 전문 인재 양성 체계를 안내합니다.", ["교육 프로그램", "계약정원제"]),
    "pages/program/intro.html": ("AI 부트캠프 | 전북대학교 K-방위산업연구소", "첨단 방위산업과 AI 기술 융합 역량을 키우는 전북대학교 AI 부트캠프 프로그램을 소개합니다.", ["교육 프로그램", "AI 부트캠프"]),
    "pages/program/apply.html": ("인턴십 | 전북대학교 K-방위산업연구소", "전북대학교 K-방위산업연구소의 방산 분야 인턴십 및 현장 실무 연계 프로그램을 안내합니다.", ["교육 프로그램", "인턴십"]),
    "pages/research/fields.html": ("연구 분야 | 전북대학교 K-방위산업연구소", "첨단방위산업학과, 공과대학, 외부 협력 기반의 방산 연구 분야와 기술 역량을 소개합니다.", ["연구 분야"]),
    "pages/research/cluster.html": ("방산 클러스터 | 전북대학교 K-방위산업연구소", "전북 지역 방산 클러스터 조성과 산학연 협력 거점 구축 현황을 소개합니다.", ["산학협력", "방산 클러스터"]),
    "pages/research/partners.html": ("협력기업 | 전북대학교 K-방위산업연구소", "전북대학교 K-방위산업연구소와 협력하는 방산 기업 및 기관 네트워크를 소개합니다.", ["산학협력", "협력기업"]),
    "pages/research/joint.html": ("산학연 공동연구 | 전북대학교 K-방위산업연구소", "전북대학교 K-방위산업연구소의 산학연 공동연구, 업무협약, 기술 협력 사례를 안내합니다.", ["산학협력", "산학연 공동연구"]),
    "pages/people/faculty.html": ("교수진 | 전북대학교 K-방위산업연구소", "전북대학교 첨단방위산업학과와 K-방위산업연구소의 교수진 및 연구 분야를 소개합니다.", ["교직원", "교수진"]),
    "pages/people/staff.html": ("직원 | 전북대학교 K-방위산업연구소", "전북대학교 K-방위산업연구소와 첨단방위산업학과 행정·운영 담당 직원을 안내합니다.", ["교직원", "직원"]),
    "pages/community/notice.html": ("공지사항 | 전북대학교 K-방위산업연구소", "전북대학교 K-방위산업연구소의 주요 공지사항과 안내 자료를 확인할 수 있습니다.", ["커뮤니티", "공지사항"]),
    "pages/community/view.html": ("공지사항 상세 | 전북대학교 K-방위산업연구소", "전북대학교 K-방위산업연구소 공지사항 상세 내용을 확인할 수 있습니다.", ["커뮤니티", "공지사항"]),
    "pages/community/news.html": ("언론보도 | 전북대학교 K-방위산업연구소", "전북대학교 K-방위산업연구소와 방산 교육·연구 활동 관련 언론보도 소식을 제공합니다.", ["커뮤니티", "언론보도"]),
    "pages/community/news-view.html": ("언론보도 상세 | 전북대학교 K-방위산업연구소", "전북대학교 K-방위산업연구소 관련 언론보도 상세 내용을 확인할 수 있습니다.", ["커뮤니티", "언론보도"]),
    "pages/community/column.html": ("기고·칼럼 | 전북대학교 K-방위산업연구소", "방위산업 정책, 기술, 산학협력과 관련된 기고 및 칼럼을 제공합니다.", ["커뮤니티", "기고·칼럼"]),
    "pages/community/column-view.html": ("기고·칼럼 상세 | 전북대학교 K-방위산업연구소", "방위산업 관련 기고·칼럼 상세 내용을 확인할 수 있습니다.", ["커뮤니티", "기고·칼럼"]),
    "pages/community/gallery.html": ("갤러리 | 전북대학교 K-방위산업연구소", "전북대학교 K-방위산업연구소의 행사, 연구 활동, 산학협력 현장 사진을 확인할 수 있습니다.", ["커뮤니티", "갤러리"]),
    "sitemap.html": ("사이트맵 | 전북대학교 K-방위산업연구소", "전북대학교 K-방위산업연구소 홈페이지의 주요 메뉴와 페이지 링크를 한눈에 확인할 수 있습니다.", ["사이트맵"]),
}


def esc_attr(value: str) -> str:
    return value.replace("&", "&amp;").replace('"', "&quot;").replace("<", "&lt;").replace(">", "&gt;")


def canonical_for(relative_path: str) -> str:
    return f"{SITE_URL}/" if relative_path == "index.html" else f"{SITE_URL}/{relative_path}"


def breadcrumb_schema(relative_path: str, crumbs: list[str]) -> dict:
    items = [{"@type": "ListItem", "position": 1, "name": "홈", "item": f"{SITE_URL}/"}]
    if relative_path != "index.html":
        for index, crumb in enumerate(crumbs, start=2):
            entry = {"@type": "ListItem", "position": index, "name": crumb}
            if index == len(crumbs) + 1:
                entry["item"] = canonical_for(relative_path)
            items.append(entry)
    return {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": items}


def page_schema(relative_path: str, title: str, description: str) -> list[dict]:
    canonical = canonical_for(relative_path)
    if relative_path == "index.html":
        return [
            {"@context": "https://schema.org", "@type": "WebSite", "name": SITE_NAME, "url": canonical, "inLanguage": "ko-KR"},
            {"@context": "https://schema.org", "@type": "Organization", "name": SITE_NAME, "url": canonical, "logo": f"{SITE_URL}/assets/img/main/logo_jbnu.png"},
        ]
    return [{"@context": "https://schema.org", "@type": "WebPage", "name": title, "description": description, "url": canonical, "inLanguage": "ko-KR"}]


def build_head_block(relative_path: str, title: str, description: str, crumbs: list[str]) -> str:
    canonical = canonical_for(relative_path)
    schemas = page_schema(relative_path, title, description) + [breadcrumb_schema(relative_path, crumbs)]
    return "\n".join(
        [
            f"    <title>{title}</title>",
            f'    <meta name="description" content="{esc_attr(description)}">',
            '    <meta name="robots" content="index, follow">',
            f'    <link rel="canonical" href="{canonical}">',
            f'    <meta property="og:title" content="{esc_attr(title)}">',
            f'    <meta property="og:description" content="{esc_attr(description)}">',
            f'    <meta property="og:url" content="{canonical}">',
            '    <meta property="og:type" content="website">',
            f'    <meta property="og:site_name" content="{SITE_NAME}">',
            '    <meta property="og:locale" content="ko_KR">',
            f'    <meta property="og:image" content="{OG_IMAGE}">',
            '    <meta name="twitter:card" content="summary_large_image">',
            f'    <meta name="twitter:title" content="{esc_attr(title)}">',
            f'    <meta name="twitter:description" content="{esc_attr(description)}">',
            f'    <meta name="twitter:image" content="{OG_IMAGE}">',
            '    <script type="application/ld+json">',
            json.dumps(schemas if len(schemas) > 1 else schemas[0], ensure_ascii=False, separators=(",", ":")),
            "    </script>",
            "",
        ]
    )


def apply_metadata() -> None:
    for relative_path, (title, description, crumbs) in META.items():
        path = ROOT / relative_path
        text = path.read_text(encoding="utf-8")
        viewport = re.search(r'    <meta name="viewport" content="width=device-width, initial-scale=1\.0">\n', text)
        stylesheet = re.search(r'    <link rel="stylesheet"', text)

        if not viewport or not stylesheet:
            raise RuntimeError(f"Cannot find head anchors in {relative_path}")

        updated = text[: viewport.end()] + build_head_block(relative_path, title, description, crumbs) + text[stylesheet.start() :]
        path.write_text(updated, encoding="utf-8", newline="\n")


if __name__ == "__main__":
    apply_metadata()
