import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

/* Small building block: one step of a system pipeline. Circles, not boxes. */
function PipelineStep({ step, index }) {
  return (
    <li className="relative flex items-start gap-4">
      {/* step node */}
      <span
        className="relative z-10 flex-none w-10 h-10 rounded-full border border-[var(--border-strong)] bg-[var(--bg-page)] font-mono text-[12px] text-[var(--text-primary)] flex items-center justify-center transition-colors group-hover:border-[var(--text-primary)]"
        title={step.desc || step.description || step.title}
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="pt-1.5 min-w-0">
        <p className="font-medium text-[14px] text-[var(--text-primary)] leading-snug">
          {step.title}
        </p>
        {step.layer && (
          <p className="font-mono text-[11px] text-[var(--text-secondary)] mt-1">
            {step.layer}
          </p>
        )}
      </div>
    </li>
  );
}

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
    <section id="projects" className="py-24 sm:py-28 bg-[var(--bg-page)] border-b border-[var(--border-color)] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header: typographic, no boxes */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 pb-14 border-b border-[var(--border-strong)]">
          <div className="max-w-2xl">
            <h2 className="font-heading font-semibold text-[30px] sm:text-[38px] tracking-[-0.015em] text-[var(--text-primary)] leading-tight">
              Production-Grade Systems &amp; High-Throughput APIs.
            </h2>
            <p className="mt-4 text-[16px] text-[var(--text-body)] leading-relaxed max-w-[56ch]">
              Real-world backend systems, documented the way they run. Follow the flow of each architecture below.
            </p>
          </div>

          {/* Filter: quiet text toggles */}
          <div className="flex flex-wrap gap-x-5 gap-y-2" role="group" aria-label="Filter projects by category">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`font-mono text-[13px] min-h-[44px] flex items-center border-b-2 transition-colors ${
                  activeCategory === cat
                    ? 'border-[var(--text-primary)] text-[var(--text-primary)]'
                    : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {projectsList.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-mono text-[15px] text-[var(--text-primary)]">No projects found for active filter.</p>
            <p className="text-[13px] text-[var(--text-secondary)] mt-2">Try clearing the skill filter or selecting a different category.</p>
          </div>
        ) : (
          <div>
            {projectsList.map((project, idx) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: idx * 0.05 }}
                className="group py-16 sm:py-20 border-b border-[var(--border-color)] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14"
              >
                {/* Narrative column */}
                <div className="lg:col-span-5 flex flex-col">
                  <span className="font-mono text-[11.5px] uppercase tracking-[0.08em] text-[var(--text-secondary)]">
                    {project.category}
                  </span>
                  <h3 className="font-heading font-medium text-[26px] sm:text-[30px] tracking-[-0.01em] text-[var(--text-primary)] leading-tight mt-3">
                    {project.title}
                  </h3>
                  <p className="text-[15.5px] text-[var(--text-body)] leading-relaxed mt-4 max-w-[46ch]">
                    {project.shortDesc}
                  </p>

                  {/* Real endpoint, no invented metrics */}
                  {project.apiEndpoint && (
                    <p className="font-mono text-[12.5px] text-[var(--text-secondary)] mt-6">
                      {project.apiEndpoint.method} {project.apiEndpoint.path}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-8">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-[13px] text-[var(--text-primary)] min-h-[44px] underline-offset-4 hover:underline"
                    >
                      <Github className="w-3.5 h-3.5" aria-hidden="true" />
                      Source code
                    </a>
                    <button
                      onClick={() => onOpenModal(project)}
                      className="group/cta inline-flex items-center gap-2 font-mono text-[13px] font-medium text-[var(--text-primary)] min-h-[44px] underline underline-offset-4 decoration-[var(--border-strong)] hover:decoration-[var(--text-primary)] transition-colors"
                    >
                      View Architecture &amp; Specs
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* System pipeline: open topology with a travelling packet on hover */}
                <div className="lg:col-span-7 lg:pl-6">
                  <div className="relative">
                    {/* vertical rail */}
                    <span
                      className="absolute left-[19px] top-2 bottom-2 w-px bg-[var(--border-color)]"
                      aria-hidden="true"
                    />
                    {/* packet that travels the rail while hovering the band */}
                    <span
                      className="packet absolute left-[16px] w-1.5 h-1.5 bg-[var(--text-primary)] opacity-70"
                      aria-hidden="true"
                    />
                    <ol className="space-y-7 relative">
                      {(project.architectureDiagram || []).map((step, i) => (
                        <PipelineStep key={i} step={step} index={i} />
                      ))}
                    </ol>
                  </div>
                  <p className="font-mono text-[11px] text-[var(--text-secondary)] mt-6 lg:mt-8 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full border border-[var(--border-strong)]" aria-hidden="true" />
                    Follow the flow, then open the full system specs.
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
