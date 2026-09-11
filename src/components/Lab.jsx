import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

/* Experiment 1 — cursor grid: cells light up under the pointer */
function CursorGrid() {
  const [hot, setHot] = useState(-1);
  const cells = Array.from({ length: 64 }, (_, i) => i);
  return (
    <div>
      <div
        className="grid grid-cols-8 border border-[var(--border-strong)]"
        onPointerLeave={() => setHot(-1)}
      >
        {cells.map((i) => (
          <div
            key={i}
            onPointerEnter={() => setHot(i)}
            className={
              'aspect-square border border-[var(--border-color)] transition-colors duration-150 ' +
              (hot === i ? 'bg-[var(--text-primary)]' : 'bg-transparent')
            }
          />
        ))}
      </div>
      <p className="font-mono text-[11px] text-[var(--text-secondary)] mt-3">
        CELL: {hot >= 0 ? String(hot).padStart(2, '0') : '--'} / 64
      </p>
    </div>
  );
}

/* Experiment 2 — split reveal with replay */
function SplitDemo() {
  const [key, setKey] = useState(0);
  const words = 'Backend systems, documented.'.split(' ');
  return (
    <div>
      <p key={key} aria-label="Backend systems, documented." className="font-heading font-semibold text-[28px] leading-tight tracking-[-0.02em] text-[var(--text-primary)]">
        {words.map((w, i) => (
          <span key={i} aria-hidden="true" className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
            <motion.span
              className="inline-block"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
            >
              {w}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </p>
      <button
        type="button"
        onClick={() => setKey((k) => k + 1)}
        className="mt-4 font-mono text-[12px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--border-strong)] rounded-md px-3 py-2 min-h-[40px] transition-colors"
      >
        Replay reveal
      </button>
    </div>
  );
}

/* Experiment 3 — count-up on demand */
function CountUpDemo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [val, setVal] = useState(0);
  const [run, setRun] = useState(0);
  const target = 1280;

  useEffect(() => {
    if (!inView && run === 0) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / 1200, 1);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, run]);

  return (
    <div ref={ref}>
      <p className="font-mono text-[44px] leading-none tracking-[-0.02em] text-[var(--text-primary)] tabular-nums">
        {val.toLocaleString('en-US')}
      </p>
      <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--text-secondary)] mt-2">
        requests / second
      </p>
      <button
        type="button"
        onClick={() => setRun((r) => r + 1)}
        className="mt-4 font-mono text-[12px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--border-strong)] rounded-md px-3 py-2 min-h-[40px] transition-colors"
      >
        Run counter
      </button>
    </div>
  );
}

const EXPERIMENTS = [
  { id: 'grid', no: '01', title: 'Cursor Grid', desc: 'Pointer position as state. 64 cells, one lights up.', body: <CursorGrid /> },
  { id: 'split', no: '02', title: 'Split Reveal', desc: 'Words rise from masks. Same easing as the hero.', body: <SplitDemo /> },
  { id: 'count', no: '03', title: 'Count-Up', desc: 'Metrics animate once in view. Ease-out cubic.', body: <CountUpDemo /> },
];

export default function Lab() {
  return (
    <section id="lab" className="bg-[var(--bg-page)] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--text-secondary)]">
          Playground / Lab
        </p>
        <h1 className="font-heading font-semibold text-[clamp(36px,6vw,64px)] leading-[1.05] tracking-[-0.022em] text-[var(--text-primary)] mt-3">
          Small live experiments.
        </h1>
        <p className="text-lg text-[var(--text-body)] leading-relaxed max-w-[52ch] mt-4">
          Touch them. Every demo below runs real code — no screenshots.
        </p>

        <div className="mt-12 flex flex-col">
          {EXPERIMENTS.map((exp) => (
            <article key={exp.id} className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6 py-10 border-t border-[var(--border-color)] last:border-b">
              <div className="font-heading font-light text-[30px] text-[var(--border-strong)]" aria-hidden="true">
                {exp.no}
              </div>
              <div>
                <h2 className="font-heading font-semibold text-[22px] text-[var(--text-primary)] tracking-[-0.01em]">
                  {exp.title}
                </h2>
                <p className="text-[14.5px] text-[var(--text-body)] mt-1 mb-6">{exp.desc}</p>
                {exp.body}
              </div>
            </article>
          ))}
        </div>

        <a
          href="#about"
          className="inline-flex items-center gap-2 mt-10 font-mono text-sm text-[var(--text-primary)] underline underline-offset-[6px] decoration-[var(--border-strong)] hover:decoration-[var(--text-primary)] transition-colors min-h-[44px]"
        >
          ← Back to portfolio
        </a>
      </div>
    </section>
  );
}
