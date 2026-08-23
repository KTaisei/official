'use client';
import {useEffect,useState} from 'react';
import profile from '../content/profile.json'; import projects from '../content/projects.json'; import posts from '../content/blog.json'; import site from '../content/site.json'; import slides from '../content/slides.json';
const base='/official';
export default function Home(){
 const [active,setActive]=useState(0),[ratio,setRatio]=useState('16 / 9');
 useEffect(()=>{const timer=setInterval(()=>setActive(i=>(i+1)%slides.slides.length),4500);return()=>clearInterval(timer)},[]);
 return <main>
  <header className="header"><a className="brand" href={base+'/' }><span>T</span> Taisei / PORTFOLIO</a><nav><a href={base+'/about/'}>ABOUT</a><a href={base+'/works/'}>WORKS</a><a href={base+'/resources/'}>RESOURCES</a><a href="https://ktaisei.github.io/blog/">BLOG ↗</a><a href={base+'/contact/'}>CONTACT</a></nav></header>
  <section className="hero pixel-hero" style={{aspectRatio:ratio,height:'auto'}}>{slides.slides.map((item,i)=><div className={i===active?'slide-scene active':'slide-scene'} key={item.image}><div className="slide-backdrop" style={{backgroundImage:`url(${base}${item.image})`}}/><img className="slide" src={base+item.image} alt={item.alt} onLoad={e=>setRatio(`${e.currentTarget.naturalWidth} / ${e.currentTarget.naturalHeight}`)}/></div>)}<div className="hello">{site.hello}</div></section>
  <section className="news section"><p className="section-kicker">FROM THE BLOG</p><h2>更新情報</h2><div className="news-list">{posts.posts.slice(0,4).map(post=><a href={post.url} target="_blank" key={post.url}><time>{post.date}</time><span>{post.title}</span><b>↗</b></a>)}</div></section>
  <section className="intro section"><p className="section-kicker">ABOUT ME</p><div><h2>{site.aboutHeading}</h2><p className="lead">{profile.biography}</p><a className="text-link" href={base+'/about/'}>プロフィール・経歴を見る →</a></div></section>
  <section className="works section"><p className="section-kicker">SELECTED WORKS</p><h2>Pick up</h2><div className="cards">{projects.projects.map((project,i)=><a className={'card c'+i%3} href={`${base}/works/${project.slug}/`} key={project.slug}><span className="card-no">{String(i+1).padStart(2,'0')}</span><span className="card-art"/><span className="card-type">PROJECT</span><strong>{project.title}</strong><span className="card-more">VIEW PROJECT ↗</span></a>)}</div></section>
  <section className="contact"><p className="section-kicker">CONTACT</p><h2>{site.contactHeading}</h2><a className="contact-mail" href={base+'/contact/'}>CONTACT ↗</a></section>
  <footer><div className="footer-brand"><span>T</span><p>Taisei / PORTFOLIO</p></div><div className="footer-links"><div><b>NAVIGATE</b><a href={base+'/about/'}>About</a><a href={base+'/works/'}>Works</a><a href={base+'/resources/'}>Resources</a><a href={base+'/contact/'}>Contact</a></div><div><b>FOLLOW</b>{site.socials.map(link=><a href={link.url} target="_blank" key={link.label}>{link.label}</a>)}</div></div><small>{site.footerCopyright}</small></footer>
 </main>
}
