import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

/* ── Spring config ─────────────────────────────────────── */
const SPRING = { stiffness: 260, damping: 24 };

export default function Navbar({ theme, onToggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [scrolled, setScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const lastY = useRef(0);
  const mobileOpenRef = useRef(false);
  mobileOpenRef.current = mobileMenuOpen;
  const [hoveredLink, setHoveredLink] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  /* ── Scroll detection for compact navbar ─────────────── */
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 24);
    /* Hide-on-scroll-down / show-on-scroll-up; off saat menu mobile terbuka */
    if (prefersReducedMotion || mobileOpenRef.current) {
      setNavHidden(false);
    } else if (latest > 140 && latest > lastY.current + 4) {
      setNavHidden(true);
    } else if (latest < lastY.current - 4) {
      setNavHidden(false);
    }
    lastY.current = latest;
  });

  /* ── IntersectionObserver to track active section ────── */
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean);

    if (!sections.length) return;

    /* Track which sections are currently intersecting */
    const visibleMap = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        /* Update visibility map from all entries in this batch */
        for (const entry of entries) {
          const id = entry.target.id || entry.target.getAttribute('id');
          if (id) {
            if (entry.isIntersecting) {
              visibleMap.set(id, entry);
            } else {
              visibleMap.delete(id);
            }
          }
        }

        /* Among all currently visible sections, pick the topmost one */
        if (visibleMap.size > 0) {
          let topId = null;
          let topY = Infinity;
          for (const [id, entry] of visibleMap) {
            const rect = entry.target.getBoundingClientRect();
            if (rect.top < topY) {
              topY = rect.top;
              topId = id;
            }
          }
          if (topId) setActiveSection(topId);
        }
      },
      { rootMargin: '-10% 0px -55% 0px', threshold: [0, 0.1, 0.2, 0.5] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* ── Close mobile menu on resize past md breakpoint ─── */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  /* ── Close mobile menu on Escape key ─────────────────── */
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [mobileMenuOpen]);

  /* ── Prevent body scroll when mobile menu is open ────── */
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  /* ── Link click handler ──────────────────────────────── */
  const handleLinkClick = useCallback(
    (href) => {
      setMobileMenuOpen(false);
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      }
    },
    [prefersReducedMotion]
  );

  /* ── Animation duration helpers ──────────────────────── */
  const dur = prefersReducedMotion ? 0 : undefined;
  const staggerDelay = (idx) => Math.min(idx * 0.04, 0.2);

  return (
    <motion.header
      className="navbar-glass fixed top-0 left-0 right-0 z-50"
      initial={false}
      animate={{
        y: navHidden ? '-110%' : '0%',
        backdropFilter: scrolled ? 'blur(16px)' : 'blur(8px)',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'blur(8px)',
        paddingBlock: scrolled ? '8px' : '14px',
      }}
      transition={{ type: 'spring', ...SPRING, duration: dur }}
      data-scrolled={scrolled ? '' : undefined}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">
          {/* ── Brand mark ─────────────────────────────── */}
          <motion.a
            href="#about"
            className="navbar-brand flex flex-col justify-center group"
            whileHover={{ y: -1 }}
            transition={{ type: 'spring', ...SPRING, duration: dur }}
            aria-label="Fab.Dev — Back to top"
          >
            <span className="font-mono text-[15px] font-medium text-[var(--text-primary)] leading-none">
              <span aria-hidden="true">&lt;/&gt;&nbsp;</span>
              Fab
              <span className="text-[var(--text-secondary)]">.Dev</span>
            </span>
            <span className="navbar-brand-sub font-mono text-[10.5px] uppercase tracking-[0.08em] text-[var(--text-secondary)] block mt-1.5">
              Backend / Node &amp; TS
            </span>
          </motion.a>

          {/* ── Desktop Navigation ────────────────────── */}
          <nav
            className="hidden md:flex items-center relative"
            aria-label="Primary navigation"
          >
            {navLinks.map((link) => {
              const isCurrent =
                activeSection === link.name.toLowerCase();
              const isHovered = hoveredLink === link.name;
              const showIndicator = isCurrent || isHovered;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`navbar-link relative font-mono text-[13px] tracking-[0.06em] uppercase px-3 py-2.5 transition-colors duration-200 ${
                    showIndicator
                      ? 'text-[var(--text-primary)]'
                      : 'text-[var(--text-body)]'
                  }`}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  {link.name}
                  {/* Sliding indicator pill — shared layout animation */}
                  {showIndicator && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-[var(--text-primary)]"
                      transition={{
                        type: 'spring',
                        ...SPRING,
                        duration: dur,
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* ── Desktop Theme Toggle ───────────────────── */}
          <div className="hidden md:flex items-center">
            <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />
          </div>

          {/* ── Mobile controls ────────────────────────── */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />

            {/* Hamburger → X morph button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="navbar-burger w-11 h-11 flex items-center justify-center border border-[var(--border-strong)] text-[var(--text-primary)]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              whileTap={{ scale: 0.94 }}
              transition={{ type: 'spring', ...SPRING, duration: dur }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    transition={{
                      type: 'spring',
                      ...SPRING,
                      duration: dur,
                    }}
                  >
                    <X className="w-5 h-5" strokeWidth={1.75} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    transition={{
                      type: 'spring',
                      ...SPRING,
                      duration: dur,
                    }}
                  >
                    <Menu className="w-5 h-5" strokeWidth={1.75} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu Drawer ────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { type: 'spring', ...SPRING, duration: dur },
              opacity: { duration: dur ?? 0.15 },
            }}
            className="md:hidden overflow-hidden"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="bg-[var(--bg-page)] border-t border-[var(--border-color)] px-4 pb-7 pt-3">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{
                    type: 'spring',
                    ...SPRING,
                    delay: staggerDelay(idx),
                    duration: dur,
                  }}
                  className={`block font-mono text-sm uppercase tracking-[0.06em] border-t border-[var(--border-color)] px-1 py-3.5 first:border-t-0 min-h-[44px] flex items-center transition-colors duration-200 ${
                    activeSection === link.name.toLowerCase()
                      ? 'text-[var(--text-primary)]'
                      : 'text-[var(--text-body)]'
                  }`}
                  aria-current={
                    activeSection === link.name.toLowerCase()
                      ? 'page'
                      : undefined
                  }
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ── Nav links definition (static, outside component) ── */
const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];
