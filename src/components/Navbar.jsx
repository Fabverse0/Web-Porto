import React, { useState, useEffect } from 'react';
import { Menu, X, Download, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scrollspy active section detection
      const sections = ['about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#F0EDE4]/92 dark:bg-[#09090B]/92 backdrop-blur-md border-b border-[#DDD7C8] dark:border-[#27272A] shadow-sm'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand */}
          <a
            href="#about"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004741] rounded-xl p-1"
            aria-label="Fab.Dev Portfolio Home"
          >
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

          {/* Desktop Navigation with Active Scrollspy Pill */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#FAF8F5]/80 dark:bg-[#18181B]/80 px-3 py-1.5 rounded-full border border-[#DDD7C8]/80 dark:border-[#27272A] shadow-sm" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative font-heading font-medium text-xs lg:text-sm px-3.5 py-1.5 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004741] ${
                    isActive
                      ? 'text-[#F0EDE4] dark:text-[#09090B] font-semibold'
                      : 'text-[#4A635F] dark:text-[#A1A1AA] hover:text-[#004741] dark:hover:text-[#FAFAFA]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-[#004741] dark:bg-[#FAFAFA] rounded-full -z-10 shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Sliding Pill Theme Toggle & CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Sliding Pill Theme Toggle */}
            <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />

            <a
              href={PORTFOLIO_DATA.developer.resumeUrl}
              download
              className="inline-flex items-center gap-2 font-heading font-semibold text-xs py-2 px-4 rounded-xl bg-[#004741] dark:bg-[#FAFAFA] text-[#F0EDE4] dark:text-[#09090B] hover:bg-[#005C55] dark:hover:opacity-90 transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004741] active:scale-95"
            >
              <Download className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Download CV</span>
            </a>
          </div>

          {/* Mobile Menu Trigger & Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl border border-[#DDD7C8] dark:border-[#27272A] bg-[#FAF8F5] dark:bg-[#18181B] text-[#004741] dark:text-[#FAFAFA] min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004741]"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer with Backdrop & Spring Animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-[65px] bg-[#004741]/40 dark:bg-black/70 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Slide Down Drawer Menu */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute top-full left-0 right-0 bg-[#F0EDE4] dark:bg-[#18181B] border-b border-[#DDD7C8] dark:border-[#27272A] px-6 pt-4 pb-6 space-y-3 shadow-xl z-50 md:hidden"
            >
              <div className="space-y-1">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between font-heading font-medium text-base px-4 py-3 rounded-xl transition-colors min-h-[44px] ${
                        isActive
                          ? 'bg-[#004741] text-[#F0EDE4] font-semibold'
                          : 'text-[#004741] dark:text-[#FAFAFA] hover:bg-[#E5E0D4] dark:hover:bg-[#27272A]'
                      }`}
                    >
                      <span>{link.name}</span>
                      {isActive && <span className="w-2 h-2 rounded-full bg-[#10B981]" />}
                    </a>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-[#DDD7C8] dark:border-[#27272A]">
                <a
                  href={PORTFOLIO_DATA.developer.resumeUrl}
                  download
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center gap-2 w-full justify-center font-heading font-semibold text-sm py-3 rounded-xl bg-[#004741] dark:bg-[#FAFAFA] text-[#F0EDE4] dark:text-[#09090B] shadow-sm min-h-[44px]"
                >
                  <Download className="w-4 h-4 text-[#10B981]" />
                  <span>Download CV</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
