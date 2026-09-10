import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

/* expo-out, no bounce — ref: DELIVERY study + Linear 150ms */
const EASE = [0.22, 1, 0.36, 1];

/* ── mono label ── */
function MonoLabel({ children, className = '' }) {
  return (
    <span className={`font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--text-secondary)] ${className}`}>
      {children}
    </span>
  );
}

/* ── tech capsule hairline ── */
function TechCapsule({ name }) {
  return <span className="tech-capsule">{name}</span>;
}

/* ── doc entry: left meta (period + place + number) | right main ── */
function DocEntry({ entry, idx, variant = 'work' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const isWork = variant === 'work';
  const num = String(idx + 1).padStart(2, '0');

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4, delay: Math.min(idx * 0.06, 0.18), ease: EASE }}
      className="exp-doc-entry"
    >
      {/* left meta — sticky on desktop (Brittany pattern) */}
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

      {/* right main */}
      <div className="exp-doc-main">
        <h3 className="exp-doc-title">{isWork ? entry.role : entry.degree}</h3>
        <p className="exp-doc-org">{isWork ? entry.company : entry.institution}</p>
        <p className="exp-doc-desc">{entry.description || entry.highlights}</p>

        {/* milestones — plain hairline bullets, no spring spam (ref: 21st hairline) */}
        {entry.architectureMilestones && (
          <ul className="exp-doc-milestones">
            {entry.architectureMilestones.map((ms, i) => (
              <li key={i} className="exp-doc-milestone">
                <span className="exp-doc-bullet" aria-hidden="true" />
                <span>{ms}</span>
              </li>
            ))}
          </ul>
        )}

        {/* stack — mono hairline capsules (Park 1px) */}
        {entry.techStack && (
          <div className="exp-doc-stack">
            <MonoLabel>Stack</MonoLabel>
            <div className="exp-doc-stack-row">
              {entry.techStack.map((t) => (
                <TechCapsule key={t} name={t} />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ── main ── */
export default function Experience() {
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.08 });

  return (
    <section id="experience" ref={sectionRef} className="exp-section">
      <div className="exp-inner">
        {/* header — no tabs, stacked doc (ref: Semplice no-template) */}
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
        </motion.div>

        {/* work group */}
        <div className="exp-doc-group" aria-labelledby="exp-work-heading">
          <div className="exp-doc-group-head">
            <MonoLabel id="exp-work-heading">Work Experience</MonoLabel>
            <span className="exp-doc-group-line" aria-hidden="true" />
          </div>
          <div className="exp-doc-list">
            {PORTFOLIO_DATA.experiences.map((exp, idx) => (
              <DocEntry key={exp.role + idx} entry={exp} idx={idx} variant="work" />
            ))}
          </div>
        </div>

        {/* education group */}
        <div className="exp-doc-group" aria-labelledby="exp-edu-heading">
          <div className="exp-doc-group-head">
            <MonoLabel id="exp-edu-heading">Education</MonoLabel>
            <span className="exp-doc-group-line" aria-hidden="true" />
          </div>
          <div className="exp-doc-list">
            {PORTFOLIO_DATA.education.map((edu, idx) => (
              <DocEntry key={edu.degree + idx} entry={edu} idx={idx} variant="edu" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
