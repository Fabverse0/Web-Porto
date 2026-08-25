import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, Download } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { SocialIcon } from '@/components/ui/social-icon';

// Respect prefers-reduced-motion
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

// Subtle architectural grid — single thin rule + coordinate labels,
// cursor-responsive tilt. Entirely optional; removed on mobile.
function ArchitecturalAccent({ mouseX, mouseY }) {
  const reduced = usePrefersReducedMotion();

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [2, -2]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-2, 2]);
  const springRotateX = useSpring(rotateX, { stiffness: 60, damping: 18 });
  const springRotateY = useSpring(rotateY, { stiffness: 60, damping: 18 });

  return (
    <motion.div
      aria-hidden="true"
      style={
        reduced
          ? {}
          : {
              rotateX: springRotateX,
              rotateY: springRotateY,
              transformPerspective: 800,
            }
      }
      className="hidden lg:block w-full select-none pointer-events-none"
    >
      {/* Thin horizontal rule with coordinate label */}
      <div className="relative flex items-center gap-4 mt-8">
        <div className="flex-1 h-px bg-[#004741]/15 dark:bg-[#FAFAFA]/10" />
        <span className="font-mono text-[10px] text-[#7D918D] dark:text-[#52525B] tracking-widest uppercase shrink-0">
          Node.js · PostgreSQL · Redis · TypeScript
        </span>
        <div className="w-8 h-px bg-[#004741]/15 dark:bg-[#FAFAFA]/10" />
      </div>
    </motion.div>
  );
}

// Staggered word reveal — each word fades + shifts up individually
function WordReveal({ text, className = '', delay = 0 }) {
  const words = text.split(' ');
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.55,
            delay: delay + i * 0.055,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
          style={{ marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const dev = PORTFOLIO_DATA.developer;
  const reduced = usePrefersReducedMotion();

  // Normalized cursor position -0.5 → 0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;
    const handleMove = (e) => {
      const rect = section.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const handleLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };
    section.addEventListener('mousemove', handleMove, { passive: true });
    section.addEventListener('mouseleave', handleLeave, { passive: true });
    return () => {
      section.removeEventListener('mousemove', handleMove);
      section.removeEventListener('mouseleave', handleLeave);
    };
  }, [reduced, mouseX, mouseY]);

  const socials = [
    { platform: 'github', href: dev.github, label: 'GitHub' },
    { platform: 'linkedin', href: dev.linkedin, label: 'LinkedIn' },
    { platform: 'instagram', href: dev.instagram, label: 'Instagram' },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="
        relative min-h-[92vh] flex flex-col justify-center
        pt-28 sm:pt-32 pb-16 sm:pb-20
        px-6 sm:px-10 lg:px-16
        bg-[#F0EDE4] dark:bg-[#09090B]
        overflow-hidden
        transition-colors duration-300
      "
    >
      {/* ─── Content ───────────────────────────────────────── */}
      <div className="relative z-10 max-w-4xl w-full mx-auto">

        {/* Eyebrow / role label */}
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="
            font-mono text-xs sm:text-sm
            text-[#004741] dark:text-[#10B981]
            tracking-widest uppercase mb-6 sm:mb-8
          "
        >
          Backend Software Engineer
        </motion.p>

        {/* Primary headline */}
        <h1
          className="
            font-heading font-bold tracking-tight leading-[1.1]
            text-[2.4rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.25rem]
            text-[#004741] dark:text-[#FAFAFA]
            mb-6 sm:mb-8
          "
        >
          {reduced ? (
            <span>Muhammad<br />Fabian Rizky.</span>
          ) : (
            <>
              <WordReveal text="Muhammad" delay={0.05} className="block" />
              <WordReveal text="Fabian Rizky." delay={0.18} className="block" />
            </>
          )}
        </h1>

        {/* Role subtitle — thinner weight, subdued */}
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="
            font-heading font-medium
            text-lg sm:text-xl md:text-2xl
            text-[#4A635F] dark:text-[#A1A1AA]
            leading-snug mb-5 sm:mb-6
          "
        >
          Software Developer &amp; System Builder
        </motion.p>

        {/* Supporting bio — one paragraph, restrained width */}
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.46, ease: [0.16, 1, 0.3, 1] }}
          className="
            font-body text-sm sm:text-base
            text-[#4A635F] dark:text-[#71717A]
            leading-relaxed
            max-w-xl mb-10 sm:mb-12
          "
        >
          3rd-semester informatics student at UPN "Veteran" Jakarta.
          Focused on backend development and system design — building
          real things with Node.js, TypeScript, and PostgreSQL.
        </motion.p>

        {/* Architectural accent — thin rule + stack labels */}
        <ArchitecturalAccent mouseX={mouseX} mouseY={mouseY} />

        {/* ─── Actions + Socials ───────────────────────────── */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-4 sm:gap-5 mt-10 sm:mt-12"
        >
          {/* Primary CTA */}
          <a
            href="#projects"
            className="
              group inline-flex items-center gap-2
              font-heading font-semibold text-sm
              h-11 px-6 rounded-none
              bg-[#004741] dark:bg-[#FAFAFA]
              text-[#F0EDE4] dark:text-[#09090B]
              hover:bg-[#003833] dark:hover:bg-[#E4E4E7]
              transition-colors duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004741] focus-visible:ring-offset-2
            "
          >
            Explore My Work
            <ArrowUpRight
              className="w-3.5 h-3.5 text-[#10B981] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>

          {/* Secondary CTA */}
          <a
            href={dev.resumeUrl}
            download
            className="
              inline-flex items-center gap-2
              font-heading font-medium text-sm
              h-11 px-5 rounded-none
              border border-[#004741]/30 dark:border-[#FAFAFA]/20
              text-[#004741] dark:text-[#FAFAFA]
              hover:border-[#004741] dark:hover:border-[#FAFAFA]
              transition-colors duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004741] focus-visible:ring-offset-2
            "
          >
            <Download className="w-3.5 h-3.5 text-[#004741]/50 dark:text-[#FAFAFA]/50" />
            Download CV
          </a>

          {/* Social separator */}
          <div
            aria-hidden="true"
            className="hidden sm:block w-px h-5 bg-[#004741]/20 dark:bg-[#FAFAFA]/15"
          />

          {/* Social links — minimal, no tooltip clutter */}
          <div className="flex items-center gap-2" aria-label="Social links">
            {socials.map(({ platform, href, label }) => (
              <SocialIcon
                key={platform}
                platform={platform}
                href={href}
                label={label}
                size="sm"
                variant="ghost"
                showTooltip={false}
                className="
                  rounded-none w-9 h-9 p-2
                  text-[#4A635F] dark:text-[#71717A]
                  hover:text-[#004741] dark:hover:text-[#FAFAFA]
                  hover:bg-transparent
                  border-0
                "
              />
            ))}
          </div>
        </motion.div>

      </div>

      {/* ─── Bottom divider rule ──────────────────────────── */}
      <motion.div
        initial={reduced ? false : { scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ originX: 0 }}
        aria-hidden="true"
        className="absolute bottom-0 left-6 sm:left-10 lg:left-16 right-6 sm:right-10 lg:right-16 h-px bg-[#004741]/12 dark:bg-[#FAFAFA]/8"
      />
    </section>
  );
}
