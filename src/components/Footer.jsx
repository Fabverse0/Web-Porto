import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Github, Linkedin, Twitter, ArrowUp, Globe } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#09090B] dark:bg-[#000000] text-[#FAFAFA] border-t border-[#27272A] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#27272A]">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#18181B] border border-[#27272A] text-[#FFFFFF] flex items-center justify-center font-mono font-bold text-lg">
              &lt;/&gt;
            </div>
            <div>
              <span className="font-heading font-bold text-lg text-[#FFFFFF] tracking-tight block leading-none">
                Fab<span className="text-[#10B981]">.Dev</span>
              </span>
              <span className="font-mono text-xs text-[#A1A1AA] block mt-1">
                Muhammad Fabian Rizky • Backend Engineer
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={PORTFOLIO_DATA.developer.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-[#18181B] text-[#A1A1AA] hover:text-[#FFFFFF] hover:bg-[#27272A] border border-[#27272A] transition-colors shadow-sm"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PORTFOLIO_DATA.developer.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-[#18181B] text-[#A1A1AA] hover:text-[#FFFFFF] hover:bg-[#27272A] border border-[#27272A] transition-colors shadow-sm"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#A1A1AA]">
          <div>
            © {new Date().getFullYear()} Fab.Dev (Muhammad Fabian Rizky). All rights reserved. Built with Scalar & ui-ux-pro-max.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[#FFFFFF] transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#10B981]" />
          </button>
        </div>

      </div>
    </footer>
  );
}
