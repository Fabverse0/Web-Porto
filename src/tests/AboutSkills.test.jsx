import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AboutSkills from '../components/AboutSkills';

describe('AboutSkills Component (band redesign)', () => {
  it('should render section title and skill category bands', () => {
    const handleSelectSkill = vi.fn();
    render(<AboutSkills selectedSkill={null} onSelectSkill={handleSelectSkill} />);

    expect(screen.getByText(/Built with High-Performance Backend Infrastructure/i)).toBeInTheDocument();
    /* Category band labels */
    expect(screen.getByText('Languages')).toBeInTheDocument();
    expect(screen.getByText('Databases')).toBeInTheDocument();
    expect(screen.getByText('API & Messaging')).toBeInTheDocument();
    expect(screen.getByText('Cloud & DevOps')).toBeInTheDocument();
  });

  it('should render skill pills within bands', () => {
    const handleSelectSkill = vi.fn();
    render(<AboutSkills selectedSkill={null} onSelectSkill={handleSelectSkill} />);

    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
    expect(screen.getByText('Redis')).toBeInTheDocument();
  });

  it('should invoke onSelectSkill when a skill pill is clicked', () => {
    const handleSelectSkill = vi.fn();
    render(<AboutSkills selectedSkill={null} onSelectSkill={handleSelectSkill} />);

    const tsPill = screen.getByText('TypeScript');
    fireEvent.click(tsPill);

    expect(handleSelectSkill).toHaveBeenCalledWith('TypeScript');
  });
});