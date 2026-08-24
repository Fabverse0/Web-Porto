import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-[#F0EDE4]/90 dark:bg-[#09090B]/90 backdrop-blur-md border-b border-[#DDD7C8] dark:border-[#27272A]' : 'py-5 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand */}
          <a href="#about" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-[#004741] dark:bg-[#18181B] text-[#F0EDE4] border border-[#004741] dark:border-[#27272A] flex items-center justify-center font-mono font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
              &lt;/&gt;
            </div>
            <div>
              <span className="font-heading font-bold text-lg text-[#004741] dark:text-[#FAFAFA] tracking-tight block leading-none">
                Fab<span className="text-[#10B981]">.Dev</span>
              </span>
              <span className="font-mono text-[10px] text-[#4A635F] dark:text-[#A1A1AA] uppercase tracking-wider block mt-1">
                Backend • Node & TS
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-heading font-medium text-xs lg:text-sm text-[#4A635F] dark:text-[#A1A1AA] hover:text-[#004741] dark:hover:text-[#FAFAFA] relative py-1 transition-all group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#004741] dark:bg-[#10B981] transition-all duration-200 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Sliding Pill Theme Toggle & CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Sliding Pill Theme Toggle */}
            <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />

            <a
              href={PORTFOLIO_DATA.developer.resumeUrl}
              download
              className="inline-flex items-center gap-2 font-heading font-semibold text-xs py-2 px-4 rounded-xl bg-[#004741] dark:bg-[#FAFAFA] text-[#F0EDE4] dark:text-[#09090B] hover:bg-[#005C55] dark:hover:opacity-90 transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-[#10B981]" />
              Download CV
            </a>
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-[#DDD7C8] dark:border-[#27272A] bg-[#FAF8F5] dark:bg-[#18181B] text-[#004741] dark:text-[#FAFAFA]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F0EDE4] dark:bg-[#18181B] border-b border-[#DDD7C8] dark:border-[#27272A] px-4 pt-3 pb-6 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block font-heading font-medium text-base text-[#004741] dark:text-[#FAFAFA] hover:bg-[#E5E0D4] dark:hover:bg-[#27272A] px-3 py-2 rounded-md"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-[#DDD7C8] dark:border-[#27272A]">
            <a
              href={PORTFOLIO_DATA.developer.resumeUrl}
              download
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-2 w-full justify-center font-heading font-semibold text-sm py-2.5 rounded-xl bg-[#004741] dark:bg-[#FAFAFA] text-[#F0EDE4] dark:text-[#09090B]"
            >
              <Download className="w-4 h-4 text-[#10B981]" />
              Download CV
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
