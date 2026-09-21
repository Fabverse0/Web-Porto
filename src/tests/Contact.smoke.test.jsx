import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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

  it('does not submit an empty form via Ctrl+Enter (constraint validation)', () => {
    render(<Contact />);
    fireEvent.keyDown(document.querySelector('.request-doc'), { key: 'Enter', ctrlKey: true });
    expect(screen.queryByText(/201 Created/i)).not.toBeInTheDocument();
  });

  it('submits a filled form via Ctrl+Enter and shows the 201 state', async () => {
    render(<Contact />);
    fireEvent.change(screen.getByLabelText('name:'), { target: { value: 'Sarah Chen' } });
    fireEvent.change(screen.getByLabelText('email:'), { target: { value: 'sarah@corp.com' } });
    fireEvent.change(screen.getByLabelText('message:'), { target: { value: 'Hello Fabian!' } });
    fireEvent.keyDown(document.querySelector('.request-doc'), { key: 'Enter', ctrlKey: true });
    expect(await screen.findByText(/201 Created/i, {}, { timeout: 3000 })).toBeInTheDocument();
  });
});