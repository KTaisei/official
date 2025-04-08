import React from 'react';
import { Briefcase } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data';

interface ProjectsProps {
  theme: string;
}

const Projects: React.FC<ProjectsProps> = ({ theme }) => {
  return (
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
  );
};

export default Projects;