import React, { useState } from 'react';
import { X, ExternalLink, Github, Terminal, Activity, Layers, Copy, Check, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import ScalarReference from './ScalarReference';

export default function ProjectModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!project) return null;

  const tabs = [
    { id: 'overview', label: 'Overview & Specs' },
    { id: 'architecture', label: 'System Architecture' },
    { id: 'metrics', label: 'Performance & Metrics' },
    { id: 'scalar', label: 'Scalar API Reference' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 modal-backdrop overflow-y-auto">
      <div className="bg-[#FFFFFF] border border-[#09090B] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
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
        <div className="flex border-b border-[#E4E4E7] bg-[#FAFAFA] overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`font-heading font-medium text-xs sm:text-sm px-6 py-3.5 whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab.id
                  ? 'border-[#09090B] text-[#09090B] bg-[#FFFFFF] font-bold'
                  : 'border-transparent text-[#71717A] hover:text-[#09090B]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 bg-[#FFFFFF]">
          
          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="font-heading font-bold text-lg text-[#09090B]">System Summary</h3>
                <p className="text-[#71717A] text-base leading-relaxed">
                  {project.shortDesc}
                </p>
              </div>

              {/* Tech Stack Badges */}
              <div className="space-y-2">
                <h4 className="font-mono text-xs uppercase font-bold text-[#09090B]">Technology Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#F4F4F5] border border-[#E4E4E7] rounded-md font-mono text-xs font-semibold text-[#09090B]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-[#E4E4E7]">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-black text-xs py-2.5 px-5"
                >
                  <Github className="w-4 h-4" />
                  View GitHub Source
                </a>
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline text-xs py-2.5 px-5"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Scalar API Docs
                </a>
              </div>
            </div>
          )}

          {/* Tab 2: System Architecture Diagram Flowchart */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <h3 className="font-heading font-bold text-lg text-[#09090B]">Request Flow & System Topology</h3>
              <div className="space-y-4">
                {project.architectureDiagram.map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-xl bg-[#FAFAFA] border border-[#E4E4E7] items-start">
                    <div className="w-8 h-8 rounded-lg bg-[#09090B] text-[#FFFFFF] flex items-center justify-center font-mono font-bold text-xs shrink-0">
                      0{item.step}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-heading font-bold text-sm text-[#09090B]">{item.title}</h4>
                      <p className="text-xs text-[#71717A] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Performance & Metrics */}
          {activeTab === 'metrics' && (
            <div className="space-y-6">
              <h3 className="font-heading font-bold text-lg text-[#09090B]">Production Benchmark Metrics</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Object.entries(project.metrics).map(([key, val]) => (
                  <div key={key} className="p-4 rounded-xl bg-[#09090B] text-[#FFFFFF] space-y-1">
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
