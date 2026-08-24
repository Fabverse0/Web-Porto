import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Copy, Check, Download, Server, Cpu, Database, Activity } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { SocialIcon } from '@/components/ui/social-icon';
import Terminal from './Terminal';

export default function Hero() {
  const [emailCopied, setEmailCopied] = useState(false);
  const dev = PORTFOLIO_DATA.developer;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(dev.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const telemetryBadges = [
    { label: "High Throughput", val: "50k+ Sockets/sec", icon: <Cpu className="w-3.5 h-3.5 text-[#10B981]" /> },
    { label: "Database Tuning", val: "PostgreSQL & Redis", icon: <Database className="w-3.5 h-3.5 text-[#10B981]" /> },
    { label: "API Contracts", val: "Scalar OpenAPI 3.0", icon: <Server className="w-3.5 h-3.5 text-[#10B981]" /> },
  ];

  return (
    <section
      id="about"
      className="relative min-h-[90vh] flex items-center justify-center pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-[#F0EDE4] dark:bg-[#09090B] text-[#004741] dark:text-[#FAFAFA] transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* 2-Column Responsive Engineering Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Developer Identity, Bio, Telemetry & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 sm:space-y-7"
          >
            
            {/* Status Telemetry Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] dark:bg-[#18181B] border border-[#DDD7C8] dark:border-[#27272A] shadow-xs text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
              </span>
              <span className="text-[#004741] dark:text-[#FAFAFA] font-semibold tracking-wide uppercase">
                Portfolio | Backend System Engineer
              </span>
              <span className="text-[#4A635F] dark:text-[#A1A1AA] border-l border-[#DDD7C8] dark:border-[#27272A] pl-2 hidden sm:inline">
                Jakarta • {dev.pingMs || 12}ms
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.15] text-[#004741] dark:text-[#FAFAFA]">
                Hi, I'm{' '}
                <span className="underline decoration-[#10B981] decoration-4 underline-offset-8 transition-colors hover:text-[#005C55] dark:hover:text-[#10B981]">
                  Muhammad Fabian Rizky
                </span>
              </h1>
              
              <div className="font-mono text-sm sm:text-base font-semibold text-[#10B981] flex items-center gap-2">
                <Activity className="w-4 h-4" />
                <span>Backend Software Engineer & System Architect</span>
              </div>
            </div>

            {/* Authentic Bio */}
            <p className="text-base sm:text-lg text-[#4A635F] dark:text-[#A1A1AA] leading-relaxed max-w-2xl font-normal">
              I am Fabian, a 3rd-semester informatics student at UPN "Veteran" Jakarta with a strong interest in backend development and system design. I am always eager to learn, solve problems, and contribute to real-world development projects.
            </p>

            {/* Engineering Telemetry Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              {telemetryBadges.map((badge, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-[#18181B] border border-[#DDD7C8] dark:border-[#27272A] shadow-xs"
                >
                  <div className="p-1.5 rounded-lg bg-[#004741]/10 dark:bg-[#10B981]/10 shrink-0">
                    {badge.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] text-[#7D918D] dark:text-[#71717A] uppercase leading-tight truncate">
                      {badge.label}
                    </div>
                    <div className="font-mono font-bold text-xs text-[#004741] dark:text-[#FAFAFA] truncate">
                      {badge.val}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Primary Action Buttons & Socials */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3">
              {/* Explore Projects Primary CTA */}
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 font-heading font-semibold text-sm h-11 px-6 rounded-xl bg-[#004741] dark:bg-[#FAFAFA] text-[#F0EDE4] dark:text-[#09090B] hover:bg-[#005C55] dark:hover:opacity-90 transition-all shadow-md group min-w-[150px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004741] active:scale-98"
              >
                <span>Explore My Work</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#10B981]" />
              </a>

              {/* Download Resume Button */}
              <a
                href={dev.resumeUrl}
                download
                className="inline-flex items-center justify-center gap-2 font-heading font-semibold text-sm h-11 px-5 rounded-xl bg-[#FAF8F5] dark:bg-[#18181B] text-[#004741] dark:text-[#FAFAFA] border border-[#DDD7C8] dark:border-[#27272A] hover:bg-[#E5E0D4] dark:hover:bg-[#27272A] transition-all shadow-xs min-w-[140px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004741] active:scale-98"
              >
                <Download className="w-4 h-4 text-[#10B981]" />
                <span>Download CV</span>
              </a>

              {/* Copy Email Button */}
              <button
                onClick={handleCopyEmail}
                aria-live="polite"
                className="inline-flex items-center justify-center gap-2 font-heading font-semibold text-sm h-11 px-4 rounded-xl bg-[#FAF8F5] dark:bg-[#18181B] text-[#004741] dark:text-[#FAFAFA] border border-[#DDD7C8] dark:border-[#27272A] hover:bg-[#E5E0D4] dark:hover:bg-[#27272A] transition-all shadow-xs min-w-[130px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004741] active:scale-98"
              >
                {emailCopied ? (
                  <>
                    <Check className="w-4 h-4 text-[#10B981]" />
                    <span className="text-[#10B981] font-mono text-xs font-bold">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#4A635F] dark:text-[#A1A1AA]" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              {/* Social Anchors */}
              <div className="flex items-center gap-2 sm:ml-1 pt-1 sm:pt-0">
                <SocialIcon
                  platform="github"
                  href={dev.github}
                  label="GitHub Profile"
                  size="md"
                  variant="outline"
                />
                <SocialIcon
                  platform="linkedin"
                  href={dev.linkedin}
                  label="LinkedIn Profile"
                  size="md"
                  variant="outline"
                />
                <SocialIcon
                  platform="instagram"
                  href={dev.instagram}
                  label="Instagram Profile"
                  size="md"
                  variant="outline"
                />
              </div>
            </div>

          </motion.div>

          {/* Right Column: Interactive CLI Terminal Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 w-full flex justify-center"
          >
            <div className="w-full shadow-2xl rounded-2xl border border-[#DDD7C8] dark:border-[#27272A] overflow-hidden bg-[#09090B]">
              <Terminal />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
