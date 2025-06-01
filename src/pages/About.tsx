import React from 'react';
import { User, Github, Linkedin, Twitter } from 'lucide-react';

interface AboutProps {
  theme: string;
}

const About: React.FC<AboutProps> = ({ theme }) => {
  return (
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
              I'm a front-end Engineer. I have a passion for web development and love to create interactive and engaging web applications.
              </p>
              <p className="mb-4 font-mono">
              I often create projects using React, TypeScript, and Tailwind CSS. I'm also interested in deep learning and data science.
              </p>
              <div className="mt-6">
                <h4 className="text-xl font-bold mb-3 font-mono">Technical Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {["JavaScript", "React","Python","Flutter","Astro",].map((skill) => (
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
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="text-xl font-bold font-mono">Dawn</h4>
              <p className="text-green-500 font-mono">2007/07/03</p>
              <p className="mt-2 font-mono">My life is started.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;