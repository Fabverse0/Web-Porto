import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Copy, Check, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

const EASE = [0.22, 1, 0.36, 1];

/* ── Giant interactive heading: per-letter lift on hover ── */
function MagneticHeadline({ text }) {
  const reduce = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    return <span className="contact-headline">{text}</span>;
  }
  return (
    <span className="contact-headline" aria-label={text}>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="contact-headline-ch"
          whileHover={{ y: -10, transition: { duration: 0.25, ease: EASE } }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Channel row: full-width link with arrow slide ── */
function ChannelRow({ label, value, href, external, onCopy, copied, copyable }) {
  const inner = (
    <>
      <span className="contact-row-label">{label}</span>
      <span className="contact-row-value">{value}</span>
      <span className="contact-row-action">
        {copyable ? (
          copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />
        ) : (
          <ArrowUpRight size={16} aria-hidden="true" />
        )}
      </span>
    </>
  );
  const cls = 'contact-row' + (copied ? ' is-copied' : '');
  return copyable ? (
    <button type="button" onClick={onCopy} className={cls} aria-label={`${label}: ${value}. ${copied ? 'Copied' : 'Copy to clipboard'}`}>
      {inner}
      <span className="sr-only" role="status" aria-live="polite">{copied ? 'Copied to clipboard' : ''}</span>
    </button>
  ) : (
    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className={cls}>
      {inner}
    </a>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  const dev = PORTFOLIO_DATA.developer;

  const copyToClipboard = async (text) => {
    try { await navigator.clipboard.writeText(text); } catch (e) { /* no-op */ }
  };

  const handleCopy = async (key, text) => {
    await copyToClipboard(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const curlContactCmd = `curl -X POST https://formsubmit.co/${dev.email} \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Recruiter", "email": "hr@tech.co", "message": "Let us talk backend!"}'`;

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  /* form input: no own borders - the request row carries the hairline */
  const inputClasses = 'w-full py-3.5 bg-transparent border-0 font-sans text-[15px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-0';

  return (
    <section id="contact" className="contact-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Giant headline + availability ledger ── */}
        <div className="contact-head">
          <p className="contact-eyebrow">
            <span className="contact-eyebrow-dot" aria-hidden="true" />
            OPEN FOR WORK — {new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()}
          </p>
          <h2 className="contact-heading">
            <MagneticHeadline text="Let's talk." />
          </h2>
          <p className="contact-lede">
            Full-time backend engineering, freelance architecture, or a hello — the fastest
            route is email. Typical response under two hours.
          </p>
        </div>

        {/* ── Channel ledger ── */}
        <div className="contact-channels">
          <ChannelRow
            label="01 / EMAIL"
            value={dev.email}
            copyable
            copied={copiedKey === 'email'}
            onCopy={() => handleCopy('email', dev.email)}
          />
          <ChannelRow
            label="02 / GITHUB"
            value="github.com/Fabverse0"
            href={dev.github}
            external
          />
          <ChannelRow
            label="03 / LINKEDIN"
            value="in/fabianrizky"
            href={dev.linkedin}
            external
          />
          <div className="contact-channels-foot" aria-hidden="true">
            <span>STATUS: 200 OK</span>
            <span>TYPICAL RESPONSE &lt; 2 HRS</span>
            <span>JAKARTA, ID / REMOTE</span>
          </div>
        </div>

        {/* ── Request document + terminal, split ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-12 pt-14 mt-14">

          {/* Form as a request document: keys left, values right */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {formSubmitted ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="min-h-[360px] flex flex-col items-start justify-center" role="status"
                >
                  <span className="contact-sent-mark" aria-hidden="true">
                    <Check size={22} strokeWidth={2} />
                  </span>
                  <h3 className="font-heading font-semibold text-[26px] tracking-[-0.01em] text-[var(--text-primary)] mt-6">
                    201 Created.
                  </h3>
                  <p className="font-mono text-xs text-[var(--text-secondary)] mt-3 leading-relaxed">
                    PAYLOAD RECEIVED — RESPONSE SCHEDULED WITHIN 2 HRS.
                    THANK YOU{formData.name ? `, ${formData.name.toUpperCase()}` : ''}.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="contact-request"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: EASE }}
                >
                  <div className="contact-request-head" aria-hidden="true">
                    <span>POST /CONTACT</span>
                    <span>HTTP/2 · APPLICATION/JSON</span>
                  </div>

                  <div className="req-field">
                    <label htmlFor="contact-name" className="req-key">name:</label>
                    <input
                      id="contact-name" name="name" type="text" required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder='"John Doe"'
                      className={inputClasses}
                    />
                  </div>

                  <div className="req-field">
                    <label htmlFor="contact-email" className="req-key">email:</label>
                    <input
                      id="contact-email" name="email" type="email" required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder='"john@company.com"'
                      className={inputClasses}
                    />
                  </div>

                  <div className="req-field req-field--area">
                    <label htmlFor="contact-message" className="req-key">message:</label>
                    <textarea
                      id="contact-message" name="message" required rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder='"Hi Fabian, I would like to discuss a backend engineering opportunity..."'
                      className={`${inputClasses} resize-none`}
                    ></textarea>
                  </div>

                  <div className="req-submit-row">
                    <motion.button
                      type="submit"
                      className="contact-submit"
                      whileTap={{ scale: 0.985 }}
                    >
                      <span>Send HTTP POST Request</span>
                      <Send size={15} aria-hidden="true" className="contact-submit-icon" />
                    </motion.button>
                    <span className="req-meta" aria-hidden="true">
                      APPLICATION/JSON · EXPECT 201 · SLA 2HRS
                    </span>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* cURL: the one ink terminal of this section */}
          <aside className="lg:col-span-5">
            <div className="contact-curl-head">
              <span className="contact-curl-title">ALTERNATE PROTOCOL</span>
              <span className="contact-curl-sub">FOR HUMANS WITH A TERMINAL OPEN.</span>
            </div>
            <div className="contact-curl">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] tracking-[0.14em] text-[#A1A1AA]">POST /CONTACT</span>
                <button
                  onClick={() => handleCopy('curl', curlContactCmd)}
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#FAFAFA] hover:underline transition-colors min-h-[36px] px-1"
                >
                  {copiedKey === 'curl' ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
                  <span>{copiedKey === 'curl' ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
              <pre className="font-mono text-[11px] leading-relaxed text-[#A1A1AA] overflow-x-auto whitespace-pre-wrap">{curlContactCmd}</pre>
              <span className="sr-only" role="status" aria-live="polite">
                {copiedKey === 'curl' ? 'cURL command copied to clipboard' : ''}
              </span>
            </div>
            <p className="contact-curl-note" aria-hidden="true">
              SAME ENDPOINT, SAME PAYLOAD — PICK YOUR CLIENT.
            </p>
          </aside>

        </div>
      </div>
    </section>
  );
}
