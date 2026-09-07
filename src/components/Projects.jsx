import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Projects({ selectedSkill, onOpenModal }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', ...Array.from(new Set(PORTFOLIO_DATA.projects.map(p => p.category)))];

  let projectsList = PORTFOLIO_DATA.projects;

  if (activeCategory !== 'All') {
    projectsList = projectsList.filter(p => p.category === activeCategory);
  }

  if (selectedSkill) {
    projectsList = projectsList.filter(p => p.tags.includes(selectedSkill));
  }

  return (
    <section id="projects" className="py-20 sm:py-24 bg-[var(--bg-page)] border-b border-[var(--border-color)] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 border-b border-[var(--border-strong)]">
          <div className="max-w-xl">
            <h2 className="font-heading font-semibold text-[28px] sm:text-[32px] tracking-[-0.01em] text-[var(--text-primary)]">
              Production-Grade Systems &amp; High-Throughput APIs.
            </h2>
            <p className="mt-3 text-[15.5px] text-[var(--text-body)] leading-relaxed max-w-[58ch]">
              Explore real-world backend projects complete with interactive node topology diagrams, relational database schemas, and source code.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`inline-flex items-center font-mono text-xs px-3.5 min-h-[44px] border transition-colors ${
                  activeCategory === cat
                    ? 'bg-[var(--text-primary)] text-[var(--bg-page)] border-[var(--text-primary)]'
                    : 'bg-transparent text-[var(--text-secondary)] border-[var(--border-strong)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {projectsList.length === 0 ? (
          <div className="py-16 text-center border-b border-[var(--border-color)]">
            <p className="font-mono text-sm text-[var(--text-primary)]">No projects found for active filter.</p>
            <p className="text-xs text-[var(--text-secondary)] mt-2">Try clearing the skill filter or selecting a different category.</p>
          </div>
        ) : (
          <div>
            {projectsList.map((project, idx) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="py-10 border-b border-[var(--border-color)] grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* Identity */}
                <div className="lg:col-span-5">
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--text-secondary)]">
                    {project.category}
                  </span>
                  <h3 className="font-heading font-medium text-[22px] leading-snug text-[var(--text-primary)] mt-2">
                    {project.title}
                  </h3>
                  <p className="text-[15px] text-[var(--text-body)] leading-relaxed mt-3 max-w-[52ch]">
                    {project.shortDesc}
                  </p>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[13px] text-[var(--text-primary)] mt-4 underline-offset-4 hover:underline"
                  >
                    <Github className="w-3.5 h-3.5" aria-hidden="true" />
                    Source code
                  </a>
                </div>

                {/* Metrics datasheet */}
                <div className="lg:col-span-4 border border-[var(--border-color)] bg-[var(--bg-card)] self-start">
                  {Object.entries(project.metrics).map(([key, val], i) => (
                    <div
                      key={key}
                      className={`flex items-baseline justify-between gap-3 px-4 py-3 ${i > 0 ? 'border-t border-[var(--border-color)]' : ''}`}
                    >
                      <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--text-secondary)]">{key}</span>
                      <span className="font-mono text-[14px] text-[var(--text-primary)]">{val}</span>
                    </div>
                  ))}
                </div>

                {/* Stack + action */}
                <div className="lg:col-span-3 flex flex-col justify-between gap-5">
                  <p className="font-mono text-[12.5px] leading-relaxed text-[var(--text-secondary)]">
                    {project.tags.join(', ')}
                  </p>
                  <button
                    onClick={() => onOpenModal(project)}
                    className="inline-flex items-center justify-center gap-2 font-mono text-[13px] min-h-[44px] px-5 bg-[var(--text-primary)] text-[var(--bg-page)] border border-[var(--text-primary)] hover:opacity-90 transition-opacity"
                  >
                    View Architecture &amp; Specs
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
