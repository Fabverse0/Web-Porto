import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Copy, Check, CornerDownLeft, Sparkles, FileText } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Terminal() {
  const [history, setHistory] = useState([
    { type: 'system', text: 'Welcome to Fab.Dev Interactive Backend Terminal v2.4.0' },
    { type: 'system', text: 'Type "help" to see available commands or "cv" to download resume.' },
    { type: 'input', text: 'cat bio.json' },
    { type: 'output', text: PORTFOLIO_DATA.terminalCommands.bio }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [copied, setCopied] = useState(false);
  const [matrixActive, setMatrixActive] = useState(false);
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, matrixActive]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: 'input', text: inputVal }];

    if (cmd === 'clear') {
      setHistory([]);
      setInputVal('');
      setMatrixActive(false);
      return;
    }

    if (cmd === 'matrix') {
      setMatrixActive(true);
      newHistory.push({ type: 'output', text: '=== MATRIX RAIN ACTIVE === [Initializing Cyber Protocol...]' });
      setTimeout(() => setMatrixActive(false), 5000);
    } else if (cmd === 'cv') {
      newHistory.push({ type: 'output', text: PORTFOLIO_DATA.terminalCommands.cv });
      // If a real resume URL exists, trigger download/open
      if (PORTFOLIO_DATA.developer.resumeUrl && PORTFOLIO_DATA.developer.resumeUrl !== '#') {
        window.open(PORTFOLIO_DATA.developer.resumeUrl, '_blank');
      }
    } else if (PORTFOLIO_DATA.terminalCommands[cmd]) {
      newHistory.push({ type: 'output', text: PORTFOLIO_DATA.terminalCommands[cmd] });
    } else {
      newHistory.push({
        type: 'error',
        text: `zsh: command not found: ${cmd}. Type "help" for a list of valid commands.`
      });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const copyTerminalLog = () => {
    const textLog = history
      .map(item => (item.type === 'input' ? `$ ${item.text}` : item.text))
      .join('\n');
    navigator.clipboard.writeText(textLog);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="terminal-window w-full font-mono text-xs sm:text-sm">
      {/* Terminal Top Window Header */}
      <div className="terminal-header">
        <div className="flex items-center gap-2">
          <span className="terminal-dot bg-[#EF4444]"></span>
          <span className="terminal-dot bg-[#F59E0B]"></span>
          <span className="terminal-dot bg-[#10B981]"></span>
          <span className="text-[#A1A1AA] text-xs font-mono ml-2 hidden sm:inline">
            fabian@backend-srv: ~ (zsh)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/20">
            TTY: active
          </span>
          <button
            onClick={copyTerminalLog}
            className="text-[#A1A1AA] hover:text-[#FFFFFF] transition-colors p-1"
            title="Copy Terminal Logs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div
        className="p-4 sm:p-5 h-[340px] sm:h-[380px] overflow-y-auto space-y-3 bg-[#09090B] text-[#FAFAFA]"
        onClick={() => inputRef.current?.focus()}
      >
        {matrixActive && (
          <div className="text-[#10B981] font-mono text-xs animate-pulse p-2 bg-[#10B981]/10 border border-[#10B981]/30 rounded">
            01000001 01001100 01000101 01011000 00101110 01000100 01000101 01010110<br />
            01110011 01111001 01110011 01110100 01100101 01101101 01110011 00100000 01101111 01101011
          </div>
        )}

        {history.map((item, idx) => (
          <div key={idx} className="leading-relaxed">
            {item.type === 'input' && (
              <div className="flex items-center gap-2 text-[#FAFAFA]">
                <span className="text-[#10B981]">fabian@dev:~$</span>
                <span>{item.text}</span>
              </div>
            )}

            {item.type === 'system' && (
              <div className="text-[#71717A] italic text-xs">
                # {item.text}
              </div>
            )}

            {item.type === 'output' && (
              <pre className="text-[#A1A1AA] whitespace-pre-wrap font-mono text-xs sm:text-sm pl-4 border-l-2 border-[#27272A] mt-1">
                {item.text}
              </pre>
            )}

            {item.type === 'error' && (
              <div className="text-[#EF4444] text-xs pl-4 border-l-2 border-[#EF4444]">
                {item.text}
              </div>
            )}
          </div>
        ))}

        {/* Input prompt line */}
        <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 mt-2">
          <span className="text-[#10B981] font-bold">fabian@dev:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="type 'help', 'cv', 'skills', or 'projects'..."
            className="flex-1 bg-transparent text-[#FFFFFF] focus:outline-none font-mono text-xs sm:text-sm placeholder-[#52525B]"
          />
          <button type="submit" className="text-[#71717A] hover:text-[#FFFFFF]">
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>

        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Footer Bar */}
      <div className="bg-[#18181B] px-4 py-2 border-t border-[#27272A] flex items-center justify-between text-[11px] text-[#A1A1AA]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3 h-3 text-[#10B981]" />
          <span>Interactive CLI Active</span>
        </div>
        <div>
          Type <kbd className="px-1.5 py-0.5 bg-[#27272A] text-[#FAFAFA] rounded text-[10px]">cv</kbd> to download resume
        </div>
      </div>
    </div>
  );
}
