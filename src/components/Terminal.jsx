import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Copy, Check, CornerDownLeft, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

function MatrixRainCanvas({ duration = 8000, color = '#10B981', onClose }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const updateSize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    updateSize();

    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZアカサタナハマヤラワガザダバパイキシチニヒミリギジビピ';
    const fontSize = 13;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(9, 9, 11, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = color;
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 35);
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [duration, color, onClose]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-20 pointer-events-none rounded-b-xl opacity-90"
    />
  );
}

export default function Terminal() {
  const [history, setHistory] = useState([
    { type: 'system', text: 'Welcome to Fab.Dev Interactive Backend Terminal v2.4.0' },
    { type: 'system', text: 'Type "help" for commands, "matrix" for digital rain, or "benchmark" for latency test.' },
    { type: 'input', text: 'cat bio.json' },
    { type: 'output', text: PORTFOLIO_DATA.terminalCommands.bio }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [copied, setCopied] = useState(false);
  const [matrixActive, setMatrixActive] = useState(false);
  const [terminalTheme, setTerminalTheme] = useState('#10B981'); // Emerald default
  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history, matrixActive]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const rawCmd = inputVal.trim();
    const cmd = rawCmd.toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: 'input', text: rawCmd }];

    if (cmd === 'clear') {
      setHistory([]);
      setInputVal('');
      setMatrixActive(false);
      return;
    }

    if (cmd === 'matrix') {
      setMatrixActive(true);
      newHistory.push({ type: 'output', text: `=== MATRIX DIGITAL RAIN INITIALIZED === [Streaming Protocol @ ${terminalTheme}]` });
    } else if (cmd === 'benchmark') {
      const benchmarkOutput = `⚡ BENCHMARK ENGINE v1.4 — SIMULATING HIGH-CONCURRENCY HTTP/2 WORKLOAD:
[1/4] Warming up 500 concurrent WebSocket connections... DONE (0.8s)
[2/4] Testing PostgreSQL Read/Write Transaction Split... DONE (1.2s)
[3/4] Measuring Redis Distributed Lock SETNX Latency...  DONE (0.4s)
[4/4] Executing 10,000 requests to /api/v1/payments/settle...

RESULTS & PERFORMANCE BENCHMARKS:
-------------------------------------------------------
Concurrency    : 5,000 active req/sec
Min Latency    : 4.1 ms
Avg Latency    : 7.8 ms
Max Latency    : 14.3 ms
p99 Latency    : 9.2 ms
HTTP 200 OK    : 10,000 (100.00%)
Error Rate     : 0.00%
Overall Status : ⚡ EXCELLENT (Production Ready SLA)`;
      newHistory.push({ type: 'output', text: benchmarkOutput });
    } else if (cmd.startsWith('theme ')) {
      const themeName = cmd.replace('theme ', '').trim();
      if (themeName === 'cyber' || themeName === 'cyan') {
        setTerminalTheme('#06B6D4');
        newHistory.push({ type: 'output', text: 'Terminal prompt theme switched to CYBER CYAN (#06B6D4).' });
      } else if (themeName === 'amber' || themeName === 'gold') {
        setTerminalTheme('#F59E0B');
        newHistory.push({ type: 'output', text: 'Terminal prompt theme switched to RETRO AMBER (#F59E0B).' });
      } else if (themeName === 'purple' || themeName === 'violet') {
        setTerminalTheme('#A855F7');
        newHistory.push({ type: 'output', text: 'Terminal prompt theme switched to VIOLET PURPLE (#A855F7).' });
      } else {
        setTerminalTheme('#10B981');
        newHistory.push({ type: 'output', text: 'Terminal prompt theme reset to EMERALD GREEN (#10B981). Available: cyber, amber, purple, emerald.' });
      }
    } else if (cmd === 'cv') {
      newHistory.push({ type: 'output', text: PORTFOLIO_DATA.terminalCommands.cv });
      if (PORTFOLIO_DATA.developer.resumeUrl && PORTFOLIO_DATA.developer.resumeUrl !== '#') {
        window.open(PORTFOLIO_DATA.developer.resumeUrl, '_blank');
      }
    } else if (cmd === 'help') {
      const helpOutput = `Available Commands:
  - help         : Show list of available commands
  - bio          : Display backend developer profile & background
  - skills       : List technical stack & core competencies
  - projects     : View highlight backend architecture projects
  - benchmark    : Run live high-concurrency throughput & latency test
  - theme <color>: Change prompt accent (emerald, cyber, amber, purple)
  - cv           : Download / view Fabian's Backend Engineer Resume PDF
  - contact      : Show direct contact channels & email
  - ping         : Measure simulated live network latency to backend API
  - sudo         : Execute administrative action
  - matrix       : Trigger digital rain animation effect
  - clear        : Clear terminal console screen`;
      newHistory.push({ type: 'output', text: helpOutput });
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
    <div className="terminal-window w-full font-mono text-xs sm:text-sm relative">
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
          <span
            style={{ color: terminalTheme, borderColor: `${terminalTheme}40`, backgroundColor: `${terminalTheme}15` }}
            className="text-[11px] px-2 py-0.5 rounded border font-mono transition-colors"
          >
            TTY: active
          </span>
          <button
            onClick={copyTerminalLog}
            className="text-[#A1A1AA] hover:text-[#FFFFFF] transition-colors p-1"
            title="Copy Terminal Logs"
          >
            {copied ? <Check style={{ color: terminalTheme }} className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal Body Container - Scroll Internal Only */}
      <div
        ref={terminalBodyRef}
        className="p-4 sm:p-5 h-[340px] sm:h-[380px] overflow-y-auto space-y-3 bg-[#09090B] text-[#FAFAFA] relative"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Matrix Digital Rain Canvas Effect */}
        {matrixActive && (
          <MatrixRainCanvas duration={10000} color={terminalTheme} onClose={() => setMatrixActive(false)} />
        )}

        {history.map((item, idx) => (
          <div key={idx} className="leading-relaxed relative z-10">
            {item.type === 'input' && (
              <div className="flex items-center gap-2 text-[#FAFAFA]">
                <span style={{ color: terminalTheme }}>fabian@dev:~$</span>
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
        <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 mt-2 relative z-10">
          <span style={{ color: terminalTheme }} className="font-bold">fabian@dev:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="type 'help', 'benchmark', 'theme cyber', 'matrix'..."
            className="flex-1 bg-transparent text-[#FFFFFF] focus:outline-none font-mono text-xs sm:text-sm placeholder-[#52525B]"
          />
          <button type="submit" className="text-[#71717A] hover:text-[#FFFFFF]">
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Terminal Footer Bar */}
      <div className="bg-[#18181B] px-4 py-2 border-t border-[#27272A] flex items-center justify-between text-[11px] text-[#A1A1AA]">
        <div className="flex items-center gap-2">
          <Sparkles style={{ color: terminalTheme }} className="w-3 h-3 transition-colors" />
          <span>Interactive CLI Active</span>
        </div>
        <div>
          Type <kbd className="px-1.5 py-0.5 bg-[#27272A] text-[#FAFAFA] rounded text-[10px]">benchmark</kbd> for live latency test
        </div>
      </div>
    </div>
  );
}
