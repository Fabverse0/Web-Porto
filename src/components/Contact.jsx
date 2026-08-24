import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Mail, Send, Copy, Check, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [curlCopied, setCurlCopied] = useState(false);

  const dev = PORTFOLIO_DATA.developer;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(dev.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const curlContactCmd = `curl -X POST https://api.fab.dev/v1/contact \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Recruiter", "email": "hr@tech.co", "message": "Let us talk backend!"}'`;

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
    <section id="contact" className="py-20 bg-[#F0EDE4] dark:bg-[#09090B] border-t border-[#DDD7C8] dark:border-[#27272A] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#004741] dark:text-[#10B981] tracking-wider uppercase">
            <MessageSquare className="w-3.5 h-3.5 text-[#10B981]" />
            Direct Communication Channel
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#004741] dark:text-[#FAFAFA] tracking-tight">
            Let's Build Something High-Performance Together.
          </h2>
          <p className="text-[#4A635F] dark:text-[#A1A1AA] text-base leading-relaxed">
            Open for full-time backend engineer roles, freelance system architecture consulting, and internship opportunities.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info & Quick Copy */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#004741] dark:bg-[#09090B] rounded-2xl p-6 sm:p-8 space-y-6 border border-[#003833] dark:border-[#27272A] shadow-xl text-[#F0EDE4]">
              
              <div className="space-y-2">
                <span className="font-mono text-xs text-[#10B981] uppercase font-bold">Primary Endpoint</span>
                <h3 className="font-heading font-bold text-2xl text-[#F0EDE4] dark:text-[#FFFFFF]">Get In Touch</h3>
                <p className="text-xs text-[#E5E0D4] dark:text-[#A1A1AA] leading-relaxed">
                  I'm always open to discussing new opportunities, creative ideas, or potential collaborations. Feel free to reach out if you have a project in mind or just want to say hello!
                </p>
              </div>

              {/* Email Direct Box */}
              <div className="p-4 rounded-xl bg-[#003833] dark:bg-[#18181B] border border-[#005C55]/60 dark:border-[#27272A] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#DDD7C8] dark:text-[#71717A] uppercase">Email Address</span>
                  <button
                    onClick={handleCopyEmail}
                    className="text-xs font-mono text-[#10B981] hover:underline flex items-center gap-1"
                  >
                    {emailCopied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{emailCopied ? 'Copied!' : 'Copy Email'}</span>
                  </button>
                </div>
                <div className="font-mono font-bold text-sm text-[#F0EDE4] dark:text-[#FAFAFA] break-all">
                  {dev.email}
                </div>
              </div>

              {/* Terminal Curl Command Box */}
              <div className="p-4 rounded-xl bg-[#003833] dark:bg-[#18181B] border border-[#005C55]/60 dark:border-[#27272A] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#10B981] dark:text-[#60A5FA] uppercase font-bold">Terminal cURL Request</span>
                  <button
                    onClick={handleCopyCurl}
                    className="text-xs font-mono text-[#10B981] dark:text-[#60A5FA] hover:underline flex items-center gap-1"
                  >
                    {curlCopied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{curlCopied ? 'Copied!' : 'Copy cURL'}</span>
                  </button>
                </div>
                <pre className="font-mono text-[11px] text-[#DDD7C8] dark:text-[#A1A1AA] overflow-x-auto whitespace-pre-wrap">
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
            <div className="bg-[#FAF8F5] dark:bg-[#18181B] border border-[#DDD7C8] dark:border-[#27272A] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              
              {formSubmitted ? (
                <div className="p-8 rounded-xl bg-[#004741] dark:bg-[#09090B] text-[#F0EDE4] dark:text-[#FFFFFF] text-center space-y-3 animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#F0EDE4] dark:text-[#FFFFFF]">201 Created — Message Received!</h3>
                  <p className="text-xs text-[#E5E0D4] dark:text-[#A1A1AA] font-mono">
                    Thank you, {formData.name || 'Friend'}! Your HTTP payload was received successfully. I will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-mono text-xs font-bold text-[#004741] dark:text-[#FAFAFA] uppercase">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-[#DDD7C8] dark:border-[#27272A] bg-[#F0EDE4] dark:bg-[#09090B] font-sans text-sm text-[#004741] dark:text-[#FAFAFA] focus:outline-none focus:border-[#004741] dark:focus:border-[#10B981] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-xs font-bold text-[#004741] dark:text-[#FAFAFA] uppercase">Your Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 rounded-xl border border-[#DDD7C8] dark:border-[#27272A] bg-[#F0EDE4] dark:bg-[#09090B] font-sans text-sm text-[#004741] dark:text-[#FAFAFA] focus:outline-none focus:border-[#004741] dark:focus:border-[#10B981] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-xs font-bold text-[#004741] dark:text-[#FAFAFA] uppercase">Message / Project Inquiry</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Fabian, I'd like to discuss a backend engineering opportunity..."
                      className="w-full px-4 py-3 rounded-xl border border-[#DDD7C8] dark:border-[#27272A] bg-[#F0EDE4] dark:bg-[#09090B] font-sans text-sm text-[#004741] dark:text-[#FAFAFA] focus:outline-none focus:border-[#004741] dark:focus:border-[#10B981] transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 w-full justify-center font-heading font-semibold text-sm py-3.5 rounded-xl bg-[#004741] dark:bg-[#FAFAFA] text-[#F0EDE4] dark:text-[#09090B] hover:bg-[#005C55] dark:hover:opacity-90 transition-all shadow-md"
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
