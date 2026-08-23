import data from '../../../content/projects.json';
import { notFound } from 'next/navigation';
import MermaidContent from '../../components/MermaidContent';

export function generateStaticParams() { return data.projects.map(project => ({ slug: project.slug })); }
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const project = data.projects.find(item => item.slug === slug); if (!project) notFound();
  return <main className="inner-page"><a className="brand" href="/official/"><span>T</span> Taisei / PORTFOLIO</a><p className="section-kicker">PROJECT / {project.title}</p><h1>{project.title}</h1><p className="lead">{project.description}</p><div className="project-tags">{project.tags.map(tag => <em key={tag}>{tag}</em>)}</div><article className="tech-article"><p className="section-kicker">TECHNICAL NOTE</p><h2>{project.articleTitle}</h2><MermaidContent content={project.articleBody}/></article><a className="text-link" href="/official/works/">← プロジェクト一覧へ戻る</a></main>;
}
