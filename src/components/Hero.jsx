import React, { useState } from 'react';
import { ArrowDown, Copy, Check, Terminal as TerminalIcon, FileText, Database, ShieldCheck, Zap, Globe } from 'lucide-react';
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
    <section id="about" className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column - Intro & Persona */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Status & Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E4E4E7] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
            <span className="font-mono text-xs font-semibold text-[#09090B] tracking-wide">
              {dev.title}
            </span>
            <span className="text-[#E4E4E7]">|</span>
            <span className="font-mono text-xs text-[#2563EB] font-bold uppercase">Scalar OpenAPI 3.0</span>
          </div>

          {/* Main Title */}
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#09090B] tracking-tight leading-[1.1]">
            Architecting <span className="underline decoration-[#09090B] decoration-4 underline-offset-8">Scalable</span> APIs & Event Systems.
          </h1>

          {/* Subtitle / Bio */}
          <p className="text-lg sm:text-xl text-[#71717A] max-w-2xl leading-relaxed font-normal">
            Specializing in high-throughput backend services, PostgreSQL query optimization, distributed caching with Redis, and interactive OpenAPI 3.0 specifications powered by Scalar.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a href="#projects" className="btn-black text-sm py-3 px-6 shadow-md">
              <Database className="w-4 h-4 text-[#10B981]" />
              Explore Backend Projects
            </a>

            <a href="#scalar-hub" className="btn-outline text-sm py-3 px-5 border-[#09090B] bg-[#09090B] text-[#FFFFFF] hover:bg-[#27272A]">
              <Globe className="w-4 h-4 text-[#10B981]" />
              Interactive Scalar API Hub
            </a>

            <button
              onClick={handleCopyEmail}
              className="btn-outline text-sm py-3 px-4"
            >
              {emailCopied ? (
                <>
                  <Check className="w-4 h-4 text-[#10B981]" />
                  <span className="text-[#10B981]">Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#09090B]" />
                  <span>Copy Email</span>
                </>
              )}
            </button>
          </div>

          {/* Real Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#E4E4E7]">
            {dev.stats.map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="font-mono font-bold text-2xl sm:text-3xl text-[#09090B] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-heading font-medium text-[#71717A] uppercase tracking-wider">
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
