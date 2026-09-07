import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolioData';
const IconCloudDemo = lazy(() => import('./ui/IconCloudDemo'));

function BrandLogo({ slug, color, fallbackName }) {
  const [svgPath, setSvgPath] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (slug) {
      import('react-icon-cloud')
        .then(({ fetchSimpleIcons }) => fetchSimpleIcons({ slugs: [slug] }))
        .then((res) => {
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
        className="w-6 h-6 fill-current"
        style={{ color: color || 'var(--text-primary)' }}
        aria-hidden="true"
      >
        <path d={svgPath} />
      </svg>
    );
  }

  return (
    <div
      style={{ color: color || 'var(--text-primary)' }}
      className="w-6 h-6 flex items-center justify-center font-mono font-bold text-[10px]"
      aria-hidden="true"
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
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        projectsElem.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      }
    }
  };

  const handleSkillKey = (e, skillName) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSkillClick(skillName);
    }
  };

  return (
    <section id="skills" className="py-20 sm:py-24 bg-[var(--bg-muted)] border-b border-[var(--border-color)] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header with 3D icon cloud (kept, lazy-loaded) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pb-12 border-b border-[var(--border-strong)]">
          <div className="lg:col-span-7">
            <h2 className="font-heading font-semibold text-[28px] sm:text-[32px] tracking-[-0.01em] text-[var(--text-primary)]">
              Built with High-Performance Backend Infrastructure.
            </h2>
            <p className="mt-3 text-[15.5px] text-[var(--text-body)] leading-relaxed max-w-[58ch]">
              Explore my backend ecosystem. Drag or hover over the 3D tech sphere to inspect language tools, databases, and cloud microservice engines, or click any skill to filter projects.
            </p>

            {selectedSkill && (
              <div className="inline-flex items-center gap-3 mt-5 px-4 py-2 bg-[var(--bg-card)] border border-[var(--border-strong)] font-mono text-xs text-[var(--text-primary)]">
                <span className="w-2 h-2 bg-[var(--accent-emerald)]" aria-hidden="true" />
                <span>Filtering Projects by: <strong>{selectedSkill}</strong></span>
                <button
                  onClick={() => onSelectSkill(null)}
                  className="min-h-[44px] px-2 flex items-center underline underline-offset-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 flex justify-center w-full">
            <Suspense fallback={<div className="h-[280px] w-full max-w-lg" aria-hidden="true" />}>
              <IconCloudDemo />
            </Suspense>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 pt-10 pb-8" role="group" aria-label="Filter skills by category">
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

        {/* Skills datasheet grid: shared hairlines, no cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border-color)] border border-[var(--border-color)]">
          {filteredSkills.map((skill, idx) => {
            const isSelected = selectedSkill === skill.name;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: Math.min(idx * 0.03, 0.3) }}
                role="button"
                tabIndex={0}
                onClick={() => handleSkillClick(skill.name)}
                onKeyDown={(e) => handleSkillKey(e, skill.name)}
                aria-pressed={isSelected}
                className={`p-5 cursor-pointer transition-colors text-left focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--text-primary)] ${
                  isSelected
                    ? 'bg-[var(--text-primary)] text-[var(--bg-page)]'
                    : 'bg-[var(--bg-page)] hover:bg-[var(--bg-card)]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <BrandLogo slug={skill.slug} color={isSelected ? 'var(--bg-page)' : skill.brandColor} fallbackName={skill.name} />
                  <span className={`font-mono text-[10px] uppercase tracking-[0.06em] border px-2 py-0.5 ${
                    isSelected
                      ? 'border-[var(--bg-page)] text-[var(--bg-page)]'
                      : 'border-[var(--border-strong)] text-[var(--text-secondary)]'
                  }`}>
                    {skill.level}
                  </span>
                </div>
                <h3 className={`font-heading font-medium text-[15px] mt-4 ${isSelected ? 'text-[var(--bg-page)]' : 'text-[var(--text-primary)]'}`}>
                  {skill.name}
                </h3>
                <p className={`font-mono text-[12px] mt-1 ${isSelected ? 'opacity-80' : 'text-[var(--text-secondary)]'}`}>
                  {skill.category}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
