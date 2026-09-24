import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Projects from '../components/Projects';

describe('Projects showcase (plate redesign)', () => {
  it('renders placeholder plates with photo, name and actions', () => {
    render(<Projects selectedSkill={null} onOpenModal={() => {}} />);

    expect(screen.getByText(/Selected Work/i)).toBeInTheDocument();
    const names = screen.getAllByText(/Untitled 0/i);
    expect(names.length).toBeGreaterThan(0);
    const ctaButtons = screen.getAllByRole('button', { name: /view specs/i });
    expect(ctaButtons.length).toBe(4);
    const ghLinks = screen.getAllByRole('link', { name: /github/i });
    expect(ghLinks.length).toBe(4);
  });

  it('opens the spec sheet when View specs is clicked', () => {
    render(<Projects selectedSkill={null} onOpenModal={() => {}} />);

    const ctaButtons = screen.getAllByRole('button', { name: /view specs/i });
    fireEvent.click(ctaButtons[0]);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    /* "spec sheet" appears in toolbar and eyebrow - use getAllByText within dialog */
    const specTexts = within(dialog).getAllByText(/spec sheet/i);
    expect(specTexts.length).toBeGreaterThanOrEqual(1);
    expect(within(dialog).getByText(/Untitled 01/i)).toBeInTheDocument();
  });
});