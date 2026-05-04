async function loadMainColumns() {
    try {
        const response = await fetch('data/column/list.json');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const allData = await response.json();
        const top4 = allData.slice(0, 4);
        const listElement = document.getElementById('main-column-list');

        if (!listElement) {
            return;
        }

        if (top4.length === 0) {
            listElement.innerHTML = '<li style="padding: 50px; text-align: center; color: #999;">등록된 기고·칼럼이 없습니다.</li>';
            return;
        }

        listElement.innerHTML = top4.map(item => {
            const [year, month, day] = item.date.split('.');

            return `
                <li class="news-item">
                    <a href="${escapeMainColumnHtml(getMainColumnHref(item.link))}" ${getMainColumnLinkAttrs(item.link)}>
                        <div class="item-date">
                            <span class="day">${escapeMainColumnHtml(day)}</span>
                            <span class="year-month">${escapeMainColumnHtml(year)}-${escapeMainColumnHtml(month)}</span>
                        </div>
                        <h3 class="item-subject">${escapeMainColumnHtml(item.title)}</h3>
                        <div class="item-view">VIEW <span class="long-arrow">——→</span></div>
                    </a>
                </li>
            `;
        }).join('');
    } catch (error) {
        console.error('메인 기고·칼럼 로드 실패:', error);
    }
}

function escapeMainColumnHtml(value = '') {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function getMainColumnLinkAttrs(link) {
    return /^https?:\/\//.test(link) ? 'target="_blank" rel="noopener noreferrer"' : '';
}

function getMainColumnHref(link) {
    if (/^https?:\/\//.test(link)) {
        return link;
    }

    return `pages/community/${link}`;
}

document.addEventListener('DOMContentLoaded', loadMainColumns);
