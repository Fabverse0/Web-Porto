import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { SocialIcon } from '@/components/ui/social-icon';

/* Interactive spec grid: crosshair cell + accent dot follow the cursor.
   Presentation only - pointer handlers live on the section. */
function SpecGrid() {
  return (
    <div className="spec-grid" aria-hidden="true">
      <div className="spec-grid-cell" />
      <div className="spec-grid-dot" />
    </div>
  );
}

function useSpecGridPointer() {
  const handleGridMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const grid = e.currentTarget.querySelector('.spec-grid');
    if (!grid) return;
    grid.style.setProperty('--cell-x', Math.floor(x / 44) * 44 + 'px');
    grid.style.setProperty('--cell-y', Math.floor(y / 44) * 44 + 'px');
    grid.style.setProperty('--dot-x', x + 'px');
    grid.style.setProperty('--dot-y', y + 'px');
    grid.setAttribute('data-active', 'true');
  };

  const handleGridLeave = (e) => {
    const grid = e.currentTarget.querySelector('.spec-grid');
    if (grid) grid.removeAttribute('data-active');
  };

  return { handleGridMove, handleGridLeave };
}

/* Status line: typed once on load, then blinks (reduced-motion safe) */
function StatusLine() {
  const dev = PORTFOLIO_DATA.developer;
  const reduce = useReducedMotion();
  const text = 'systems: ' + (dev.status || 'operational').toLowerCase() + ' / ping ' + (dev.pingMs || 12) + 'ms';
  const [shown, setShown] = useState(reduce ? text.length : 0);

  useEffect(() => {
    if (reduce) return;
    if (shown >= text.length) return;
    const t = setTimeout(() => setShown(shown + 1), 42);
    return () => clearTimeout(t);
  }, [shown, text, reduce]);

  return (
    <p className="font-mono text-[12.5px] text-[var(--text-secondary)] mt-6">
      <span className="sr-only">{text}</span><span aria-hidden="true">
        {'> '}
        {text.slice(0, shown)}
        <span className="cursor-blink" />
      </span>
    </p>
  );
}

/* Headline split-word reveal: flat translate+opacity only, no blur/gradient */
function SplitHeadline({ text }) {
  const reduce = useReducedMotion();
  const cls =
    'font-heading font-semibold text-[clamp(44px,8vw,96px)] leading-[1.05] tracking-[-0.022em] text-[var(--text-primary)] max-w-[13ch]';
  if (reduce) return <h1 className={cls}>{text}</h1>;
  const words = text.split(' ');
  return (
    <h1 className={cls} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.6, delay: 0.12 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

/* Scramble-in eyebrow: glyph noise resolves to text once on load */
const GLYPHS = '█▓▒░<>/\\|01';
function Scramble({ text }) {
  const reduce = useReducedMotion();
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (reduce) {
      setOut(text);
      return;
    }
    let frame = 0;
    const total = 26;
    let raf = 0;
    const tick = () => {
      frame += 1;
      const done = Math.floor((frame / total) * text.length);
      let s = text.slice(0, done);
      for (let i = done; i < text.length; i += 1) {
        const c = text[i];
        s += c === ' ' || c === ',' ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOut(s);
      if (frame < total) raf = requestAnimationFrame(tick);
      else setOut(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, reduce]);

  return (
    <span aria-label={text}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}

/* Magnetic wrapper: CTA leans toward the pointer, springs back */
function Magnetic({ children }) {
  const reduce = useReducedMotion();
  const [fine, setFine] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  useEffect(() => {
    setFine(
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
        !reduce
    );
  }, [reduce]);

  if (!fine) return <>{children}</>;
  return (
    <motion.span
      style={{ x: sx, y: sy, display: 'inline-flex' }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

const focusStack = 'Distributed Systems & APIs';

export default function Hero() {
  const [emailCopied, setEmailCopied] = useState(false);
  const { handleGridMove, handleGridLeave } = useSpecGridPointer();
  const dev = PORTFOLIO_DATA.developer;

  // Spec rows derived from the single data source (no drift)
  const stack = PORTFOLIO_DATA.skills.filter(s => s.featured).slice(0, 5).map(s => s.name).join(', ');
  const specRows = [
    { k: 'Role', v: dev.title },
    { k: 'Focus', v: focusStack },
    { k: 'Stack', v: stack },
    { k: 'Location', v: dev.location },
    { k: 'Status', v: 'Open to work', mark: true },
  ];

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(dev.email);
    } catch (e) {
      // clipboard unavailable (non-secure context or permission denied)
    }
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <section
      id="about"
      onPointerMove={handleGridMove}
      onPointerLeave={handleGridLeave}
      className="relative min-h-[92vh] flex items-center bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-300 overflow-hidden border-b border-[var(--border-color)]"
    >
      {/* Interactive background grid */}
      <SpecGrid />

      <div className="relative z-10 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left: identity */}
          <div className="lg:col-span-7 space-y-7">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="font-mono text-[13px] uppercase tracking-[0.08em] text-[var(--text-secondary)]"
            >
              <Scramble text="Backend Engineer, Distributed Systems" />
            </motion.p>

            <SplitHeadline text="Muhammad Fabian Rizky" />

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.19 }}
              className="text-lg text-[var(--text-body)] leading-relaxed max-w-[46ch]"
            >
              I design and build high-concurrency APIs and distributed systems that stay fast under load.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.26 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Magnetic>
                <a
                  href={dev.resumeUrl}
                  className="inline-flex items-center gap-2 font-mono text-sm bg-[var(--text-primary)] text-[var(--bg-page)] h-12 px-6 border border-[var(--text-primary)] hover:opacity-90 transition-opacity"
                >
                  View CV
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </Magnetic>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 font-mono text-sm text-[var(--text-primary)] h-12 px-3 underline underline-offset-[6px] decoration-[var(--border-strong)] hover:decoration-[var(--text-primary)] transition-colors"
              >
                {emailCopied ? (
                  <>
                    <Check className="w-4 h-4 text-[var(--accent-emerald)]" aria-hidden="true" />
                    <span className="text-[var(--accent-emerald)]">Email copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" aria-hidden="true" />
                    <span>Copy email</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-1">
                <SocialIcon platform="github" href={dev.github} label="GitHub Profile" size="md" variant="outline" className="rounded-none" />
                <SocialIcon platform="linkedin" href={dev.linkedin} label="LinkedIn Profile" size="md" variant="outline" className="rounded-none" />
                <SocialIcon platform="instagram" href={dev.instagram} label="Instagram Profile" size="md" variant="outline" className="rounded-none" />
              </div>

              <span className="sr-only" role="status" aria-live="polite">
                {emailCopied ? 'Email copied to clipboard' : ''}
              </span>
            </motion.div>

            <StatusLine />
          </div>

          {/* Right: specification table (data object as visual anchor) */}
          <motion.dl
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.33 }}
            aria-label="Profile specification"
            className="lg:col-span-5 bg-[var(--bg-card)] border border-[var(--border-strong)]"
          >
            {specRows.map((row, i) => (
              <div
                key={row.k}
                className={
                  'grid grid-cols-[88px_1fr] gap-3 px-4 py-3.5' +
                  (i > 0 ? ' border-t border-[var(--border-color)]' : '')
                }
              >
                <dt className="font-mono text-[12.5px] text-[var(--text-secondary)] pt-0.5">{row.k}</dt>
                <dd className="text-[15px] text-[var(--text-primary)] leading-snug">
                  {row.mark && (
                    <span
                      className="inline-block w-2 h-2 mr-2 -mt-0.5 bg-[var(--accent-emerald)]"
                      aria-hidden="true"
                    />
                  )}
                  {row.v}
                </dd>
              </div>
            ))}
          </motion.dl>

        </div>
      </div>
    </section>
  );
}
