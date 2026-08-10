import React, { useState } from 'react';
import { ApiReferenceReact } from '@scalar/api-reference-react';
import '@scalar/api-reference-react/style.css';
import { Copy, Check, Terminal, ExternalLink, Code2 } from 'lucide-react';

export default function ScalarReference({ project }) {
  const [copied, setCopied] = useState(false);
  const [selectedLang, setSelectedLang] = useState('curl');

  const handleCopyCurl = () => {
    navigator.clipboard.writeText(project.apiEndpoint.curl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCodeSnippet = () => {
    if (selectedLang === 'curl') return project.apiEndpoint.curl;
    if (selectedLang === 'javascript') {
      return `fetch("${project.apiEndpoint.path}", {\n  method: "${project.apiEndpoint.method}",\n  headers: { "Content-Type": "application/json", "Authorization": "Bearer sk_live_..." },\n  body: JSON.stringify({ /* payload */ })\n}).then(res => res.json()).then(data => console.log(data));`;
    }
    if (selectedLang === 'go') {
      return `package main\n\nimport (\n\t"net/http"\n\t"io/ioutil"\n)\n\nfunc main() {\n\treq, _ := http.NewRequest("${project.apiEndpoint.method}", "${project.apiEndpoint.path}", nil)\n\treq.Header.Set("Authorization", "Bearer sk_live_...")\n\tresp, _ := http.DefaultClient.Do(req)\n\tdefer resp.Body.Close()\n}`;
    }
    if (selectedLang === 'python') {
      return `import requests\n\nurl = "${project.apiEndpoint.path}"\nheaders = {"Authorization": "Bearer sk_live_..."}\nresponse = requests.post(url, headers=headers)\nprint(response.json())`;
    }
    return project.apiEndpoint.curl;
  };

  return (
    <div className="space-y-6">
      
      {/* Scalar Header Banner */}
      <div className="p-4 rounded-xl bg-[#09090B] text-[#FFFFFF] flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#27272A]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#2563EB]/20 text-[#2563EB] font-mono text-xs font-bold border border-[#2563EB]/30">
            SCALAR
          </div>
          <div>
            <h4 className="font-heading font-bold text-sm text-[#FFFFFF]">Interactive Scalar OpenAPI Reference</h4>
            <p className="text-xs text-[#A1A1AA] font-mono">OpenAPI 3.0 Specification • Live Multi-Language Client Generator</p>
          </div>
        </div>

        <a
          href={project.demoUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-outline text-xs py-2 px-3 border-[#27272A] text-[#FAFAFA] hover:bg-[#18181B]"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Open Full Scalar Hub
        </a>
      </div>

      {/* Embedded Scalar React API Reference */}
      <div className="rounded-xl border border-[#E4E4E7] overflow-hidden bg-[#FFFFFF] shadow-sm">
        <div className="bg-[#18181B] px-4 py-3 border-b border-[#27272A] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#10B981] text-[#FFFFFF] font-mono font-bold text-xs uppercase">
              {project.apiEndpoint.method}
            </span>
            <span className="font-mono text-xs text-[#FAFAFA] font-semibold">
              {project.apiEndpoint.path}
            </span>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-[#09090B] p-1 rounded-lg border border-[#27272A]">
            {['curl', 'javascript', 'go', 'python'].map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`font-mono text-[11px] px-2.5 py-1 rounded transition-colors uppercase ${
                  selectedLang === lang
                    ? 'bg-[#2563EB] text-[#FFFFFF] font-bold'
                    : 'text-[#A1A1AA] hover:text-[#FFFFFF]'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Code Snippet Box */}
        <div className="p-4 bg-[#09090B] relative">
          <button
            onClick={handleCopyCurl}
            className="absolute top-4 right-4 text-xs font-mono text-[#A1A1AA] hover:text-[#FFFFFF] bg-[#18181B] px-3 py-1.5 rounded border border-[#27272A] flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Snippet!' : 'Copy Code'}</span>
          </button>
          <pre className="p-2 font-mono text-xs text-[#FAFAFA] overflow-x-auto">
            {getCodeSnippet()}
          </pre>
        </div>

        {/* Scalar Embedded Viewer */}
        <div className="h-[320px] overflow-y-auto border-t border-[#E4E4E7]">
          <ApiReferenceReact
            configuration={{
              spec: {
                content: project.openApiSpec
              },
              theme: 'purple',
              showSidebar: false,
              darkMode: false
            }}
          />
        </div>
      </div>

    </div>
  );
}
