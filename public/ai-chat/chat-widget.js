import { BLOG_HOME_URL, PORTFOLIO_HOME_URL, SYSTEM_PROMPT } from './persona.js';

const MODELS = [
  'Llama-3.2-3B-Instruct-q4f16_1-MLC',
  'Llama-3.2-1B-Instruct-q4f16_1-MLC',
];
const MAX_HISTORY_MESSAGES = 10;
const CDN_URL = 'https://esm.run/@mlc-ai/web-llm';

let engine = null;
let engineState = 'idle';
let history = [];
let elements;
let blogSources = [];
let blogSourcesPromise = null;
let portfolioSources = [];
let portfolioSourcesPromise = null;
let pendingExternalQuestion = null;
let guidedNavigationStarted = false;

function supportsGuideAnimation() {
  return window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)').matches
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function guideToPage(url, title) {
  if (guidedNavigationStarted) return;
  guidedNavigationStarted = true;
  if (!supportsGuideAnimation()) {
    window.location.assign(url);
    return;
  }
  document.querySelector('.ai-guide-character')?.remove();
  const guide = document.createElement('div');
  guide.className = 'ai-guide-character';
  guide.setAttribute('aria-hidden', 'true');
  const speech = document.createElement('span');
  speech.className = 'ai-guide-speech';
  speech.textContent = `${title} はこちらです`;
  const image = document.createElement('img');
  image.src = new URL('./images/taisei-guide.png', import.meta.url).href;
  image.alt = '';
  guide.append(speech, image);
  document.body.append(guide);
  window.requestAnimationFrame(() => guide.classList.add('ai-guide-character--walking'));
  window.setTimeout(() => { window.location.assign(url); }, 2150);
}

function injectStylesheet() {
  if (document.querySelector('link[data-ai-chat-styles]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = new URL('./chat-widget.css', import.meta.url).href;
  link.dataset.aiChatStyles = 'true';
  document.head.append(link);
}

function addMessage(role, text, extraClass = '') {
  const message = document.createElement('div');
  message.className = `ai-chat-message ai-chat-message--${role} ${extraClass}`.trim();
  message.textContent = text;
  elements.messages.append(message);
  elements.messages.scrollTop = elements.messages.scrollHeight;
  return message;
}

function setStatus(text, progress) {
  elements.statusText.textContent = text;
  const normalized = Number.isFinite(progress) ? Math.max(0, Math.min(100, progress)) : 0;
  elements.progressBar.style.width = `${normalized}%`;
  elements.progress.hidden = !Number.isFinite(progress);
}

function setInputEnabled(enabled) {
  elements.input.disabled = !enabled;
  elements.send.disabled = !enabled;
  if (enabled) elements.input.focus();
}

function normaliseText(value) {
  return value.toLowerCase().replace(/\s+/g, ' ').trim();
}

function questionTerms(question) {
  const compact = normaliseText(question).replace(/[、。！？!?「」『』（）()・,.]/g, '');
  const latinTerms = compact.match(/[a-z0-9][a-z0-9+.#_-]{1,}/g) || [];
  const japaneseBigrams = [];
  for (let index = 0; index < compact.length - 1; index += 1) {
    const term = compact.slice(index, index + 2);
    if (/^[ぁ-んァ-ヶ一-龠]/.test(term)) japaneseBigrams.push(term);
  }
  return [...new Set([...latinTerms, ...japaneseBigrams])].filter((term) => term.length > 1);
}

function textFragmentUrl(url, phrase) {
  const fragment = normaliseText(phrase).slice(0, 140);
  return fragment ? `${url}#:~:text=${encodeURIComponent(fragment)}` : url;
}

function pickSnippet(text, terms) {
  const sentences = text.split(/(?<=[。！？!?])\s*/).map((sentence) => sentence.trim()).filter(Boolean);
  return sentences.find((sentence) => terms.some((term) => normaliseText(sentence).includes(term))) || sentences[0] || '';
}

function allSources() {
  return [...portfolioSources, ...blogSources];
}

function findRelevantSource(question) {
  const terms = questionTerms(question);
  if (!terms.length || !allSources().length) return null;
  const ranked = allSources().map((source) => {
    const searchable = normaliseText(`${source.title} ${source.text}`);
    const score = terms.reduce((total, term) => total + (searchable.includes(term) ? (normaliseText(source.title).includes(term) ? 3 : 1) : 0), 0);
    return { ...source, score, snippet: pickSnippet(source.text, terms) };
  }).sort((a, b) => b.score - a.score);
  return ranked[0]?.score >= 2 ? ranked[0] : null;
}

function sourceContextFor(question) {
  const source = findRelevantSource(question);
  if (source) {
    return {
      source,
      context: `## ホームページに掲載されている情報\nページ名: ${source.title}\nURL: ${source.url}\n本文抜粋: ${source.snippet || source.text.slice(0, 1100)}\nこの情報だけを根拠に回答し、根拠にしたページ名を示してください。`,
    };
  }
  return { source: null, context: '' };
}

async function loadBlogSources() {
  if (blogSourcesPromise) return blogSourcesPromise;
  blogSourcesPromise = (async () => {
    try {
      const home = await fetch(BLOG_HOME_URL);
      if (!home.ok) throw new Error(`Blog index request failed: ${home.status}`);
      const homeDocument = new DOMParser().parseFromString(await home.text(), 'text/html');
      const links = [...homeDocument.querySelectorAll('.post-card h2 a, article h2 a, h2 a')]
        .map((link) => ({ title: normaliseText(link.textContent || ''), url: new URL(link.getAttribute('href') || '', BLOG_HOME_URL).href }))
        .filter((item) => item.title && item.url.startsWith(BLOG_HOME_URL))
        .filter((item, index, all) => all.findIndex((candidate) => candidate.url === item.url) === index)
        .slice(0, 8);
      const pages = await Promise.all(links.map(async (item) => {
        const response = await fetch(item.url);
        if (!response.ok) return null;
        const document = new DOMParser().parseFromString(await response.text(), 'text/html');
        document.querySelectorAll('script, style, nav, header, footer').forEach((node) => node.remove());
        const body = document.querySelector('article, main, .post-content') || document.body;
        return { ...item, text: normaliseText(body?.textContent || '').slice(0, 7000) };
      }));
      blogSources = pages.filter((item) => item?.text);
      console.info(`[Taisei AI chat] Loaded ${blogSources.length} blog sources.`);
    } catch (error) {
      console.warn('[Taisei AI chat] Blog sources could not be loaded.', error);
      blogSources = [];
    }
    return blogSources;
  })();
  return blogSourcesPromise;
}

async function loadPortfolioSources() {
  if (portfolioSourcesPromise) return portfolioSourcesPromise;
  portfolioSourcesPromise = (async () => {
    try {
      const rootResponse = await fetch(PORTFOLIO_HOME_URL);
      if (!rootResponse.ok) throw new Error(`Portfolio index request failed: ${rootResponse.status}`);
      const rootDocument = new DOMParser().parseFromString(await rootResponse.text(), 'text/html');
      const workUrls = [...rootDocument.querySelectorAll('a[href*="/works/"]')]
        .map((link) => new URL(link.getAttribute('href') || '', PORTFOLIO_HOME_URL).href)
        .filter((url) => url.startsWith(`${PORTFOLIO_HOME_URL}works/`) && url !== `${PORTFOLIO_HOME_URL}works/`)
        .filter((url, index, all) => all.indexOf(url) === index)
        .slice(0, 10);
      const urls = [...new Set([
        PORTFOLIO_HOME_URL,
        `${PORTFOLIO_HOME_URL}about/`,
        `${PORTFOLIO_HOME_URL}works/`,
        `${PORTFOLIO_HOME_URL}resources/`,
        `${PORTFOLIO_HOME_URL}contact/`,
        ...workUrls,
      ])];
      const pages = await Promise.all(urls.map(async (url) => {
        const response = url === PORTFOLIO_HOME_URL ? rootResponse : await fetch(url);
        if (!response.ok) return null;
        const document = url === PORTFOLIO_HOME_URL ? rootDocument : new DOMParser().parseFromString(await response.text(), 'text/html');
        document.querySelectorAll('script, style, nav, header, footer').forEach((node) => node.remove());
        const body = document.querySelector('main, article') || document.body;
        const title = normaliseText(document.querySelector('h1, h2')?.textContent || document.title || url);
        return { title, url, text: normaliseText(body?.textContent || '').slice(0, 7000) };
      }));
      portfolioSources = pages.filter((item) => item?.text);
      console.info(`[Taisei AI chat] Loaded ${portfolioSources.length} portfolio sources.`);
    } catch (error) {
      console.warn('[Taisei AI chat] Portfolio sources could not be loaded.', error);
      portfolioSources = [];
    }
    return portfolioSources;
  })();
  return portfolioSourcesPromise;
}

async function loadSiteSources() {
  await Promise.all([loadBlogSources(), loadPortfolioSources()]);
}

function confirmsExternalUse(text) {
  return /^(はい|うん|お願いします|使っていい|許可|ok|okay|yes)[。！!、\s]*$/i.test(text);
}

function rejectsExternalUse(text) {
  return /^(いいえ|いや|だめ|不要|使わない|no)[。！!、\s]*$/i.test(text);
}

function showFailure(error) {
  console.error('[Taisei AI chat] WebLLM error:', error);
  engineState = 'error';
  setInputEnabled(false);
  setStatus('モデルを準備できませんでした。通信状況または WebGPU の対応状況を確認してください。');
  const retry = document.createElement('button');
  retry.type = 'button';
  retry.className = 'ai-chat-retry';
  retry.textContent = 'もう一度試す';
  retry.addEventListener('click', () => {
    retry.remove();
    engine = null;
    engineState = 'idle';
    void ensureEngine();
  });
  elements.status.append(retry);
  addMessage('assistant', 'AI の準備中に問題が起きました。しばらくしてからもう一度お試しください。', 'ai-chat-message--error');
}

async function ensureEngine() {
  if (engineState === 'ready') return engine;
  if (engineState === 'loading') return null;
  engineState = 'loading';
  setInputEnabled(false);
  setStatus('AI モデルを読み込み中… 初回はダウンロードに時間がかかります。', 0);

  try {
    const webllm = await import(CDN_URL);
    let lastError;
    for (let index = 0; index < MODELS.length; index += 1) {
      const model = MODELS[index];
      try {
        setStatus(index === 0 ? 'AI モデルを読み込み中…' : '軽量モデルへ切り替えて読み込み中…', 0);
        engine = await webllm.CreateMLCEngine(model, {
          initProgressCallback: (report) => {
            const progress = typeof report.progress === 'number' ? report.progress * 100 : undefined;
            setStatus(report.text || 'AI モデルを読み込み中…', progress);
          },
        });
        engineState = 'ready';
        setStatus(`準備ができました（${index === 0 ? '標準' : '軽量'}モデル）。`);
        setInputEnabled(true);
        addMessage('assistant', 'こんにちは。ポートフォリオについて、気軽に聞いてください。');
        return engine;
      } catch (error) {
        lastError = error;
        console.warn(`[Taisei AI chat] ${model} could not be loaded.`, error);
      }
    }
    throw lastError || new Error('No compatible WebLLM model could be loaded.');
  } catch (error) {
    showFailure(error);
    return null;
  }
}

async function sendMessage() {
  const text = elements.input.value.trim();
  if (!text || engineState !== 'ready' || !engine) return;

  elements.input.value = '';
  setInputEnabled(false);
  addMessage('user', text);
  const replyElement = addMessage('assistant', '');
  await loadSiteSources();
  let question = text;
  let sourceInfo = sourceContextFor(question);
  let externalUseAllowed = false;

  if (pendingExternalQuestion) {
    if (confirmsExternalUse(text)) {
      question = pendingExternalQuestion;
      pendingExternalQuestion = null;
      externalUseAllowed = true;
    } else if (rejectsExternalUse(text)) {
      pendingExternalQuestion = null;
      replyElement.textContent = '承知しました。ホームページ内の情報だけでは回答できないため、この質問にはお答えしません。';
      setInputEnabled(true);
      return;
    } else {
      pendingExternalQuestion = null;
      sourceInfo = sourceContextFor(question);
    }
  }

  if (!externalUseAllowed && !sourceInfo.source) {
    pendingExternalQuestion = question;
    replyElement.textContent = 'この質問に答える根拠は、ポートフォリオと個人ブログの公開ページ内では見つかりませんでした。ホームページ外の一般知識を使ってよいですか？ 使用する場合、その情報はこのホームページを出典としません。';
    setInputEnabled(true);
    return;
  }

  if (externalUseAllowed) replyElement.textContent = '【出典：このホームページ外の一般知識】\n';
  const messages = [
    { role: 'system', content: [SYSTEM_PROMPT, sourceInfo.context, externalUseAllowed ? 'ユーザーからホームページ外の一般知識の利用を許可されました。回答の先頭に必ず「【出典：このホームページ外の一般知識】」を付けてください。' : ''].filter(Boolean).join('\n\n') },
    ...history.slice(-MAX_HISTORY_MESSAGES),
    { role: 'user', content: question },
  ];

  try {
    const chunks = await engine.chat.completions.create({
      messages,
      temperature: 0.7,
      max_tokens: 512,
      stream: true,
    });
    let reply = externalUseAllowed ? '【出典：このホームページ外の一般知識】\n' : '';
    for await (const chunk of chunks) {
      reply += chunk.choices[0]?.delta?.content || '';
      replyElement.textContent = reply;
      elements.messages.scrollTop = elements.messages.scrollHeight;
    }
    if (!reply) reply = '申し訳ありません。返答を生成できませんでした。もう一度お試しください。';
    replyElement.textContent = reply;
    history = [...history, { role: 'user', content: question }, { role: 'assistant', content: reply }].slice(-MAX_HISTORY_MESSAGES);
    const source = sourceInfo.source;
    if (source) {
      const link = document.createElement('a');
      link.className = 'ai-chat-source-link';
      link.href = textFragmentUrl(source.url, source.snippet);
      link.textContent = `関連するブログ記事を開く: ${source.title} ↗`;
      link.addEventListener('click', (event) => {
        event.preventDefault();
        console.info('[Taisei AI chat] Opening blog source:', source.url);
        guideToPage(link.href, source.title);
      });
      elements.messages.append(link);
      elements.messages.scrollTop = elements.messages.scrollHeight;
      if (/(ブログ|記事|投稿|掲載|書いて|どこ|詳しく|ページ)/.test(question)) {
        window.setTimeout(() => { guideToPage(link.href, source.title); }, 900);
      }
    }
  } catch (error) {
    console.error('[Taisei AI chat] Inference error:', error);
    replyElement.classList.add('ai-chat-message--error');
    replyElement.textContent = '回答の生成中に問題が起きました。もう一度お試しください。';
  } finally {
    setInputEnabled(true);
  }
}

function createWidget() {
  const root = document.createElement('aside');
  root.id = 'taisei-ai-chat';
  root.setAttribute('aria-label', 'AI チャット');
  root.innerHTML = `
    <section class="ai-chat-window" hidden aria-live="polite">
      <header class="ai-chat-header"><div><p class="ai-chat-title">TAISEI AI</p><p class="ai-chat-subtitle">ブラウザ上で動作します</p></div><button class="ai-chat-close" type="button" aria-label="チャットを閉じる">×</button></header>
      <div class="ai-chat-status"><span class="ai-chat-status-text">チャットを開くと AI を準備します。</span><span class="ai-chat-progress" hidden><span></span></span></div>
      <div class="ai-chat-messages" role="log" aria-live="polite"></div>
      <form class="ai-chat-form"><textarea class="ai-chat-input" rows="2" maxlength="2000" placeholder="メッセージを入力" aria-label="メッセージ" disabled></textarea><button class="ai-chat-send" type="submit" disabled>送信</button></form>
    </section>
    <button class="ai-chat-launcher" type="button" aria-expanded="false" aria-label="AI チャットを開く">AI</button>`;
  document.body.append(root);
  elements = {
    root,
    window: root.querySelector('.ai-chat-window'),
    launcher: root.querySelector('.ai-chat-launcher'),
    close: root.querySelector('.ai-chat-close'),
    status: root.querySelector('.ai-chat-status'),
    statusText: root.querySelector('.ai-chat-status-text'),
    progress: root.querySelector('.ai-chat-progress'),
    progressBar: root.querySelector('.ai-chat-progress > span'),
    messages: root.querySelector('.ai-chat-messages'),
    form: root.querySelector('.ai-chat-form'),
    input: root.querySelector('.ai-chat-input'),
    send: root.querySelector('.ai-chat-send'),
  };
  const close = () => { elements.window.hidden = true; elements.launcher.setAttribute('aria-expanded', 'false'); };
  elements.close.addEventListener('click', close);
  elements.launcher.addEventListener('click', () => {
    const isOpen = !elements.window.hidden;
    if (isOpen) { close(); return; }
    elements.window.hidden = false;
    elements.launcher.setAttribute('aria-expanded', 'true');
    void loadSiteSources();
    void ensureEngine();
  });
  elements.form.addEventListener('submit', (event) => { event.preventDefault(); void sendMessage(); });
  elements.input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); void sendMessage(); }
  });
}

function showWebGpuUnavailable() {
  const notice = document.createElement('p');
  notice.className = 'ai-chat-unavailable';
  notice.textContent = 'このブラウザでは AI チャット機能が利用できません。最新の Chrome または Edge をお試しください。';
  document.body.append(notice);
}

function init() {
  injectStylesheet();
  if (!navigator.gpu) { showWebGpuUnavailable(); return; }
  createWidget();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
else init();
