import { SYSTEM_PROMPT } from './persona.js';

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
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history.slice(-MAX_HISTORY_MESSAGES),
    { role: 'user', content: text },
  ];

  try {
    const chunks = await engine.chat.completions.create({
      messages,
      temperature: 0.7,
      max_tokens: 512,
      stream: true,
    });
    let reply = '';
    for await (const chunk of chunks) {
      reply += chunk.choices[0]?.delta?.content || '';
      replyElement.textContent = reply;
      elements.messages.scrollTop = elements.messages.scrollHeight;
    }
    if (!reply) reply = '申し訳ありません。返答を生成できませんでした。もう一度お試しください。';
    replyElement.textContent = reply;
    history = [...history, { role: 'user', content: text }, { role: 'assistant', content: reply }].slice(-MAX_HISTORY_MESSAGES);
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
