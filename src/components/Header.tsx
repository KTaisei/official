import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, User, Briefcase, BookOpen, Mail, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  theme: string;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection, theme, toggleTheme }) => {
  const location = useLocation();
  
  const navItems = [
    { id: 'home', label: 'Home', icon: <Terminal className="h-5 w-5" />, path: '/' },
    { id: 'about', label: 'About', icon: <User className="h-5 w-5" />, path: '/about' },
    { id: 'projects', label: 'Projects', icon: <Briefcase className="h-5 w-5" />, path: '/projects' },
    { id: 'blog', label: 'Blog', icon: <BookOpen className="h-5 w-5" />, path: '/blog' },
    { id: 'contact', label: 'Contact', icon: <Mail className="h-5 w-5" />, path: '/contact' },
  ];

  return (
    <header className={`sticky top-0 z-50 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" onClick={() => setActiveSection('home')} className="flex items-center">
              <Terminal className="h-8 w-8 text-blue-500 mr-2" />
              <span className="text-xl font-bold font-mono">
                <span className="text-blue-500">&gt;</span> Taisei.dev
              </span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setActiveSection(item. id)}
                className={`px-4 py-2 rounded-md font-mono flex items-center transition-colors ${
                  activeSection === item.id || location.pathname === item.path
                    ? 'bg-blue-500 text-white' 
                    : theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              className={`p-2 rounded-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}
              onClick={() => {
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu) {
                  mobileMenu.classList.toggle('hidden');
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div id="mobile-menu" className="md:hidden hidden">
        <div className={`px-4 py-2 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => {
                setActiveSection(item.id);
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu) {
                  mobileMenu.classList.add('hidden');
                }
              }}
              className={`w-full text-left px-4 py-2 my-1 rounded-md font-mono flex items-center ${
                activeSection === item.id 
                  ? 'bg-blue-500 text-white' 
                  : theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;