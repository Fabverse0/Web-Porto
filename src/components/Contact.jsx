import React, { useState } from 'react';
import { Send, Copy, Check, MessageSquare } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [curlCopied, setCurlCopied] = useState(false);

  const dev = PORTFOLIO_DATA.developer;

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      // clipboard unavailable (non-secure context or permission denied)
    }
  };

  const handleCopyEmail = async () => {
    await copyToClipboard(dev.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const curlContactCmd = `curl -X POST https://formsubmit.co/${dev.email} \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Recruiter", "email": "hr@tech.co", "message": "Let us talk backend!"}'`;

  const handleCopyCurl = async () => {
    await copyToClipboard(curlContactCmd);
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

  const inputClasses = 'w-full px-4 py-3 border border-[var(--border-strong)] bg-[var(--bg-page)] font-sans text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--text-primary)] transition-colors';

  return (
    <section id="contact" className="py-20 sm:py-24 bg-[var(--bg-page)] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="pb-10 border-b border-[var(--border-strong)]">
          <h2 className="font-heading font-semibold text-[28px] sm:text-[32px] tracking-[-0.01em] text-[var(--text-primary)] max-w-xl">
            Let's Build Something High-Performance Together.
          </h2>
          <p className="mt-3 text-[15.5px] text-[var(--text-body)] leading-relaxed max-w-[58ch]">
            Open for full-time backend engineer roles, freelance system architecture consulting, and internship opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-10">

          {/* Ink panel: the one dark object of this section */}
          <div className="lg:col-span-5">
            <div className="bg-[#09090B] text-[#FAFAFA] border border-[#27272A] p-6 sm:p-8 space-y-6 h-full">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#FAFAFA] flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                  Primary Endpoint
                </p>
                <h3 className="font-heading font-medium text-xl mt-3">Get In Touch</h3>
                <p className="text-[13px] text-[#A1A1AA] leading-relaxed mt-2">
                  I'm always open to discussing new opportunities, creative ideas, or potential collaborations. Feel free to reach out if you have a project in mind or just want to say hello!
                </p>
              </div>

              {/* Email direct box */}
              <div className="border border-[#27272A] p-4 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#A1A1AA]">Email Address</span>
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-[#FAFAFA] hover:underline transition-colors min-h-[44px] px-1"
                  >
                    {emailCopied ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
                    <span>{emailCopied ? 'Copied!' : 'Copy Email'}</span>
                  </button>
                </div>
                <div className="font-mono text-sm break-all">{dev.email}</div>
                <span className="sr-only" role="status" aria-live="polite">
                  {emailCopied ? 'Email address copied to clipboard' : ''}
                </span>
              </div>

              {/* cURL box */}
              <div className="border border-[#27272A] p-4 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#A1A1AA]">Terminal cURL Request</span>
                  <button
                    onClick={handleCopyCurl}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-[#FAFAFA] hover:underline transition-colors min-h-[44px] px-1"
                  >
                    {curlCopied ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
                    <span>{curlCopied ? 'Copied!' : 'Copy cURL'}</span>
                  </button>
                </div>
                <pre className="font-mono text-[11px] text-[#A1A1AA] overflow-x-auto whitespace-pre-wrap leading-relaxed">{curlContactCmd}</pre>
                <span className="sr-only" role="status" aria-live="polite">
                  {curlCopied ? 'cURL command copied to clipboard' : ''}
                </span>
              </div>

              {/* Status lines */}
              <div className="flex items-center gap-2.5 pt-1 font-mono text-xs">
                <span className="w-2 h-2 bg-[#FAFAFA]" aria-hidden="true" />
                <span>STATUS: 200 OK / Typical Response Time &lt; 2 Hours</span>
              </div>
              <div className="flex items-center gap-2.5 font-mono text-xs">
                <span className="w-2 h-2 bg-[#FAFAFA] animate-pulse" aria-hidden="true" />
                <span>AVAILABLE — {new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()} / 1 SLOT</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            {formSubmitted ? (
              <div className="h-full min-h-[320px] border border-[var(--border-strong)] bg-[var(--bg-card)] p-10 text-center flex flex-col items-center justify-center" role="status">
                <span className="w-10 h-10 bg-[var(--accent-emerald)] flex items-center justify-center" aria-hidden="true">
                  <Check className="w-5 h-5 text-[var(--bg-page)]" />
                </span>
                <h3 className="font-heading font-medium text-xl text-[var(--text-primary)] mt-5">201 Created. Message Received!</h3>
                <p className="font-mono text-xs text-[var(--text-secondary)] mt-3 max-w-[46ch] leading-relaxed">
                  Thank you, {formData.name || 'Friend'}! Your HTTP payload was received successfully. I will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="block font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--text-secondary)]">Your Name</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className={inputClasses}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="block font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--text-secondary)]">Your Email</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-message" className="block font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--text-secondary)]">Message / Project Inquiry</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hi Fabian, I'd like to discuss a backend engineering opportunity..."
                    className={`${inputClasses} resize-none`}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto font-mono text-sm min-h-[44px] py-3 px-8 bg-[var(--text-primary)] text-[var(--bg-page)] border border-[var(--text-primary)] hover:opacity-90 transition-opacity"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  Send HTTP POST Request
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
