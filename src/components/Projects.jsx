import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

/* Split a title into two short lines for SVG labels (no auto-wrap in <text>) */
function splitLabel(title) {
  const words = (title || '').split(' ');
  if (words.length <= 2) return [title];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
}

/* Bespoke SVG topology: numbered nodes on a wave/rail with a flowing data dot.
   dark + wide variants; real data in, honest diagram out. */
function TopologyDiagram({ steps, dark = false, wide = false }) {
  const [mobile, setMobile] = useState(false);
  const pathRef = useRef(null);
  const dotRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined;
    const mq = window.matchMedia('(max-width: 639px)');
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const C = dark
    ? { node: '#131316', ring: '#3F3F46', num: '#E4E4E7', label: '#71717A', path: '#3F3F46', dot: '#34D399' }
    : { node: 'var(--bg-page)', ring: 'var(--border-strong)', num: 'var(--text-primary)', label: 'var(--text-secondary)', path: 'var(--border-strong)', dot: 'var(--text-primary)' };

  const rail = !wide || mobile;
  const W = rail ? 300 : 640;
  const H = rail ? steps.length * 86 + 30 : 240;
  const r = rail ? 20 : 24;

  const nodes = steps.map((s, i) => {
    if (rail) return { x: 96, y: 56 + i * 86 };
    const x = steps.length === 1 ? 320 : 60 + (i * (520 / (steps.length - 1)));
    const y = 120 + Math.sin((i * Math.PI) / (steps.length - 1 || 1)) * 42;
    return { x, y };
  });
  const d = nodes.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');

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
      if (entries[0].isIntersecting) raf = requestAnimationFrame(loop);
      else if (raf) cancelAnimationFrame(raf);
    });
    io.observe(wrap);
    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, [rail, steps, dark]);

  return (
    <div ref={wrapRef} className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={`System flow: ${steps.map(s => s.title).join(', ')}`}>
        <path ref={pathRef} d={d} fill="none" stroke={C.path} strokeWidth="1.5" />
        <circle ref={dotRef} r="3" fill={C.dot} opacity="0.85" cx={nodes[0].x} cy={nodes[0].y} />
        {nodes.map((p, i) => {
          const lines = splitLabel(steps[i].title);
          return (
            <g key={i}>
              <circle className="topo-node" cx={p.x} cy={p.y} r={r} fill={C.node} stroke={C.ring} strokeWidth="1.5" />
              <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize={rail ? 11 : 12} fill={C.num} style={{ fontFamily: 'var(--font-mono)' }}>
                {String(i + 1).padStart(2, '0')}
              </text>
              {rail ? (
                <text x={p.x + r + 16} y={p.y - (lines.length === 2 ? 2 : 4)} textAnchor="start" fontSize={11} fill={C.label} style={{ fontFamily: 'var(--font-mono)' }}>
                  {lines.map((ln, li) => (
                    <tspan key={li} x={p.x + r + 16} dy={li === 0 ? 0 : 13}>{ln}</tspan>
                  ))}
                </text>
              ) : (
                <text x={p.x} y={p.y + r + 18} textAnchor="middle" fontSize={11} fill={C.label} style={{ fontFamily: 'var(--font-mono)' }}>
                  {lines.map((ln, li) => (
                    <tspan key={li} x={p.x} dy={li === 0 ? 0 : 13}>{ln}</tspan>
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

/* Subtle tech marquee - one strip, monochrome, pauses on hover */
function TechMarquee() {
  const items = PORTFOLIO_DATA.skills.filter(s => s.featured).map(s => s.name);
  const line = items.join('  /  ');
  return (
    <div className="marquee mt-10 select-none" aria-hidden="true">
      <div className="marquee-track">
        <span className="font-mono text-[12px] text-[var(--text-secondary)] whitespace-nowrap">{line}&nbsp;&nbsp;/&nbsp;&nbsp;</span>
        <span className="font-mono text-[12px] text-[var(--text-secondary)] whitespace-nowrap">{line}&nbsp;&nbsp;/&nbsp;&nbsp;</span>
      </div>
    </div>
  );
}

export default function Projects({ selectedSkill, onOpenModal }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', ...Array.from(new Set(PORTFOLIO_DATA.projects.map(p => p.category)))];

  let projectsList = PORTFOLIO_DATA.projects;
  if (activeCategory !== 'All') projectsList = projectsList.filter(p => p.category === activeCategory);
  if (selectedSkill) projectsList = projectsList.filter(p => p.tags.includes(selectedSkill));

  return (
    <section id="projects" className="py-24 sm:py-28 bg-[var(--bg-page)] border-b border-[var(--border-color)] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 pb-10">
          <div className="max-w-2xl">
            <h2 className="font-heading font-semibold text-[32px] sm:text-[42px] tracking-[-0.02em] text-[var(--text-primary)] leading-tight">
              Production-Grade Systems &amp; High-Throughput APIs.
            </h2>
            <p className="mt-4 text-[16px] text-[var(--text-body)] leading-relaxed max-w-[56ch]">
              Real-world backend systems, drawn the way they run. Follow each architecture below.
            </p>
          </div>

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

        <TechMarquee />

        {projectsList.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-mono text-[15px] text-[var(--text-primary)]">No projects found for active filter.</p>
            <p className="text-[13px] text-[var(--text-secondary)] mt-2">Try clearing the skill filter or selecting a different category.</p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
            {projectsList.map((project, idx) => {
              const featured = idx === 0;
              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.55, delay: idx * 0.06 }}
                  className={`group relative overflow-hidden rounded-2xl bg-[#09090B] text-[#FAFAFA] border border-[#26262B] shadow-[0_18px_50px_-20px_rgba(0,0,0,0.55)] transition-all duration-300 hover:-translate-y-1 hover:border-[#34D399]/40 hover:shadow-[0_28px_70px_-24px_rgba(0,0,0,0.7)] ${
                    featured ? 'lg:col-span-2' : ''
                  }`}
                >
                  {/* subtle top edge glow on hover */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#34D399]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />

                  <div className={`p-6 sm:p-8 grid gap-8 ${featured ? 'lg:grid-cols-2 lg:items-center' : ''}`}>
                    {/* Narrative */}
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#71717A]">
                          {project.category}
                        </span>
                        <span className="font-mono text-[11px] text-[#3F3F46]">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <h3 className={`font-heading font-medium tracking-[-0.01em] text-[#FAFAFA] leading-tight mt-3 ${featured ? 'text-[26px] sm:text-[32px]' : 'text-[22px]'}`}>
                        {project.title}
                      </h3>
                      <p className={`text-[#A1A1AA] leading-relaxed mt-3 ${featured ? 'text-[15.5px] max-w-[52ch]' : 'text-[14.5px] max-w-[44ch]'}`}>
                        {project.shortDesc}
                      </p>

                      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-7">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-[13px] text-[#E4E4E7] min-h-[44px] hover:text-[#FAFAFA] underline-offset-4 hover:underline transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" aria-hidden="true" />
                          Source code
                        </a>
                        <button
                          onClick={() => onOpenModal(project)}
                          className="group/cta inline-flex items-center gap-2 font-mono text-[13px] font-medium text-[#FAFAFA] min-h-[44px] underline underline-offset-4 decoration-[#3F3F46] hover:decoration-[#34D399] transition-colors"
                        >
                          View Architecture &amp; Specs
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    {/* Visual: topology on dark surface */}
                    <div className={featured ? '' : 'mt-2'}>
                      <TopologyDiagram steps={project.architectureDiagram || []} dark wide={featured} />
                      {project.apiEndpoint && (
                        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11.5px] text-[#71717A]">
                          <span className="text-[#E4E4E7]">{project.apiEndpoint.method} {project.apiEndpoint.path}</span>
                          <span>OpenAPI 3.0</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
