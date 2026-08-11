import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Code, FileCode, Server, Terminal, Database, Zap, HardDrive, Globe, Layers, MessageSquare, Cpu, Box, Cloud, CloudRain, GitBranch, Filter, CheckCircle2, Sparkles } from 'lucide-react';
import { IconCloudDemo } from './ui/IconCloudDemo';

const iconMap = {
  Code: Code,
  FileCode: FileCode,
  Server: Server,
  Terminal: Terminal,
  Database: Database,
  Zap: Zap,
  HardDrive: HardDrive,
  Globe: Globe,
  Layers: Layers,
  MessageSquare: MessageSquare,
  Cpu: Cpu,
  Box: Box,
  Cloud: Cloud,
  CloudRain: CloudRain,
  GitBranch: GitBranch
};

export default function AboutSkills({ selectedSkill, onSelectSkill }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Languages', 'Databases', 'API & Messaging', 'Cloud & DevOps'];

  const filteredSkills = activeCategory === 'All'
    ? PORTFOLIO_DATA.skills
    : PORTFOLIO_DATA.skills.filter(s => s.category === activeCategory);

  const handleSkillClick = (skillName) => {
    if (selectedSkill === skillName) {
      onSelectSkill(null);
    } else {
      onSelectSkill(skillName);
      const projectsElem = document.getElementById('projects');
      if (projectsElem) {
        projectsElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="skills" className="py-20 bg-[#FFFFFF] dark:bg-[#18181B] border-y border-[#E4E4E7] dark:border-[#27272A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header with Interactive 3D Icon Cloud */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#2563EB] dark:text-[#60A5FA] tracking-wider uppercase">
              <Filter className="w-3.5 h-3.5" />
              Technical Competencies & Stack Matrix
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#09090B] dark:text-[#FAFAFA] tracking-tight">
              Built with High-Performance Backend Infrastructure.
            </h2>
            <p className="text-[#71717A] dark:text-[#A1A1AA] text-base leading-relaxed">
              Explore my backend ecosystem interactively. Drag and hover over the 3D tech sphere to inspect language tools, databases, and microservices engines, or click any skill card below to filter projects.
            </p>

            {/* Active Filter Indicator */}
            {selectedSkill && (
              <div className="inline-flex items-center gap-3 bg-[#09090B] dark:bg-[#09090B] text-[#FFFFFF] border border-[#27272A] px-4 py-2.5 rounded-xl shadow-sm font-mono text-xs mt-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>Filtering Projects by: <strong>{selectedSkill}</strong></span>
                <button
                  onClick={() => onSelectSkill(null)}
                  className="ml-2 underline text-[#A1A1AA] hover:text-[#FFFFFF]"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          {/* Interactive 3D Icon Cloud Widget */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <IconCloudDemo />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 border-b border-[#E4E4E7] dark:border-[#27272A] pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-heading font-medium text-xs sm:text-sm px-4 py-2 rounded-lg transition-all ${
                activeCategory === cat
                  ? 'bg-[#09090B] dark:bg-[#FAFAFA] text-[#FFFFFF] dark:text-[#09090B] font-semibold shadow-sm'
                  : 'bg-[#F4F4F5] dark:bg-[#27272A] text-[#71717A] dark:text-[#A1A1AA] hover:bg-[#E4E4E7] dark:hover:bg-[#3F3F46] hover:text-[#09090B] dark:hover:text-[#FAFAFA]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => {
            const IconComp = iconMap[skill.icon] || Server;
            const isSelected = selectedSkill === skill.name;

            return (
              <div
                key={skill.name}
                onClick={() => handleSkillClick(skill.name)}
                className={`p-5 rounded-xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'border-[#10B981] bg-[#09090B] dark:bg-[#09090B] text-[#FFFFFF] shadow-lg ring-2 ring-[#10B981]'
                    : 'bg-[#FFFFFF] dark:bg-[#09090B] border-[#E4E4E7] dark:border-[#27272A] text-[#09090B] dark:text-[#FAFAFA] hover:border-[#09090B] dark:hover:border-[#10B981]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg ${isSelected ? 'bg-[#18181B] text-[#10B981]' : 'bg-[#F4F4F5] dark:bg-[#18181B] text-[#09090B] dark:text-[#FAFAFA]'}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className={`font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                    isSelected
                      ? 'bg-[#10B981]/20 text-[#10B981]'
                      : 'bg-[#F4F4F5] dark:bg-[#27272A] text-[#71717A] dark:text-[#A1A1AA]'
                  }`}>
                    {skill.level}
                  </span>
                </div>

                <div className="mt-4 space-y-1">
                  <h3 className={`font-heading font-bold text-base ${isSelected ? 'text-[#FFFFFF]' : 'text-[#09090B] dark:text-[#FAFAFA]'}`}>
                    {skill.name}
                  </h3>
                  <p className={`font-mono text-xs ${isSelected ? 'text-[#A1A1AA]' : 'text-[#71717A] dark:text-[#A1A1AA]'}`}>
                    {skill.category}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
