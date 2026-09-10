import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { MapPin, Calendar, ChevronDown, GraduationCap, Briefcase } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

const EASE = [0.22, 1, 0.36, 1];

function MonoLabel({ children, className = '' }) {
  return (
    <span className={`font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--text-secondary)] ${className}`}>
      {children}
    </span>
  );
}

function TechCapsule({ name }) {
  return <span className="tech-capsule">{name}</span>;
}

function DocEntry({ entry, idx, variant = 'work', expanded, onToggle }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  const isWork = variant === 'work';
  const num = String(idx + 1).padStart(2, '0');
  const hasDetail =
    (entry.architectureMilestones && entry.architectureMilestones.length > 0) ||
    (entry.techStack && entry.techStack.length > 0);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.15), ease: EASE }}
      className="exp-doc-entry"
    >
      <div className="exp-doc-meta">
        <div className="exp-doc-period">
          <Calendar size={12} className="exp-doc-meta-icon" aria-hidden="true" />
          <span>{entry.period}</span>
        </div>
        {entry.location && (
          <div className="exp-doc-location">
            <MapPin size={11} className="exp-doc-meta-icon" aria-hidden="true" />
            <span>{entry.location}</span>
          </div>
        )}
        <div className="exp-doc-number" aria-hidden="true">{num}</div>
      </div>

      <div className="exp-doc-main">
        <h3 className="exp-doc-title">{isWork ? entry.role : entry.degree}</h3>
        <p className="exp-doc-org">{isWork ? entry.company : entry.institution}</p>
        <p className="exp-doc-desc">{entry.description || entry.highlights}</p>

        {isWork && hasDetail && (
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            className="exp-doc-toggle"
          >
            <span>{expanded ? 'Hide details' : 'View details'}</span>
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="exp-doc-toggle-icon"
            >
              <ChevronDown size={14} />
            </motion.span>
          </button>
        )}

        {hasDetail && (
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="exp-doc-expand"
              >
                {entry.architectureMilestones && entry.architectureMilestones.length > 0 && (
                  <ul className="exp-doc-milestones">
                    {entry.architectureMilestones.map((ms, i) => (
                      <li key={i} className="exp-doc-milestone">
                        <span className="exp-doc-bullet" aria-hidden="true" />
                        <span>{ms}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {entry.techStack && entry.techStack.length > 0 && (
                  <div className="exp-doc-stack">
                    <MonoLabel>Stack</MonoLabel>
                    <div className="exp-doc-stack-row">
                      {entry.techStack.map((t) => (
                        <TechCapsule key={t} name={t} />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}

const TABS = [
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'experience', label: 'Work Experience', icon: Briefcase },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.08 });
  const [activeTab, setActiveTab] = useState('education');
  const [expandedWork, setExpandedWork] = useState(0);
  const tabRefs = useRef([]);

  const counts = {
    education: PORTFOLIO_DATA.education.length,
    experience: PORTFOLIO_DATA.experiences.length,
  };

  const focusTab = (idx) => {
    const el = tabRefs.current[idx];
    if (el) el.focus();
  };

  const onTabKeyDown = (e, idx) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = (idx + 1) % TABS.length;
      setActiveTab(TABS[next].id);
      focusTab(next);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = (idx - 1 + TABS.length) % TABS.length;
      setActiveTab(TABS[prev].id);
      focusTab(prev);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActiveTab(TABS[0].id);
      focusTab(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActiveTab(TABS[TABS.length - 1].id);
      focusTab(TABS.length - 1);
    }
  };

  return (
    <section id="experience" ref={sectionRef} className="exp-section">
      <div className="exp-inner">
        <motion.div
          initial={{ opacity: 0 }}
          animate={sectionInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.45, ease: EASE }}
          className="exp-header"
        >
          <div className="exp-header__text">
            <MonoLabel className="exp-header__eyebrow">Career Path</MonoLabel>
            <h2 className="exp-header__title">
              Engineering Experience
              <span className="exp-header__title-accent"> &amp; Education</span>
            </h2>
            <p className="exp-header__lede">
              Backend systems, database performance, and team delivery — documented as a spec sheet, not a timeline.
            </p>
          </div>

          <div className="exp-tabs" role="tablist" aria-label="Experience sections">
            {TABS.map((tab, idx) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  ref={(el) => { tabRefs.current[idx] = el; }}
                  type="button"
                  role="tab"
                  id={`exp-tab-${tab.id}`}
                  aria-selected={active}
                  aria-controls={`exp-panel-${tab.id}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setActiveTab(tab.id)}
                  onKeyDown={(e) => onTabKeyDown(e, idx)}
                  className={`exp-tab ${active ? 'exp-tab--active' : ''}`}
                >
                  <Icon size={14} aria-hidden="true" />
                  <span>{tab.label}</span>
                  <span className="exp-tab-count" aria-hidden="true">{counts[tab.id]}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === 'education' ? (
            <motion.div
              key="education"
              role="tabpanel"
              id="exp-panel-education"
              aria-labelledby="exp-tab-education"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="exp-doc-list"
            >
              {PORTFOLIO_DATA.education.map((edu, idx) => (
                <DocEntry key={edu.degree + idx} entry={edu} idx={idx} variant="edu" expanded={true} onToggle={() => {}} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="experience"
              role="tabpanel"
              id="exp-panel-experience"
              aria-labelledby="exp-tab-experience"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="exp-doc-list"
            >
              {PORTFOLIO_DATA.experiences.map((exp, idx) => (
                <DocEntry
                  key={exp.role + idx}
                  entry={exp}
                  idx={idx}
                  variant="work"
                  expanded={expandedWork === idx}
                  onToggle={() => setExpandedWork(expandedWork === idx ? -1 : idx)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
