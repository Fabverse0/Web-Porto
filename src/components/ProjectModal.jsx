import React, { useState } from 'react';
import { X, ExternalLink, Github, Terminal, Activity, Layers, Copy, Check, Cpu, CheckCircle2, ArrowRight, Zap, Database, Server, ShieldCheck, HardDrive } from 'lucide-react';
import { motion } from 'framer-motion';
import ScalarReference from './ScalarReference';

function InteractiveArchitectureTopology({ architectureSteps }) {
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);
  const activeStep = architectureSteps[activeNodeIndex] || architectureSteps[0];

  return (
    <div className="space-y-6">
      {/* Animated Connector Flow Track */}
      <div className="p-6 rounded-2xl bg-[#09090B] text-[#FAFAFA] border border-[#27272A] space-y-6 shadow-xl relative overflow-hidden">
        
        {/* Animated Data Packet Pulse Line */}
        <div className="relative flex items-center justify-between gap-2 overflow-x-auto pb-4 pt-2">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#27272A] -translate-y-1/2 z-0">
            <motion.div
              className="h-full bg-gradient-to-r from-[#10B981] via-[#2563EB] to-[#10B981] shadow-[0_0_12px_#10B981]"
              animate={{
                x: ['0%', '100%', '0%']
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              style={{ width: '30%' }}
            />
          </div>

          {architectureSteps.map((step, idx) => {
            const isActive = activeNodeIndex === idx;

            return (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveNodeIndex(idx)}
                className={`relative z-10 flex flex-col items-center gap-2 p-3 rounded-xl border transition-all cursor-pointer min-w-[130px] ${
                  isActive
                    ? 'bg-[#18181B] border-[#10B981] text-[#FFFFFF] ring-2 ring-[#10B981]/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                    : 'bg-[#09090B] border-[#27272A] text-[#A1A1AA] hover:border-[#52525B] hover:text-[#FFFFFF]'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                  isActive ? 'bg-[#10B981] text-[#09090B]' : 'bg-[#27272A] text-[#FAFAFA]'
                }`}>
                  0{step.step}
                </div>
                <span className="font-heading font-semibold text-xs text-center line-clamp-1">
                  {step.title.split(' ')[0]} {step.title.split(' ')[1] || ''}
                </span>
                <span className="font-mono text-[9px] text-[#10B981]">
                  {isActive ? '● ACTIVE NODE' : 'CLICK NODE'}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Selected Node Spec Inspector Panel */}
        <motion.div
          key={activeNodeIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-5 rounded-xl bg-[#18181B] border border-[#27272A] space-y-3"
        >
          <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#10B981] uppercase bg-[#10B981]/10 px-2.5 py-0.5 rounded border border-[#10B981]/20">
                Step 0{activeStep.step} Architecture Node
              </span>
              <h4 className="font-heading font-bold text-base text-[#FFFFFF]">
                {activeStep.title}
              </h4>
            </div>
            <span className="font-mono text-xs text-[#2563EB] bg-[#2563EB]/10 px-2 py-0.5 rounded border border-[#2563EB]/20 hidden sm:inline">
              Latency: &lt; 2.4ms
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
            {activeStep.desc}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-[11px] font-mono text-[#71717A]">
            <span className="flex items-center gap-1 text-[#10B981]">
              <Zap className="w-3.5 h-3.5" /> High Availability SLA: 99.99%
            </span>
            <span className="flex items-center gap-1 text-[#2563EB]">
              <ShieldCheck className="w-3.5 h-3.5" /> Idempotent Lock: SETNX Enabled
            </span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default function ProjectModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!project) return null;

  const tabs = [
    { id: 'overview', label: 'Overview & Specs' },
    { id: 'architecture', label: 'Interactive System Topology' },
    { id: 'metrics', label: 'Performance & Metrics' },
    { id: 'scalar', label: 'Scalar API Reference' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 modal-backdrop overflow-y-auto">
      <div className="bg-[#FFFFFF] dark:bg-[#18181B] border border-[#09090B] dark:border-[#27272A] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-[#09090B] text-[#FFFFFF] px-6 py-5 flex items-center justify-between border-b border-[#27272A]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#10B981] font-bold uppercase tracking-wider">
                {project.category} Architecture
              </span>
              <span className="text-xs bg-[#2563EB] text-[#FFFFFF] font-mono px-2 py-0.5 rounded font-semibold">
                Scalar OpenAPI 3.0
              </span>
            </div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl tracking-tight text-[#FFFFFF]">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#18181B] text-[#A1A1AA] hover:text-[#FFFFFF] hover:bg-[#27272A] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs Bar */}
        <div className="flex border-b border-[#E4E4E7] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#09090B] overflow-x-auto">
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
                  className="inline-flex items-center gap-2 font-heading font-semibold text-xs py-2.5 px-5 rounded-xl bg-[#09090B] dark:bg-[#FAFAFA] text-[#FFFFFF] dark:text-[#09090B]"
                >
                  <Github className="w-4 h-4" />
                  View GitHub Source
                </a>
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-heading font-semibold text-xs py-2.5 px-5 rounded-xl bg-[#FFFFFF] dark:bg-[#18181B] text-[#09090B] dark:text-[#FAFAFA] border border-[#E4E4E7] dark:border-[#27272A]"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Scalar API Docs
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
                  <div key={key} className="p-4 rounded-xl bg-[#09090B] text-[#FFFFFF] space-y-1 border border-[#27272A]">
                    <div className="font-mono text-[10px] uppercase text-[#A1A1AA]">{key}</div>
                    <div className="font-mono font-bold text-lg sm:text-xl text-[#10B981]">{val}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Scalar API Reference */}
          {activeTab === 'scalar' && (
            <ScalarReference project={project} />
          )}

        </div>

      </div>
    </div>
  );
}
