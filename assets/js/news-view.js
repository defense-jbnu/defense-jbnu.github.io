const newsPostElement = document.getElementById('news-post');
const newsRepoRoot = '../..';
const newsSiteUrl = 'https://defense.jbnu.ac.kr';

function escapeNewsViewHtml(value = '') {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function resolveNewsAssetPath(path = '') {
    if (!path) {
        return '';
    }

    if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) {
        return path;
    }

    return `${newsRepoRoot}/${path.replace(/^\/+/, '')}`;
}

function renderNewsParagraphs(content) {
    const paragraphs = Array.isArray(content) ? content : [content].filter(Boolean);

    return paragraphs
        .map(paragraph => `<p>${escapeNewsViewHtml(paragraph).replace(/\n/g, '<br>')}</p>`)
        .join('');
}

function renderNewsDetails(details) {
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
            <strong>[보도 정보]</strong>
            <ul>
                ${entries.map(item => `
                    <li>
                        <span>${escapeNewsViewHtml(item.label)}:</span>
                        ${escapeNewsViewHtml(item.value)}
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
}

function renderNewsExternalLink(post) {
    const href = post.url || (/^https?:\/\//.test(post.link || '') ? post.link : '');

    if (!href) {
        return '';
    }

    return `
        <a class="community-post-link" href="${escapeNewsViewHtml(href)}" target="_blank" rel="noopener noreferrer">
            원문 기사 바로가기
        </a>
    `;
}

function getNewsDescription(post) {
    const content = Array.isArray(post.summary || post.content)
        ? (post.summary || post.content).join(' ')
        : (post.summary || post.content || '');

    return String(content).replace(/\s+/g, ' ').trim().slice(0, 150)
        || '전북대학교 K-방위산업연구소 언론보도 상세 내용입니다.';
}

function setNewsMeta(selector, attribute, value) {
    const element = document.querySelector(selector);

    if (element) {
        element.setAttribute(attribute, value);
    }
}

function updateNewsSeo(post) {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('post') || '';
    const url = `${newsSiteUrl}/pages/community/news-view.html?post=${encodeURIComponent(postId)}`;
    const title = `${post.title} | 전북대학교 K-방위산업연구소`;
    const description = getNewsDescription(post);

    document.title = title;
    setNewsMeta('meta[name="description"]', 'content', description);
    setNewsMeta('link[rel="canonical"]', 'href', url);
    setNewsMeta('meta[property="og:title"]', 'content', title);
    setNewsMeta('meta[property="og:description"]', 'content', description);
    setNewsMeta('meta[property="og:url"]', 'content', url);
    setNewsMeta('meta[property="og:type"]', 'content', 'article');
    setNewsMeta('meta[name="twitter:title"]', 'content', title);
    setNewsMeta('meta[name="twitter:description"]', 'content', description);

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: post.title,
        description,
        datePublished: post.date || undefined,
        url,
        inLanguage: 'ko-KR',
        publisher: {
            '@type': 'Organization',
            name: '전북대학교 K-방위산업연구소',
            url: newsSiteUrl,
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

function renderNewsPost(post) {
    const image = post.image ? `
        <figure class="community-post-image">
            <img src="${escapeNewsViewHtml(resolveNewsAssetPath(post.image))}" alt="${escapeNewsViewHtml(post.imageAlt || post.title || '언론보도 이미지')}">
        </figure>
    ` : '';

    newsPostElement.innerHTML = `
        <header class="community-post-header">
            <h3>${escapeNewsViewHtml(post.title)}</h3>
            <div class="community-post-meta">
                <span><strong>보도일:</strong> ${escapeNewsViewHtml(post.date || '')}</span>
                ${post.source ? `<span><strong>매체:</strong> ${escapeNewsViewHtml(post.source)}</span>` : ''}
            </div>
        </header>

        <div class="community-post-body">
            ${image}
            ${renderNewsParagraphs(post.content || post.summary)}
            ${renderNewsDetails(post.details)}
            ${renderNewsParagraphs(post.closing)}
        </div>

        <footer class="community-post-actions">
            ${renderNewsExternalLink(post)}
            <a class="community-post-back" href="news.html">목록으로 돌아가기</a>
        </footer>
    `;

    updateNewsSeo(post);
}

async function loadNewsPost() {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('post');

    if (!postId || !/^[a-zA-Z0-9_-]+$/.test(postId)) {
        newsPostElement.innerHTML = '<p class="community-board-empty">게시글을 찾을 수 없습니다.</p>';
        return;
    }

    try {
        const response = await fetch(`${newsRepoRoot}/data/news/${postId}.json`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const post = await response.json();
        renderNewsPost(post);
    } catch (error) {
        console.error('언론보도 상세 로드 실패:', error);
        newsPostElement.innerHTML = `
            <p class="community-board-empty">게시글을 불러오지 못했습니다.</p>
            <footer class="community-post-actions">
                <a class="community-post-back" href="news.html">목록으로 돌아가기</a>
            </footer>
        `;
    }
}

loadNewsPost();
