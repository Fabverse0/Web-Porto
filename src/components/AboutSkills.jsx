import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolioData';
const IconCloudDemo = lazy(() => import('./ui/IconCloudDemo'));

/* ── Brand logo from react-icon-cloud ── */
function BrandLogo({ slug, color, fallbackName, size = 18 }) {
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
        })
        .catch(() => {});
    }
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (!svgPath) {
    return (
      <span
        className="skill-mark-fallback"
        aria-hidden="true"
        style={{ width: size, height: size }}
      >
        {(fallbackName || '?').charAt(0).toUpperCase()}
      </span>
    );
  }

  return (
    <svg
      role="img"
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      style={{ flexShrink: 0 }}
    >
      <path d={svgPath} fill={color || 'currentColor'} />
    </svg>
  );
}

/* ── Level meter: hairline gauge with measured fill ── */
function LevelMeter({ level, percentage }) {
  const p = typeof percentage === 'number' ? Math.max(0, Math.min(100, percentage)) : 0;
  return (
    <span className="skill-meter" aria-hidden="true">
      <span className="skill-meter-fill" style={{ width: `${p}%` }} data-level={level} />
    </span>
  );
}

/* ── Stat line: counts derived from data ── */
function SkillStatLine({ skills }) {
  const domains = new Set(skills.map((s) => s.category)).size;
  const experts = skills.filter((s) => s.level === 'Expert').length;
  const top = Math.max(...skills.map((s) => s.percentage || 0));
  return (
    <p
      className="skill-stat-line"
      aria-label={`${skills.length} tools across ${domains} domains, ${experts} at expert level, peak depth ${top} percent`}
    >
      <span><strong>{String(skills.length).padStart(2, '0')}</strong> TOOLS</span>
      <span aria-hidden="true" className="skill-stat-sep">/</span>
      <span><strong>{String(domains).padStart(2, '0')}</strong> DOMAINS</span>
      <span aria-hidden="true" className="skill-stat-sep">/</span>
      <span><strong>{String(experts).padStart(2, '0')}</strong> EXPERT</span>
      <span aria-hidden="true" className="skill-stat-sep">/</span>
      <span><strong>{String(top).padStart(2, '0')}</strong> PEAK</span>
    </p>
  );
}

/* ── Marquee strip: editorial meta line (informasi non-duplikat) ── */
function SkillMarquee() {
  const line = 'JAKARTA, ID · REMOTE FRIENDLY · OPEN FOR FULL-TIME & FREELANCE · TYPICAL RESPONSE < 2 HRS';
  return (
    <div className="skill-marquee" aria-hidden="true">
      <div className="skill-marquee-track">
        <span>{line}&nbsp;&nbsp;·&nbsp;&nbsp;</span>
        <span>{line}&nbsp;&nbsp;·&nbsp;&nbsp;</span>
        <span>{line}&nbsp;&nbsp;·&nbsp;&nbsp;</span>
      </div>
    </div>
  );
}

/* ── Domain row: editorial monolith — Fraunces giant index + doc rows ── */
function DomainRow({ index, category, skills, selectedSkill, onSkillClick }) {
  const roman = ['I', 'II', 'III', 'IV', 'V', 'VI'][index] || String(index + 1);
  const best = skills.reduce((a, s) => ((s.percentage || 0) > (a.percentage || 0) ? s : a), skills[0]);

  return (
    <motion.article
      className={'skill-domain' + (selectedSkill ? ' skill-domain--dim' : '')}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <header className="skill-domain-head">
        <span className="skill-domain-no" aria-hidden="true">{roman}</span>
        <h3 className="skill-domain-title">{category}</h3>
        <span className="skill-domain-meta" aria-hidden="true">
          {String(skills.length).padStart(2, '0')} ENTRIES — PEAK {best ? best.percentage : 0}%
        </span>
      </header>

      <ul className="skill-doclist">
        {skills.map((skill) => {
          const isSelected = selectedSkill === skill.name;
          const dimmed = selectedSkill && !isSelected;
          return (
            <li key={skill.name}>
              <motion.button
                type="button"
                tabIndex={0}
                onClick={() => onSkillClick(skill.name)}
                aria-pressed={isSelected}
                aria-label={`${skill.name} — ${skill.level}, ${skill.percentage} percent. Filter projects.`}
                className={
                  'skill-doc' +
                  (isSelected ? ' is-selected' : '') +
                  (dimmed ? ' is-dimmed' : '')
                }
                whileTap={{ scale: 0.995 }}
              >
                <span className="skill-doc-brand" aria-hidden="true">
                  <BrandLogo
                    slug={skill.slug}
                    color={isSelected ? 'var(--bg-page)' : skill.brandColor}
                    fallbackName={skill.name}
                    size={18}
                  />
                </span>

                <span className="skill-doc-name">{skill.name}</span>

                <span className="skill-doc-level" data-level={skill.level}>
                  {skill.level}
                </span>

                <LevelMeter level={skill.level} percentage={skill.percentage} />

                <span className="skill-doc-pct" aria-hidden="true">
                  {skill.percentage}
                  <em>%</em>
                </span>
              </motion.button>
            </li>
          );
        })}
      </ul>
    </motion.article>
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

          <div className="lg:col-span-5 flex justify-center w-full" data-cursor="drag">
            <Suspense fallback={<div className="h-[280px] w-full max-w-lg" aria-hidden="true" />}>
              <IconCloudDemo />
            </Suspense>
          </div>
        </div>

        {/* ── Stat line: derived counts ── */}
        <SkillStatLine skills={PORTFOLIO_DATA.skills} />

        {/* ── Domain monolith rows ── */}
        <div className="skill-domains">
          {categories.map((cat, i) => (
            <DomainRow
              key={cat}
              index={i}
              category={cat}
              skills={PORTFOLIO_DATA.skills.filter((s) => s.category === cat)}
              selectedSkill={selectedSkill}
              onSkillClick={handleSkillClick}
            />
          ))}
        </div>

        {/* ── Marquee: editorial meta line ── */}
        <SkillMarquee />

      </div>
    </section>
  );
}
