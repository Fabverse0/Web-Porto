import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Layers, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { DotPattern } from './ui/DotPattern';

export default function Projects({ selectedSkill, onOpenModal }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Fintech & API', 'Microservices', 'Data Engineering'];

  let projectsList = PORTFOLIO_DATA.projects;

  if (activeCategory !== 'All') {
    projectsList = projectsList.filter(p => p.category === activeCategory);
  }

  if (selectedSkill) {
    projectsList = projectsList.filter(p => p.tags.includes(selectedSkill));
  }

  return (
    <section id="projects" className="py-20 bg-[#F0EDE4] dark:bg-[#09090B] relative overflow-hidden transition-colors duration-300">
      {/* Magic UI DotPattern Background */}
      <DotPattern className="[mask-image:radial-gradient(800px_circle_at_center,white,transparent)] opacity-50 text-[#004741] dark:text-[#FAFAFA]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#004741] dark:text-[#10B981] tracking-wider uppercase">
              <Layers className="w-3.5 h-3.5 text-[#10B981]" />
              Featured Backend Architectures
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#004741] dark:text-[#FAFAFA] tracking-tight">
              Production-Grade Systems & High-Throughput APIs.
            </h2>
            <p className="text-[#4A635F] dark:text-[#A1A1AA] text-base leading-relaxed">
              Explore real-world backend projects complete with interactive node topology diagrams, relational database schemas, and source code.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-heading font-medium text-xs px-3.5 py-1.5 rounded-full transition-all ${
                  activeCategory === cat
                    ? 'bg-[#004741] dark:bg-[#FAFAFA] text-[#F0EDE4] dark:text-[#09090B] font-semibold shadow-sm'
                    : 'bg-[#FAF8F5] dark:bg-[#18181B] border border-[#DDD7C8] dark:border-[#27272A] text-[#4A635F] dark:text-[#A1A1AA] hover:border-[#004741] dark:hover:border-[#10B981] hover:text-[#004741] dark:hover:text-[#FAFAFA]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid - Clean Authentic Cards */}
        {projectsList.length === 0 ? (
          <div className="p-12 text-center bg-[#FAF8F5] dark:bg-[#18181B] border border-[#DDD7C8] dark:border-[#27272A] rounded-2xl space-y-3">
            <div className="font-mono text-sm font-bold text-[#004741] dark:text-[#FAFAFA]">No projects found for active filter.</div>
            <p className="text-xs text-[#4A635F] dark:text-[#A1A1AA]">Try clearing the skill filter or selecting a different category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsList.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.2 } }}
                className="bg-[#FAF8F5] dark:bg-[#18181B] border border-[#DDD7C8] dark:border-[#27272A] hover:border-[#004741] dark:hover:border-[#10B981] transition-colors rounded-2xl p-6 flex flex-col justify-between space-y-6 group shadow-sm hover:shadow-xl"
              >
                <div className="space-y-4">
                  {/* Category Badge */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#004741] dark:text-[#60A5FA] bg-[#004741]/10 dark:bg-[#2563EB]/20 px-2.5 py-1 rounded">
                      {project.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="font-heading font-bold text-xl text-[#004741] dark:text-[#FAFAFA] group-hover:text-[#005C55] dark:group-hover:text-[#60A5FA] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4A635F] dark:text-[#A1A1AA] leading-relaxed line-clamp-3">
                      {project.shortDesc}
                    </p>
                  </div>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`font-mono text-[11px] px-2.5 py-0.5 rounded border ${
                          selectedSkill === tag
                            ? 'bg-[#004741] dark:bg-[#FAFAFA] text-[#F0EDE4] dark:text-[#09090B] border-[#004741] dark:border-[#FAFAFA] font-bold'
                            : 'bg-[#E5E0D4] dark:bg-[#09090B] text-[#004741] dark:text-[#FAFAFA] border-[#DDD7C8] dark:border-[#27272A]'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action Trigger */}
                <div className="pt-4 border-t border-[#DDD7C8] dark:border-[#27272A]">
                  <button
                    onClick={() => onOpenModal(project)}
                    className="inline-flex items-center gap-2 w-full justify-center font-heading font-semibold text-xs py-2.5 rounded-xl bg-[#004741] dark:bg-[#FAFAFA] text-[#F0EDE4] dark:text-[#09090B] hover:bg-[#005C55] dark:hover:opacity-90 transition-all shadow-sm"
                  >
                    View Architecture & Specs
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
