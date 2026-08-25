import data from '../../../content/projects.json';
import { notFound } from 'next/navigation';
import MermaidContent from '../../components/MermaidContent';

export function generateStaticParams() { return data.projects.map(project => ({ slug: project.slug })); }
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const project = data.projects.find(item => item.slug === slug); if (!project) notFound();
  const updatedAt=project.updatedAt?new Date(`${project.updatedAt}T00:00:00`):null;
  const elapsedYears=updatedAt?Math.floor((Date.now()-updatedAt.getTime())/(365.25*24*60*60*1000)):0;
  return <main className="inner-page"><a className="brand" href="/official/"><span>T</span> Taisei / PORTFOLIO</a><p className="section-kicker">PROJECT / {project.title}</p><h1>{project.title}</h1>{elapsedYears>=1&&<p className="article-age-notice">この記事は最終更新から{elapsedYears}年経過しています。内容が古くなっている可能性があります。</p>}<p className="lead">{project.description}</p><div className="project-tags">{project.tags.map(tag => <em key={tag}>{tag}</em>)}</div><article className="tech-article"><p className="section-kicker">TECHNICAL NOTE</p><h2>{project.articleTitle}</h2><MermaidContent content={project.articleBody}/></article><a className="text-link" href="/official/works/">← プロジェクト一覧へ戻る</a></main>;
}
