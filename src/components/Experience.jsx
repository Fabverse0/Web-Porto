import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Briefcase, GraduationCap, Calendar, Building2, Award } from 'lucide-react';

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
              Career Track Record & Background
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#09090B] dark:text-[#FAFAFA] tracking-tight">
              Engineering Experience & Education.
            </h2>
            <p className="text-[#71717A] dark:text-[#A1A1AA] text-base leading-relaxed">
              Demonstrated history of delivering backend infrastructure, optimizing API latency, and collaborating in high-velocity tech teams.
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
        <div className="relative border-l-2 border-[#E4E4E7] dark:border-[#27272A] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
          
          {activeTab === 'experience' && PORTFOLIO_DATA.experiences.map((exp, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Dot Indicator */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#09090B] dark:bg-[#FAFAFA] border-4 border-[#FFFFFF] dark:border-[#18181B] ring-2 ring-[#09090B] dark:ring-[#FAFAFA]"></div>

              <div className="bg-[#FFFFFF] dark:bg-[#09090B] border border-[#E4E4E7] dark:border-[#27272A] rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-heading font-bold text-xl text-[#09090B] dark:text-[#FAFAFA]">{exp.role}</h3>
                    <div className="flex items-center gap-2 text-sm font-mono text-[#2563EB] dark:text-[#60A5FA] mt-1">
                      <Building2 className="w-4 h-4" />
                      <span>{exp.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F4F5] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] font-mono text-xs font-semibold text-[#09090B] dark:text-[#FAFAFA] w-fit">
                    <Calendar className="w-3.5 h-3.5 text-[#71717A] dark:text-[#A1A1AA]" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <p className="text-sm text-[#71717A] dark:text-[#A1A1AA] leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}

          {activeTab === 'education' && PORTFOLIO_DATA.education.map((edu, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#10B981] border-4 border-[#FFFFFF] dark:border-[#18181B] ring-2 ring-[#10B981]"></div>

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
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
