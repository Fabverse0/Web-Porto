import React, { useState } from 'react';
import { ArrowDown, Copy, Check, Database, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import Terminal from './Terminal';
import { DotPattern } from './ui/DotPattern';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Hero() {
  const [emailCopied, setEmailCopied] = useState(false);
  const dev = PORTFOLIO_DATA.developer;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(dev.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <section id="about" className="relative pt-20 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Magic UI DotPattern Background with Radial Gradient Mask */}
      <DotPattern className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)] opacity-60" />

      {/* Ambient Radial Background Glows */}
      <div className="ambient-glow-emerald"></div>
      <div className="ambient-glow-blue"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column - Intro & Persona */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-6"
        >
          {/* Authentic Status & Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] shadow-sm -mt-3 sm:-mt-5">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
            <span className="font-mono text-xs font-semibold text-[#09090B] dark:text-[#FAFAFA] tracking-wide">
              Portfolio
            </span>
            <span className="text-[#E4E4E7] dark:text-[#27272A]">|</span>
            <span className="font-mono text-xs font-semibold text-[#09090B] dark:text-[#FAFAFA] tracking-wide">
              Muhammad Fabian Rizky
            </span>
            <span className="text-[#E4E4E7] dark:text-[#27272A]">|</span>
            <span className="font-mono text-xs text-[#2563EB] dark:text-[#60A5FA] font-bold">Backend Software Engineer</span>
          </div>

          {/* Main Title */}
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#09090B] dark:text-[#FAFAFA] tracking-tight leading-[1.1]">
            Building <span className="underline decoration-[#10B981] decoration-4 underline-offset-8">Reliable</span> Backend Infrastructure & Web Services.
          </h1>

          {/* Subtitle / Bio */}
          <p className="text-lg sm:text-xl text-[#71717A] dark:text-[#A1A1AA] max-w-2xl leading-relaxed font-normal">
            Software engineer focused on Node.js/TypeScript REST & WebSocket microservices, relational database schema design with PostgreSQL, and distributed caching with Redis.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-4">
            <motion.a
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="#projects"
              className="inline-flex items-center gap-2 font-heading font-semibold text-sm py-3 px-6 rounded-xl bg-[#09090B] dark:bg-[#FAFAFA] text-[#FFFFFF] dark:text-[#09090B] hover:opacity-90 transition-all shadow-md"
            >
              <Database className="w-4 h-4 text-[#10B981]" />
              Explore Projects
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href={dev.resumeUrl}
              download
              className="inline-flex items-center gap-2 font-heading font-semibold text-sm py-3 px-5 rounded-xl bg-[#FFFFFF] dark:bg-[#18181B] text-[#09090B] dark:text-[#FAFAFA] border border-[#E4E4E7] dark:border-[#27272A] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] transition-all shadow-sm"
            >
              <Download className="w-4 h-4 text-[#10B981]" />
              Download Resume (CV)
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 font-heading font-semibold text-sm py-3 px-4 rounded-xl bg-[#FFFFFF] dark:bg-[#18181B] text-[#09090B] dark:text-[#FAFAFA] border border-[#E4E4E7] dark:border-[#27272A] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] transition-all shadow-sm"
            >
              {emailCopied ? (
                <>
                  <Check className="w-4 h-4 text-[#10B981]" />
                  <span className="text-[#10B981]">Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#09090B] dark:text-[#FAFAFA]" />
                  <span>Copy Email</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Right Column - Interactive Terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 w-full"
        >
          <Terminal />
        </motion.div>

      </div>
    </section>
  );
}
