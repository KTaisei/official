import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Github, Linkedin, Twitter } from 'lucide-react';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Project';
import Contact from './pages/Contact';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState('dark');
  const [typing, setTyping] = useState('');
  const [fullText] = useState('Welcome to my digital workspace');
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
    } else if (activeSection !== 'github') {
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
            <Home 
              typing={typing}
              cursorVisible={cursorVisible}
              setActiveSection={setActiveSection}
            />
          } />
          <Route path="/about" element={<About theme={theme} />} />
          <Route path="/projects" element={<Projects theme={theme} />} />
          <Route path="/contact" element={<Contact theme={theme} />} />
        </Routes>
      </main>
      
      <footer className={`py-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <div className="container mx-auto px-4 text-center">
          <p className="font-mono">
            &copy; 2025 Kawakami Tasei. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="https://github.com/KTaisei" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://x.com/Yasumasascience" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;