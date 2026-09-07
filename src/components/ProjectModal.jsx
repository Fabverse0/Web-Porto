import React, { useState, useEffect, useRef } from 'react';
import { X, ExternalLink, Github, ArrowRight, Play, Pause, Database, Server, Cpu, ShieldCheck } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

/* Interactive System Topology Visualizer (kept from original, restyled) */
function InteractiveArchitectureTopology({ architectureSteps }) {
  const reduce = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(!reduce);

  useEffect(() => {
    if (!isPlaying || !architectureSteps || architectureSteps.length === 0) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % architectureSteps.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [isPlaying, architectureSteps]);

  const step = architectureSteps[activeStep] || architectureSteps[0];

  const getNodeIcon = () => {
    const type = step?.nodeType?.toLowerCase();
    switch (type) {
      case 'database':
      case 'storage':
        return <Database className="w-4 h-4 text-[#34D399]" aria-hidden="true" />;
      case 'security':
      case 'auth':
        return <ShieldCheck className="w-4 h-4 text-[#34D399]" aria-hidden="true" />;
      case 'compute':
      case 'worker':
        return <Cpu className="w-4 h-4 text-[#34D399]" aria-hidden="true" />;
      default:
        return <Server className="w-4 h-4 text-[#34D399]" aria-hidden="true" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#09090B] text-[#FAFAFA] border border-[#27272A] p-5 sm:p-6 space-y-6">
        {/* Controls */}
        <div className="flex items-center justify-between border-b border-[#27272A] pb-3 gap-3 flex-wrap">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 bg-[#34D399]" aria-hidden="true" />
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#34D399]">
              Live Topology Simulation ({activeStep + 1}/{architectureSteps.length})
            </span>
          </div>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex items-center gap-1.5 px-3 min-h-[44px] bg-[#18181B] border border-[#27272A] text-xs font-mono text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" aria-hidden="true" /> : <Play className="w-3.5 h-3.5" aria-hidden="true" />}
            <span>{isPlaying ? 'Pause Flow' : 'Auto Play'}</span>
          </button>
        </div>

        {/* Node pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch relative py-2">
          {architectureSteps.map((s, idx) => {
            const isActive = activeStep === idx;
            return (
              <React.Fragment key={idx}>
                <motion.button
                  type="button"
                  onClick={() => {
                    setActiveStep(idx);
                    setIsPlaying(false);
                  }}
                  animate={{
                    scale: isActive ? 1.03 : 1,
                    borderColor: isActive ? '#34D399' : '#27272A',
                  }}
                  className={`p-4 cursor-pointer border text-left space-y-2 relative transition-colors ${
                    isActive
                      ? 'bg-[#18181B] text-[#FAFAFA]'
                      : 'bg-[#18181B]/60 text-[#A1A1AA] hover:bg-[#18181B]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] px-1.5 py-0.5 border border-[#27272A] text-[#A1A1AA]">
                      STEP {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className={`w-1.5 h-1.5 ${isActive ? 'bg-[#34D399]' : 'bg-[#27272A]'}`} aria-hidden="true" />
                  </div>
                  <div className="text-[13px] font-medium text-[#FAFAFA] flex items-center gap-1.5 leading-snug">
                    {isActive && getNodeIcon()}
                    {s.title}
                  </div>
                  {s.layer && (
                    <div className="font-mono text-[10.5px] text-[#A1A1AA]">
                      {s.layer}
                    </div>
                  )}
                </motion.button>

                {idx < architectureSteps.length - 1 && (
                  <div className="hidden md:flex justify-center items-center" aria-hidden="true">
                    <motion.div
                      animate={{ x: isActive ? [0, 4, 0] : 0 }}
                      transition={{ repeat: isActive ? Infinity : 0, duration: 1.2 }}
                    >
                      <ArrowRight className="w-4 h-4 text-[#34D399]" />
                    </motion.div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Active step detail */}
        <div className="border border-[#27272A] bg-[#18181B] p-4 space-y-2">
          <div className="flex items-center justify-between gap-3 text-[11px] font-mono flex-wrap">
            <span className="text-[#34D399]">Active Phase: {step.title}</span>
            {step.layer && <span className="text-[#A1A1AA]">{step.layer}</span>}
          </div>
          <p className="text-[13px] text-[#E4E4E7] leading-relaxed">
            {step.desc || step.description}
          </p>
          {step.protocol && (
            <div className="font-mono text-[11px] text-[#A1A1AA] pt-1">
              <span className="text-[#A1A1AA]">Protocol / Engine: </span>
              <span className="text-[#34D399]">{step.protocol}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  /* Focus management: move focus into the dialog, trap Tab, restore on close (WCAG 2.4.3 / 2.1.2) */
  useEffect(() => {
    if (!project) return undefined;
    const previous = document.activeElement;
    const focusTimer = setTimeout(() => {
      if (closeRef.current) closeRef.current.focus();
    }, 0);

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKey);

    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKey);
      if (previous && previous.focus) previous.focus();
    };
  }, [project]);

  /* Lock body scroll while the modal is open */
  useEffect(() => {
    if (!project) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [project]);

  if (!project) return null;

  const tabs = [
    { id: 'overview', label: 'Overview & System Specs' },
    { id: 'architecture', label: 'Interactive System Topology' },
  ];

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 modal-backdrop overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
    >
      <div className="bg-[var(--bg-card)] border border-[var(--border-strong)] w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header: ink panel */}
        <div className="bg-[#09090B] text-[#FAFAFA] px-6 py-5 flex items-start justify-between gap-4 border-b border-[#27272A]">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#34D399]">
              {project.category} Architecture
            </p>
            <h2 className="font-heading font-medium text-xl sm:text-2xl tracking-[-0.01em] mt-1.5">
              {project.title}
            </h2>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            className="w-11 h-11 shrink-0 flex items-center justify-center border border-[#27272A] text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#18181B] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[var(--border-color)] bg-[var(--bg-muted)] overflow-x-auto" role="group" aria-label="Project detail sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              aria-pressed={activeTab === tab.id}
              className={`font-mono text-xs sm:text-[13px] px-5 min-h-[44px] whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'border-[var(--text-primary)] text-[var(--text-primary)] bg-[var(--bg-card)]'
                  : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-[var(--bg-card)]">

          {/* Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* System flow diagram: the honest "photo" of a backend system */}
              <div className="border border-[var(--border-color)] bg-[var(--bg-page)] p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--text-secondary)]">
                  System Flow
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {(project.architectureDiagram || []).map((s, i) => (
                    <React.Fragment key={i}>
                      <div className="flex-1 min-w-[150px] border border-[var(--border-strong)] bg-[var(--bg-card)] px-3.5 py-3">
                        <div className="font-mono text-[10px] text-[var(--text-secondary)]">
                          STEP {String(i + 1).padStart(2, '0')}
                        </div>
                        <div className="text-[13px] font-medium text-[var(--text-primary)] mt-1.5 leading-snug">
                          {s.title}
                        </div>
                      </div>
                      {i < (project.architectureDiagram || []).length - 1 && (
                        <ArrowRight className="w-4 h-4 self-center text-[var(--text-secondary)] shrink-0" aria-hidden="true" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Short explanation */}
              <div>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--text-secondary)]">System Summary</h3>
                <p className="text-[15.5px] text-[var(--text-body)] leading-relaxed mt-3 max-w-[70ch]">
                  {project.shortDesc}
                </p>
              </div>

              {/* Stack */}
              <div>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--text-secondary)]">Technology Stack</h3>
                <p className="font-mono text-[13px] text-[var(--text-primary)] leading-relaxed mt-3 max-w-[70ch]">
                  {project.tags.join(', ')}
                </p>
              </div>

              {/* Actions: source first */}
              <div className="flex flex-wrap gap-3 border-t border-[var(--border-color)] pt-5">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[13px] min-h-[44px] px-5 bg-[var(--text-primary)] text-[var(--bg-page)] border border-[var(--text-primary)] hover:opacity-90 transition-opacity"
                >
                  <Github className="w-4 h-4" aria-hidden="true" />
                  View GitHub Source
                </a>
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[13px] min-h-[44px] px-5 text-[var(--text-primary)] border border-[var(--border-strong)] hover:border-[var(--text-primary)] transition-colors"
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  Live System Gateway
                </a>
              </div>
            </div>
          )}

          {/* Architecture */}
          {activeTab === 'architecture' && (
            <InteractiveArchitectureTopology architectureSteps={project.architectureDiagram} />
          )}

        </div>
      </div>
    </div>
  );
}
