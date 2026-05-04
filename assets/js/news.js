const newsItemsPerPage = 5;
let currentNewsPage = 1;
let allNewsData = [];

function escapeNewsHtml(value = '') {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

async function loadNewsData() {
    try {
        const response = await fetch('../../data/news/list.json');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        allNewsData = await response.json();
        document.getElementById('total-count').innerText = allNewsData.length;

        renderNewsTable();
    } catch (error) {
        console.error('언론보도 데이터 로드 실패:', error);
        document.getElementById('news-list').innerHTML = '<tr><td colspan="4" class="community-board-empty">데이터를 불러오지 못했습니다.</td></tr>';
    }
}

function renderNewsTable() {
    const listElement = document.getElementById('news-list');
    const startIndex = (currentNewsPage - 1) * newsItemsPerPage;
    const endIndex = startIndex + newsItemsPerPage;
    const pagedData = allNewsData.slice(startIndex, endIndex);

    if (pagedData.length === 0) {
        listElement.innerHTML = '<tr><td colspan="4" class="community-board-empty">등록된 언론보도가 없습니다.</td></tr>';
        return;
    }

    listElement.innerHTML = pagedData.map(item => `
        <tr class="notice-item">
            <td class="notice-number">${item.id}</td>
            <td class="notice-title-cell">
                <a href="${escapeNewsHtml(item.link)}" ${getNewsLinkAttrs(item.link)}>
                    <span>${escapeNewsHtml(item.title)}</span>
                </a>
            </td>
            <td class="notice-source">${escapeNewsHtml(item.source || '-')}</td>
            <td class="notice-date">${escapeNewsHtml(item.date)}</td>
        </tr>
    `).join('');

    renderNewsPagination();
}

function getNewsLinkAttrs(link) {
    return /^https?:\/\//.test(link) ? 'target="_blank" rel="noopener noreferrer"' : '';
}

function renderNewsPagination() {
    const totalPages = Math.ceil(allNewsData.length / newsItemsPerPage);
    const wrap = document.getElementById('pagination-wrap');
    if (totalPages <= 1) {
        wrap.innerHTML = '';
        return;
    }

    let paginationHtml = `<button type="button" onclick="moveNewsPage(${currentNewsPage - 1})" aria-label="이전 페이지">&laquo;</button>`;

    for (let i = 1; i <= totalPages; i++) {
        const isActive = i === currentNewsPage;
        paginationHtml += `
            <button type="button" onclick="moveNewsPage(${i})" class="${isActive ? 'active' : ''}" ${isActive ? 'aria-current="page"' : ''}>
                ${i}
            </button>`;
    }

    paginationHtml += `<button type="button" onclick="moveNewsPage(${currentNewsPage + 1})" aria-label="다음 페이지">&raquo;</button>`;

    wrap.innerHTML = paginationHtml;
}

window.moveNewsPage = function(page) {
    const totalPages = Math.ceil(allNewsData.length / newsItemsPerPage);
    if (page < 1 || page > totalPages) return;

    currentNewsPage = page;
    renderNewsTable();
    document.querySelector('.community-board-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

loadNewsData();
