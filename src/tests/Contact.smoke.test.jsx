import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Contact from '../components/Contact';

// jsdom lacks matchMedia; prefersReducedMotion() and framer-motion need it.
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

describe('Contact', () => {
  it('renders the contact section without crashing', () => {
    const { container } = render(<Contact />);
    expect(container.querySelector('#contact')).toBeInTheDocument();
  });

  it('shows eyebrow, headline, and channel ledger', () => {
    render(<Contact />);
    expect(screen.getByText(/OPEN FOR WORK/i)).toBeInTheDocument();
    expect(screen.getByText(/01 \/ EMAIL/i)).toBeInTheDocument();
  });
});