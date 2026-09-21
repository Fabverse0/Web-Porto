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
    expect(screen.getByText('EMAIL')).toBeInTheDocument();
  });

  it('keeps decorative chrome out of the section', () => {
    const { container } = render(<Contact />);
    ['contact-channels-foot', 'contact-request-head', 'cur-statusline', 'contact-curl-title']
      .forEach((cls) => expect(container.querySelector('.' + cls)).toBeNull());
    expect(container.querySelector('.req-idx')).toBeNull();
    expect(screen.queryByText(/REQUIRED|SLA 2HRS|RFC 5322|EXPECT 201|TYPE ON THE LEFT|ALTERNATE PROTOCOL|STATUS: 200|formsubmit\.co|Content-Type|HTTP\/2|curl -X POST|SAME ENDPOINT|POST \/CONTACT/i)).toBeNull();
  });

  it('shows the character counter only after typing', () => {
    render(<Contact />);
    expect(screen.queryByText(/\/ 500/)).toBeNull();
    fireEvent.change(screen.getByLabelText('message:'), { target: { value: 'halo' } });
    expect(screen.getByText('4 / 500')).toBeInTheDocument();
  });

  it('mirrors the form as a plain-language outbox command', () => {
    render(<Contact />);
    fireEvent.change(screen.getByLabelText('name:'), { target: { value: 'Sarah Chen' } });
    expect(screen.getByText(/send --to/)).toBeInTheDocument();
    expect(screen.getByText(/--name\s+"Sarah Chen"/)).toBeInTheDocument();
    expect(screen.queryByText(/https:\/\/|Content-Type|curl/i)).toBeNull();
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