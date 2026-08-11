import React, { useState } from 'react';
import { ArrowDown, Copy, Check, Terminal as TerminalIcon, FileText, Database, ShieldCheck, Zap, Globe, Download } from 'lucide-react';
import Terminal from './Terminal';
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
    <section id="about" className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Ambient Radial Background Glows */}
      <div className="ambient-glow-emerald"></div>
      <div className="ambient-glow-blue"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column - Intro & Persona */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Status & Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
            <span className="font-mono text-xs font-semibold text-[#09090B] dark:text-[#FAFAFA] tracking-wide">
              {dev.title}
            </span>
            <span className="text-[#E4E4E7] dark:text-[#27272A]">|</span>
            <span className="font-mono text-xs text-[#2563EB] dark:text-[#60A5FA] font-bold uppercase">Scalar OpenAPI 3.0</span>
          </div>

          {/* Main Title */}
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#09090B] dark:text-[#FAFAFA] tracking-tight leading-[1.1]">
            Architecting <span className="underline decoration-[#10B981] decoration-4 underline-offset-8">Scalable</span> APIs & Event Systems.
          </h1>

          {/* Subtitle / Bio */}
          <p className="text-lg sm:text-xl text-[#71717A] dark:text-[#A1A1AA] max-w-2xl leading-relaxed font-normal">
            Specializing in high-throughput backend microservices, PostgreSQL query optimization, distributed caching with Redis, and interactive OpenAPI 3.0 specifications powered by Scalar.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 font-heading font-semibold text-sm py-3 px-6 rounded-xl bg-[#09090B] dark:bg-[#FAFAFA] text-[#FFFFFF] dark:text-[#09090B] hover:opacity-90 transition-all shadow-md"
            >
              <Database className="w-4 h-4 text-[#10B981]" />
              Explore Backend Projects
            </a>

            <a
              href={dev.resumeUrl}
              download
              className="inline-flex items-center gap-2 font-heading font-semibold text-sm py-3 px-5 rounded-xl bg-[#FFFFFF] dark:bg-[#18181B] text-[#09090B] dark:text-[#FAFAFA] border border-[#E4E4E7] dark:border-[#27272A] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] transition-all shadow-sm"
            >
              <Download className="w-4 h-4 text-[#10B981]" />
              Download Resume (CV)
            </a>

            <button
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
            </button>
          </div>

          {/* Real Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#E4E4E7] dark:border-[#27272A]">
            {dev.stats.map((stat, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-[#FFFFFF] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] space-y-1 shadow-sm hover:border-[#10B981] transition-colors">
                <div className="font-mono font-bold text-2xl sm:text-3xl text-[#09090B] dark:text-[#FAFAFA] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[11px] font-heading font-medium text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Column - Interactive Terminal */}
        <div className="lg:col-span-5 w-full">
          <Terminal />
        </div>

      </div>
    </section>
  );
}
