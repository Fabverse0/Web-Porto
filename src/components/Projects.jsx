import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

/* Split a title into two short lines for SVG labels (no auto-wrap in <text>) */
function splitLabel(title) {
  const words = title.split(' ');
  if (words.length <= 2) return [title];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
}

/* Bespoke SVG topology: nodes as circles on a wave, flowing data dot.
   Real data in, honest diagram out - no fake screenshots, no invented metrics. */
function TopologyDiagram({ steps }) {
  const n = steps.length;
  const [compact, setCompact] = useState(false);
  const pathRef = useRef(null);
  const dotRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined;
    const mq = window.matchMedia('(max-width: 639px)');
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Layout: desktop = horizontal wave, compact = vertical rail
  const W = compact ? 300 : 640;
  const H = compact ? n * 86 + 30 : 240;
  const nodes = steps.map((s, i) => {
    if (compact) {
      return { x: 96, y: 56 + i * 86, title: s.title };
    }
    const x = n === 1 ? 320 : 60 + (i * (520 / (n - 1)));
    const y = 120 + Math.sin((i * Math.PI) / (n - 1 || 1)) * 42;
    return { x, y, title: s.title };
  });
  const r = compact ? 20 : 24;
  const d = nodes.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');

  // Travelling data dot (paused under reduced motion, starts when visible)
  useEffect(() => {
    if (typeof window === 'undefined' || typeof requestAnimationFrame !== 'function') return undefined;
    if (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const path = pathRef.current;
    const dot = dotRef.current;
    const wrap = wrapRef.current;
    if (!path || !dot || !wrap) return undefined;
    if (typeof path.getTotalLength !== 'function') return undefined;
    const len = path.getTotalLength();
    let raf;
    const t0 = performance.now();
    const loop = (now) => {
      const t = ((now - t0) * 0.055) % len;
      const p = path.getPointAtLength(t);
      dot.setAttribute('cx', p.x);
      dot.setAttribute('cy', p.y);
      raf = requestAnimationFrame(loop);
    };
    if (typeof IntersectionObserver === 'undefined') {
      raf = requestAnimationFrame(loop);
      return () => { if (raf) cancelAnimationFrame(raf); };
    }
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        raf = requestAnimationFrame(loop);
      } else if (raf) {
        cancelAnimationFrame(raf);
      }
    });
    io.observe(wrap);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [compact, steps]);

  return (
    <div ref={wrapRef} className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        role="img"
        aria-label={`System flow: ${steps.map(s => s.title).join(', ')}`}
      >
        {/* connecting path */}
        <path
          ref={pathRef}
          d={d}
          fill="none"
          stroke="var(--border-strong)"
          strokeWidth="1.5"
        />
        {/* travelling packet */}
        <circle ref={dotRef} r="3" fill="var(--text-primary)" opacity="0.8" cx={nodes[0].x} cy={nodes[0].y} />

        {nodes.map((p, i) => {
          const lines = splitLabel(steps[i].title);
          return (
            <g key={i}>
              <circle
                className="topo-node"
                cx={p.x}
                cy={p.y}
                r={r}
                fill="var(--bg-page)"
                stroke="var(--border-strong)"
                strokeWidth="1.5"
              />
              <text
                x={p.x}
                y={p.y + 4}
                textAnchor="middle"
                fontSize={compact ? 11 : 12}
                fill="var(--text-primary)"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </text>
              {/* label */}
              {compact ? (
                <text
                  x={p.x + r + 16}
                  y={p.y - (lines.length === 2 ? 2 : 4)}
                  textAnchor="start"
                  fontSize={11}
                  fill="var(--text-secondary)"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {lines.map((ln, li) => (
                    <tspan key={li} x={p.x + r + 16} dy={li === 0 ? 0 : 13}>
                      {ln}
                    </tspan>
                  ))}
                </text>
              ) : (
                <text
                  x={p.x}
                  y={p.y + r + 18}
                  textAnchor="middle"
                  fontSize={11}
                  fill="var(--text-secondary)"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {lines.map((ln, li) => (
                    <tspan key={li} x={p.x} dy={li === 0 ? 0 : 13}>
                      {ln}
                    </tspan>
                  ))}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function Projects({ selectedSkill, onOpenModal }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', ...Array.from(new Set(PORTFOLIO_DATA.projects.map(p => p.category)))];

  let projectsList = PORTFOLIO_DATA.projects;

  if (activeCategory !== 'All') {
    projectsList = projectsList.filter(p => p.category === activeCategory);
  }

  if (selectedSkill) {
    projectsList = projectsList.filter(p => p.tags.includes(selectedSkill));
  }

  return (
    <section id="projects" className="py-24 sm:py-28 bg-[var(--bg-page)] border-b border-[var(--border-color)] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 pb-14 border-b border-[var(--border-strong)]">
          <div className="max-w-2xl">
            <h2 className="font-heading font-semibold text-[30px] sm:text-[38px] tracking-[-0.015em] text-[var(--text-primary)] leading-tight">
              Production-Grade Systems &amp; High-Throughput APIs.
            </h2>
            <p className="mt-4 text-[16px] text-[var(--text-body)] leading-relaxed max-w-[56ch]">
              Real-world backend systems, drawn the way they run. Follow each architecture below.
            </p>
          </div>

          {/* Filter: quiet text toggles */}
          <div className="flex flex-wrap gap-x-5 gap-y-2" role="group" aria-label="Filter projects by category">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`font-mono text-[13px] min-h-[44px] flex items-center border-b-2 transition-colors ${
                  activeCategory === cat
                    ? 'border-[var(--text-primary)] text-[var(--text-primary)]'
                    : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {projectsList.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-mono text-[15px] text-[var(--text-primary)]">No projects found for active filter.</p>
            <p className="text-[13px] text-[var(--text-secondary)] mt-2">Try clearing the skill filter or selecting a different category.</p>
          </div>
        ) : (
          <div>
            {projectsList.map((project, idx) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: idx * 0.05 }}
                className="group py-16 sm:py-20 border-b border-[var(--border-color)] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14"
              >
                {/* Narrative column */}
                <div className="lg:col-span-5 flex flex-col">
                  <span className="font-mono text-[11.5px] uppercase tracking-[0.08em] text-[var(--text-secondary)]">
                    {project.category}
                  </span>
                  <h3 className="font-heading font-medium text-[26px] sm:text-[30px] tracking-[-0.01em] text-[var(--text-primary)] leading-tight mt-3">
                    {project.title}
                  </h3>
                  <p className="text-[15.5px] text-[var(--text-body)] leading-relaxed mt-4 max-w-[46ch]">
                    {project.shortDesc}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-8">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-[13px] text-[var(--text-primary)] min-h-[44px] underline-offset-4 hover:underline"
                    >
                      <Github className="w-3.5 h-3.5" aria-hidden="true" />
                      Source code
                    </a>
                    <button
                      onClick={() => onOpenModal(project)}
                      className="group/cta inline-flex items-center gap-2 font-mono text-[13px] font-medium text-[var(--text-primary)] min-h-[44px] underline underline-offset-4 decoration-[var(--border-strong)] hover:decoration-[var(--text-primary)] transition-colors"
                    >
                      View Architecture &amp; Specs
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* System visual: bespoke topology diagram per project */}
                <div className="lg:col-span-7 lg:pl-6">
                  <TopologyDiagram steps={project.architectureDiagram || []} />
                  {/* console bar: real endpoint, no invented metrics */}
                  {project.apiEndpoint && (
                    <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-[12px] text-[var(--text-secondary)]">
                      <span className="text-[var(--text-primary)]">
                        {project.apiEndpoint.method} {project.apiEndpoint.path}
                      </span>
                      <span>OpenAPI 3.0</span>
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
