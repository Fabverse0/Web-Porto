import React, { useState } from 'react';
import { X, ExternalLink, Github, ArrowRight, Play, Pause, Database, Server, Cpu, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

// Interactive System Topology Visualizer
function InteractiveArchitectureTopology({ architectureSteps }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  React.useEffect(() => {
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
      <div className="p-6 rounded-2xl bg-[#09090B] dark:bg-[#09090B] text-[#FAFAFA] dark:text-[#FAFAFA] border border-[#27272A] dark:border-[#27272A] space-y-6 shadow-xl relative overflow-hidden">
        
        {/* Play / Pause & Step Navigation Controls */}
        <div className="flex items-center justify-between border-b border-[#27272A] dark:border-[#27272A] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
            <span className="font-mono text-xs text-[#10B981] font-bold uppercase tracking-wider">
              Live Topology Simulation ({activeStep + 1}/{architectureSteps.length})
            </span>
          </div>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#18181B] dark:bg-[#18181B] text-xs font-mono text-[#A1A1AA] dark:text-[#A1A1AA] hover:text-[#FFFFFF] border border-[#27272A] dark:border-[#27272A] transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause Flow' : 'Auto Play'}</span>
          </button>
        </div>

        {/* Node Pipeline Flow Chart */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center relative py-4">
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
                    scale: isActive ? 1.04 : 1,
                    borderColor: isActive ? '#10B981' : '#27272A',
                  }}
                  className={`p-4 rounded-xl cursor-pointer border transition-all text-left space-y-2 relative overflow-hidden ${
                    isActive
                      ? 'bg-[#18181B] dark:bg-[#18181B] text-[#FFFFFF] shadow-lg ring-2 ring-[#10B981]'
                      : 'bg-[#18181B]/60 dark:bg-[#18181B]/60 text-[#A1A1AA] dark:text-[#A1A1AA] hover:bg-[#18181B] dark:hover:bg-[#18181B]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#09090B] dark:bg-[#09090B] border border-[#27272A] dark:border-[#27272A] font-bold">
                      STEP 0{idx + 1}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#10B981]' : 'bg-[#27272A] dark:bg-[#27272A]'}`} />
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
        <div className="p-4 rounded-xl bg-[#18181B] dark:bg-[#18181B] border border-[#27272A] dark:border-[#27272A] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#10B981] font-bold">Active Phase: {step.title}</span>
            <span className="text-[#A1A1AA] dark:text-[#A1A1AA]">{step.layer}</span>
          </div>
          <p className="text-xs sm:text-sm text-[#E4E4E7] dark:text-[#FAFAFA] leading-relaxed">
            {step.desc || step.description}
          </p>
          {step.protocol && (
            <div className="font-mono text-[11px] text-[#A1A1AA] dark:text-[#A1A1AA] pt-1">
              <strong>Protocol / Engine:</strong> <span className="text-[#10B981]">{step.protocol}</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default function ProjectModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!project) return null;

  const tabs = [
    { id: 'overview', label: 'Overview & System Specs' },
    { id: 'architecture', label: 'Interactive System Topology' },
    { id: 'metrics', label: 'Performance Metrics' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 modal-backdrop overflow-y-auto">
      <div className="bg-[#FFFFFF] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-[#09090B] dark:bg-[#09090B] text-[#FAFAFA] dark:text-[#FFFFFF] px-6 py-5 flex items-center justify-between border-b border-[#27272A] dark:border-[#27272A]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#10B981] font-bold uppercase tracking-wider">
                {project.category} Architecture
              </span>
            </div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl tracking-tight text-[#FAFAFA] dark:text-[#FFFFFF]">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#18181B] dark:bg-[#18181B] text-[#A1A1AA] dark:text-[#A1A1AA] hover:text-[#FFFFFF] hover:bg-[#27272A] dark:hover:bg-[#27272A] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs Bar */}
        <div className="flex border-b border-[#E4E4E7] dark:border-[#27272A] bg-[#F4F4F5] dark:bg-[#09090B] overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`font-heading font-medium text-xs sm:text-sm px-6 py-3.5 whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab.id
                  ? 'border-[#09090B] dark:border-[#10B981] text-[#09090B] dark:text-[#FAFAFA] bg-[#FFFFFF] dark:bg-[#18181B] font-bold'
                  : 'border-transparent text-[#71717A] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-[#FAFAFA]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 bg-[#FFFFFF] dark:bg-[#18181B]">
          
          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="font-heading font-bold text-lg text-[#09090B] dark:text-[#FAFAFA]">System Summary</h3>
                <p className="text-[#71717A] dark:text-[#A1A1AA] text-base leading-relaxed">
                  {project.shortDesc}
                </p>
              </div>

              {/* Tech Stack Badges */}
              <div className="space-y-2">
                <h4 className="font-mono text-xs uppercase font-bold text-[#09090B] dark:text-[#FAFAFA]">Technology Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#F4F4F5] dark:bg-[#09090B] border border-[#E4E4E7] dark:border-[#27272A] rounded-md font-mono text-xs font-semibold text-[#09090B] dark:text-[#FAFAFA]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-[#E4E4E7] dark:border-[#27272A]">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-heading font-semibold text-xs py-2.5 px-5 rounded-xl bg-[#09090B] dark:bg-[#FAFAFA] text-[#FAFAFA] dark:text-[#09090B] hover:bg-[#27272A] dark:hover:opacity-90 transition-all shadow-sm"
                >
                  <Github className="w-4 h-4" />
                  View GitHub Source
                </a>
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-heading font-semibold text-xs py-2.5 px-5 rounded-xl bg-[#FFFFFF] dark:bg-[#18181B] text-[#09090B] dark:text-[#FAFAFA] border border-[#E4E4E7] dark:border-[#27272A] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] transition-all shadow-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live System Gateway
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
              <h3 className="font-heading font-bold text-lg text-[#09090B] dark:text-[#FAFAFA]">Production Benchmark Metrics</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Object.entries(project.metrics).map(([key, val]) => (
                  <div key={key} className="p-4 rounded-xl bg-[#09090B] dark:bg-[#09090B] text-[#FAFAFA] dark:text-[#FFFFFF] space-y-1 border border-[#27272A] dark:border-[#27272A]">
                    <div className="font-mono text-[10px] uppercase text-[#A1A1AA] dark:text-[#A1A1AA]">{key}</div>
                    <div className="font-mono font-bold text-lg sm:text-xl text-[#10B981]">{val}</div>
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
