import React, { useState, useEffect } from 'react';
import { Terminal, Code, Cpu, Activity, Menu, X, ArrowUpRight, Globe, Sun, Moon } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ping, setPing] = useState(PORTFOLIO_DATA.developer.pingMs);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    const interval = setInterval(() => {
      setPing(Math.floor(10 + Math.random() * 6));
    }, 4000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Scalar API Hub', href: '#scalar-hub' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3 glass-nav' : 'py-5 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand */}
          <a href="#about" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-[#09090B] dark:bg-[#18181B] text-[#FFFFFF] border border-[#27272A] flex items-center justify-center font-mono font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
              &lt;/&gt;
            </div>
            <div>
              <span className="font-heading font-bold text-lg text-[var(--text-primary)] tracking-tight block leading-none">
                Fab<span className="text-[#10B981]">.Dev</span>
              </span>
              <span className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-wider block mt-1">
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
                className="font-heading font-medium text-xs lg:text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] relative py-1 transition-all group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#10B981] transition-all duration-200 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Status Indicator Badge, Theme Toggle & CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm text-xs font-mono">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981]"></span>
              </span>
              <span className="text-[var(--text-primary)] font-semibold tracking-tight">OPERATIONAL</span>
              <span className="text-[var(--text-secondary)] border-l border-[var(--border-color)] pl-2">{ping}ms</span>
            </div>

            {/* Light / Dark Mode Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[#10B981] transition-all shadow-sm"
              aria-label="Toggle Dark/Light Theme"
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-[#09090B]" />
              ) : (
                <Sun className="w-4 h-4 text-[#F59E0B]" />
              )}
            </button>

            <a
              href="#scalar-hub"
              className="btn-black text-xs py-2 px-3.5 shadow-sm"
            >
              <Globe className="w-3.5 h-3.5 text-[#10B981]" />
              Scalar API Hub
            </a>
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)]"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4 text-[#09090B]" /> : <Sun className="w-4 h-4 text-[#F59E0B]" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--bg-card)] border-b border-[var(--border-color)] px-4 pt-3 pb-6 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block font-heading font-medium text-base text-[var(--text-primary)] hover:bg-[var(--bg-muted)] px-3 py-2 rounded-md"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-[var(--border-color)]">
            <a
              href="#scalar-hub"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-black w-full justify-center text-sm py-2.5"
            >
              <Globe className="w-4 h-4 text-[#10B981]" />
              Scalar API Hub
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
