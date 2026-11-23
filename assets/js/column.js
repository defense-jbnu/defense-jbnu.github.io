const columnItemsPerPage = 5;
let currentColumnPage = 1;
let allColumnData = [];

function escapeColumnHtml(value = '') {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

async function loadColumnData() {
    try {
        const response = await fetch('../../data/column/list.json');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        allColumnData = await response.json();
        document.getElementById('total-count').innerText = allColumnData.length;

        renderColumnTable();
    } catch (error) {
        console.error('기고·칼럼 데이터 로드 실패:', error);
        document.getElementById('column-list').innerHTML = '<tr><td colspan="4" class="community-board-empty">데이터를 불러오지 못했습니다.</td></tr>';
    }
}

function renderColumnTable() {
    const listElement = document.getElementById('column-list');
    const startIndex = (currentColumnPage - 1) * columnItemsPerPage;
    const endIndex = startIndex + columnItemsPerPage;
    const pagedData = allColumnData.slice(startIndex, endIndex);

    if (pagedData.length === 0) {
        listElement.innerHTML = '<tr><td colspan="4" class="community-board-empty">등록된 기고·칼럼이 없습니다.</td></tr>';
        return;
    }

    listElement.innerHTML = pagedData.map((item, index) => {
        const displayNumber = allColumnData.length - (startIndex + index);

        return `
            <tr class="notice-item">
                <td class="notice-number">${displayNumber}</td>
                <td class="notice-title-cell">
                    <a href="${escapeColumnHtml(item.link)}" ${getColumnLinkAttrs(item.link)}>
                        <span>${escapeColumnHtml(item.title)}</span>
                    </a>
                </td>
                <td class="notice-author">${escapeColumnHtml(item.author || '-')}</td>
                <td class="notice-date">${escapeColumnHtml(item.date)}</td>
            </tr>
        `;
    }).join('');

    renderColumnPagination();
}

function getColumnLinkAttrs(link) {
    return /^https?:\/\//.test(link) ? 'target="_blank" rel="noopener noreferrer"' : '';
}

function renderColumnPagination() {
    const totalPages = Math.ceil(allColumnData.length / columnItemsPerPage);
    const wrap = document.getElementById('pagination-wrap');
    if (totalPages <= 1) {
        wrap.innerHTML = '';
        return;
    }

    const groupSize = 10;
    const groupStart = Math.floor((currentColumnPage - 1) / groupSize) * groupSize + 1;
    const groupEnd = Math.min(groupStart + groupSize - 1, totalPages);
    const navigationButton = (page, label, symbol) => {
        const disabled = page < 1 || page > totalPages;
        return `<button type="button" class="pagination-nav" ${disabled ? 'disabled' : `onclick="moveColumnPage(${page})"`} aria-label="${label}" title="${label}">${symbol}</button>`;
    };

    let paginationHtml = navigationButton(groupStart - groupSize, '이전 10개 페이지', '&laquo;');
    paginationHtml += navigationButton(currentColumnPage - 1, '이전 페이지', '&lsaquo;');
    paginationHtml += '<span class="community-pagination-pages">';

    for (let i = groupStart; i <= groupEnd; i++) {
        const isActive = i === currentColumnPage;
        paginationHtml += `
            <button type="button" onclick="moveColumnPage(${i})" class="${isActive ? 'active' : ''}" ${isActive ? 'aria-current="page"' : ''}>
                ${i}
            </button>`;
    }

    paginationHtml += '</span>';
    paginationHtml += navigationButton(currentColumnPage + 1, '다음 페이지', '&rsaquo;');
    paginationHtml += navigationButton(groupStart + groupSize, '다음 10개 페이지', '&raquo;');

    wrap.innerHTML = paginationHtml;
}

window.moveColumnPage = function(page) {
    const totalPages = Math.ceil(allColumnData.length / columnItemsPerPage);
    if (page < 1 || page > totalPages) return;

    currentColumnPage = page;
    renderColumnTable();
    document.querySelector('.community-board-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

loadColumnData();
