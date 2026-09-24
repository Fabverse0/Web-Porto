import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Experience from '../components/Experience';

describe('Experience - tabbed spec-sheet, education first', () => {
  it('shows education by default, work hidden', () => {
    render(<Experience />);
    expect(screen.getByText(/Engineering Experience/i)).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Education/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText(/Bachelor of Science/i)).toBeInTheDocument();
    expect(screen.queryByText(/Backend Software Engineer/i)).not.toBeInTheDocument();
  });

  it('switches to work panel on tab click', async () => {
    render(<Experience />);
    fireEvent.click(screen.getByRole('tab', { name: /Work Experience/i }));
    expect(await screen.findByText(/Backend Software Engineer/i)).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Work Experience/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.queryByText(/Bachelor of Science/i)).not.toBeInTheDocument();
  });

  it('toggles entry details inside work panel', async () => {
    render(<Experience />);
    fireEvent.click(screen.getByRole('tab', { name: /Work Experience/i }));
    const hideBtn = await screen.findByRole('button', { name: /Hide details/i });
    fireEvent.click(hideBtn);
    const viewBtns = await screen.findAllByRole('button', { name: /View details/i });
    expect(viewBtns.length).toBeGreaterThanOrEqual(1);
  });

  it('does not render old metric chips or timeline dots', () => {
    render(<Experience />);
    expect(screen.queryByText('SLA Uptime')).not.toBeInTheDocument();
    expect(document.querySelector('.timeline-dot__ring')).toBeNull();
  });
});
