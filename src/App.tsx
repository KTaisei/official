import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Terminal, Code, User, Briefcase, BookOpen, Mail, Github, Linkedin, Twitter, Moon, Sun, ChevronRight } from 'lucide-react';
import Header from './components/Header';
import TerminalComponent from './components/Terminal';
import ProjectCard from './components/ProjectCard';
import BlogList from './components/BlogList';
import BlogPostPage from './components/BlogPostPage';
import ContactForm from './components/ContactForm';
import { blogPosts, projects } from './data';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState('dark');
  const [typing, setTyping] = useState('');
  const [fullText] = useState('Hello World!');
  const [charIndex, setCharIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const navigate = useNavigate();

  // Typing effect
  useEffect(() => {
    if (charIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTyping(prev => prev + fullText[charIndex]);
        setCharIndex(charIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, fullText]);

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  // Handle section change
  useEffect(() => {
    if (activeSection === 'home') {
      navigate('/');
    } else if (activeSection === 'blog') {
      navigate('/blog');
    } else {
      navigate(`/${activeSection}`);
    }
  }, [activeSection, navigate]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />
      
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={
            <section className="py-20 flex flex-col items-center justify-center">
              <div className="max-w-4xl mx-auto text-center">
                <div className="mb-8 inline-block">
                  <Terminal className="w-16 h-16 mx-auto mb-4" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 font-mono">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                    {typing}
                  </span>
                  <span className={`inline-block w-3 h-8 ml-1 bg-blue-500 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 font-mono opacity-80">
                  I'm a front end Engineer. 
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button 
                    onClick={() => setActiveSection('about')}
                    className="px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors font-mono flex items-center"
                  >
                    <User className="mr-2 h-5 w-5" />
                    About Me
                  </button>
                  <button 
                    onClick={() => setActiveSection('projects')}
                    className="px-6 py-3 rounded-md bg-purple-600 hover:bg-purple-700 transition-colors font-mono flex items-center"
                  >
                    <Code className="mr-2 h-5 w-5" />
                    View Projects
                  </button>
                </div>
              </div>
              
              <div className="mt-16 w-full max-w-3xl">
                <TerminalComponent setActiveSection={setActiveSection} />
              </div>
            </section>
          } />

          <Route path="/about" element={
            <section className="py-16">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-8">
                  <User className="mr-3 h-6 w-6 text-blue-500" />
                  <h2 className="text-3xl font-bold font-mono">About Me</h2>
                </div>
                
                <div className={`p-6 rounded-lg mb-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                      <img 
                        src="https://ktaisei.github.io/stophone_tsx/profile.JPG" 
                        alt="Profile" 
                        className="rounded-lg w-full h-auto object-cover shadow-md"
                      />
                      <div className="mt-4 flex justify-center space-x-4">
                        <a href="https://github.com/KTaisei" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                          <Github className="h-6 w-6" />
                        </a>
                        <a href="https://x.com/Yasumasascience" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                          <Twitter className="h-6 w-6" />
                        </a>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-2xl font-bold mb-4 font-mono">Hello, I'm <span className="text-blue-500">Taisei Kawakami</span></h3>
                      <p className="mb-4 font-mono">
                        I'm a front end Engineer. I have a passion for web development and love to create interactive and engaging web applications.
                      </p>
                      <p className="mb-4 font-mono">
                        I often create projects using React, TypeScript, and Tailwind CSS. I'm also interested in deep learning and data science.
                      </p>
                      <div className="mt-6">
                        <h4 className="text-xl font-bold mb-3 font-mono">Technical Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {['JavaScript', 'React', 'Python', "Flutter", "Astro", ].map((skill) => (
                            <span 
                              key={skill} 
                              className={`px-3 py-1 rounded-full text-sm font-mono ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                  <h3 className="text-2xl font-bold mb-4 font-mono">Experience</h3>
                  <div className="space-y-6">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="text-xl font-bold font-mono">Senior Software Engineer</h4>
                      <p className="text-blue-500 font-mono">TechCorp Inc. • 2022 - Present</p>
                      <p className="mt-2 font-mono">Led the development of a cloud-based analytics platform that processes over 1TB of data daily.</p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="text-xl font-bold font-mono">Full Stack Developer</h4>
                      <p className="text-purple-500 font-mono">InnovateSoft • 2019 - 2022</p>
                      <p className="mt-2 font-mono">Developed and maintained multiple web applications for clients in finance and healthcare sectors.</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="text-xl font-bold font-mono">Dawn</h4>
                      <p className="text-green-500 font-mono">2007/07/03</p>
                      <p className="mt-2 font-mono">My life is started.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          } />

          <Route path="/projects" element={
            <section className="py-16">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center mb-8">
                  <Briefcase className="mr-3 h-6 w-6 text-purple-500" />
                  <h2 className="text-3xl font-bold font-mono">Projects</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map(project => (
                    <ProjectCard key={project.id} project={project} theme={theme} />
                  ))}
                </div>
              </div>
            </section>
          } />

          <Route path="/blog" element={
            <section className="py-16">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-8">
                  <BookOpen className="mr-3 h-6 w-6 text-green-500" />
                  <h2 className="text-3xl font-bold font-mono">Blog</h2>
                </div>
                
                <BlogList posts={blogPosts} theme={theme} />
              </div>
            </section>
          } />

          <Route path="/blog/:id" element={
            <BlogPostPage posts={blogPosts} theme={theme} />
          } />

          <Route path="/contact" element={
            <section className="py-16">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-8">
                  <Mail className="mr-3 h-6 w-6 text-red-500" />
                  <h2 className="text-3xl font-bold font-mono">Contact</h2>
                </div>
                
                <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 font-mono">Get In Touch</h3>
                      <p className="mb-4 font-mono">
                        Have a project in mind or want to discuss a potential collaboration? 
                        Feel free to reach out using the contact form or through my social media profiles.
                      </p>
                      <div className="space-y-4 mt-6">
                        <div className="flex items-center">
                          <Mail className="h-5 w-5 mr-3 text-blue-500" />
                          <span className="font-mono">contact@example.com</span>
                        </div>
                        <div className="flex items-center">
                          <Github className="h-5 w-5 mr-3 text-blue-500" />
                          <span className="font-mono">github.com/username</span>
                        </div>
                        <div className="flex items-center">
                          <Linkedin className="h-5 w-5 mr-3 text-blue-500" />
                          <span className="font-mono">linkedin.com/in/username</span>
                        </div>
                      </div>
                    </div>
                    <ContactForm theme={theme} />
                  </div>
                </div>
              </div>
            </section>
          } />
        </Routes>
      </main>
      
      <footer className={`py-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <div className="container mx-auto px-4 text-center">
          <p className="font-mono">
            &copy; {new Date().getFullYear()} Kawakami Taisei. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="https://github.com/ktaisei" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://twitter.com/Yasumasascience" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;