import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Send, Copy, Check, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

const EASE = [0.22, 1, 0.36, 1];
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/\\_=#$%';

function prefersReducedMotion() {
  return typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* ── Giant interactive heading: per-letter lift on hover ── */
function MagneticHeadline({ text }) {
  const reduce = prefersReducedMotion();
  if (reduce) return <span className="contact-headline">{text}</span>;
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

/* ── Channel row: scramble decode on hover (skips email row) ── */
function ChannelRow({ label, value, href, external, onCopy, copied, copyable, scrambleEnabled }) {
  const valRef = useRef(null);
  const reduce = prefersReducedMotion();

  const scramble = () => {
    if (reduce || !scrambleEnabled || !valRef.current) return;
    const el = valRef.current;
    const original = value;
    let frame = 0;
    const total = 12;
    const id = setInterval(() => {
      frame += 1;
      if (frame >= total) { el.textContent = original; clearInterval(id); return; }
      const reveal = Math.floor((frame / total) * original.length);
      el.textContent = original.split('').map((ch, i) => {
        if (i < reveal || ch === ' ' || ch === '.' || ch === '/' || ch === '@') return ch;
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }).join('');
    }, 28);
  };

  const inner = (
    <>
      <span className="contact-row-label">{label}</span>
      <span className="contact-row-value" ref={valRef}>{value}</span>
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
    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className={cls} onMouseEnter={scramble}>
      {inner}
    </a>
  );
}

/* ── Ink-fill magnetic submit ── */
function InkFillSubmit({ children }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 30 });
  const y = useSpring(my, { stiffness: 260, damping: 30 });
  const reduce = prefersReducedMotion();

  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) * 0.10);
    my.set((e.clientY - r.top - r.height / 2) * 0.16);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.button
      type="submit"
      className="contact-submit"
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.98 }}
    >
      <span className="submit-fill" aria-hidden="true" />
      <span className="submit-content">
        {children}
        <Send size={15} aria-hidden="true" className="contact-submit-icon" />
        <kbd className="submit-kbd" aria-hidden="true">CTRL ⏎</kbd>
      </span>
    </motion.button>
  );
}

/* ── Live curl: mirrors form state; on submit prints staged response ── */
function curlFromState(dev, { name, email, message }) {
  return [
    'curl -X POST https://formsubmit.co/' + dev.email + ' \\',
    '  -H "Content-Type: application/json" \\',
    '  -d \'{"name": "' + (name || '…') + '", "email": "' + (email || '…') + '",',
    '      "message": "' + (message || '…') + '"}\'',
  ].join('\n');
}

function CurlConsole({ dev, formData, formSubmitted }) {
  const bodyRef = useRef(null);
  const live = curlFromState(dev, formData);

  const lines = useMemo(() => ([
    { t: '$ curl -X POST https://formsubmit.co/' + dev.email + ' \\', cls: 'cur-cmd', d: 0 },
    { t: '  -H "Content-Type: application/json" \\', cls: 'cur-cmd', d: 260 },
    { t: '  -d \'{"name": "' + formData.name + '", "email": "' + formData.email + '",', cls: 'cur-cmd', d: 520 },
    { t: '      "message": "' + formData.message + '"}\'', cls: 'cur-cmd', d: 780 },
    { t: '', d: 1050 },
    { t: 'HTTP/2 201', cls: 'cur-status', d: 1250 },
    { t: 'x-served-by: fabian.primary', cls: 'cur-dim', d: 1450 },
    { t: 'location: /inbox/scheduled?response<2hrs', cls: 'cur-dim', d: 1650 },
    { t: '', d: 1850 },
    { t: 'message accepted — you will hear back shortly.', cls: 'cur-ok', d: 2050 },
  ]), [dev.email, formData.name, formData.email, formData.message]);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const nodes = el.querySelectorAll('[data-line]');
    if (formSubmitted) {
      nodes.forEach((n) => {
        n.classList.remove('cur-visible');
        void n.offsetWidth; // restart animation
        n.classList.add('cur-visible');
      });
    }
  }, [formSubmitted]);

  return (
    <div className="contact-curl" data-live={String(!formSubmitted)}>
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] tracking-[0.14em] text-[#A1A1AA]">
          {formSubmitted ? 'RESPONSE — 201' : 'POST /CONTACT — LIVE PREVIEW'}
        </span>
        <CopyButton text={formSubmitted ? lines.map((l) => l.t).join('\n') : live} />
      </div>

      {formSubmitted ? (
        <pre ref={bodyRef} className="font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre-wrap contact-curl-resp" aria-live="polite">
          {lines.map((l, i) => (
            <span key={i} data-line className={'cur-line ' + l.cls}>{l.t || '\u00A0'}</span>
          ))}
        </pre>
      ) : (
        <pre className="font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre-wrap">
          <span className="cur-cmd">{live}</span>
          <span className="cur-caret" aria-hidden="true"></span>
        </pre>
      )}

      <div className="cur-statusline" aria-hidden="true">
        <span>NORMAL</span>
        <span>UTF-8</span>
        <span>LF</span>
        <span>3 FIELDS</span>
        <span>{formSubmitted ? 'EXIT 0' : 'NO ERRORS'}</span>
      </div>
    </div>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try { await navigator.clipboard.writeText(text); } catch (e) { /* no-op */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={onCopy} className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#FAFAFA] hover:underline transition-colors min-h-[36px] px-1">
      {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
      <span>{copied ? 'COPIED' : 'COPY'}</span>
    </button>
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4200);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleSubmit(e);
  };

  const msgLen = formData.message.length;
  const msgCount = String(msgLen).padStart(3, '0') + ' / 500';

  const inputClasses = 'w-full py-3.5 bg-transparent border-0 font-sans text-[15px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-0';

  return (
    <section id="contact" className="contact-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Giant headline + availability ── */}
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
            scrambleEnabled
          />
          <ChannelRow
            label="03 / LINKEDIN"
            value="in/fabianrizky"
            href={dev.linkedin}
            external
            scrambleEnabled
          />
          <div className="contact-channels-foot" aria-hidden="true">
            <span>STATUS: 200 OK</span>
            <span>TYPICAL RESPONSE &lt; 2 HRS</span>
            <span>JAKARTA, ID / REMOTE</span>
          </div>
        </div>

        {/* ── Compose (press-sheet) + console (terminal) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-12 pt-14 mt-14">

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
                  onKeyDown={onKeyDown}
                  className="request-doc"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: EASE }}
                >
                  <span className="doc-crop doc-crop--tl" aria-hidden="true" />
                  <span className="doc-crop doc-crop--tr" aria-hidden="true" />
                  <span className="doc-crop doc-crop--bl" aria-hidden="true" />
                  <span className="doc-crop doc-crop--br" aria-hidden="true" />

                  <div className="contact-request-head" aria-hidden="true">
                    <span>POST /CONTACT</span>
                    <span>HTTP/2 · APPLICATION/JSON</span>
                  </div>

                  <div className="req-field">
                    <span className="req-idx" aria-hidden="true">01</span>
                    <label htmlFor="contact-name" className="req-key">name:</label>
                    <input
                      id="contact-name" name="name" type="text" required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder='"John Doe"'
                      className={inputClasses}
                    />
                    <span className="req-note" aria-hidden="true">STRING · REQUIRED</span>
                  </div>

                  <div className="req-field">
                    <span className="req-idx" aria-hidden="true">02</span>
                    <label htmlFor="contact-email" className="req-key">email:</label>
                    <input
                      id="contact-email" name="email" type="email" required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder='"john@company.com"'
                      className={inputClasses}
                    />
                    <span className="req-note" aria-hidden="true">RFC 5322 · REQUIRED</span>
                  </div>

                  <div className="req-field req-field--area">
                    <span className="req-idx" aria-hidden="true">03</span>
                    <label htmlFor="contact-message" className="req-key">message:</label>
                    <textarea
                      id="contact-message" name="message" required rows={4} maxLength={500}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder='"Hi Fabian, I would like to discuss a backend engineering opportunity..."'
                      className={`${inputClasses} resize-none`}
                    ></textarea>
                    <span className="req-note req-count" aria-live="off">{msgCount}</span>
                  </div>

                  <div className="req-submit-row">
                    <InkFillSubmit>
                      <span>Send HTTP POST Request</span>
                    </InkFillSubmit>
                    <span className="req-meta" aria-hidden="true">
                      APPLICATION/JSON · EXPECT 201 · SLA 2HRS
                    </span>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <aside className="lg:col-span-5">
            <div className="contact-curl-head">
              <span className="contact-curl-title">ALTERNATE PROTOCOL</span>
              <span className="contact-curl-sub">LIVE PREVIEW — TYPE ON THE LEFT, WATCH IT COMPILE.</span>
            </div>
            <CurlConsole dev={dev} formData={formData} formSubmitted={formSubmitted} />
            <p className="contact-curl-note" aria-hidden="true">
              SAME ENDPOINT, SAME PAYLOAD — PICK YOUR CLIENT.
            </p>
          </aside>

        </div>
      </div>
    </section>
  );
}
