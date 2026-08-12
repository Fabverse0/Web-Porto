import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Filter, CheckCircle2, Server } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchSimpleIcons } from 'react-icon-cloud';
import { IconCloudDemo } from './ui/IconCloudDemo';
import { DotPattern } from './ui/DotPattern';

function BrandLogo({ slug, color, fallbackName }) {
  const [svgPath, setSvgPath] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (slug) {
      fetchSimpleIcons({ slugs: [slug] }).then((res) => {
        if (isMounted && res && res.simpleIcons && res.simpleIcons[slug]) {
          setSvgPath(res.simpleIcons[slug].path);
        }
      }).catch(() => {});
    }
    return () => { isMounted = false; };
  }, [slug]);

  if (svgPath) {
    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        className="w-6 h-6 fill-current transition-transform duration-300 group-hover:scale-110"
        style={{ color: color || '#10B981' }}
      >
        <path d={svgPath} />
      </svg>
    );
  }

  return (
    <div
      style={{ color: color || '#10B981', backgroundColor: `${color || '#10B981'}15` }}
      className="w-6 h-6 rounded flex items-center justify-center font-mono font-bold text-[10px]"
    >
      {fallbackName ? fallbackName.substring(0, 2).toUpperCase() : 'TC'}
    </div>
  );
}

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
    <section id="skills" className="py-20 bg-[#FFFFFF] dark:bg-[#18181B] border-y border-[#E4E4E7] dark:border-[#27272A] relative overflow-hidden">
      {/* Magic UI DotPattern Background */}
      <DotPattern className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)] opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
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

        {/* Skills Grid - Brand Colored & Animated Progress Meter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredSkills.map((skill, idx) => {
            const isSelected = selectedSkill === skill.name;
            const brandColor = skill.brandColor || '#10B981';

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                whileHover={{
                  y: -5,
                  scale: 1.02,
                  borderColor: brandColor,
                  boxShadow: `0 12px 30px -8px ${brandColor}40`
                }}
                onClick={() => handleSkillClick(skill.name)}
                className={`p-5 rounded-2xl cursor-pointer transition-all border flex flex-col justify-between space-y-4 group relative overflow-hidden ${
                  isSelected
                    ? 'border-[#10B981] bg-[#09090B] dark:bg-[#09090B] text-[#FFFFFF] shadow-xl ring-2 ring-[#10B981]'
                    : 'bg-[#FFFFFF] dark:bg-[#09090B] border-[#E4E4E7] dark:border-[#27272A] text-[#09090B] dark:text-[#FAFAFA]'
                }`}
              >
                {/* Subtle Ambient Brand Glow Accent */}
                <div
                  className="absolute -top-12 -right-12 w-24 h-24 rounded-full opacity-10 blur-xl pointer-events-none transition-opacity group-hover:opacity-30"
                  style={{ backgroundColor: brandColor }}
                />

                <div className="space-y-3 relative z-10">
                  {/* Top Row: Official SVG Logo & Level Badge */}
                  <div className="flex items-start justify-between">
                    <div
                      style={{ backgroundColor: `${brandColor}15`, borderColor: `${brandColor}30` }}
                      className="p-3 rounded-xl border transition-all"
                    >
                      <BrandLogo slug={skill.slug} color={brandColor} fallbackName={skill.name} />
                    </div>

                    <span
                      style={{ color: isSelected ? '#10B981' : brandColor, backgroundColor: `${brandColor}15` }}
                      className="font-mono text-[10px] uppercase font-extrabold px-2.5 py-1 rounded-md tracking-wider border border-current/20"
                    >
                      {skill.level}
                    </span>
                  </div>

                  {/* Title & Category */}
                  <div>
                    <h3 className={`font-heading font-bold text-base transition-colors ${isSelected ? 'text-[#FFFFFF]' : 'text-[#09090B] dark:text-[#FAFAFA] group-hover:text-current'}`}>
                      {skill.name}
                    </h3>
                    <p className={`font-mono text-xs ${isSelected ? 'text-[#A1A1AA]' : 'text-[#71717A] dark:text-[#A1A1AA]'}`}>
                      {skill.category}
                    </p>
                  </div>
                </div>

                {/* Bottom Row: Animated Proficiency Progress Meter */}
                <div className="space-y-1.5 pt-2 border-t border-[#E4E4E7]/60 dark:border-[#27272A] relative z-10">
                  <div className="flex justify-between items-center font-mono text-[11px]">
                    <span className={isSelected ? 'text-[#A1A1AA]' : 'text-[#71717A] dark:text-[#A1A1AA]'}>Proficiency</span>
                    <span className="font-bold font-mono" style={{ color: isSelected ? '#10B981' : brandColor }}>
                      {skill.percentage || 85}%
                    </span>
                  </div>

                  <div className="h-1.5 w-full bg-[#F4F4F5] dark:bg-[#27272A] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage || 85}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      style={{ backgroundColor: isSelected ? '#10B981' : brandColor }}
                      className="h-full rounded-full shadow-sm"
                    />
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
