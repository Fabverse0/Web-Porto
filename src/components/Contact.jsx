import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Terminal, Sparkles, MessageSquare, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Contact() {
  const [emailCopied, setEmailCopied] = useState(false);
  const [curlCopied, setCurlCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const dev = PORTFOLIO_DATA.developer;
  const curlContactCmd = `curl -X POST https://api.fabdev.io/v1/contact \\\n  -H "Content-Type: application/json" \\\n  -d '{"name": "${formData.name || 'Your Name'}", "email": "${formData.email || 'your.email@company.com'}", "message": "${formData.message || 'Hello Fabian!'}"}'`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(dev.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleCopyCurl = () => {
    navigator.clipboard.writeText(curlContactCmd);
    setCurlCopied(true);
    setTimeout(() => setCurlCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 bg-[var(--bg-page)] border-t border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#10B981] tracking-wider uppercase">
            <MessageSquare className="w-3.5 h-3.5" />
            Direct Communication Channel
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[var(--text-primary)] tracking-tight">
            Let's Build Something High-Performance Together.
          </h2>
          <p className="text-[var(--text-secondary)] text-base leading-relaxed">
            Open for full-time backend engineer roles, freelance system architecture consulting, and internship opportunities.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info & Quick Copy */}
          <div className="lg:col-span-5 space-y-6">
            <div className="card-black rounded-2xl p-6 sm:p-8 space-y-6 border border-[#27272A]">
              
              <div className="space-y-2">
                <span className="font-mono text-xs text-[#10B981] uppercase font-bold">Primary Endpoint</span>
                <h3 className="font-heading font-bold text-2xl text-[#FFFFFF]">Get In Touch</h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  Send a message directly via the form or use quick 1-click email and terminal commands.
                </p>
              </div>

              {/* Email Direct Box */}
              <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272A] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#71717A] uppercase">Email Address</span>
                  <button
                    onClick={handleCopyEmail}
                    className="text-xs font-mono text-[#10B981] hover:underline flex items-center gap-1"
                  >
                    {emailCopied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{emailCopied ? 'Copied!' : 'Copy Email'}</span>
                  </button>
                </div>
                <div className="font-mono font-bold text-sm text-[#FAFAFA] break-all">
                  {dev.email}
                </div>
              </div>

              {/* Terminal Curl Command Box */}
              <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272A] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#2563EB] uppercase font-bold">Terminal cURL Request</span>
                  <button
                    onClick={handleCopyCurl}
                    className="text-xs font-mono text-[#2563EB] hover:underline flex items-center gap-1"
                  >
                    {curlCopied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{curlCopied ? 'Copied!' : 'Copy cURL'}</span>
                  </button>
                </div>
                <pre className="font-mono text-[11px] text-[#A1A1AA] overflow-x-auto whitespace-pre-wrap">
                  {curlContactCmd}
                </pre>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2 pt-2 text-xs font-mono text-[#10B981]">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping"></span>
                <span>STATUS: 200 OK — Typical Response Time &lt; 2 Hours</span>
              </div>

            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="card-light rounded-2xl p-6 sm:p-8 space-y-6">
              
              {formSubmitted ? (
                <div className="p-8 rounded-xl bg-[#09090B] text-[#FFFFFF] text-center space-y-3 animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#FFFFFF]">201 Created — Message Received!</h3>
                  <p className="text-xs text-[#A1A1AA] font-mono">
                    Thank you, {formData.name || 'Friend'}! Your HTTP payload was received successfully. I will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-mono text-xs font-bold text-[var(--text-primary)] uppercase">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-muted)] font-sans text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-xs font-bold text-[var(--text-primary)] uppercase">Your Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-muted)] font-sans text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-xs font-bold text-[var(--text-primary)] uppercase">Message / Project Inquiry</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Fabian, I'd like to discuss a backend engineering opportunity..."
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-muted)] font-sans text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn-black w-full justify-center text-sm py-3.5 shadow-md"
                  >
                    <Send className="w-4 h-4 text-[#10B981]" />
                    Send HTTP POST Request
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
