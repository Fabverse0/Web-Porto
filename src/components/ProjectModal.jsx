import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Github, ArrowRight, Play, Pause, Database, Server, Cpu, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Interactive System Topology Visualizer
function InteractiveArchitectureTopology({ architectureSteps }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying || !architectureSteps || architectureSteps.length === 0) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % architectureSteps.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [isPlaying, architectureSteps]);

  const step = architectureSteps[activeStep] || architectureSteps[0];

  const getNodeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'database':
      case 'storage':
        return <Database className="w-4 h-4 text-[#10B981]" />;
      case 'security':
      case 'auth':
        return <ShieldCheck className="w-4 h-4 text-[#10B981]" />;
      case 'compute':
      case 'worker':
        return <Cpu className="w-4 h-4 text-[#10B981]" />;
      default:
        return <Server className="w-4 h-4 text-[#10B981]" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Node Topology Canvas Box */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#004741] dark:bg-[#09090B] text-[#F0EDE4] dark:text-[#FAFAFA] border border-[#003833] dark:border-[#27272A] space-y-5 sm:space-y-6 shadow-xl relative overflow-hidden">
        
        {/* Play / Pause & Step Navigation Controls */}
        <div className="flex items-center justify-between border-b border-[#005C55]/60 dark:border-[#27272A] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
            <span className="font-mono text-xs text-[#10B981] font-bold uppercase tracking-wider">
              Topology Simulation ({activeStep + 1}/{architectureSteps.length})
            </span>
          </div>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#003833] dark:bg-[#18181B] text-xs font-mono text-[#DDD7C8] dark:text-[#A1A1AA] hover:text-[#FFFFFF] border border-[#005C55]/80 dark:border-[#27272A] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause' : 'Auto'}</span>
          </button>
        </div>

        {/* Node Pipeline Flow Chart */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 items-center relative py-2 sm:py-4">
          {architectureSteps.map((s, idx) => {
            const isActive = activeStep === idx;
            return (
              <React.Fragment key={idx}>
                <motion.div
                  onClick={() => {
                    setActiveStep(idx);
                    setIsPlaying(false);
                  }}
                  animate={{
                    scale: isActive ? 1.03 : 1,
                    borderColor: isActive ? '#10B981' : '#005C55',
                  }}
                  className={`p-4 rounded-xl cursor-pointer border transition-all text-left space-y-2 relative overflow-hidden ${
                    isActive
                      ? 'bg-[#003833] dark:bg-[#18181B] text-[#FFFFFF] shadow-lg ring-2 ring-[#10B981]'
                      : 'bg-[#003833]/60 dark:bg-[#18181B]/60 text-[#DDD7C8] dark:text-[#A1A1AA] hover:bg-[#003833] dark:hover:bg-[#18181B]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#002B27] dark:bg-[#09090B] border border-[#005C55] dark:border-[#27272A] font-bold">
                      STEP 0{idx + 1}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#10B981]' : 'bg-[#005C55] dark:bg-[#27272A]'}`} />
                  </div>
                  <div className="font-heading font-bold text-sm text-[#FFFFFF] flex items-center gap-1.5">
                    {getNodeIcon(s.nodeType)}
                    {s.title}
                  </div>
                  <div className="font-mono text-[11px] text-[#A1A1AA] line-clamp-1">
                    {s.layer}
                  </div>
                </motion.div>

                {idx < architectureSteps.length - 1 && (
                  <div className="hidden md:flex justify-center items-center text-[#10B981]">
                    <motion.div
                      animate={{ x: isActive ? [0, 4, 0] : 0 }}
                      transition={{ repeat: Infinity, duration: 1.2 }}
                    >
                      <ArrowRight className="w-5 h-5 text-[#10B981]" />
                    </motion.div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Active Node Detail Inspector */}
        <div className="p-4 rounded-xl bg-[#003833] dark:bg-[#18181B] border border-[#005C55]/60 dark:border-[#27272A] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#10B981] font-bold">Phase: {step.title}</span>
            <span className="text-[#DDD7C8] dark:text-[#A1A1AA]">{step.layer}</span>
          </div>
          <p className="text-xs sm:text-sm text-[#E5E0D4] dark:text-[#FAFAFA] leading-relaxed">
            {step.description}
          </p>
          {step.protocol && (
            <div className="font-mono text-[11px] text-[#DDD7C8] dark:text-[#A1A1AA] pt-1">
              <strong>Protocol:</strong> <span className="text-[#10B981]">{step.protocol}</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default function ProjectModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');

  // Keyboard Escape listener & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

  const tabs = [
    { id: 'overview', label: 'Overview & Specs' },
    { id: 'architecture', label: 'Topology Simulation' },
    { id: 'metrics', label: 'Benchmark Metrics' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 modal-backdrop overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FAF8F5] dark:bg-[#18181B] border border-[#DDD7C8] dark:border-[#27272A] rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="bg-[#004741] dark:bg-[#09090B] text-[#F0EDE4] dark:text-[#FFFFFF] px-5 sm:px-7 py-4 sm:py-5 flex items-center justify-between border-b border-[#003833] dark:border-[#27272A]">
          <div className="space-y-1">
            <span className="font-mono text-xs text-[#10B981] font-bold uppercase tracking-wider">
              {project.category} Architecture
            </span>
            <h2 id="modal-project-title" className="font-heading font-bold text-lg sm:text-2xl tracking-tight text-[#F0EDE4] dark:text-[#FFFFFF]">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-[#003833] dark:bg-[#18181B] text-[#DDD7C8] dark:text-[#A1A1AA] hover:text-[#FFFFFF] hover:bg-[#005C55] dark:hover:bg-[#27272A] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs Bar with Sliding Pill */}
        <div className="flex border-b border-[#DDD7C8] dark:border-[#27272A] bg-[#E5E0D4] dark:bg-[#09090B] overflow-x-auto p-1.5 gap-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative font-heading font-medium text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl whitespace-nowrap transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004741] ${
                  isActive
                    ? 'text-[#F0EDE4] dark:text-[#09090B] font-bold shadow-xs'
                    : 'text-[#4A635F] dark:text-[#A1A1AA] hover:text-[#004741] dark:hover:text-[#FAFAFA]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeModalTabPill"
                    className="absolute inset-0 bg-[#004741] dark:bg-[#FAFAFA] rounded-xl -z-10 shadow-xs"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Modal Body Content */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1 space-y-6 bg-[#FAF8F5] dark:bg-[#18181B]">
          
          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="font-heading font-bold text-lg sm:text-xl text-[#004741] dark:text-[#FAFAFA]">System Summary</h3>
                <p className="text-[#4A635F] dark:text-[#A1A1AA] text-sm sm:text-base leading-relaxed">
                  {project.shortDesc}
                </p>
              </div>

              {/* Tech Stack Badges */}
              <div className="space-y-2">
                <h4 className="font-mono text-xs uppercase font-bold text-[#004741] dark:text-[#FAFAFA]">Technology Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#F0EDE4] dark:bg-[#09090B] border border-[#DDD7C8] dark:border-[#27272A] rounded-lg font-mono text-xs font-semibold text-[#004741] dark:text-[#FAFAFA]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 sm:gap-4 pt-4 border-t border-[#DDD7C8] dark:border-[#27272A]">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 font-heading font-semibold text-xs h-11 px-5 rounded-xl bg-[#004741] dark:bg-[#FAFAFA] text-[#F0EDE4] dark:text-[#09090B] hover:bg-[#005C55] dark:hover:opacity-90 transition-all shadow-xs min-w-[150px]"
                >
                  <Github className="w-4 h-4" />
                  <span>View GitHub Source</span>
                </a>
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 font-heading font-semibold text-xs h-11 px-5 rounded-xl bg-[#FAF8F5] dark:bg-[#18181B] text-[#004741] dark:text-[#FAFAFA] border border-[#DDD7C8] dark:border-[#27272A] hover:bg-[#E5E0D4] dark:hover:bg-[#27272A] transition-all shadow-xs min-w-[150px]"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Gateway</span>
                </a>
              </div>
            </div>
          )}

          {/* Tab 2: Interactive System Architecture Topology */}
          {activeTab === 'architecture' && (
            <InteractiveArchitectureTopology architectureSteps={project.architectureDiagram} />
          )}

          {/* Tab 3: Performance & Metrics */}
          {activeTab === 'metrics' && (
            <div className="space-y-6">
              <h3 className="font-heading font-bold text-lg sm:text-xl text-[#004741] dark:text-[#FAFAFA]">Production Benchmark Metrics</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {Object.entries(project.metrics).map(([key, val]) => (
                  <div key={key} className="p-4 rounded-xl bg-[#004741] dark:bg-[#09090B] text-[#F0EDE4] dark:text-[#FFFFFF] space-y-1 border border-[#003833] dark:border-[#27272A] shadow-xs">
                    <div className="font-mono text-[10px] uppercase text-[#DDD7C8] dark:text-[#A1A1AA]">{key}</div>
                    <div className="font-mono font-bold text-base sm:text-xl text-[#10B981]">{val}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
