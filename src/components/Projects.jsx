import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import ProjectSpecSheet from './ProjectSpecSheet';

import coverMuseum from '../../assets/covers/project-museum.webp';
import coverStationery from '../../assets/covers/project-stationery.webp';
import coverCoffee from '../../assets/covers/project-coffee.webp';
import coverMedia from '../../assets/covers/project-media.webp';

/* ---------------------------------------------------------------
   PLATE ENTRIES - VISUAL PLACEHOLDERS by explicit request.
   Nothing is imported from portfolio data files. Swap the four
   photos in assets/covers/ and fill name/summary/spec fields
   when the real project entries are ready.
   --------------------------------------------------------------- */
const PLATES = [
  {
    id: 'plate-01',
    index: 'PL.01',
    name: 'Untitled 01',
    photo: coverMuseum,
    alt: 'Cover photo placeholder - ceramic handset model on a workbench, analog film style.',
    layout: 'wide',
  },
  {
    id: 'plate-02',
    index: 'PL.02',
    name: 'Untitled 02',
    photo: coverStationery,
    alt: 'Cover photo placeholder - paper specimen book on a workbench, analog film style.',
    layout: 'tall',
  },
  {
    id: 'plate-03',
    index: 'PL.03',
    name: 'Untitled 03',
    photo: coverMedia,
    alt: 'Cover photo placeholder - handheld wooden media prototype with film strips, analog film style.',
    layout: 'wide',
  },
  {
    id: 'plate-04',
    index: 'PL.04',
    name: 'Untitled 04',
    photo: coverCoffee,
    alt: 'Cover photo placeholder - glazed ceramic coffee cup and kraft bag on a workbench, analog film style.',
    layout: 'tall',
  },
];

const SPEC_ROWS = [
  ['Role', '[ role in the project ]'],
  ['Type', '[ project type ]'],
  ['Stack', '[ tools and technologies ]'],
  ['Year', '[ year ]'],
  ['Status', '[ status ]'],
];

/* Props signature kept for App.jsx compatibility. selectedSkill
   filtering is intentionally retired in this visual-first redesign;
   it returns when real entries land. */
export default function Projects({ selectedSkill }) {
  void selectedSkill;

  const [activePlate, setActivePlate] = useState(null);
  const openSheet = useCallback((plate) => setActivePlate(plate), []);
  const closeSheet = useCallback(() => setActivePlate(null), []);

  return (
    <section
      id="projects"
      className="py-24 sm:py-28 bg-[var(--bg-page)] border-b border-[var(--border-color)] transition-colors duration-300"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section header ── */}
        <header className="pb-14 sm:pb-20 max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--text-secondary)]">
            Project index
          </p>
          <h2
            id="projects-heading"
            className="font-heading font-semibold text-[34px] sm:text-[46px] tracking-[-0.02em] leading-[1.1] text-[var(--text-primary)] mt-3"
          >
            Selected Work.
          </h2>
          <p className="mt-5 font-mono text-[12.5px] leading-relaxed text-[var(--text-secondary)] max-w-[58ch]">
            Placeholder plates - photos and names are stand-ins until the real entries are cataloged.
            Each plate+plate opens a spec sheet with a summary and repository link.
          </p>
        </header>

        {/* ── Plate list ── */}
        <div className="plate-list">
          {PLATES.map((plate, i) => {
            const flip = i % 2 === 1;
            return (
              <motion.article
                key={plate.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className={`plate ${plate.layout === 'tall' ? 'plate--tall' : ''} ${flip ? 'plate--flip' : ''}`}
              >
                {/* ── Media ── */}
                <figure className="plate-media">
                  <img
                    src={plate.photo}
                    alt={plate.alt}
                    loading="lazy"
                    className="plate-img"
                  />
                  {/* Corner ticks - contact-sheet register marks */}
                  <span className="plate-tick tl" aria-hidden="true" />
                  <span className="plate-tick tr" aria-hidden="true" />
                  <span className="plate-tick bl" aria-hidden="true" />
                  <span className="plate-tick br" aria-hidden="true" />
                </figure>

                {/* ── Info ── */}
                <div className="plate-info">
                  <p className="plate-meta font-mono">
                    {plate.index}
                    <span className="plate-meta-sep"> / </span>
                    <span>[ year ]</span>
                  </p>
                  <h3 className="plate-name font-heading font-medium tracking-[-0.01em] text-[var(--text-primary)]">
                    {plate.name}
                  </h3>
                  <p className="plate-line text-[var(--text-body)]">
                    [ One-line description of the project. ]
                  </p>
                  <div className="plate-actions">
                    <button
                      type="button"
                      onClick={() => openSheet(plate)}
                      className="plate-cta"
                    >
                      View specs
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <a
                      className="plate-gh"
                      href="https://github.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Github className="w-4 h-4" aria-hidden="true" />
                      GitHub
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* ── Spec sheet overlay ── */}
      {activePlate && (
        <ProjectSpecSheet
          plate={activePlate}
          specRows={SPEC_ROWS}
          onClose={closeSheet}
        />
      )}
    </section>
  );
}