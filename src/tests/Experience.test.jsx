import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Experience from '../components/Experience';

describe('Experience', () => {
  it('renders work experience entries with timeline', () => {
    render(<Experience />);
    expect(screen.getByText(/Engineering Experience/i)).toBeInTheDocument();
    expect(screen.getByText(/Backend Software Engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/99.99%/i)).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('switches to education tab on click', async () => {
    render(<Experience />);
    const eduTab = screen.getByRole('button', { name: /education/i });
    fireEvent.click(eduTab);
    // AnimatePresence causes async transition — use findByText
    expect(await screen.findByText(/Bachelor of Science/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText(/Backend Software Engineer/i)).not.toBeInTheDocument();
    });
  });

  it('renders impact metric chips with label and value', () => {
    render(<Experience />);
    expect(screen.getByText('SLA Uptime')).toBeInTheDocument();
    expect(screen.getByText('99.99%')).toBeInTheDocument();
    expect(screen.getByText(/Latency Reduction/i)).toBeInTheDocument();
  });
});