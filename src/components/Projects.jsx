import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Layers, Activity, ArrowUpRight, Github, ExternalLink, Terminal } from 'lucide-react';

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
    <section id="projects" className="py-20 bg-[var(--bg-page)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#10B981] tracking-wider uppercase">
              <Layers className="w-3.5 h-3.5" />
              Featured Backend Architectures
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[var(--text-primary)] tracking-tight">
              Production-Grade Systems & High-Throughput APIs.
            </h2>
            <p className="text-[var(--text-secondary)] text-base leading-relaxed">
              Explore real-world backend projects complete with system topology diagrams, throughput benchmarks, and interactive cURL endpoints.
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
                    ? 'bg-[var(--text-primary)] text-[var(--bg-page)] font-semibold shadow-sm'
                    : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {projectsList.length === 0 ? (
          <div className="p-12 text-center bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl space-y-3">
            <div className="font-mono text-sm font-bold text-[var(--text-primary)]">No projects found for active filter.</div>
            <p className="text-xs text-[var(--text-secondary)]">Try clearing the skill filter or selecting a different category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsList.map((project) => (
              <div
                key={project.id}
                className="card-light rounded-2xl p-6 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  {/* Category & Status */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#2563EB] bg-[#2563EB]/10 px-2.5 py-1 rounded">
                      {project.category}
                    </span>
                    <span className="font-mono text-[11px] text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/20">
                      {project.metrics.throughput}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="font-heading font-bold text-xl text-[var(--text-primary)] group-hover:text-[#2563EB] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                      {project.shortDesc}
                    </p>
                  </div>

                  {/* High-Impact Metrics Pills */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="p-2.5 rounded-lg bg-[var(--bg-muted)] border border-[var(--border-color)] space-y-0.5">
                      <div className="font-mono text-[10px] text-[var(--text-secondary)] uppercase">Latency (p99)</div>
                      <div className="font-mono font-bold text-xs text-[var(--text-primary)]">{project.metrics.latency}</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[var(--bg-muted)] border border-[var(--border-color)] space-y-0.5">
                      <div className="font-mono text-[10px] text-[var(--text-secondary)] uppercase">Uptime SLA</div>
                      <div className="font-mono font-bold text-xs text-[#10B981]">{project.metrics.uptime}</div>
                    </div>
                  </div>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`font-mono text-[11px] px-2 py-0.5 rounded border ${
                          selectedSkill === tag
                            ? 'bg-[var(--text-primary)] text-[var(--bg-page)] border-[var(--text-primary)] font-bold'
                            : 'bg-[var(--bg-card)] text-[var(--text-primary)] border-[var(--border-color)]'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action Trigger */}
                <div className="pt-4 border-t border-[var(--border-color)]">
                  <button
                    onClick={() => onOpenModal(project)}
                    className="btn-black w-full justify-center text-xs py-2.5 shadow-sm"
                  >
                    View Architecture & Specs
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
