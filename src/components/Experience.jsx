import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Briefcase, GraduationCap, MapPin, Calendar } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

/* ── spring easing (expo-out, no bounce) ── */
const SPRING = { type: 'spring', stiffness: 260, damping: 24 };
const STAGGER_EASE = [0.22, 1, 0.36, 1];

/* ── tiny mono label ── */
function MonoLabel({ children, className = '' }) {
  return (
    <span className={`font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--text-secondary)] ${className}`}>
      {children}
    </span>
  );
}

/* ── impact metric chip ── */
function MetricChip({ label, value }) {
  return (
    <div className="metric-chip group/chip">
      <span className="metric-chip__value">{value}</span>
      <span className="metric-chip__label">{label}</span>
    </div>
  );
}

/* ── tech capsule (same language as AboutSkills v2) ── */
function TechCapsule({ name }) {
  return (
    <span className="tech-capsule">{name}</span>
  );
}

/* ── timeline dot with pulse ring ── */
function TimelineDot({ active = false }) {
  return (
    <div className="timeline-dot-wrapper" aria-hidden="true">
      <div className={`timeline-dot ${active ? 'timeline-dot--active' : ''}`} />
      {active && <div className="timeline-dot__ring" />}
    </div>
  );
}

/* ── single entry row ── */
function EntryRow({ entry, idx, variant = 'work' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const isWork = variant === 'work';
  const metrics = entry.impactMetrics || [];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: Math.min(idx * 0.04, 0.2), ease: STAGGER_EASE }}
      className="exp-entry"
    >
      {/* ── timeline spine ── */}
      <div className="exp-entry__spine">
        <TimelineDot active={inView} />
        {idx < (isWork ? PORTFOLIO_DATA.experiences.length - 1 : PORTFOLIO_DATA.education.length - 1) && (
          <div className="exp-entry__line" />
        )}
      </div>

      {/* ── content column ── */}
      <div className="exp-entry__body">
        {/* period + location row */}
        <div className="exp-entry__meta">
          <div className="exp-entry__meta-left">
            <Calendar size={13} className="exp-entry__icon" aria-hidden="true" />
            <span className="font-mono text-[13px] text-[var(--text-primary)]">{entry.period}</span>
          </div>
          {entry.location && (
            <div className="exp-entry__meta-right">
              <MapPin size={12} className="exp-entry__icon" aria-hidden="true" />
              <span className="font-mono text-[12px]">{entry.location}</span>
            </div>
          )}
        </div>

        {/* role / degree */}
        <h3 className="exp-entry__title">
          {isWork ? entry.role : entry.degree}
        </h3>

        {/* company / institution */}
        <p className="exp-entry__org">
          {isWork ? entry.company : entry.institution}
        </p>

        {/* description */}
        <p className="exp-entry__desc">
          {entry.description || entry.highlights}
        </p>

        {/* impact metrics (work only) */}
        {metrics.length > 0 && (
          <div className="exp-entry__metrics">
            <MonoLabel>Impact</MonoLabel>
            <div className="exp-entry__metrics-row">
              {metrics.map((m, i) => (
                <MetricChip key={i} label={m.label} value={m.value} />
              ))}
            </div>
          </div>
        )}

        {/* architecture milestones (work only) */}
        {entry.architectureMilestones && (
          <ul className="exp-entry__milestones">
            {entry.architectureMilestones.map((ms, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.35, delay: Math.min(idx * 0.04 + i * 0.03, 0.3), ease: STAGGER_EASE }}
                className="exp-entry__milestone-item"
              >
                <span className="exp-entry__milestone-bullet" aria-hidden="true" />
                <span>{ms}</span>
              </motion.li>
            ))}
          </ul>
        )}

        {/* tech stack capsules (work only) */}
        {entry.techStack && (
          <div className="exp-entry__stack">
            <MonoLabel>Stack</MonoLabel>
            <div className="exp-entry__stack-row">
              {entry.techStack.map((t, i) => (
                <TechCapsule key={i} name={t} />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ── main component ── */
export default function Experience() {
  const [activeTab, setActiveTab] = useState('experience');
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="exp-section"
    >
      <div className="exp-inner">
        {/* ── header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: STAGGER_EASE }}
          className="exp-header"
        >
          <div className="exp-header__text">
            <MonoLabel className="exp-header__eyebrow">Career Path</MonoLabel>
            <h2 className="exp-header__title">
              Engineering Experience<br className="hidden sm:inline" />
              <span className="exp-header__title-accent">&amp; Education</span>
            </h2>
            <p className="exp-header__lede">
              Demonstrated track record of designing backend microservices,
              optimizing database performance, and collaborating in
              high-velocity tech teams.
            </p>
          </div>

          {/* ── tab switcher (organic pill, not boxy) ── */}
          <div className="exp-tabs" role="group" aria-label="Switch between work experience and education">
            <button
              onClick={() => setActiveTab('experience')}
              aria-pressed={activeTab === 'experience'}
              className={`exp-tab ${activeTab === 'experience' ? 'exp-tab--active' : ''}`}
            >
              <Briefcase size={14} aria-hidden="true" />
              <span>Experience</span>
            </button>
            <button
              onClick={() => setActiveTab('education')}
              aria-pressed={activeTab === 'education'}
              className={`exp-tab ${activeTab === 'education' ? 'exp-tab--active' : ''}`}
            >
              <GraduationCap size={14} aria-hidden="true" />
              <span>Education</span>
            </button>
          </div>
        </motion.div>

        {/* ── content ── */}
        <AnimatePresence mode="wait">
          {activeTab === 'experience' ? (
            <motion.div
              key="experience"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: STAGGER_EASE }}
              className="exp-timeline"
            >
              {PORTFOLIO_DATA.experiences.map((exp, idx) => (
                <EntryRow key={idx} entry={exp} idx={idx} variant="work" />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: STAGGER_EASE }}
              className="exp-timeline"
            >
              {PORTFOLIO_DATA.education.map((edu, idx) => (
                <EntryRow key={idx} entry={edu} idx={idx} variant="edu" />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}