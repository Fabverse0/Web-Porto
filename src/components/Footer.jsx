import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Footer() {
  const dev = PORTFOLIO_DATA.developer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { name: 'GitHub', href: dev.github },
    { name: 'LinkedIn', href: dev.linkedin },
    { name: 'Instagram', href: dev.instagram },
    { name: 'Email', href: `mailto:${dev.email}` },
  ];

  return (
    <footer className="bg-[var(--bg-page)] border-t border-[var(--border-strong)] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-8">
          <div>
            <span className="font-mono text-[14px] text-[var(--text-primary)]">
              <span aria-hidden="true">&lt;/&gt;&nbsp;</span>Fab<span className="text-[var(--text-secondary)]">.Dev</span>
            </span>
            <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--text-secondary)] mt-1">
              Muhammad Fabian Rizky / Backend Engineer
            </span>
          </div>

          <nav className="flex flex-wrap gap-1" aria-label="Social">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                className="font-mono text-[13px] text-[var(--text-body)] hover:text-[var(--text-primary)] px-3 py-2.5 underline-offset-4 hover:underline transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-5 border-t border-[var(--border-color)]">
          <span className="font-mono text-[12px] text-[var(--text-secondary)]">
            &copy; {new Date().getFullYear()} Fab.Dev (Muhammad Fabian Rizky). All rights reserved.
          </span>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 font-mono text-[12.5px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors px-3 py-2"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>

      </div>
    </footer>
  );
}
