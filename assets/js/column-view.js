const columnPostElement = document.getElementById('column-post');
const columnRepoRoot = '../..';
const columnSiteUrl = 'https://defense.jbnu.ac.kr';

function escapeColumnViewHtml(value = '') {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function resolveColumnAssetPath(path = '') {
    if (!path) {
        return '';
    }

    if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) {
        return path;
    }

    return `${columnRepoRoot}/${path.replace(/^\/+/, '')}`;
}

function renderColumnParagraphs(content) {
    const paragraphs = Array.isArray(content) ? content : [content].filter(Boolean);

    return paragraphs
        .map(paragraph => `<p>${escapeColumnViewHtml(paragraph).replace(/\n/g, '<br>')}</p>`)
        .join('');
}

function renderColumnDetails(details) {
    if (!details) {
        return '';
    }

    const entries = Array.isArray(details)
        ? details
        : Object.entries(details).map(([label, value]) => ({ label, value }));

    if (entries.length === 0) {
        return '';
    }

    return `
        <div class="community-post-details">
            <strong>[칼럼 정보]</strong>
            <ul>
                ${entries.map(item => `
                    <li>
                        <span>${escapeColumnViewHtml(item.label)}:</span>
                        ${escapeColumnViewHtml(item.value)}
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
}

function renderColumnExternalLink(post) {
    const href = post.url || (/^https?:\/\//.test(post.link || '') ? post.link : '');

    if (!href) {
        return '';
    }

    return `
        <a class="community-post-link" href="${escapeColumnViewHtml(href)}" target="_blank" rel="noopener noreferrer">
            원문 바로가기
        </a>
    `;
}

function getColumnDescription(post) {
    const content = Array.isArray(post.summary || post.content)
        ? (post.summary || post.content).join(' ')
        : (post.summary || post.content || '');

    return String(content).replace(/\s+/g, ' ').trim().slice(0, 150)
        || '전북대학교 K-방위산업연구소 기고·칼럼 상세 내용입니다.';
}

function setColumnMeta(selector, attribute, value) {
    const element = document.querySelector(selector);

    if (element) {
        element.setAttribute(attribute, value);
    }
}

function updateColumnSeo(post) {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('post') || '';
    const url = `${columnSiteUrl}/pages/community/column-view.html?post=${encodeURIComponent(postId)}`;
    const title = `${post.title} | 전북대학교 K-방위산업연구소`;
    const description = getColumnDescription(post);

    document.title = title;
    setColumnMeta('meta[name="description"]', 'content', description);
    setColumnMeta('link[rel="canonical"]', 'href', url);
    setColumnMeta('meta[property="og:title"]', 'content', title);
    setColumnMeta('meta[property="og:description"]', 'content', description);
    setColumnMeta('meta[property="og:url"]', 'content', url);
    setColumnMeta('meta[property="og:type"]', 'content', 'article');
    setColumnMeta('meta[name="twitter:title"]', 'content', title);
    setColumnMeta('meta[name="twitter:description"]', 'content', description);

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description,
        datePublished: post.date || undefined,
        author: post.author ? { '@type': 'Person', name: post.author } : undefined,
        url,
        inLanguage: 'ko-KR',
        publisher: {
            '@type': 'Organization',
            name: '전북대학교 K-방위산업연구소',
            url: columnSiteUrl,
        },
    };
    let schema = document.getElementById('dynamic-post-jsonld');

    if (!schema) {
        schema = document.createElement('script');
        schema.type = 'application/ld+json';
        schema.id = 'dynamic-post-jsonld';
        document.head.appendChild(schema);
    }

    schema.textContent = JSON.stringify(articleSchema);
}

function renderColumnPost(post) {
    const image = post.image ? `
        <figure class="community-post-image">
            <img src="${escapeColumnViewHtml(resolveColumnAssetPath(post.image))}" alt="${escapeColumnViewHtml(post.imageAlt || post.title || '기고·칼럼 이미지')}">
        </figure>
    ` : '';

    columnPostElement.innerHTML = `
        <header class="community-post-header">
            <h3>${escapeColumnViewHtml(post.title)}</h3>
            <div class="community-post-meta">
                <span><strong>작성일:</strong> ${escapeColumnViewHtml(post.date || '')}</span>
                ${post.author ? `<span><strong>필자:</strong> ${escapeColumnViewHtml(post.author)}</span>` : ''}
                ${post.source ? `<span><strong>매체:</strong> ${escapeColumnViewHtml(post.source)}</span>` : ''}
            </div>
        </header>

        <div class="community-post-body">
            ${image}
            ${renderColumnParagraphs(post.content || post.summary)}
            ${renderColumnDetails(post.details)}
            ${renderColumnParagraphs(post.closing)}
        </div>

        <footer class="community-post-actions">
            ${renderColumnExternalLink(post)}
            <a class="community-post-back" href="column.html">목록으로 돌아가기</a>
        </footer>
    `;

    updateColumnSeo(post);
}

async function loadColumnPost() {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('post');

    if (!postId || !/^[a-zA-Z0-9_-]+$/.test(postId)) {
        columnPostElement.innerHTML = '<p class="community-board-empty">게시글을 찾을 수 없습니다.</p>';
        return;
    }

    try {
        const response = await fetch(`${columnRepoRoot}/data/column/${postId}.json`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const post = await response.json();
        renderColumnPost(post);
    } catch (error) {
        console.error('기고·칼럼 상세 로드 실패:', error);
        columnPostElement.innerHTML = `
            <p class="community-board-empty">게시글을 불러오지 못했습니다.</p>
            <footer class="community-post-actions">
                <a class="community-post-back" href="column.html">목록으로 돌아가기</a>
            </footer>
        `;
    }
}

loadColumnPost();
