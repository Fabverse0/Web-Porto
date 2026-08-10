import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AboutSkills from '../components/AboutSkills';

describe('Seam 3: AboutSkills Component & Filtering', () => {
  it('should render section title and category filter pills', () => {
    const handleSelectSkill = vi.fn();
    render(<AboutSkills selectedSkill={null} onSelectSkill={handleSelectSkill} />);

    expect(screen.getByText(/Built with High-Performance Backend Infrastructure/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Languages' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Databases' })).toBeInTheDocument();
  });

  it('should filter skills when category pill is clicked', () => {
    const handleSelectSkill = vi.fn();
    render(<AboutSkills selectedSkill={null} onSelectSkill={handleSelectSkill} />);

    const dbPill = screen.getByRole('button', { name: 'Databases' });
    fireEvent.click(dbPill);

    expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
    expect(screen.getByText('Redis')).toBeInTheDocument();
  });

  it('should invoke onSelectSkill when a skill card is clicked', () => {
    const handleSelectSkill = vi.fn();
    render(<AboutSkills selectedSkill={null} onSelectSkill={handleSelectSkill} />);

    const tsCard = screen.getByText('TypeScript');
    fireEvent.click(tsCard);

    expect(handleSelectSkill).toHaveBeenCalledWith('TypeScript');
  });
});
