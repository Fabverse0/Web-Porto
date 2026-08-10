import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Code, FileCode, Server, Terminal, Database, Zap, HardDrive, Globe, Layers, MessageSquare, Cpu, Box, Cloud, CloudRain, GitBranch, Filter, CheckCircle2 } from 'lucide-react';

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
      // Smooth scroll to projects section
      const projectsElem = document.getElementById('projects');
      if (projectsElem) {
        projectsElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="skills" className="py-20 bg-[#FFFFFF] border-y border-[#E4E4E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#2563EB] tracking-wider uppercase">
              <Filter className="w-3.5 h-3.5" />
              Technical Competencies & Stack Matrix
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#09090B] tracking-tight">
              Built with High-Performance Backend Infrastructure.
            </h2>
            <p className="text-[#71717A] text-base leading-relaxed">
              Click any skill badge below to dynamically filter projects that utilize that technology in production.
            </p>
          </div>

          {/* Active Filter Indicator */}
          {selectedSkill && (
            <div className="flex items-center gap-3 bg-[#09090B] text-[#FFFFFF] px-4 py-2.5 rounded-lg shadow-sm font-mono text-xs">
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

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 border-b border-[#E4E4E7] pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-heading font-medium text-xs sm:text-sm px-4 py-2 rounded-md transition-all ${
                activeCategory === cat
                  ? 'bg-[#09090B] text-[#FFFFFF] font-semibold'
                  : 'bg-[#F4F4F5] text-[#71717A] hover:bg-[#E4E4E7] hover:text-[#09090B]'
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
                className={`card-light p-5 rounded-xl cursor-pointer transition-all ${
                  isSelected ? 'border-[#09090B] bg-[#09090B] text-[#FFFFFF] shadow-lg ring-2 ring-[#09090B]' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg ${isSelected ? 'bg-[#18181B] text-[#10B981]' : 'bg-[#F4F4F5] text-[#09090B]'}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className={`font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                    isSelected
                      ? 'bg-[#10B981]/20 text-[#10B981]'
                      : 'bg-[#F4F4F5] text-[#71717A]'
                  }`}>
                    {skill.level}
                  </span>
                </div>

                <div className="mt-4 space-y-1">
                  <h3 className={`font-heading font-bold text-base ${isSelected ? 'text-[#FFFFFF]' : 'text-[#09090B]'}`}>
                    {skill.name}
                  </h3>
                  <p className={`font-mono text-xs ${isSelected ? 'text-[#A1A1AA]' : 'text-[#71717A]'}`}>
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
