const SITE_NAV_ITEMS = [
    {
        label: '연구소 소개',
        href: 'pages/about/intro.html',
        children: [
            { label: '연구소 소개', href: 'pages/about/intro.html' },
            { label: '인사말 / 조직도', href: 'pages/about/org.html' },
            { label: '찾아오시는 길', href: 'pages/about/location.html' },
        ],
    },
    {
        label: '교육 프로그램',
        href: 'pages/major/advanced.html',
        menuType: 'mega',
        children: [
            {
                label: '학부',
                children: [
                    { label: '첨단방위산업학과', href: 'pages/major/advanced.html' },
                    { label: '방위산업융합전공', href: 'pages/major/convergence.html' },
                ],
            },
            {
                label: '대학원',
                children: [
                    { label: '첨단방산AI융합대학원', href: 'pages/major/graduate.html' },
                    { label: '계약정원제', href: 'pages/major/contract_grad.html' },
                ],
            },
            {
                label: '프로그램',
                children: [
                    { label: 'AI 부트캠프', href: 'pages/program/intro.html' },
                    { label: '인턴십', href: 'pages/program/apply.html' },
                ],
            },
        ],
    },
    {
        label: '연구 분야',
        href: 'pages/research/fields.html',
        children: [
            { label: '첨단방위산업학과', href: 'pages/research/fields.html#research-department' },
            { label: '공과대학 및 타 학과', href: 'pages/research/fields.html#research-college' },
            { label: '외부 협력', href: 'pages/research/fields.html#research-external' },
        ],
    },
    {
        label: '산학협력',
        href: 'pages/research/cluster.html',
        children: [
            { label: '방산 클러스터', href: 'pages/research/cluster.html' },
            { label: '협력기업', href: 'pages/research/partners.html' },
            { label: '산학연 공동연구', href: 'pages/research/joint.html' },
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
    {
        label: '커뮤니티',
        href: 'pages/community/notice.html',
        children: [
            { label: '공지사항', href: 'pages/community/notice.html' },
            { label: '언론보도', href: 'pages/community/news.html' },
            { label: '기고·칼럼', href: 'pages/community/column.html' },
            { label: '갤러리', href: 'pages/community/gallery.html' },
        ],
    },
];

const SITE_UTILITY_ITEMS = [
    { label: 'HOME', href: 'index.html', icon: 'home' },
    { label: 'SITEMAP', href: 'sitemap.html', icon: 'sitemap' },
    { label: 'ENGLISH', href: '', icon: 'english', disabled: true },
    { label: 'YouTube', href: '', icon: 'youtube', disabled: true, isIconOnly: true },
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
    element.textContent = item.label;

    if (item.isIconOnly) {
        element.setAttribute('aria-label', item.label);
    }

    if (item.disabled) {
        element.setAttribute('aria-disabled', 'true');
        element.title = '추후 제공 예정';
        return element;
    }

    element.href = buildRootedHref(root, item.href);
    return element;
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
    utilityNav.setAttribute('aria-label', '유틸리티 메뉴');

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
                columnTitle.textContent = column.label;
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
        titleLink.textContent = item.label;
        title.appendChild(titleLink);
        section.appendChild(title);

        const grid = document.createElement('div');
        grid.className = 'sitemap-grid';

        if (item.menuType === 'mega') {
            item.children.forEach(column => {
                const group = document.createElement('div');
                group.className = 'sitemap-group';

                const groupTitle = document.createElement('h4');
                groupTitle.textContent = column.label;
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

document.addEventListener('DOMContentLoaded', () => {
    renderSiteUtilityLinks();
    renderSiteNavigation();
    setupTouchNavigation();
    renderSitemap();

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
