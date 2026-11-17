# 주간 기사 검색·검토 자동화

검색어로 뉴스를 찾고 규칙으로 선별하여 GitHub에서 검토하는 기능입니다.
GitHub에 워크플로를 설치하고 필요한 설정을 등록하면 동작합니다.

## 현재 동작과 범위

- `demo`: 인증키 없이 샘플 기사 7개 입력 → 중복 통합 후 6개 검토 항목 생성.
- 자동화 코드·검색 설정을 푸시하면 샘플 모드로 검증합니다. 실제 검색이나 PR 생성은 하지 않습니다.
- `naver`: NAVER API HUB 뉴스 검색. 제공자의 저장 허용 확인 및 인증키가 있어야 실행.
- 월요일 **오전 9시 17분(한국 시간)** 정기 실행 설정. GitHub 사정에 따라 지연될 수 있습니다.
- 14일 범위, 검색어당 최신 100건 조회. 기본 검색어 7개 + 교수진 23명 = 최대 30회 요청/실행(재시도 제외).
- 검색 결과에 없는 기사, 본문에만 관련 표현이 있는 기사, 최신 100건 밖의 기사는 누락될 수 있습니다.
- AI·기사 본문 자동 수집·필자 자동 확정 기능은 없습니다.
- 기사 제목·검색 설명의 단어 일치가 선별 근거이며, 원문은 검토자가 확인합니다.
- 실제 `data/news/`, `data/column/`, 사이트맵, 홈페이지 화면은 변경하지 않습니다.
- PR 승인/병합은 기사 게시를 의미하지 않습니다. 원문 검토 후 승인 후보 ID를 알려주면 별도의 게시물 변경으로 반영합니다.

## 먼저 확인할 API 이용조건

NAVER API HUB 약관은 검색결과의 저장·가공·AI 입력 등을 제한합니다.
공개 GitHub 저장소의 PR, Markdown 파일, Actions 실행 요약에 결과를 남기는 방식이
허용되는지 제공자에게 확인해야 합니다. 저장 기간 제한이 있는 임시 캐싱과 Git 이력에 남는
영구 저장은 다릅니다. 단순히 21일 후 파일을 삭제해도 Git 이력에는 남습니다.

그래서 **실제 검색은 기본 차단**되어 있습니다. 아래 변수는 제한을 우회하는 설정이 아니라,
해당 저장·공개 방식에 대한 허용을 확인한 경우에만 사용하는 실행 조건입니다.
무료 호출 한도와 데이터 이용 허용 여부는 별개입니다.

- [공식 이용조건 변경 안내](https://www.ncloud.com/support/notice/all/2243)
- [API HUB 뉴스 검색 명세](https://api.ncloud-docs.com/docs/naver-api-hub-search-news)

## 파일 위치

| 파일 | 역할 |
|---|---|
| `.github/news-review-config.json` | 검색어·교수진·포함/제외 표현·검색 범위 |
| `scripts/news_review.py` | 검색·링크 중복 확인·규칙 선별·검토자료 작성 |
| `scripts/publish_news_review.py` | 검토자료 하나만 담은 Draft PR 생성 |
| `.github/workflows/news-review.yml` | 수동/월요일 정기 실행 |
| `.github/news-review-example.md` | 실제 검색과 구분한 샘플 검토자료 |
| `scripts/tests/test_news_review.py` | 중복·오분류 방지·실행 차단·PR 범위 검사 |

## 검색어와 선별 기준 수정

`.github/news-review-config.json`을 수정합니다.

- `queries`: 학과·연구소·사업 관련 검색어.
- `faculty`: 교수진 이름. `search_faculty: true`면 이름별로도 검색합니다.
  이름만 검색하여 방산 표현이 없는 기사도 찾되, 동명이인 여부는 사람이 확인합니다.
- `faculty_query_suffix`: 필요하면 교수진 검색어 뒤에 붙일 표현(예: `전북대`).
  검색을 좁히면 동명이인 기사와 함께 실제 관련 기사도 누락될 수 있습니다.
- `institution_terms`, `entity_terms`, `topic_terms`: 연관성 판단에 쓰는 표현.
  과거 연구소 명칭은 과거 이름으로 보도된 기사를 찾는 용도로만 유지합니다.
- `exclude_terms`: 제외 후보로 표시할 표현. 즉시 삭제하지 않아 사람이 재검토할 수 있습니다.
- `lookback_days`: 기본 14일. 중복 확인을 하므로 매주 검색할 때 기간이 겹쳐도 됩니다.
- `results_per_query`, `pages_per_query`: 검색어별 검색량. 페이지를 늘리면 호출 수가 증가합니다.
- `column_markers`: 기고·칼럼 후보 표시. 제목의 기고 표현만으로 작성자를 단정하지 않습니다.
- `source_names`: 원문 도메인별 매체 표시. 미등록 매체는 `매체 확인 필요`로 표시합니다.

**기존 게시**는 원문 링크가 일치한 경우입니다. 네이버 모바일/일반 링크와 주요 추적 매개변수를
정규화하고, 같은 검색에서 여러 번 발견한 기사도 통합합니다. 짧은 링크의 자동 리디렉션 추적은
하지 않습니다. 제목만 같고 링크가 다르면 다른 언론사 보도일 수 있어 유지하고 확인 표시합니다.

## 로컬에서 샘플 확인 (인터넷·키 불필요)

PowerShell에서 저장소 폴더를 연 뒤:

```powershell
$env:PYTHONDONTWRITEBYTECODE = '1'
python -m unittest discover -s scripts/tests -p test_news_review.py -v
python scripts/news_review.py --mode demo --output .news-review/report.md
```

생성된 Markdown을 VS Code에서 열고 `Ctrl+Shift+V`로 미리봅니다.
샘플의 `example.com`, `example.org` 링크는 설명용 주소로 실제 기사가 아닙니다.
현재 실제 게시물 하나의 링크는 **기존 게시 확인 기능을 보여주는 샘플**로만 포함합니다.

## GitHub에 설치하고 샘플 실행

1. 구현 파일을 작업 브랜치에 커밋·푸시한 뒤 검토하여 기본 브랜치 `main`에 병합합니다.
   이 작업만으로 실제 검색이 활성화되지 않습니다.
2. 저장소 → **Actions → 주간 기사 검색 및 검토 → Run workflow**를 선택합니다.
3. `mode: demo`, `create_pr: false`로 실행합니다. 실행 페이지의 **Summary**에서 샘플 자료를 확인합니다.
4. 검토용 PR까지 보려면 `create_pr: true`로 다시 실행합니다.
5. PR 생성 권한 오류가 있으면 **Settings → Actions → General → Workflow permissions →
   Allow GitHub Actions to create and approve pull requests**를 허용합니다.
   조직 정책으로 제한된 경우 관리자 확인이 필요합니다. 이 프로그램은 스스로 PR을 승인하거나 병합하지 않습니다.

검토 PR의 브랜치는 `automation/news-review/날짜-실행ID-시도번호`입니다.
실행 시점의 최신 기본 브랜치에서 생성하므로 작업 브랜치의 다른 변경이 섞이지 않습니다.
변경 파일은 `.news-review/reports/날짜-실행ID-시도번호.md` 하나입니다.
미병합 Draft PR도 **공개 저장소에서는 공개**됩니다. 비밀 자료나 인증키를 넣으면 안 됩니다.

## 실제 검색 활성화 (저장 허용을 확인한 뒤)

저장소 **Settings → Secrets and variables → Actions**에 설정합니다.
키는 채팅·코드·JSON 설정 파일·커밋에 넣지 않습니다.

| 종류 | 이름 | 값 |
|---|---|---|
| Secret | `NAVER_CLIENT_ID` | API HUB에서 발급받은 Client ID |
| Secret | `NAVER_CLIENT_SECRET` | API HUB에서 발급받은 Client Secret |
| Variable | `NAVER_NEWS_STORAGE_ALLOWED` | 해당 결과 저장·공개 방식의 허용을 확인한 경우에만 `true` |
| Variable | `NEWS_REVIEW_ENABLED` | 월요일 정기 실행을 켜려면 `true` |

먼저 정기 실행 변수를 켜지 않고 `mode: naver`, `create_pr: false`로 수동 실행해 확인한 뒤,
문제가 없으면 검토 PR 생성을 시험하고 정기 실행 변수를 켭니다.
실제 검색 모드에서는 Summary에 표시하는 것도 저장 허용 확인 이후에만 가능합니다.
검색 요청 중 하나라도 실패하면 부분 결과 PR을 만들지 않고 실행을 실패 처리합니다.

정기 실행을 끄려면 `NEWS_REVIEW_ENABLED`를 `false`로 바꿉니다.
기본 브랜치에 워크플로 파일이 있어야 정기 실행/수동 실행 UI가 동작합니다.
공개 저장소에서 장기간 활동이 없으면 GitHub가 예약 실행을 비활성화할 수 있습니다.

## 검토와 게시

PR의 **전체 검토자료 열기**에서 원문 링크·검색어·선정 이유·게시판 후보·중복 여부를 확인합니다.
필자는 항상 원문에서 확인하며, 장원준 교수님 기고의 홈페이지 작성자 표기는
`장원준 첨단방위산업학과 교수`로 유지합니다.
제외 후보와 기존 게시물도 접힌 목록에서 펼쳐볼 수 있습니다.

PR 본문에 후보별 승인/제외/보류 체크박스가 있고, 예를 들어 아래처럼 댓글로 최종 결정을 남깁니다.

> 게시 후보 중 ID `abc123...`, `def456...` 승인. 나머지는 보류.

체크박스와 댓글을 자동으로 읽어 게시하는 기능은 없습니다. 승인 목록을 바탕으로 원문을 확인하고
뉴스/칼럼 JSON과 사이트맵을 수정하는 별도의 게시 작업을 진행합니다.
게시 후 검토 PR은 병합하지 않고 닫아도 됩니다.

## 참고

- [GitHub 정기 실행 안내](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule)
- [Actions PR 생성 권한](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository)
