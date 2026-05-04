const itemsPerPage = 5;
let currentPage = 1;
let allData = [];

function getDisplayTitle(title) {
    return title.replace(/^\[[^\]]+\]\s*/, '').trim();
}

async function loadNoticeData() {
    try {
        const response = await fetch('../../data/notice/list.json');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        allData = await response.json();
        document.getElementById('total-count').innerText = allData.length;

        renderNoticeTable();
    } catch (error) {
        console.error('데이터 로드 실패:', error);
        document.getElementById('notice-list').innerHTML = '<tr><td colspan="3" class="community-board-empty">데이터를 불러오지 못했습니다.</td></tr>';
    }
}

function renderNoticeTable() {
    const listElement = document.getElementById('notice-list');

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pagedData = allData.slice(startIndex, endIndex);

    if (pagedData.length === 0) {
        listElement.innerHTML = '<tr><td colspan="3" class="community-board-empty">등록된 게시물이 없습니다.</td></tr>';
        return;
    }

    listElement.innerHTML = pagedData.map(item => `
        <tr class="notice-item">
            <td class="notice-number">${item.id}</td>
            <td class="notice-title-cell">
                <a href="${item.link}">
                    <span>${getDisplayTitle(item.title)}</span>
                </a>
            </td>
            <td class="notice-date">${item.date}</td>
        </tr>
    `).join('');

    renderPagination();
}

function renderPagination() {
    const totalPages = Math.ceil(allData.length / itemsPerPage);
    const wrap = document.getElementById('pagination-wrap');
    if (totalPages <= 1) {
        wrap.innerHTML = '';
        return;
    }

    let paginationHtml = `<button type="button" onclick="movePage(${currentPage - 1})" aria-label="이전 페이지">&laquo;</button>`;

    for (let i = 1; i <= totalPages; i++) {
        const isActive = i === currentPage;
        paginationHtml += `
            <button type="button" onclick="movePage(${i})" class="${isActive ? 'active' : ''}" ${isActive ? 'aria-current="page"' : ''}>
                ${i}
            </button>`;
    }

    paginationHtml += `<button type="button" onclick="movePage(${currentPage + 1})" aria-label="다음 페이지">&raquo;</button>`;

    wrap.innerHTML = paginationHtml;
}

window.movePage = function(page) {
    const totalPages = Math.ceil(allData.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;

    currentPage = page;
    renderNoticeTable();
    document.querySelector('.community-board-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

loadNoticeData();
