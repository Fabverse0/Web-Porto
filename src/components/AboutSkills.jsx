import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolioData';
const IconCloudDemo = lazy(() => import('./ui/IconCloudDemo'));

/* ── Brand logo from react-icon-cloud ── */
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
        className="skill-pill-icon"
        style={{ color: color || 'var(--text-primary)' }}
        aria-hidden="true"
      >
        <path d={svgPath} />
      </svg>
    );
  }

  return (
    <span
      style={{ color: color || 'var(--text-primary)' }}
      className="skill-pill-icon skill-pill-fallback"
      aria-hidden="true"
    >
      {fallbackName ? fallbackName.substring(0, 2).toUpperCase() : 'TC'}
    </span>
  );
}

/* ── Level dot indicator: ● expert, ◐ advanced, ○ intermediate ── */
function LevelDot({ level }) {
  const symbol = level === 'Expert' ? '●' : level === 'Advanced' ? '◐' : '○';
  const cls = level === 'Expert' ? 'level-expert' : level === 'Advanced' ? 'level-advanced' : 'level-intermediate';
  return (
    <span className={`skill-level-dot ${cls}`} aria-label={level} title={level}>
      {symbol}
    </span>
  );
}

/* ── Marquee strip ── */
function SkillMarquee({ items }) {
  const line = items.map((s) => s.name.toUpperCase()).join('   ·   ');
  return (
    <div className="skill-marquee" aria-hidden="true">
      <div className="skill-marquee-track">
        <span className="font-mono">{line}&nbsp;&nbsp;·&nbsp;&nbsp;</span>
        <span className="font-mono">{line}&nbsp;&nbsp;·&nbsp;&nbsp;</span>
        <span className="font-mono">{line}&nbsp;&nbsp;·&nbsp;&nbsp;</span>
      </div>
    </div>
  );
}

/* ── Category band ── */
function CategoryBand({ category, skills, selectedSkill, onSkillClick, onSkillKey, delayBase }) {
  return (
    <motion.div
      className="skill-band"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: delayBase, ease: [0.2, 0, 0, 1] }}
    >
      <div className="skill-band-header">
        <span className="font-mono skill-band-label">{category}</span>
        <span className="font-mono skill-band-count">{skills.length}</span>
      </div>
      <div className="skill-band-items">
        {skills.map((skill, idx) => {
          const isSelected = selectedSkill === skill.name;
          return (
            <motion.button
              key={skill.name}
              type="button"
              role="button"
              tabIndex={0}
              onClick={() => onSkillClick(skill.name)}
              onKeyDown={(e) => onSkillKey(e, skill.name)}
              aria-pressed={isSelected}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.28, delay: Math.min(idx * 0.035, 0.25), ease: [0.2, 0, 0, 1] }}
              className={`skill-pill ${isSelected ? 'skill-pill--active' : ''}`}
            >
              <BrandLogo
                slug={skill.slug}
                color={isSelected ? 'var(--bg-page)' : skill.brandColor}
                fallbackName={skill.name}
              />
              <span className="skill-pill-name">{skill.name}</span>
              <LevelDot level={skill.level} />
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function AboutSkills({ selectedSkill, onSelectSkill }) {
  const categories = ['Languages', 'Databases', 'API & Messaging', 'Cloud & DevOps'];

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
    <section
      id="skills"
      className="py-20 sm:py-24 bg-[var(--bg-muted)] border-b border-[var(--border-color)] transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header with 3D icon cloud (untouched) ── */}
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

        {/* ── Marquee strip ── */}
        <SkillMarquee items={PORTFOLIO_DATA.skills} />

        {/* ── Category bands ── */}
        <div className="skill-bands">
          {categories.map((cat, i) => (
            <CategoryBand
              key={cat}
              category={cat}
              skills={PORTFOLIO_DATA.skills.filter((s) => s.category === cat)}
              selectedSkill={selectedSkill}
              onSkillClick={handleSkillClick}
              onSkillKey={handleSkillKey}
              delayBase={i * 0.06}
            />
          ))}
        </div>

      </div>
    </section>
  );
}