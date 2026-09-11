import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Lab from '../components/Lab';

describe('Lab', () => {
  it('renders three live experiments', () => {
    render(<Lab />);
    expect(screen.getByText('Small live experiments.')).toBeInTheDocument();
    expect(screen.getByText('Cursor Grid')).toBeInTheDocument();
    expect(screen.getByText('Split Reveal')).toBeInTheDocument();
    expect(screen.getByText('Count-Up')).toBeInTheDocument();
  });

  it('replays the split demo on click', () => {
    render(<Lab />);
    fireEvent.click(screen.getByRole('button', { name: /Replay reveal/i }));
    expect(screen.getByRole('button', { name: /Replay reveal/i })).toBeInTheDocument();
  });

  it('links back to the portfolio', () => {
    render(<Lab />);
    expect(screen.getByRole('link', { name: /Back to portfolio/i })).toHaveAttribute('href', '#about');
  });
});
