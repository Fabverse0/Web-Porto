import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Experience from '../components/Experience';

describe('Experience — spec-sheet document', () => {
  it('renders work experience entries as document rows', () => {
    render(<Experience />);
    expect(screen.getByText(/Engineering Experience/i)).toBeInTheDocument();
    expect(screen.getByText(/Backend Software Engineer/i)).toBeInTheDocument();
    // stack label — two work entries share same label
    expect(screen.getAllByText('Stack').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('TypeScript').length).toBeGreaterThanOrEqual(1);
    // doc number 01 — appears for work and edu
    expect(screen.getAllByText('01').length).toBeGreaterThanOrEqual(1);
  });

  it('renders education stacked below work (no tabs)', () => {
    render(<Experience />);
    // both groups visible without click — use exact match for group heads to avoid header collision
    expect(screen.getByText(/^Work Experience$/i)).toBeInTheDocument();
    expect(screen.getAllByText(/^Education$/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Bachelor of Science/i)).toBeInTheDocument();
    expect(screen.getByText(/Backend Software Engineer/i)).toBeInTheDocument();
  });

  it('does not render old metric chips or timeline dots', () => {
    render(<Experience />);
    expect(screen.queryByText('SLA Uptime')).not.toBeInTheDocument();
    // no pulse ring
    expect(document.querySelector('.timeline-dot__ring')).toBeNull();
  });
});
