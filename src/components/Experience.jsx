import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Experience() {
  const [activeTab, setActiveTab] = useState('experience');

  return (
    <section id="experience" className="py-20 sm:py-24 bg-[var(--bg-page)] border-b border-[var(--border-color)] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header + tabs */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 border-b border-[var(--border-strong)]">
          <div className="max-w-xl">
            <h2 className="font-heading font-semibold text-[28px] sm:text-[32px] tracking-[-0.01em] text-[var(--text-primary)]">
              Engineering Experience &amp; Education.
            </h2>
            <p className="mt-3 text-[15.5px] text-[var(--text-body)] leading-relaxed max-w-[58ch]">
              Demonstrated track record of designing backend microservices, optimizing database performance, and collaborating in high-velocity tech teams.
            </p>
          </div>

          <div className="flex border border-[var(--border-strong)]" role="group" aria-label="Switch between work experience and education">
            <button
              onClick={() => setActiveTab('experience')}
              aria-pressed={activeTab === 'experience'}
              className={`font-mono text-[13px] px-4 py-2.5 transition-colors ${
                activeTab === 'experience'
                  ? 'bg-[var(--text-primary)] text-[var(--bg-page)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-muted)]'
              }`}
            >
              Work Experience
            </button>
            <button
              onClick={() => setActiveTab('education')}
              aria-pressed={activeTab === 'education'}
              className={`font-mono text-[13px] px-4 py-2.5 border-l border-[var(--border-strong)] transition-colors ${
                activeTab === 'education'
                  ? 'bg-[var(--text-primary)] text-[var(--bg-page)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-muted)]'
              }`}
            >
              Education
            </button>
          </div>
        </div>

        {/* Work experience rows */}
        {activeTab === 'experience' && (
          <div>
            {PORTFOLIO_DATA.experiences.map((exp, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="py-10 border-b border-[var(--border-color)] grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10"
              >
                {/* Meta column */}
                <div className="lg:col-span-4">
                  <p className="font-mono text-[13px] text-[var(--text-primary)]">{exp.period}</p>
                  <p className="font-mono text-[12.5px] text-[var(--text-secondary)] mt-2">{exp.company}</p>
                  {exp.location && (
                    <p className="font-mono text-[12.5px] text-[var(--text-secondary)]">{exp.location}</p>
                  )}
                </div>

                {/* Content column */}
                <div className="lg:col-span-8">
                  <h3 className="font-heading font-medium text-[20px] text-[var(--text-primary)]">{exp.role}</h3>
                  <p className="text-[15px] text-[var(--text-body)] leading-relaxed mt-3 max-w-[65ch]">{exp.description}</p>

                  {exp.architectureMilestones && (
                    <ul className="mt-5 space-y-2.5">
                      {exp.architectureMilestones.map((ms, msIdx) => (
                        <li key={msIdx} className="flex items-start gap-3 text-[14px] text-[var(--text-body)] leading-relaxed max-w-[70ch]">
                          <span className="mt-[7px] w-1.5 h-1.5 bg-[var(--text-primary)] shrink-0" aria-hidden="true" />
                          <span>{ms}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {exp.techStack && (
                    <p className="font-mono text-[12.5px] text-[var(--text-secondary)] mt-5">
                      {exp.techStack.join(', ')}
                    </p>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Education rows */}
        {activeTab === 'education' && (
          <div>
            {PORTFOLIO_DATA.education.map((edu, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="py-10 border-b border-[var(--border-color)] grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10"
              >
                <div className="lg:col-span-4">
                  <p className="font-mono text-[13px] text-[var(--text-primary)]">{edu.period}</p>
                  <p className="font-mono text-[12.5px] text-[var(--text-secondary)] mt-2">{edu.institution}</p>
                </div>
                <div className="lg:col-span-8">
                  <h3 className="font-heading font-medium text-[20px] text-[var(--text-primary)]">{edu.degree}</h3>
                  <p className="text-[15px] text-[var(--text-body)] leading-relaxed mt-3 max-w-[65ch]">{edu.highlights}</p>
                </div>
              </motion.article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
