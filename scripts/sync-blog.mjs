import { writeFile } from 'node:fs/promises';

const source = 'https://ktaisei.github.io/blog/';
const html = await fetch(source).then(response => {
  if (!response.ok) throw new Error(`Blog fetch failed: ${response.status}`);
  return response.text();
});
const posts = [...html.matchAll(/<li class="post-card">[\s\S]*?<time[^>]*datetime="([^"]+)"[^>]*>.*?<\/time>[\s\S]*?<h2><a href="([^"]+)">([\s\S]*?)<\/a>/g)]
  .map(([, date, path, title]) => ({
    title: title.replace(/<[^>]+>/g, '').trim(),
    date: new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(date)).replaceAll('/', '.'),
    url: new URL(path, source).toString(),
  })).slice(0, 4);
if (!posts.length) throw new Error('No blog posts found; source markup may have changed.');
await writeFile('content/blog.json', `${JSON.stringify({ posts }, null, 2)}\n`);

const qiitaResponse = await fetch('https://qiita.com/api/v2/users/KTaisei/items?per_page=100', {
  headers: { 'User-Agent': 'taisei-portfolio-sync', Accept: 'application/json' },
});
if (!qiitaResponse.ok) throw new Error(`Qiita fetch failed: ${qiitaResponse.status}`);
const qiitaPosts = (await qiitaResponse.json()).map(item => ({
  title: item.title,
  date: new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(item.created_at)).replaceAll('/', '.'),
  url: item.url,
}));
await writeFile('content/qiita.json', `${JSON.stringify({ posts: qiitaPosts }, null, 2)}\n`);

const zennFeed = await fetch('https://zenn.dev/yasumascience/feed').then(response => {
  if (!response.ok) throw new Error(`Zenn fetch failed: ${response.status}`);
  return response.text();
});
const zennPosts = [...zennFeed.matchAll(/<item>[\s\S]*?<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>[\s\S]*?<link>([^<]+)<\/link>[\s\S]*?<pubDate>([^<]+)<\/pubDate>[\s\S]*?<\/item>/g)]
  .map(([, title, url, date]) => ({ title: title.trim(), url: url.trim(), date: new Intl.DateTimeFormat('ja-JP', {year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(date)).replaceAll('/', '.') }));
await writeFile('content/zenn.json', `${JSON.stringify({ posts: zennPosts }, null, 2)}\n`);
