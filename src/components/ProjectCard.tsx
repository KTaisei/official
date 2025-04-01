import React, { useState } from "react";
import { Github, ExternalLink, Code } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github: string;
  demo: string;
}

interface ProjectCardProps {
  project: Project;
  theme: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, theme }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform ${
        isHovered ? "scale-105" : ""
      } ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-oid="3opu89p"
    >
      <div className="relative overflow-hidden h-48" data-oid="lwj008h">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}
          data-oid="pkan8_x"
        />

        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-70"
          }`}
          data-oid="bbc568-"
        ></div>
      </div>

      <div className="p-6" data-oid="bo4npk5">
        <h3
          className="text-xl font-bold mb-2 font-mono flex items-center"
          data-oid="8m47b99"
        >
          <Code className="h-5 w-5 mr-2 text-blue-500" data-oid="r8xpbss" />
          {project.title}
        </h3>
        <p className="mb-4 font-mono text-sm" data-oid="7pfhedg">
          {project.description}
        </p>

        <div className="mb-4" data-oid="f-zj2ve">
          <div className="flex flex-wrap gap-2" data-oid="lrx6hlx">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className={`px-2 py-1 rounded-full text-xs font-mono ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                }`}
                data-oid="_fxj8vq"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-between" data-oid="_cy-rca">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm font-mono text-blue-500 hover:text-blue-600 transition-colors"
            data-oid="xv-7-3v"
          >
            <Github className="h-4 w-4 mr-1" data-oid=".iz1cb5" />
            Code
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm font-mono text-purple-500 hover:text-purple-600 transition-colors"
            data-oid="3g0hf2r"
          >
            <ExternalLink className="h-4 w-4 mr-1" data-oid="1_5b13i" />
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
