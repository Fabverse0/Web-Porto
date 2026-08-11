import React, { useState } from 'react';
import { ApiReferenceReact } from '@scalar/api-reference-react';
import '@scalar/api-reference-react/style.css';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Globe, Code2, Layers, ExternalLink, Terminal, Sparkles, Check } from 'lucide-react';

export default function ScalarHub() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const projects = PORTFOLIO_DATA.projects;
  const currentProject = projects[selectedProjectIndex];

  return (
    <section id="scalar-hub" className="py-20 bg-[var(--bg-card)] border-t border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#2563EB] bg-[#2563EB]/10 px-3 py-1 rounded-full border border-[#2563EB]/20">
              <Globe className="w-3.5 h-3.5" />
              Scalar OpenAPI 3.0 Interactive Documentation
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[var(--text-primary)] tracking-tight">
              Live Interactive Scalar API Reference.
            </h2>
            <p className="text-[var(--text-secondary)] text-base leading-relaxed">
              Explore complete OpenAPI 3.0 technical specifications, request/response schemas, and multi-language client code generators powered by Scalar.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#10B981] bg-[#09090B] dark:bg-[#18181B] text-[#FAFAFA] px-4 py-2.5 rounded-xl border border-[#27272A]">
            <Sparkles className="w-4 h-4 text-[#10B981]" />
            <span>OpenAPI 3.0 Validated</span>
          </div>
        </div>

        {/* Project Selector Pills */}
        <div className="flex flex-wrap gap-3">
          {projects.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => setSelectedProjectIndex(idx)}
              className={`flex items-center gap-2 font-mono text-xs sm:text-sm px-5 py-3 rounded-xl border transition-all ${
                selectedProjectIndex === idx
                  ? 'bg-[var(--text-primary)] text-[var(--bg-page)] border-[var(--text-primary)] shadow-md font-bold'
                  : 'bg-[var(--bg-page)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Code2 className={`w-4 h-4 ${selectedProjectIndex === idx ? 'text-[#10B981]' : 'text-[var(--text-secondary)]'}`} />
              <span>{proj.title}</span>
            </button>
          ))}
        </div>

        {/* Scalar Embedded Reference Container */}
        <div className="card-black rounded-2xl overflow-hidden shadow-2xl border border-[#27272A]">
          {/* Top Bar */}
          <div className="bg-[#18181B] px-6 py-4 border-b border-[#27272A] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-[#10B981] text-[#FFFFFF] font-mono text-xs font-bold uppercase">
                OpenAPI 3.0
              </span>
              <span className="font-mono text-sm text-[#FAFAFA] font-bold">
                {currentProject.title} API Reference
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-[#A1A1AA]">
              <span>Base URL: <code className="text-[#10B981]">https://api.dev/v1</code></span>
            </div>
          </div>

          {/* Scalar React Component */}
          <div className="p-2 sm:p-6 bg-[#FFFFFF] min-h-[500px]">
            <ApiReferenceReact
              configuration={{
                spec: {
                  content: currentProject.openApiSpec
                },
                theme: 'purple',
                showSidebar: true,
                darkMode: false
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
