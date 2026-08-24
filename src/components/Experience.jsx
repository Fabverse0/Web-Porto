import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Briefcase, GraduationCap, Calendar, Building2, CheckCircle2, Cpu, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Experience() {
  const [activeTab, setActiveTab] = useState('experience');

  return (
    <section id="experience" className="py-20 sm:py-24 bg-[#FAF8F5] dark:bg-[#18181B] border-t border-[#DDD7C8] dark:border-[#27272A] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#004741] dark:text-[#60A5FA] tracking-wider uppercase">
              <Briefcase className="w-3.5 h-3.5 text-[#10B981]" />
              Career Track Record
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#004741] dark:text-[#FAFAFA] tracking-tight">
              Engineering Experience & Education.
            </h2>
            <p className="text-[#4A635F] dark:text-[#A1A1AA] text-base sm:text-lg leading-relaxed">
              Demonstrated track record of designing backend microservices, optimizing database performance, and collaborating in high-velocity tech teams.
            </p>
          </div>

          {/* Tab Switcher with Framer Motion Sliding Pill */}
          <div className="flex bg-[#E5E0D4] dark:bg-[#09090B] p-1 rounded-2xl border border-[#DDD7C8] dark:border-[#27272A] self-start md:self-auto">
            <button
              onClick={() => setActiveTab('experience')}
              className={`relative flex items-center gap-2 font-heading font-medium text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all min-h-[40px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004741] ${
                activeTab === 'experience'
                  ? 'text-[#F0EDE4] dark:text-[#09090B] font-semibold'
                  : 'text-[#4A635F] dark:text-[#A1A1AA] hover:text-[#004741] dark:hover:text-[#FAFAFA]'
              }`}
            >
              {activeTab === 'experience' && (
                <motion.span
                  layoutId="activeExperienceTabPill"
                  className="absolute inset-0 bg-[#004741] dark:bg-[#FAFAFA] rounded-xl -z-10 shadow-xs"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <Briefcase className="w-4 h-4" />
              <span>Work Experience</span>
            </button>

            <button
              onClick={() => setActiveTab('education')}
              className={`relative flex items-center gap-2 font-heading font-medium text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all min-h-[40px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004741] ${
                activeTab === 'education'
                  ? 'text-[#F0EDE4] dark:text-[#09090B] font-semibold'
                  : 'text-[#4A635F] dark:text-[#A1A1AA] hover:text-[#004741] dark:hover:text-[#FAFAFA]'
              }`}
            >
              {activeTab === 'education' && (
                <motion.span
                  layoutId="activeExperienceTabPill"
                  className="absolute inset-0 bg-[#004741] dark:bg-[#FAFAFA] rounded-xl -z-10 shadow-xs"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <GraduationCap className="w-4 h-4" />
              <span>Education</span>
            </button>
          </div>
        </div>

        {/* Timeline Content with Safe Insets for 375px screens */}
        <div className="relative border-l-2 border-[#DDD7C8] dark:border-[#27272A] ml-2 sm:ml-6 pl-5 sm:pl-8 space-y-10 sm:space-y-12">
          
          {activeTab === 'experience' && PORTFOLIO_DATA.experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="relative group"
            >
              {/* Timeline Dot Indicator */}
              <div className="absolute -left-[27px] sm:-left-[39px] top-3 w-3.5 h-3.5 rounded-full bg-[#004741] dark:bg-[#10B981] border-3 border-[#FAF8F5] dark:border-[#18181B] ring-2 ring-[#004741] dark:ring-[#10B981] shadow-xs"></div>

              <div className="bg-[#F0EDE4] dark:bg-[#09090B] border border-[#DDD7C8] dark:border-[#27272A] hover:border-[#004741] dark:hover:border-[#10B981] transition-all rounded-2xl p-5 sm:p-7 space-y-5 shadow-xs hover:shadow-lg">
                
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#DDD7C8] dark:border-[#27272A]">
                  <div className="space-y-1">
                    <h3 className="font-heading font-bold text-lg sm:text-xl md:text-2xl text-[#004741] dark:text-[#FAFAFA] flex items-center gap-2">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-mono text-[#004741] dark:text-[#60A5FA]">
                      <span className="flex items-center gap-1.5 font-bold">
                        <Building2 className="w-4 h-4 text-[#10B981]" />
                        {exp.company}
                      </span>
                      {exp.location && (
                        <span className="flex items-center gap-1 text-[#4A635F] dark:text-[#A1A1AA]">
                          <MapPin className="w-3.5 h-3.5" />
                          {exp.location}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF8F5] dark:bg-[#18181B] border border-[#DDD7C8] dark:border-[#27272A] font-mono text-xs font-semibold text-[#004741] dark:text-[#FAFAFA] w-fit shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Role Description */}
                <p className="text-xs sm:text-sm text-[#4A635F] dark:text-[#A1A1AA] leading-relaxed">
                  {exp.description}
                </p>

                {/* Key Architecture Milestones Checklist */}
                {exp.architectureMilestones && (
                  <div className="space-y-3 pt-2">
                    <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#004741] dark:text-[#60A5FA] flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-[#10B981]" />
                      Key Architecture Responsibilities & Solutions
                    </div>
                    <div className="space-y-2.5">
                      {exp.architectureMilestones.map((ms, msIdx) => (
                        <div key={msIdx} className="flex items-start gap-2.5 text-xs text-[#112A27] dark:text-[#FAFAFA] leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                          <span>{ms}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack Pills */}
                {exp.techStack && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#DDD7C8]/60 dark:border-[#27272A]">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-[#FAF8F5] dark:bg-[#18181B] text-[#4A635F] dark:text-[#A1A1AA] border border-[#DDD7C8] dark:border-[#27272A]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

              </div>
            </motion.div>
          ))}

          {activeTab === 'education' && PORTFOLIO_DATA.education.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="relative group"
            >
              <div className="absolute -left-[27px] sm:-left-[39px] top-3 w-3.5 h-3.5 rounded-full bg-[#004741] dark:bg-[#10B981] border-3 border-[#FAF8F5] dark:border-[#18181B] ring-2 ring-[#004741] dark:ring-[#10B981]"></div>

              <div className="bg-[#F0EDE4] dark:bg-[#09090B] border border-[#DDD7C8] dark:border-[#27272A] rounded-2xl p-5 sm:p-7 space-y-4 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-[#004741] dark:text-[#FAFAFA]">{edu.degree}</h3>
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-[#004741] dark:text-[#10B981] mt-1">
                      <GraduationCap className="w-4 h-4 text-[#10B981]" />
                      <span>{edu.institution}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] dark:bg-[#18181B] border border-[#DDD7C8] dark:border-[#27272A] font-mono text-xs font-semibold text-[#004741] dark:text-[#FAFAFA] w-fit">
                    <Calendar className="w-3.5 h-3.5 text-[#4A635F] dark:text-[#A1A1AA]" />
                    <span>{edu.period}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#4A635F] dark:text-[#A1A1AA] leading-relaxed">
                  {edu.highlights}
                </p>
              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
