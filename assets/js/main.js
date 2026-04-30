const SITE_NAV_ITEMS = [
    {
        label: '전공안내',
        href: 'pages/major/advanced.html',
        children: [
            { label: '첨단방위산업학과', href: 'pages/major/advanced.html' },
            { label: '방위산업융합전공', href: 'pages/major/convergence.html' },
            { label: '첨단방산AI융합대학원', href: 'pages/major/graduate.html' },
        ],
    },
    {
        label: '교직원',
        href: 'pages/people/faculty.html',
        children: [
            {
                label: '교수',
                href: 'pages/people/faculty.html',
                children: [
                    { label: '전임', href: 'pages/people/faculty.html#full-time-faculty' },
                    { label: '비전임', href: 'pages/people/faculty.html#part-time-faculty' },
                ],
            },
            { label: '직원', href: 'pages/people/staff.html' },
        ],
    },
    {
        label: '학생 참여 프로그램',
        href: 'pages/program/intro.html',
        children: [
            { label: '프로그램 소개', href: 'pages/program/intro.html' },
            { label: '프로그램 신청', href: 'pages/program/apply.html' },
        ],
    },
    {
        label: '연구소소개',
        href: 'pages/about/intro.html',
        children: [
            { label: '국방산업연구소 소개', href: 'pages/about/intro.html' },
            { label: '인사말 / 조직도', href: 'pages/about/org.html' },
            { label: '찾아오시는 길', href: 'pages/about/location.html' },
        ],
    },
    {
        label: '연구 및 프로젝트',
        href: 'pages/research/cluster.html',
        children: [
            { label: '전북방산클러스터', href: 'pages/research/cluster.html' },
            { label: '산학연 공동연구', href: 'pages/research/joint.html' },
        ],
    },
    {
        label: '커뮤니티',
        href: 'pages/community/notice.html',
        children: [
            { label: '공지사항', href: 'pages/community/notice.html' },
            { label: '갤러리', href: 'pages/community/gallery.html' },
            { label: '언론보도 / 자료실', href: 'pages/community/news.html' },
        ],
    },
];

function buildRootedHref(root, href) {
    const normalizedRoot = root.replace(/\/$/, '');

    if (!normalizedRoot || normalizedRoot === '.') {
        return `./${href}`;
    }

    return `${normalizedRoot}/${href}`;
}

function createNavLink(item, root) {
    const link = document.createElement('a');
    link.href = buildRootedHref(root, item.href);
    link.textContent = item.label;
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

        const topLink = createNavLink(item, root);
        menuItem.appendChild(topLink);

        const subMenu = document.createElement('ul');
        subMenu.className = 'sub-menu';

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

document.addEventListener('DOMContentLoaded', () => {
    renderSiteNavigation();

    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabCons = document.querySelectorAll('.tab-con');

    function activateTab(targetId) {
        const targetContent = document.getElementById(targetId);

        if (!targetContent) {
            return;
        }

        const targetButton = document.querySelector(`.tab-btn[data-tab="${targetId}"]`);

        tabBtns.forEach(b => b.classList.remove('active'));
        tabCons.forEach(c => c.classList.remove('active'));

        if (targetButton) {
            targetButton.classList.add('active');
        }

        targetContent.classList.add('active');
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-tab');
            activateTab(targetId);
        });
    });

    if (window.location.hash) {
        activateTab(window.location.hash.slice(1));
    }

    window.addEventListener('hashchange', () => {
        activateTab(window.location.hash.slice(1));
    });
});
