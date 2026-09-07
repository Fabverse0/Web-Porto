import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function Navbar({ theme, onToggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-page)] border-b border-[var(--border-color)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">

          {/* Brand: document header style */}
          <a href="#about" className="flex flex-col justify-center group">
            <span className="font-mono text-[15px] font-medium text-[var(--text-primary)] leading-none">
              <span aria-hidden="true">&lt;/&gt;&nbsp;</span>Fab<span className="text-[var(--text-secondary)]">.Dev</span>
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-[var(--text-secondary)] block mt-1.5">
              Backend / Node &amp; TS
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-mono text-[13px] text-[var(--text-body)] hover:text-[var(--text-primary)] px-3 py-2.5 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Theme Toggle: reachable at every breakpoint >= md */}
          <div className="hidden md:flex items-center">
            <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-11 h-11 flex items-center justify-center border border-[var(--border-strong)] text-[var(--text-primary)]"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer: flat list */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--bg-page)] border-b border-[var(--border-color)] px-4 pb-6 pt-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block font-mono text-sm text-[var(--text-primary)] border-t border-[var(--border-color)] px-1 py-3.5 first:border-t-0"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
