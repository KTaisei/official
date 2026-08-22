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
