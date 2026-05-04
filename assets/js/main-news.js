async function loadMainNews() {
    try {
        const response = await fetch('data/news/list.json');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const allData = await response.json();
        const top4 = allData.slice(0, 4);
        const listElement = document.getElementById('main-press-list');

        if (!listElement) {
            return;
        }

        listElement.innerHTML = top4.map(item => {
            const [year, month, day] = item.date.split('.');

            return `
                <li class="news-item">
                    <a href="${escapeMainNewsHtml(getMainNewsHref(item.link))}" ${getMainNewsLinkAttrs(item.link)}>
                        <div class="item-date">
                            <span class="day">${escapeMainNewsHtml(day)}</span>
                            <span class="year-month">${escapeMainNewsHtml(year)}-${escapeMainNewsHtml(month)}</span>
                        </div>
                        <h3 class="item-subject">${escapeMainNewsHtml(item.title)}</h3>
                        <div class="item-view">VIEW <span class="long-arrow">——→</span></div>
                    </a>
                </li>
            `;
        }).join('');
    } catch (error) {
        console.error('메인 언론보도 로드 실패:', error);
    }
}

function escapeMainNewsHtml(value = '') {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function getMainNewsLinkAttrs(link) {
    return /^https?:\/\//.test(link) ? 'target="_blank" rel="noopener noreferrer"' : '';
}

function getMainNewsHref(link) {
    if (/^https?:\/\//.test(link)) {
        return link;
    }

    return `pages/community/${link}`;
}

document.addEventListener('DOMContentLoaded', loadMainNews);
