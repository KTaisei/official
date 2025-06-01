import React from 'react';
import { Terminal, Code, User } from 'lucide-react';
import TerminalComponent from '../components/Terminal';

interface HomeProps {
  typing: string;
  cursorVisible: boolean;
  setActiveSection: (section: string) => void;
}

const Home: React.FC<HomeProps> = ({ typing, cursorVisible, setActiveSection }) => {
  return (
    <section className="py-20">
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
            I'm a front-end Engineer.
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
      
      <div className="mt-16 w-full max-w-3xl mx-auto">
        <TerminalComponent setActiveSection={setActiveSection} />
      </div>
    </section>
  );
};

export default Home;