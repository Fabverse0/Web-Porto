import React, { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ArrowUpRight } from 'lucide-react';

/* ── Focus-trap utility (lightweight) ── */
function focusableEls(container) {
  return Array.from(
    container.querySelectorAll(
      'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"]),input,select,textarea'
    )
  ).filter((el) => el.offsetParent !== null);
}

export default function ProjectSpecSheet({ plate, specRows, onClose }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const lastActive = useRef(null);

  /* Scroll lock + focus + escape key */
  useEffect(() => {
    lastActive.current = document.activeElement;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const els = focusableEls(panelRef.current);
      if (els.length === 0) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      lastActive.current?.focus?.();
    };
  }, [onClose]);

  /* Backdrop click (not panel) */
  const onBackdrop = useCallback(
    (e) => { if (e.target === e.currentTarget) onClose(); },
    [onClose]
  );

  if (!plate) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="specsheet-backdrop"
        onMouseDown={onBackdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
      >
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`specsheet-title-${plate.id}`}
          className="specsheet-panel"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 14 }}
          transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
        >
          {/* ── Toolbar ── */}
          <div className="specsheet-toolbar">
            <span className="font-mono">
              Spec sheet — {plate.index}
            </span>
            <button
              ref={closeRef}
              onClick={onClose}
              className="specsheet-close"
              aria-label="Close spec sheet"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* ── Photo band ── */}
          <figure className="specsheet-photo">
            <img src={plate.photo} alt={plate.alt} />
          </figure>

          {/* ── Body ── */}
          <div className="specsheet-body">
            <p className="font-mono specsheet-eyebrow">
              {plate.index} — project spec sheet
            </p>
            <h3
              id={`specsheet-title-${plate.id}`}
              className="specsheet-title font-heading font-medium tracking-[-0.01em] text-[var(--text-primary)]"
            >
              {plate.name}
            </h3>

            {/* Summary */}
            <div className="specsheet-block">
              <p className="specsheet-label font-mono">Summary</p>
              <p className="specsheet-text text-[var(--text-body)]">
                [ Summary — two or three sentences on the problem, the
                approach, and the result. Replace this with the real
                write-up. ]
              </p>
            </div>

            {/* Spec table */}
            <div className="specsheet-block">
              <p className="specsheet-label font-mono">Specifications</p>
              <dl className="specsheet-table">
                {specRows.map(([k, v]) => (
                  <div className="specsheet-row" key={k}>
                    <dt className="font-mono">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Footer — repo link */}
            <div className="specsheet-foot">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="specsheet-gh"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
                Open GitHub
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
              <span className="font-mono specsheet-reponote">
                [ repository link ]
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}