const SITE_LANGUAGE_KEY = 'jbnu-defense-language';

const SITE_COPY = {
    en: {
        ...(window.SITE_COPY_EN || {}),
        '인사말 및 조직도 | 전북대학교 국방산업연구소': 'Greetings & Organization | JBNU Defense Industry Research Institute',
        '인사말 / 조직도': 'Greeting / Organization',
        '전북대학교 국방산업연구소의 비전과 운영 체계를 소개합니다.': 'Introducing the vision and operating structure of the JBNU Defense Industry Research Institute.',
        '인사말 및 조직도 메뉴': 'Greeting & Organization Menu',
        '연구소장 인사말': 'Director’s Greeting',
        '연구소 조직도': 'Organization Chart',
        '연구, 교육, 대외협력 기능을 중심으로 유연하게 협업하는 운영 체계입니다.': 'A flexible operating structure centered on research, education, and external cooperation.',
        '전북대학교 국방산업연구소 조직도': 'JBNU Defense Industry Research Institute Organization Chart',
        '연구소장': 'Director',
        '강은호 교수': 'Prof. Kang Eun-ho',
        '전광호': 'Kwang-ho Jeon',
        '전광호 교수': 'Prof. Kwang-ho Jeon',
        '장원준': 'Won-jun Jang',
        '장원준 교수': 'Prof. Won-jun Jang',
        '홍성민': 'Sung-min Hong',
        '송문원': 'Moon-won Song',
        '이대규': 'Dae-gyu Lee',
        '유준수': 'Jun-soo Yoo',
        '부소장': 'Deputy Director',
        '국방전략부소장': 'Deputy Director for Defense Strategy',
        '안기찬 교수': 'Prof. Ahn Ki-chan',
        '대외협력부소장': 'Deputy Director for External Cooperation',
        '송원준 교수': 'Prof. Song Won-jun',
        '연구협력부소장': 'Deputy Director for Research Cooperation',
        '홍성민 교수': 'Prof. Hong Sung-min',
        '기획관리부': 'Planning & Management Division',
        '군사전략 및 방산기획': 'Military strategy and defense planning',
        '교육혁신부': 'Education Innovation Division',
        '공유대학 및 빅데이터 관리': 'Shared-university and big-data management',
        '대외홍보부': 'External Relations & PR Division',
        '대외홍보 및 네트워크 관리': 'External relations and network management',
        '방산기획 및 협력부': 'Defense Planning & Cooperation Division',
        'LIG넥스원, 현대로템, 한화, DH, 휴니드 등 협력 기업 연계': 'Partner-company links with LIG Nex1, Hyundai Rotem, Hanwha, DH, Huneed, and others',
        '간사': 'Administration',
        '예산, 시설, 운영 지원': 'Budget, facilities, and operations support',
        '연구소 주요 보직 및 참여 구성원': 'Key Positions and Participants',
        '통합대학(방위산업) 송원준 교수': 'Prof. Song Won-jun, College of Convergence Studies (Defense Industry)',
        '국제전문사회학부 안기찬 교수': 'Prof. Ahn Ki-chan, Division of International Studies',
        '기계설계공학부 이덕진 교수, 물리학과 김명환 교수': 'Prof. Lee Deok-jin, Mechanical Design Engineering; Prof. Kim Myung-hwan, Physics',
        '로스알라모스 연구소-전북대 한국공학연구소': 'Los Alamos–JBNU Korea Engineering Research Institute',
        '기계설계공학부 이덕진 교수, 고온플라즈마응용연구센터 홍성민 교수, 자원에너지공학과 조남호 교수, 양자시스템공학과 기태현 교수, 화학공학부 서형기 교수, 신소재공학부(정보소재공학) 김진수 교수': 'Prof. Lee Deok-jin, Mechanical Design Engineering; Prof. Hong Sung-min, High-Temperature Plasma Application Research Center; Prof. Cho Nam-ho, Resources and Energy Engineering; Prof. Ki Tae-hyun, Quantum System Engineering; Prof. Seo Hyung-ki, Chemical Engineering; Prof. Kim Jin-su, Advanced Materials Engineering (Information Materials)',
        '전북대학교 국방산업연구소': 'JBNU Defense Industry Research Institute',
        '전북대학교 국방산업연구소 | 첨단방위산업학과': 'JBNU Defense Industry Research Institute | Department of Advanced Defense Technology and Industry',
        '연구소 소개 | 전북대학교 국방산업연구소': 'Institute Overview | JBNU Defense Industry Research Institute',
        '찾아오시는 길 | 전북대학교 국방산업연구소': 'Location | JBNU Defense Industry Research Institute',
        '방위산업 맞춤형 채용연계 | 전북대학교 국방산업연구소': 'Defense Industry Employment Pathways | JBNU Defense Industry Research Institute',
        '기고·칼럼 | 전북대학교 국방산업연구소': 'Columns | JBNU Defense Industry Research Institute',
        '기고·칼럼 상세 | 전북대학교 국방산업연구소': 'Column Details | JBNU Defense Industry Research Institute',
        '갤러리 | 전북대학교 국방산업연구소': 'Gallery | JBNU Defense Industry Research Institute',
        '이슈브리프 | 전북대학교 국방산업연구소': 'Issue Briefs | JBNU Defense Industry Research Institute',
        '언론보도 | 전북대학교 국방산업연구소': 'Media Coverage | JBNU Defense Industry Research Institute',
        '언론보도 상세 | 전북대학교 국방산업연구소': 'Media Coverage Details | JBNU Defense Industry Research Institute',
        '공지사항 | 전북대학교 국방산업연구소': 'Notices | JBNU Defense Industry Research Institute',
        '공지사항 상세 | 전북대학교 국방산업연구소': 'Notice Details | JBNU Defense Industry Research Institute',
        '홍보자료 | 전북대학교 국방산업연구소': 'Downloads | JBNU Defense Industry Research Institute',
        '계약정원제 | 전북대학교 국방산업연구소': 'Industry-Contracted Program | JBNU Defense Industry Research Institute',
        '방위산업융합전공 | 전북대학교 국방산업연구소': 'Defense Industry Convergence Major | JBNU Defense Industry Research Institute',
        '첨단AI방위산업융합대학원 | 전북대학교 국방산업연구소': 'Graduate School of Advanced AI Defense Industry Convergence | JBNU Defense Industry Research Institute',
        'JBNU-Purdue MDA (Master of Defense Acquisition) | 전북대학교 국방산업연구소': 'JBNU-Purdue MDA (Master of Defense Acquisition) | JBNU Defense Industry Research Institute',
        '교수진 | 전북대학교 국방산업연구소': 'Faculty | JBNU Defense Industry Research Institute',
        '직원 | 전북대학교 국방산업연구소': 'Staff | JBNU Defense Industry Research Institute',
        '인턴십 | 전북대학교 국방산업연구소': 'Internship | JBNU Defense Industry Research Institute',
        '국방산업관리사 | 전북대학교 국방산업연구소': 'Defense Industry Manager Program | JBNU Defense Industry Research Institute',
        'AI 부트캠프 | 전북대학교 국방산업연구소': 'AI Bootcamp | JBNU Defense Industry Research Institute',
        '연구성과 | 전북대학교 국방산업연구소': 'Research Outcomes | JBNU Defense Industry Research Institute',
        '연구 분야 | 전북대학교 국방산업연구소': 'Research Areas | JBNU Defense Industry Research Institute',
        '산학연 공동연구 | 전북대학교 국방산업연구소': 'Joint Research | JBNU Defense Industry Research Institute',
        '협력기업 | 전북대학교 국방산업연구소': 'Partner Companies | JBNU Defense Industry Research Institute',
        '사이트맵 | 전북대학교 국방산업연구소': 'Sitemap | JBNU Defense Industry Research Institute',
        '연구소 소개': 'About Us',
        '통합소개': 'About',
        '인사말 / 조직도': 'Greetings / Organization',
        '찾아오시는 길': 'Location',
        '국방산업연구소': 'Research Institute',
        '교육과정': 'Curriculum',
        '진학·진로 프로그램': 'Study & Career Programs',
        '학부·대학원': 'Undergraduate & Graduate',
        '채용연계': 'Employment Pathways',
        '참여기업': 'Participating Companies',
        '실무교육': 'Professional Training',
        '직무교육': 'Professional Training',
        '교육': 'Education',
        '연구·산학협력': 'Research & Partnerships',
        '교육 프로그램': 'Education',
        '교육·입학': 'Education',
        '학부': 'Undergraduate',
        '첨단방위산업학과': 'ADTI',
        '방위산업융합전공': 'Defense Industry Convergence Major',
        '대학원': 'Graduate School',
        '첨단AI방위산업융합대학원': 'Graduate School of Advanced AI Defense Industry Convergence',
        '계약정원제': 'Industry-Contracted Program',
        '프로그램': 'Programs',
        'AI 부트캠프': 'AI Bootcamp',
        'AI부트캠프': 'AI Bootcamp',
        '국방산업관리사': 'Defense Industry Manager Program',
        '인턴십': 'Internship',
        'JBNU-Purdue MDA': 'JBNU-Purdue MDA',
        '국방사업관리사': 'Defense Project Manager Program',
        '진로·채용': 'Careers',
        '진로·채용 안내': 'Career & Employment',
        '채용약정형 석사과정': 'Employment-linked Master’s',
        '연구 분야': 'Research',
        '연구·성과': 'Research & Outcomes',
        '연구성과': 'Research Outcomes',
        '연구 성과': 'Research Outcomes',
        '공과대학 및 타 학과': 'College of Engineering & Other Departments',
        '외부 협력': 'External Collaboration',
        '산학협력': 'Industry Partnership',
        '방산 클러스터': 'Defense Industry Cluster',
        '방산클러스터': 'Defense Industry Cluster',
        '협력기업': 'Partner Companies',
        '산학연 공동연구': 'Joint Research',
        '교직원': 'People',
        '구성원': 'People',
        '교수': 'Faculty',
        '교수진': 'Faculty',
        '조교수': 'Assistant Professor',
        '부교수': 'Associate Professor',
        '초빙교수': 'Invited Professor',
        '겸임교수': 'Adjunct Professor',
        '객원교수': 'Visiting Professor',
        '특임교수': 'Distinguished Professor',
        '명예교수': 'Professor Emeritus',
        '참여교수': 'Participating Faculty',
        '전임': 'Full-time Faculty',
        '특ㆍ겸ㆍ객원 교수': 'Special, Adjunct & Visiting Faculty',
        '직원': 'Staff',
        '커뮤니티': 'Community',
        '소식·자료': 'News & Resources',
        '공지사항': 'Notices',
        '공지 사항': 'Notices',
        '언론보도': 'Media Coverage',
        '기고·칼럼': 'Columns',
        '갤러리': 'Gallery',
        '이슈브리프': 'Issue Briefs',
        '홍보자료': 'Downloads',
        '연구소 갤러리': 'Institute Gallery',
        '사이트맵': 'Sitemap',
        '소식': 'News',
        '전체': 'Total',
        '건': ' items',
        '번호': 'No.',
        '제목': 'Title',
        '작성일': 'Date',
        '매체': 'Source',
        '목록': 'List',
        '이전글': 'Previous',
        '다음글': 'Next',
        '대한민국 방위산업의 미래를 만듭니다': 'Shaping the Future of Korea’s Defense Industry',
        '국방산업연구소를 중심으로 학과 진학부터 학부·대학원 과정, 실무교육과 채용연계까지 안내합니다': 'Explore undergraduate and graduate programs, professional training, and employment pathways centered on the institute.',
        '연구소 비전·조직·주요 연구 분야': 'Vision, organization, and key research areas',
        '학과 소개·교육과정·진로 안내': 'Department, curriculum, and career information',
        '대학원·MDA·채용연계·부트캠프': 'Graduate school, MDA, employment pathways, and bootcamp',
        'Master of Defense Acquisition 글로벌 온라인 석사과정입니다.': 'A global online Master of Defense Acquisition program.',
        'MDA 안내': 'MDA Information',
        '채용약정형 과정, 인턴십과 참여기업 정보를 연결합니다.': 'Explore employment-linked programs, internships, and participating companies.',
        '채용연계 안내': 'Employment Pathways',
        '지역 방산 생태계와 산학연 협력 기반을 조성합니다.': 'Building a regional defense ecosystem and industry-academia-research partnerships.',
        '클러스터 안내': 'Cluster Information',
        '방산 기획·조달·계약관리 전문역량을 강화하는 교육과정입니다.': 'Professional training in defense planning, procurement, and contract management.',
        '교육과정 안내': 'Program Information',
        '연구소': 'Institute',
        '학과': 'Department',
        '진학·진로': 'Study & Careers',
        '연구·산학': 'Research & Industry',
        '연구분야·성과·공동연구·협력기업': 'Research areas, outcomes, joint research, and partner companies',
        '공지사항·언론보도·입학 관련 소식': 'Notices, media coverage, and admissions news',
        '연구소를 중심으로, 진학부터 진로까지': 'From Admissions to Careers, Centered on the Institute',
        '국방산업연구소를 중심으로 학부·대학원·주요 교육사업과 산학협력 정보를 연결하여 교육과 연구, 진학과 진로를 아우르는 방위산업 정보를 제공합니다.': 'Centered on the institute, we connect undergraduate and graduate programs, education initiatives, and industry partnerships across education, research, admissions, and careers.',
        '교육·연구·산학협력의 연결 거점인 연구소의 비전과 역할을 소개합니다.': 'Learn about the institute’s vision and its role connecting education, research, and industry.',
        '교육·연구·산학협력': 'Education, Research & Industry Collaboration',
        '국방산업연구소를 중심으로 학부·대학원·주요 교육사업과 산학협력 정보를 연결하여 방위산업 전문인재 양성과 지역·기업 협력 활동을 소개합니다.': 'Centered on the institute, we connect undergraduate, graduate, education-program, and industry-partnership information to introduce talent development and regional-industry collaboration.',
        '연구과제, 산학협력, MOU와 대외협력 성과를 총괄합니다.': 'We coordinate research projects, industry partnerships, MOUs, and external cooperation outcomes.',
        '첨단 국방기술과 방위산업 정책·경영을 융합하는 학부 과정입니다.': 'An undergraduate program integrating advanced defense technology with defense-industry policy and management.',
        '학과 안내': 'Department Information',
        '대학원·사업단의 모집, 교육과정과 주요 사업 정보를 확인할 수 있습니다.': 'Explore admissions, curricula, and key initiatives from the graduate school and program center.',
        '첨단 국방기술과 방위산업 정책·경영을 융합한 교육과정과 진로 정보를 제공합니다.': 'Explore a curriculum and career paths integrating advanced defense technology with defense policy and management.',
        '방위산업 현장 중심의 석사급 R&D 인재 양성 과정': 'A field-focused graduate program for defense-industry R&D professionals',
        '산업 수요와 실무형 R&D 역량을 연결하는 대학원 과정입니다.': 'A graduate program connecting industry needs with practical R&D capabilities.',
        '대학원 안내': 'Graduate School Information',
        'Master of Defense Acquisition 글로벌 온라인 석사과정 안내': 'Global Online Master of Defense Acquisition Program',
        '채용약정형 과정·인턴십·참여기업과 진로 정보': 'Employment-linked programs, internships, participating companies, and careers',
        '방산 분야 취업 역량을 높이는 집중 실무교육': 'Intensive practical training for defense-industry careers',
        '방산 도메인과 AI를 결합한 현장 중심 교육사업을 운영합니다.': 'A field-oriented education program combining defense-domain expertise with AI.',
        '부트캠프 안내': 'Bootcamp Information',
        '진학을 준비하는 학생이라면': 'For Prospective Students',
        '첨단방위산업학과의 특징과 교육과정, 졸업 후 진로를 한 번에 확인할 수 있습니다.': 'Explore the department, curriculum, and career opportunities in one place.',
        '학과 안내 보기': 'View Department',
        '교육과 취업 경로가 궁금한 학부모라면': 'For Parents Exploring Education and Careers',
        '대학원, 인턴십, 채용약정형 과정과 참여기업 등 교육 이후의 진로 연결 정보를 확인할 수 있습니다.': 'Review graduate study, internships, employment-linked programs, and participating companies.',
        '전북대, 국내 핵심 방산기업과 채용연계형 산학협력 본격화': 'JBNU Expands Employment-Linked Industry-Academia Cooperation with Korea’s Leading Defense Companies',
        '출처: 전자신문': 'Source: Electronic Times',
        '우리는 「국가를 지키는 힘」 을 만들어 나갑니다': 'We Build the Power That Defends Our Nation',
        '첨단기술과 산업정책 글로벌 마인드를 겸비한 K-방산 융합형 인재 양성의 요람': 'Developing interdisciplinary K-defense leaders with advanced technology, industry policy expertise, and a global perspective',
        '26년 3월': 'March 2026',
        '24년 7월': 'July 2024',
        '첨단국방 과학기술 도전인재, 실무능력 기술융합 혁신인재 및': 'We cultivate bold innovators in advanced defense science and technology, professionals with practical technology convergence skills, and',
        '밀리테크 4.0 시대 맞춤인재': 'future-ready talent for the Militech 4.0 era',
        '를 양성합니다': '.',
        '를 양성합니다.': '.',
        '첨단 기술과 방산 정책의 융합 연구': 'Convergence research in advanced technology and defense policy',
        '전북방산클러스터': 'Jeonbuk Defense Industry Cluster',
        '지역 특화 산업과 연계한 국가 균형 발전': 'Balanced national growth through regionally specialized industries',
        '산학연 공동연구': 'Industry-Academia-Research Collaboration',
        '한화에어로스페이스, LIG넥스원, 현대로템 등': 'Hanwha Aerospace, LIG Nex1, Hyundai Rotem, and more',
        '각종 행사 및 프로그램 사진': 'Photos from events and programs',
        '우리의 대한민국을 지키는 기술을 만들어 나가겠습니다': 'We will continue developing technologies that safeguard the Republic of Korea',
        '공지사항을 불러오는 중입니다...': 'Loading notices...',
        '언론보도를 불러오는 중입니다...': 'Loading media coverage...',
        '소식을 불러오는 중...': 'Loading news...',
        '기고·칼럼을 불러오는 중...': 'Loading columns...',
        '전북대학교 국방산업연구소의 주요 안내를 전해드립니다.': 'Find the latest updates from the JBNU Defense Industry Research Institute.',
        '전북대학교 국방산업연구소의 언론 보도와 주요 소식을 확인하세요.': 'Explore media coverage and news from the JBNU Defense Industry Research Institute.',
        '전북대학교 국방산업연구소의 전문 기고와 칼럼을 소개합니다.': 'Read expert contributions and columns from the JBNU Defense Industry Research Institute.',
        '전북대학교 국방산업연구소의 다양한 활동을 사진으로 만나보세요.': 'See the institute’s activities in photos.',
        '방산AI부트캠프': 'Defense AI Bootcamp',
        '방산AI부트캠프사업단': 'Defense AI Bootcamp Program',
        '진로·채용 안내 보기': 'View Career & Employment Information',
        '연구소의 활동과 성과를 지속적으로 축적하고': 'We continuously document the institute’s activities and outcomes',
        '쉽게 찾고 활용할 수 있는 자료': 'as organized resources',
        '로 제공합니다': ' for easy access and use.',
        '연구소 연구성과': 'Institute Research Outcomes',
        '연구과제, MOU, 포럼·세미나 및 대외협력 활동': 'Research projects, MOUs, forums, seminars, and external cooperation',
        'JBNU Defense Issue Brief 발간자료 아카이브': 'Archive of JBNU Defense Issue Brief publications',
        '협력기관 및 참여기업': 'Partner Institutions and Companies',
        '협력기관·기업': 'Partners',
        '교육·연구·채용으로 연결되는 산학연 협력 네트워크': 'An industry-academia-research network connecting education, research, and employment',
        '학과·연구소 소개서, 리플릿 및 내려받기 자료': 'Department and institute brochures, leaflets, and downloads',
        '관련 홈페이지 바로가기': 'Related Websites',
        '공식 대학원 홈페이지 →': 'Official Graduate School Website →',
        '공식 사업단 홈페이지 →': 'Official Program Website →',
        '주요 콘텐츠 바로가기': 'Quick Links',
        '핵심 메뉴': 'Key Menu',
        '카드 이동': 'Card Navigation',
        '이전 카드': 'Previous Card',
        '다음 카드': 'Next Card',
        '연구소 및 교육 프로그램 카드': 'Institute and Education Program Cards',
        '전북대학교 국방산업연구소와 첨단방위산업학과': 'JBNU Defense Industry Research Institute and ADTI',
        '전북대학교와 국내 방산기업의 채용연계형 산학협력 협약식': 'JBNU employment-linked industry partnership agreement with leading Korean defense companies',
        '대한민국 방위산업 유튜브 영상': 'Korea Defense Industry Video',
        '(54896) 전북특별자치도 전주시 덕진구 백제대로 567 | TEL 063-270-4582': '(54896) 567 Baekje-daero, Deokjin-gu, Jeonju-si, Jeonbuk State, Republic of Korea | TEL +82-63-270-4582',
        '교육과정 / 방위산업융합전공': 'Curriculum / Defense Industry Convergence Major',
        '교육과정 / 학부 과정': 'Undergraduate Program',
        '전북대학교 첨단방위산업학과': 'Department of Advanced Defense Technology and Industry, JBNU',
        '첨단방위산업학과 소개': 'About the Department of Advanced Defense Technology and Industry',
        '전북대학교 첨단방위산업학과 | 국방산업연구소': 'Department of Advanced Defense Technology and Industry, JBNU | Defense Industry Research Institute',
        '첨단방위산업학과 | 전북대학교 국방산업연구소': 'Department of Advanced Defense Technology and Industry | JBNU Defense Industry Research Institute',
        '학과 소개': 'Department',
        '학부 과정 메뉴': 'Undergraduate Program Menu',
        '첨단 국방기술과 방위산업 정책·경영·시스템을 융합해 방위산업 전주기를 이해하는 실무형 인재를 양성합니다.': 'We prepare practice-oriented professionals who understand the full defense-industry lifecycle by integrating advanced defense technology with policy, management, and systems.',
        '첨단방위산업학과는 급변하는 안보 환경과 글로벌 방위산업 시장의 확대에 대응하기 위해 첨단 국방기술과 방위산업 정책·경영·시스템을 융합적으로 교육하는 특성화 학과입니다.': 'The Department of Advanced Defense Technology and Industry is a specialized program integrating advanced defense technology with defense-industry policy, management, and systems in response to a rapidly changing security environment and expanding global markets.',
        '첨단소재, 유·무인복합체계, 사이버보안, 방산경제·경영 등 방위산업 전주기를 다루며, 무기체계의 기획·개발·획득·시험·평가 전 과정에 대한 이해와 실무 역량을 강화합니다.': 'The curriculum covers the full defense-industry lifecycle, including advanced materials, manned-unmanned teaming, cybersecurity, and defense economics and management, while building practical expertise across weapon-system planning, development, acquisition, testing, and evaluation.',
        '영문명': 'English Name',
        '교육 분야': 'Areas of Study',
        '첨단소재, 유·무인복합체계, 사이버보안, 방산경제·경영': 'Advanced materials, manned-unmanned teaming, cybersecurity, and defense economics and management',
        '위치·문의': 'Location & Contact',
        '전북대학교 창조2관 4층 · 063-270-4731': '4th floor, Changjo Hall 2, JBNU · +82-63-270-4731',
        '산학협력 실무교육': 'Industry Practice',
        '산학협력 기반 실무 교육': 'Industry Practice',
        '산학협력 기반 실무교육': 'Industry Practice',
        '교육과정 / 대학원 과정': 'Curriculum / Graduate Program',
        '방위산업융합전공 소개': 'About the Defense Industry Convergence Major',
        '교육 목표': 'Goals',
        '융합형 교육과정': 'Curriculum',
        '첨단방위산업학과는 방위산업 핵심기술, 정책, 실무교육을 결합해 국방과 산업 현장을 연결하는 융합형 인재를 양성합니다.': 'The Department of Advanced Defense Technology and Industry develops interdisciplinary talent by connecting defense technology, policy, and practical training.',
        '첨단방위산업학과는 융합형 교육과정, 전문가 네트워크, 산학협력 기반 실무교육, 맞춤형 취업 지원을 통해 방위산업 현장에서 요구하는 전문 인재를 양성합니다.': 'The department prepares defense-industry professionals through an integrated curriculum, expert networks, industry practice, and tailored career support.',
        '소속': 'Affiliation',
        '대학본부 첨단방위산업학과': 'Department of Advanced Defense Technology and Industry',
        '특징': 'Highlights',
        '융합형 교육과정, 전문가 네트워크 구축, 산학협력 기반 실무교육, 맞춤형 지원': 'Integrated curriculum, expert network, industry practice, and tailored support',
        '모집 인원': 'Admissions',
        '2026년 1학기 20명 선발': '20 students selected for Spring 2026',
        '전용공간: 창조2관 4층': 'Dedicated space: 4th floor, Changjo Hall 2',
        '첨단방위산업학과 교수진': 'ADTI Faculty',
        '학과 교수진과 전공별 연구 분야를 확인할 수 있습니다.': 'Meet the department faculty and explore their research fields.',
        '교수진 보기': 'View Faculty',
        '국방 첨단기술과 방위산업 정책을 함께 이해하고, 연구개발 전 과정을 학습하는 실무형 교육을 지향합니다.': 'We provide practical training in advanced defense technology, defense policy, and the full R&D process.',
        '정책과 시장 이해': 'Policy & Market',
        '글로벌 방위산업 정책 및 시장 동향을 분석하고, 국내외 방산시장 진출 전략을 학습합니다.': 'Analyze global defense policy and markets, and learn market-entry strategies.',
        '핵심기술 학습': 'Core Technologies',
        '방산기업 적용 전략, 무기 획득 및 조달 체계, 첨단 소재와 사이버보안 등 핵심기술을 다룹니다.': 'Study defense-industry applications, acquisition and procurement, advanced materials, and cybersecurity.',
        'R&D 프로세스 경험': 'R&D Practice',
        '방산 연구개발, 시험평가, 시스템 설계 등 현장 프로젝트 기반의 문제 해결 역량을 강화합니다.': 'Build problem-solving skills through defense R&D, testing, evaluation, and systems-design projects.',
        '1학년 공통 교육부터 4학년 실무 심화까지, 방산정책과 첨단기술 트랙을 단계적으로 연결합니다.': 'A step-by-step track from common first-year courses to advanced senior-year practice.',
        '한화에어로스페이스, LIG넥스원, 현대로템, KAI 등 주요 방산기업 및 연구기관과 연계해 현장 중심 프로젝트, 공동연구, 취업 연계형 교육을 운영합니다.': 'We run field projects, joint research, and employment-linked training with leading defense companies and research institutes.',
        '방위산업 현장 전문가 특강 및 멘토링': 'Expert talks & mentoring',
        '기업 수요 기반 프로젝트형 수업 운영': 'Industry-driven project courses',
        '첨단소재, 유무인복합, 사이버보안, Physical AI 등 연구 인프라 연계': 'Research infrastructure in advanced materials, autonomous systems, cybersecurity, and Physical AI',
        '채용 정보, 직무 이해, 포트폴리오 중심의 진로 지원': 'Career support through job information, role guidance, and portfolios',
        '산학협력 기반 실무교육 참여 기업 로고': 'Participating industry partners',
        '방산기업 및 연구기관 협력 네트워크': 'Defense industry & research network',
        '졸업 후 진로': 'Career Paths',
        '기술개발부터 정책·전략, 연구개발과 글로벌 방산협력까지 다양한 분야로 진출할 수 있습니다.': 'Graduates can pursue careers spanning technology development, policy and strategy, R&D, and global defense cooperation.',
        '방산기업 및 산업체': 'Defense Companies & Industry',
        '주요 방산기업의 무기체계·항공·군용차량·유무인복합체계 설계 및 개발 분야': 'Weapon systems, aerospace, military vehicles, and manned-unmanned systems design and development at leading defense companies',
        '국방 연구기관 및 공공기관': 'Defense Research & Public Agencies',
        '국방 연구개발, 방위사업 관리, 국방기술 기획 및 정책 연구 분야': 'Defense R&D, acquisition program management, technology planning, and policy research',
        '연구·기술 분야': 'Research & Engineering',
        '군용 통신·전자·소프트웨어, 사이버보안, 시스템 통합 및 시험·평가 분야': 'Military communications, electronics and software, cybersecurity, systems integration, testing, and evaluation',
        '정책·국제협력 및 진학': 'Policy, Global Cooperation & Graduate Study',
        '방산 정책·전략 분석, 글로벌 방산 수출·국제협력, 관련 대학원 및 전문 연구 분야': 'Defense policy and strategy, global exports and cooperation, graduate study, and specialized research',
        '방산 클러스터 | 전북대학교 국방산업연구소': 'Defense Cluster | JBNU Defense Industry Research Institute',
        '전북 지역 방산 클러스터 조성과 산학연 협력 거점 구축 현황을 소개합니다.': 'Introducing Jeonbuk’s defense cluster initiative and industry-academia-research cooperation base.',
        '첨단소재·시험평가 중심 방산 클러스터': 'Advanced Materials & Test Evaluation Defense Cluster',
        '전북의 지역특화산업과 국방 연구 인프라를 연결해 방산혁신클러스터 유치와 민군겸용 실증 기반 조성을 추진합니다.': 'We connect Jeonbuk’s specialized industries with defense research infrastructure to attract a defense innovation cluster and build a dual-use testbed.',
        '방산 클러스터 메뉴': 'Defense Cluster Menu',
        '사업 개요': 'Overview',
        '전북 기반': 'Jeonbuk Base',
        '추진 사업': 'Projects',
        '추진 전략': 'Strategy',
        '지역 특화 산업과 연계한 방산혁신클러스터 조성': 'Defense Innovation Cluster Linked to Regional Industries',
        '정부 국정과제 내 방산혁신클러스터 확대 흐름에 맞춰 국가 균형 발전과 첨단 방위산업 생태계 조성을 함께 도모합니다.': 'Aligned with the national expansion of defense innovation clusters, we support balanced regional growth and an advanced defense ecosystem.',
        '2020년부터 정부는 주요 지자체들을 중심으로 \'첨단 방위산업 혁신 클러스터\' 조성을 위한 노력을 지속하여 경남 창원(2020), 대전(2022), 경북 구미(2023)가 방위사업청의 방산혁신클러스터 사업에 선정, 지역 산업과 연계한 방산클러스터를 조성 중입니다.': 'Since 2020, Changwon, Daejeon, and Gumi have been selected for DAPA’s defense innovation cluster program and are developing defense clusters linked to regional industries.',
        '아울러, 방위사업청은 2026년까지 방산혁신클러스터를 6개 지역으로 확대, K-방산의 지속가능성 확보를 위한 지역특화 방산클러스터 확대를 적극 추진할 계획입니다.': 'DAPA plans to expand defense innovation clusters to six regions by 2026 to strengthen the sustainability of K-defense.',
        '또한 산업부도 2024년 방산 분야(첨단항공엔진)를 국가첨단전략산업으로 선정, 향후 첨단소재 중심의 국가전략산업 특화단지 조성을 추진할 예정입니다.': 'The Ministry of Trade, Industry and Energy designated advanced aerospace engines as a national strategic industry in 2024 and plans to promote advanced-materials industrial zones.',
        '방산혁신클러스터 개념도': 'Defense Innovation Cluster Concept',
        '첨단소재 특화단지 지정현황': 'Advanced Materials Specialized Zones',
        '[자료] 방위사업청, \'대한민국 방위산업을 이끈 정책, 방산혁신클러스터 사업\', 2023.5; 산업부, 2023.': '[Source] DAPA, Defense Innovation Cluster Program, May 2023; MOTIE, 2023.',
        '전북 지역특화산업 기반의 방산 성장 잠재력': 'Defense Growth Potential Based on Jeonbuk Industries',
        '탄소소재, 새만금 산업 기반, 국방·방산 연계 연구기관을 바탕으로 정부 방위산업 육성정책과의 시너지 효과 창출을 추진합니다.': 'Jeonbuk aims to create synergy with national defense-industry policy through carbon materials, Saemangeum’s industrial base, and defense-related research institutes.',
        '방산기업 집적': 'Defense Firms',
        '국방소재 및 지정방산업체 6개를 중심으로 지역 방산기업이 분포합니다.': 'Regional defense companies are clustered around defense-materials firms and six designated defense companies.',
        '2023년 매출 규모': '2023 Sales',
        '전북 방산기업 매출액 기준으로 산업 기반의 성장 여지를 확인했습니다.': 'Sales data shows room for growth in Jeonbuk’s defense-industry base.',
        '연구기관 연계': 'Research Links',
        '국방·방산과 관련성이 높은 장출연, 국공립 연구소 등이 소재합니다.': 'Jeonbuk hosts government-funded and public research institutes closely related to defense.',
        '전북도는 지자체의 높은 방위산업 육성 의지, 탄소소재 등 높은 지역산업 경쟁력, 새만금의 방산분야 활용 가능성 등 지역 특화 방위산업 육성에 높은 잠재력을 보유한 지역으로 평가합니다.': 'Jeonbuk has strong potential for specialized defense-industry growth through public commitment, carbon-materials competitiveness, and the defense use potential of Saemangeum.',
        '전북도는 첨단 소부장 클러스터 지정(전주(탄소소재)·새만금(이차전지, 핵심광물, 2023.4.)), 국가산업단지 지정(새만금, 2023.7), 도내 국방/방산과 연계성이 높은 50여개 장출연, 국공립 연구소 등이 소재하여 지역 주력산업과 연계한 방산혁신성장의 상당한 기반을 갖추고 있습니다.': 'Jeonbuk has a strong base for defense innovation, including advanced materials and components clusters, the Saemangeum national industrial complex, and more than 50 defense-related research institutes.',
        '전북도 정출연 및 국공립 연구기관 현황': 'Jeonbuk Research Institutes and Public Labs',
        '[자료] 전북 TP, 전북자치도 경제산업 동향, 2024 / 주: 적색은 국방 및 방산분야와 관련성 높은 기관': '[Source] Jeonbuk TP, Jeonbuk Economic and Industrial Trends, 2024. Red marks defense-related institutes.',
        '2025년 전북특화 방위산업 육성 지원사업 연계': 'Linked to Jeonbuk’s 2025 Defense Industry Support Program',
        '전북도를 \'첨단소재 및 시험평가 중심의 방산혁신클러스터\'로 조성하기 위한 공감대, 네트워크, 과제기획 기반을 마련합니다.': 'We build consensus, networks, and project plans to position Jeonbuk as a defense innovation cluster focused on advanced materials and test evaluation.',
        '방산포럼 공동수행': 'Defense Forum',
        '전북자치도가 추진하는 방산포럼 2회를 공동수행하여 국내 방산전문가들과의 인적 네트워크를 확보하고 지역 특화 방산클러스터 조성 공감대를 마련했습니다.': 'We co-hosted two defense forums with Jeonbuk to build expert networks and regional consensus for a specialized defense cluster.',
        '전북 방산연구회 세미나': 'Jeonbuk Defense Seminar',
        '전북도, 전북 TP와 공동으로 전북 방산연구회 세미나 5회를 수행하여 지역 주력산업과 연계한 방산 신규사업 발굴·기획을 추진했습니다.': 'We held five Jeonbuk Defense Research seminars with Jeonbuk and Jeonbuk TP to identify and plan new defense projects linked to regional industries.',
        '중대형 과제 기획': 'Major Project Planning',
        '지역 특화 방위산업 클러스터 구축을 위한 중대형 과제 2건을 기획해 정부부처 방산클러스터 사업 유치와 민군겸용 실증 테스트베드 구축 기반을 마련했습니다.': 'We planned two major projects to attract government defense-cluster programs and build a dual-use demonstration testbed.',
        '첨단소재 및 시험평가 중심의 구체적 추진전략': 'Strategy for Advanced Materials and Test Evaluation',
        '2025년 전북특화 방위산업육성 지원사업을 적극 지원하고, 전북형 방산혁신클러스터 조성을 위한 실행 전략을 제시합니다.': 'We support Jeonbuk’s 2025 defense-industry program and present an action strategy for a Jeonbuk-style defense innovation cluster.',
        '첨단소재 특화': 'Advanced Materials',
        '탄소소재, 이차전지, 핵심광물 등 전북 주력산업을 방산 소재·부품 경쟁력과 연결합니다.': 'Connect Jeonbuk’s strengths in carbon materials, batteries, and critical minerals to defense materials and components.',
        '시험평가 기반': 'Test Evaluation',
        '민군겸용 실증 테스트베드와 시험평가 체계를 연계해 현장 적용 가능한 기술 검증 기반을 강화합니다.': 'Strengthen field-ready technology validation by linking dual-use testbeds with test and evaluation systems.',
        '산학연 네트워크': 'I-A-R Network',
        '대학, 지자체, 기업, 연구기관의 공동 기획 체계를 통해 신규 사업 발굴과 정부사업 수주 가능성을 높입니다.': 'Use joint planning among universities, local government, companies, and research institutes to develop new projects and win government programs.',
        '클러스터 유치 전략': 'Cluster Strategy',
        '전북의 산업·연구 인프라를 묶어 방산혁신클러스터 사업 유치에 필요한 논리와 추진 로드맵을 구체화합니다.': 'Build the case and roadmap for attracting a defense innovation cluster by connecting Jeonbuk’s industrial and research infrastructure.',
        '커리큘럼 및 졸업요건': 'Curriculum and Graduation Requirements',
        '진로 및 취업 지원': 'Career and Employment Support',
        '구분': 'Category',
        '학년': 'Year',
        '이수학점': 'Required Credits',
        '인정교과목': 'Approved Courses',
        '계': 'Total',
        '학점': 'Credits',
        '필수': 'Required',
        '선택': 'Elective',
        '비고': 'Notes',
        '학생 지원 혜택': 'Student Benefits',
        '방산 AI 융합 인재상': 'Defense AI Convergence Talent Profile',
        'AI 부트캠프 전체 커리큘럼': 'AI Bootcamp Curriculum',
        '첨단산업 인재양성 부트캠프(AI)': 'Advanced Industry Talent Bootcamp (AI)',
        '오시는 길': 'Directions',
        '조직도': 'Organization',
        '연구분야': 'Research Areas',
        '전북대학교 국방산업연구소와 함께하는 교수진을 소개합니다.': 'Meet the faculty of the JBNU Defense Industry Research Institute.',
        '직위': 'Position',
        '소속': 'Affiliation',
        '전무': 'Executive Vice President',
        '상무': 'Senior Vice President',
        '대표이사': 'Chief Executive Officer',
        '한화에어로스페이스': 'Hanwha Aerospace',
        '현대로템': 'Hyundai Rotem',
        '보잉코리아': 'Boeing Korea',
        '한화에어로스페이스 전무': 'Executive Vice President, Hanwha Aerospace',
        '현대로템 상무': 'Senior Vice President, Hyundai Rotem',
        '보잉코리아 대표이사': 'Chief Executive Officer, Boeing Korea',
        'BAE Systems Korea 대표이사': 'Chief Executive Officer, BAE Systems Korea',
        '오피스': 'Office',
        '전화번호': 'Phone',
        '홈페이지': 'Website',
        '프로필 보기': 'View Profile',
        '방산진흥정책': 'Defense Industry Promotion Policy',
        '군사전략': 'Military Strategy',
        '방위산업 정책, 경제학': 'Defense Industry Policy and Economics',
        '재료공학, 방산소재, 고온재료': 'Materials Engineering, Defense Materials, and High-Temperature Materials',
        '고에너지 밀도를 시험 및 해석': 'High-Energy-Density Testing and Analysis',
        '무인시스템, 자율주행, 자율비행': 'Unmanned Systems, Autonomous Driving, and Autonomous Flight',
        '사이버보안, 양자내성암호, 인공지능보안': 'Cybersecurity, Post-Quantum Cryptography, and AI Security'
    }
};

function getSiteLanguage() {
    const requested = new URLSearchParams(window.location.search).get('lang');

    if (requested === 'ko' || requested === 'en') {
        localStorage.setItem(SITE_LANGUAGE_KEY, requested);
        return requested;
    }

    return localStorage.getItem(SITE_LANGUAGE_KEY) === 'en' ? 'en' : 'ko';
}

let siteLanguage = getSiteLanguage();

function localizedLabel(label) {
    return siteLanguage === 'en' ? (SITE_COPY.en[label] || label) : label;
}

function translateStaticContent(root = document.body) {
    document.documentElement.lang = siteLanguage;

    if (siteLanguage !== 'en' || !root) {
        return;
    }

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            return node.parentElement?.closest('script, style, [data-no-translate]')
                ? NodeFilter.FILTER_REJECT
                : NodeFilter.FILTER_ACCEPT;
        }
    });
    const nodes = [];

    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach(node => {
        const original = node.nodeValue;
        const trimmed = original.trim();
        const normalized = trimmed.replace(/\s+/g, ' ');
        const translated = SITE_COPY.en[normalized];

        if (translated) {
            const leading = original.match(/^\s*/)?.[0] || '';
            const trailing = original.match(/\s*$/)?.[0] || '';
            node.nodeValue = `${leading}${translated}${trailing}`;
        }
    });

    root.querySelectorAll?.('[alt], [title], [aria-label], [placeholder], meta[content]').forEach(element => {
        ['alt', 'title', 'aria-label', 'placeholder', 'content'].forEach(attribute => {
            const original = element.getAttribute(attribute);
            const translated = original && SITE_COPY.en[original.replace(/\s+/g, ' ').trim()];
            if (translated) element.setAttribute(attribute, translated);
        });
    });

    if (document.title) {
        const originalTitle = document.title.replace(/\s+/g, ' ').trim();
        const exactTitle = SITE_COPY.en[originalTitle];

        if (exactTitle) {
            document.title = exactTitle;
        } else {
            document.title = Object.entries(SITE_COPY.en)
                .sort(([left], [right]) => right.length - left.length)
                .reduce((title, [ko, en]) => title.replaceAll(ko, en), document.title);
        }
    }
}

function observeTranslatedContent() {
    if (siteLanguage !== 'en' || !document.body) return;

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    translateStaticContent(node.parentElement);
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    translateStaticContent(node);
                }
            });
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });
}

const SITE_NAV_ITEMS = [
    {
        label: '국방산업연구소',
        href: 'pages/about/intro.html',
        children: [
            { label: '연구소 소개', href: 'pages/about/intro.html' },
            { label: '인사말 / 조직도', href: 'pages/about/org.html' },
            { label: '찾아오시는 길', href: 'pages/about/location.html' },
        ],
    },
    {
        label: '첨단방위산업학과',
        href: 'pages/major/advanced.html',
        children: [
            { label: '학과 소개', href: 'pages/major/advanced.html#department' },
            { label: '교육과정', href: 'pages/major/advanced.html#curriculum' },
            { label: '진로·채용 안내', href: 'pages/career/overview.html' },
        ],
    },
    {
        label: '교육',
        href: 'pages/major/graduate.html',
        menuType: 'mega',
        children: [
            {
                label: '학부·대학원',
                children: [
                    { label: '방위산업융합전공', href: 'pages/major/convergence.html' },
                    { label: '첨단AI방위산업융합대학원', href: 'pages/major/graduate.html' },
                    { label: 'JBNU-Purdue MDA', href: 'pages/major/mda.html' },
                ],
            },
            {
                label: '채용연계',
                children: [
                    { label: '진로·채용 안내', href: 'pages/career/overview.html' },
                    { label: '인턴십', href: 'pages/program/apply.html' },
                    { label: '참여기업', href: 'pages/research/partners.html' },
                    { label: '계약정원제', href: 'pages/major/contract_grad.html' },
                ],
            },
            {
                label: '실무교육',
                children: [
                    { label: '방산AI부트캠프', href: 'pages/program/intro.html' },
                    { label: '국방사업관리사', href: 'pages/program/defense-manager.html' },
                ],
            },
        ],
    },
    {
        label: '연구·산학협력',
        href: 'pages/research/fields.html',
        children: [
            { label: '연구 분야', href: 'pages/research/fields.html' },
            { label: '연구 성과', href: 'pages/research/achievements.html' },
            { label: '산학연 공동연구', href: 'pages/research/joint.html' },
            { label: '방산 클러스터', href: 'pages/research/cluster.html' },
            { label: '협력기업', href: 'pages/research/partners.html' },
        ],
    },
    {
        label: '소식·자료',
        href: 'pages/community/notice.html',
        children: [
            { label: '공지사항', href: 'pages/community/notice.html' },
            { label: '언론보도', href: 'pages/community/news.html' },
            { label: '기고·칼럼', href: 'pages/community/column.html' },
            { label: '이슈브리프', href: 'pages/community/issue-brief.html' },
            { label: '갤러리', href: 'pages/community/gallery.html' },
            { label: '홍보자료', href: 'pages/community/resources.html' },
        ],
    },
    {
        label: '교직원',
        href: 'pages/people/faculty.html',
        children: [
            { label: '교수', href: 'pages/people/faculty.html' },
            { label: '직원', href: 'pages/people/staff.html' },
        ],
    },
];

const SITE_UTILITY_ITEMS = [
    { label: 'HOME', href: 'index.html', icon: 'home' },
    { label: 'SITEMAP', href: 'sitemap.html', icon: 'sitemap' },
    { label: 'ENGLISH', href: '#', icon: 'english', languageToggle: true },
    { label: 'YouTube', href: 'https://youtube.com/@jbnu_adti?si=o8i4LaFTPRtlCMKB', icon: 'youtube', isIconOnly: true, external: true },
];

function buildRootedHref(root, href) {
    const normalizedRoot = root.replace(/\/$/, '');

    if (!normalizedRoot || normalizedRoot === '.') {
        return `./${href}`;
    }

    return `${normalizedRoot}/${href}`;
}

function createUtilityLink(item, root) {
    const element = item.disabled ? document.createElement('span') : document.createElement('a');
    element.className = `site-utility-link site-utility-${item.icon}`;
    element.textContent = item.languageToggle && siteLanguage === 'en' ? '한국어' : item.label;

    if (item.isIconOnly) {
        element.setAttribute('aria-label', item.label);
    }

    if (item.disabled) {
        element.setAttribute('aria-disabled', 'true');
        return element;
    }

    if (item.languageToggle) {
        element.classList.add('notranslate');
        element.setAttribute('translate', 'no');
        element.href = '#';
        element.setAttribute('lang', siteLanguage === 'en' ? 'ko' : 'en');
        element.setAttribute('aria-label', siteLanguage === 'en' ? '한국어로 보기' : 'View in English');
        element.addEventListener('click', event => {
            event.preventDefault();
            const nextLanguage = siteLanguage === 'en' ? 'ko' : 'en';
            const nextUrl = new URL(window.location.href);
            localStorage.setItem(SITE_LANGUAGE_KEY, nextLanguage);
            nextUrl.searchParams.set('lang', nextLanguage);
            window.location.assign(nextUrl.toString());
        });
        return element;
    }

    element.href = item.external ? item.href : buildRootedHref(root, item.href);

    if (item.external) {
        element.target = '_blank';
        element.rel = 'noopener noreferrer';
    }
    return element;
}

function createNavLink(item, root) {
    const link = document.createElement('a');
    link.href = buildRootedHref(root, item.href);
    link.textContent = localizedLabel(item.label);
    return link;
}

function isCurrentPage(link) {
    return new URL(link.href, window.location.href).pathname === window.location.pathname;
}

function isCurrentLocation(link) {
    const linkUrl = new URL(link.href, window.location.href);

    if (linkUrl.pathname !== window.location.pathname) {
        return false;
    }

    return !linkUrl.hash || linkUrl.hash === window.location.hash;
}

function isAnyChildCurrent(children = [], root) {
    return children.some(child => {
        if (child.href) {
            const link = createNavLink(child, root);

            if (isCurrentPage(link) || isCurrentLocation(link)) {
                return true;
            }
        }

        return isAnyChildCurrent(child.children, root);
    });
}

function renderSiteUtilityLinks() {
    const headerContainer = document.querySelector('.site-header .container');
    const nav = document.querySelector('.site-nav');

    if (!headerContainer || !nav || document.querySelector('.site-utility')) {
        return;
    }

    const root = nav.querySelector('[data-site-menu]')?.dataset.navRoot || '.';
    const menuArea = document.createElement('div');
    menuArea.className = 'site-header-menu';

    const utilityNav = document.createElement('nav');
    utilityNav.className = 'site-utility';
    utilityNav.setAttribute('aria-label', siteLanguage === 'en' ? 'Utility menu' : '유틸리티 메뉴');

    const utilityList = document.createElement('ul');
    const fragment = document.createDocumentFragment();

    SITE_UTILITY_ITEMS.forEach(item => {
        const utilityItem = document.createElement('li');
        utilityItem.appendChild(createUtilityLink(item, root));
        fragment.appendChild(utilityItem);
    });

    utilityList.appendChild(fragment);
    utilityNav.appendChild(utilityList);

    headerContainer.insertBefore(menuArea, nav);
    menuArea.appendChild(utilityNav);
    menuArea.appendChild(nav);
}

function renderSiteNavigation() {
    const navList = document.querySelector('[data-site-menu]');

    if (!navList) {
        return;
    }

    const root = navList.dataset.navRoot || '.';
    const fragment = document.createDocumentFragment();

    SITE_NAV_ITEMS.forEach(item => {
        const menuItem = document.createElement('li');
        menuItem.className = 'has-sub';

        if (item.menuType === 'mega') {
            menuItem.classList.add('has-mega');
        }

        const topLink = createNavLink(item, root);
        topLink.setAttribute('aria-haspopup', 'true');
        topLink.setAttribute('aria-expanded', 'false');
        menuItem.appendChild(topLink);

        const subMenu = document.createElement('ul');
        subMenu.className = 'sub-menu';

        if (item.menuType === 'mega') {
            subMenu.classList.add('mega-menu');

            item.children.forEach(column => {
                const columnItem = document.createElement('li');
                columnItem.className = 'mega-menu-column';

                const columnTitle = document.createElement('span');
                columnTitle.className = 'mega-menu-title';
                columnTitle.textContent = localizedLabel(column.label);
                columnItem.appendChild(columnTitle);

                const columnList = document.createElement('ul');
                columnList.className = 'mega-menu-list';

                column.children.forEach(child => {
                    const childItem = document.createElement('li');
                    const childLink = createNavLink(child, root);

                    if (isCurrentPage(childLink) || isCurrentLocation(childLink)) {
                        childItem.classList.add('active');
                        columnItem.classList.add('active');
                        menuItem.classList.add('active');
                    }

                    childItem.appendChild(childLink);
                    columnList.appendChild(childItem);
                });

                columnItem.appendChild(columnList);
                subMenu.appendChild(columnItem);
            });

            if (isAnyChildCurrent(item.children, root)) {
                menuItem.classList.add('active');
            }

            menuItem.appendChild(subMenu);
            fragment.appendChild(menuItem);
            return;
        }

        item.children.forEach(child => {
            const subMenuItem = document.createElement('li');
            const childLink = createNavLink(child, root);

            if (isCurrentPage(childLink)) {
                subMenuItem.classList.add('active');
                menuItem.classList.add('active');
            }

            subMenuItem.appendChild(childLink);

            if (child.children) {
                const nestedMenu = document.createElement('ul');
                nestedMenu.className = 'sub-menu-depth';

                child.children.forEach(nestedChild => {
                    const nestedMenuItem = document.createElement('li');
                    const nestedLink = createNavLink(nestedChild, root);

                    if (isCurrentLocation(nestedLink)) {
                        nestedMenuItem.classList.add('active');
                        subMenuItem.classList.add('active');
                        menuItem.classList.add('active');
                    }

                    nestedMenuItem.appendChild(nestedLink);
                    nestedMenu.appendChild(nestedMenuItem);
                });

                subMenuItem.appendChild(nestedMenu);
            }

            subMenu.appendChild(subMenuItem);
        });

        menuItem.appendChild(subMenu);
        fragment.appendChild(menuItem);
    });

    navList.replaceChildren(fragment);
}

function setupTouchNavigation() {
    const nav = document.querySelector('.site-nav');

    if (!nav) {
        return;
    }

    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)');

    function closeOpenMenus(exceptItem = null) {
        nav.querySelectorAll('.has-sub.is-open').forEach(item => {
            if (item === exceptItem) {
                return;
            }

            item.classList.remove('is-open');
            item.firstElementChild?.setAttribute('aria-expanded', 'false');
        });
    }

    nav.addEventListener('click', event => {
        if (canHover.matches) {
            return;
        }

        const link = event.target.closest('a');

        if (!link || !nav.contains(link)) {
            return;
        }

        const menuItem = link.parentElement;

        if (!menuItem?.classList.contains('has-sub') || menuItem.firstElementChild !== link) {
            return;
        }

        if (!menuItem.classList.contains('is-open')) {
            event.preventDefault();
            closeOpenMenus(menuItem);
            menuItem.classList.add('is-open');
            link.setAttribute('aria-expanded', 'true');
            return;
        }

        closeOpenMenus(menuItem);
    });

    document.addEventListener('click', event => {
        if (!nav.contains(event.target)) {
            closeOpenMenus();
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            closeOpenMenus();
        }
    });

    function handleHoverChange() {
        if (canHover.matches) {
            closeOpenMenus();
        }
    }

    if (canHover.addEventListener) {
        canHover.addEventListener('change', handleHoverChange);
    } else {
        canHover.addListener(handleHoverChange);
    }
}

function appendSitemapLinks(list, children, root) {
    children.forEach(child => {
        if (child.href) {
            const item = document.createElement('li');
            item.appendChild(createNavLink(child, root));
            list.appendChild(item);
        }

        if (child.children) {
            appendSitemapLinks(list, child.children, root);
        }
    });
}

function renderSitemap() {
    const sitemap = document.querySelector('[data-site-map]');

    if (!sitemap) {
        return;
    }

    const root = sitemap.dataset.navRoot || '.';
    const fragment = document.createDocumentFragment();

    SITE_NAV_ITEMS.forEach(item => {
        const section = document.createElement('section');
        section.className = 'sitemap-section';

        const title = document.createElement('h3');
        const titleLink = createNavLink(item, root);
        titleLink.textContent = localizedLabel(item.label);
        title.appendChild(titleLink);
        section.appendChild(title);

        const grid = document.createElement('div');
        grid.className = 'sitemap-grid';

        if (item.menuType === 'mega') {
            item.children.forEach(column => {
                const group = document.createElement('div');
                group.className = 'sitemap-group';

                const groupTitle = document.createElement('h4');
                groupTitle.textContent = localizedLabel(column.label);
                group.appendChild(groupTitle);

                const list = document.createElement('ul');
                appendSitemapLinks(list, column.children, root);
                group.appendChild(list);
                grid.appendChild(group);
            });
        } else {
            item.children.forEach(child => {
                const group = document.createElement('div');
                group.className = 'sitemap-group';

                const groupTitle = document.createElement('h4');
                groupTitle.appendChild(createNavLink(child, root));
                group.appendChild(groupTitle);

                if (child.children) {
                    const list = document.createElement('ul');
                    appendSitemapLinks(list, child.children, root);
                    group.appendChild(list);
                }

                grid.appendChild(group);
            });
        }

        section.appendChild(grid);
        fragment.appendChild(section);
    });

    sitemap.replaceChildren(fragment);
}

function setupCardCarousels() {
    document.querySelectorAll('[data-card-carousel]').forEach(carousel => {
        const track = carousel.querySelector('[data-carousel-track]');
        const previousButton = carousel.querySelector('[data-carousel-prev]');
        const nextButton = carousel.querySelector('[data-carousel-next]');
        const currentLabel = carousel.querySelector('[data-carousel-current]');

        if (!track || !previousButton || !nextButton) {
            return;
        }

        const cards = Array.from(track.querySelectorAll('.portal-carousel-card'));

        if (!cards.length) {
            return;
        }

        function getCurrentIndex() {
            const trackLeft = track.getBoundingClientRect().left;
            let closestIndex = 0;
            let closestDistance = Number.POSITIVE_INFINITY;

            cards.forEach((card, index) => {
                const distance = Math.abs(card.getBoundingClientRect().left - trackLeft);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            });

            return closestIndex;
        }

        function updateCarouselState() {
            const maximumScroll = Math.max(0, track.scrollWidth - track.clientWidth);
            const currentIndex = getCurrentIndex();

            previousButton.disabled = track.scrollLeft <= 4;
            nextButton.disabled = track.scrollLeft >= maximumScroll - 4;

            if (currentLabel) {
                currentLabel.textContent = String(currentIndex + 1).padStart(2, '0');
            }
        }

        function moveCarousel(direction) {
            const firstCard = cards[0];
            const trackStyles = window.getComputedStyle(track);
            const gap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap) || 0;
            const distance = firstCard.getBoundingClientRect().width + gap;

            track.scrollBy({ left: direction * distance, behavior: 'smooth' });
        }

        previousButton.addEventListener('click', () => moveCarousel(-1));
        nextButton.addEventListener('click', () => moveCarousel(1));

        track.addEventListener('keydown', event => {
            if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
                return;
            }

            event.preventDefault();
            moveCarousel(event.key === 'ArrowLeft' ? -1 : 1);
        });

        let updateFrame = 0;

        track.addEventListener('scroll', () => {
            window.cancelAnimationFrame(updateFrame);
            updateFrame = window.requestAnimationFrame(updateCarouselState);
        }, { passive: true });

        window.addEventListener('resize', updateCarouselState);
        updateCarouselState();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderSiteUtilityLinks();
    renderSiteNavigation();
    setupTouchNavigation();
    setupCardCarousels();
    renderSitemap();
    translateStaticContent();
    observeTranslatedContent();

    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabCons = document.querySelectorAll('.tab-con');

    function activateTab(targetId, group = null) {
        const targetContent = document.getElementById(targetId);

        if (!targetContent) {
            return;
        }

        const groupSelector = group ? `[data-tab-group="${group}"]` : '';
        const targetButton = document.querySelector(`.tab-btn${groupSelector}[data-tab="${targetId}"]`);
        const scopedButtons = group ? document.querySelectorAll(`.tab-btn${groupSelector}`) : tabBtns;
        const scopedContents = group ? document.querySelectorAll(`.tab-con${groupSelector}`) : tabCons;

        scopedButtons.forEach(b => b.classList.remove('active'));
        scopedContents.forEach(c => c.classList.remove('active'));

        if (targetButton) {
            targetButton.classList.add('active');
        }

        targetContent.classList.add('active');
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-tab');
            activateTab(targetId, btn.dataset.tabGroup || null);
        });
    });

    if (window.location.hash) {
        const targetId = window.location.hash.slice(1);
        const targetButton = document.querySelector(`.tab-btn[data-tab="${targetId}"]`);
        activateTab(targetId, targetButton?.dataset.tabGroup || null);
    }

    window.addEventListener('hashchange', () => {
        const targetId = window.location.hash.slice(1);
        const targetButton = document.querySelector(`.tab-btn[data-tab="${targetId}"]`);
        activateTab(targetId, targetButton?.dataset.tabGroup || null);
    });
});
