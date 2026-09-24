import { describe, it, expect, beforeAll } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Hero from '../components/Hero';
import { PORTFOLIO_DATA } from '../data/portfolioData';

// jsdom lacks matchMedia; framer-motion's useReducedMotion needs it.
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  });
}

const NAME = PORTFOLIO_DATA.developer.name; // 'Muhammad Fabian Rizky'

describe('Hero', () => {
  beforeAll(() => {
    // useReducedMotion() reads the media query synchronously on first render
    window.matchMedia = (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    });
  });

  it('renders the hero section with the developer name', () => {
    render(<Hero />);
    expect(document.querySelector('#about')).toBeInTheDocument();
    expect(document.querySelector(`[aria-label="${NAME}"]`)).toBeInTheDocument();
  });

  it('splits every character of the name into its own hover target', () => {
    render(<Hero />);
    const h1 = document.querySelector('#about h1');
    const words = [...h1.querySelectorAll(':scope > span > span')];
    expect(words).toHaveLength(3);
    const letters = words.flatMap((w) => [...w.querySelectorAll('span')]);
    expect(letters).toHaveLength(NAME.replace(/ /g, '').length);
    expect(letters.map((l) => l.textContent).join('')).toBe(NAME.replace(/ /g, ''));
    // words stay visually separated by a non-collapsing space
    expect(words[0].textContent.endsWith('\u00A0')).toBe(true);
    expect(words[2].textContent.endsWith('\u00A0')).toBe(false);
  });

  it('keeps the reveal clip until the words land, then releases it for the lift', async () => {
    const { container } = render(<Hero />);
    const wrappers = [...container.querySelectorAll('#about h1 > span')];
    expect(wrappers.every((w) => w.className.includes('overflow-hidden'))).toBe(true);
    await waitFor(
      () => expect(container.querySelector('#about h1 > span').className).toContain('overflow-visible'),
      { timeout: 4000 }
    );
  });

  it('leaves the letters out of the accessibility tree (name comes from aria-label)', () => {
    render(<Hero />);
    const h1 = document.querySelector('#about h1');
    expect(h1.querySelectorAll('[aria-hidden="true"]').length).toBe(3);
    expect(screen.getByRole('heading', { level: 1 })).toHaveAccessibleName(NAME);
  });
});
