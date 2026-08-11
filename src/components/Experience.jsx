import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Briefcase, GraduationCap, Calendar, Building2, Award, Zap, CheckCircle2, Cpu, ChevronRight, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Experience() {
  const [activeTab, setActiveTab] = useState('experience');

  return (
    <section id="experience" className="py-20 bg-[#FFFFFF] dark:bg-[#18181B] border-t border-[#E4E4E7] dark:border-[#27272A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#2563EB] dark:text-[#60A5FA] tracking-wider uppercase">
              <Briefcase className="w-3.5 h-3.5" />
              Career Track Record & Impact
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#09090B] dark:text-[#FAFAFA] tracking-tight">
              Engineering Milestones & Metrics.
            </h2>
            <p className="text-[#71717A] dark:text-[#A1A1AA] text-base leading-relaxed">
              Demonstrated track record of designing high-concurrency microservices, optimizing database throughput, and shipping production-grade backend infrastructure.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-[#F4F4F5] dark:bg-[#09090B] p-1 rounded-xl border border-[#E4E4E7] dark:border-[#27272A]">
            <button
              onClick={() => setActiveTab('experience')}
              className={`flex items-center gap-2 font-heading font-medium text-xs sm:text-sm px-4 py-2 rounded-lg transition-all ${
                activeTab === 'experience'
                  ? 'bg-[#09090B] dark:bg-[#FAFAFA] text-[#FFFFFF] dark:text-[#09090B] shadow-sm font-semibold'
                  : 'text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-[#FAFAFA]'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Work Experience
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`flex items-center gap-2 font-heading font-medium text-xs sm:text-sm px-4 py-2 rounded-lg transition-all ${
                activeTab === 'education'
                  ? 'bg-[#09090B] dark:bg-[#FAFAFA] text-[#FFFFFF] dark:text-[#09090B] shadow-sm font-semibold'
                  : 'text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-[#FAFAFA]'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              Education
            </button>
          </div>
        </div>

        {/* Timeline Content */}
        <div className="relative border-l-2 border-[#E4E4E7] dark:border-[#27272A] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          
          {activeTab === 'experience' && PORTFOLIO_DATA.experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Timeline Dot Indicator */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-2 w-4 h-4 rounded-full bg-[#10B981] border-4 border-[#FFFFFF] dark:border-[#18181B] ring-2 ring-[#10B981] shadow-md"></div>

              <div className="bg-[#FFFFFF] dark:bg-[#09090B] border border-[#E4E4E7] dark:border-[#27272A] hover:border-[#10B981] transition-all rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm hover:shadow-xl">
                
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E4E4E7] dark:border-[#27272A]">
                  <div className="space-y-1">
                    <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#09090B] dark:text-[#FAFAFA] flex items-center gap-2">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-mono text-[#2563EB] dark:text-[#60A5FA]">
                      <span className="flex items-center gap-1.5 font-bold">
                        <Building2 className="w-4 h-4" />
                        {exp.company}
                      </span>
                      {exp.location && (
                        <span className="flex items-center gap-1 text-[#71717A] dark:text-[#A1A1AA]">
                          <MapPin className="w-3.5 h-3.5" />
                          {exp.location}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F4F4F5] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] font-mono text-xs font-semibold text-[#09090B] dark:text-[#FAFAFA] w-fit shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Role Description */}
                <p className="text-sm text-[#71717A] dark:text-[#A1A1AA] leading-relaxed">
                  {exp.description}
                </p>

                {/* Impact Metrics Grid */}
                {exp.impactMetrics && (
                  <div className="space-y-2">
                    <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#10B981] flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      Impact & Performance Metrics
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {exp.impactMetrics.map((metric, mIdx) => (
                        <div key={mIdx} className="p-3 rounded-xl bg-[#F4F4F5] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] space-y-0.5">
                          <div className="font-mono text-[10px] text-[#71717A] dark:text-[#A1A1AA] uppercase">{metric.label}</div>
                          <div className="font-mono font-bold text-sm sm:text-base text-[#09090B] dark:text-[#FAFAFA] text-[#10B981]">{metric.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Architecture Milestones Checklist */}
                {exp.architectureMilestones && (
                  <div className="space-y-3 pt-2">
                    <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#2563EB] dark:text-[#60A5FA] flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5" />
                      Key Architecture Milestones
                    </div>
                    <div className="space-y-2">
                      {exp.architectureMilestones.map((ms, msIdx) => (
                        <div key={msIdx} className="flex items-start gap-2.5 text-xs text-[#09090B] dark:text-[#FAFAFA] leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                          <span>{ms}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack Pills */}
                {exp.techStack && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-[#F4F4F5] dark:bg-[#18181B] text-[#71717A] dark:text-[#A1A1AA] border border-[#E4E4E7] dark:border-[#27272A]"
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
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative group"
            >
              <div className="absolute -left-[31px] sm:-left-[47px] top-2 w-4 h-4 rounded-full bg-[#10B981] border-4 border-[#FFFFFF] dark:border-[#18181B] ring-2 ring-[#10B981]"></div>

              <div className="bg-[#FFFFFF] dark:bg-[#09090B] border border-[#E4E4E7] dark:border-[#27272A] rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-heading font-bold text-xl text-[#09090B] dark:text-[#FAFAFA]">{edu.degree}</h3>
                    <div className="flex items-center gap-2 text-sm font-mono text-[#10B981] mt-1">
                      <GraduationCap className="w-4 h-4" />
                      <span>{edu.institution}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F4F5] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] font-mono text-xs font-semibold text-[#09090B] dark:text-[#FAFAFA] w-fit">
                    <Calendar className="w-3.5 h-3.5 text-[#71717A] dark:text-[#A1A1AA]" />
                    <span>{edu.period}</span>
                  </div>
                </div>

                <p className="text-sm text-[#71717A] dark:text-[#A1A1AA] leading-relaxed">
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
