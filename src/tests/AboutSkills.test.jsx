import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AboutSkills from '../components/AboutSkills';

describe('AboutSkills Component (capsule redesign v2)', () => {
  it('should render section title and skill category bands', () => {
    const handleSelectSkill = vi.fn();
    render(<AboutSkills selectedSkill={null} onSelectSkill={handleSelectSkill} />);

    expect(screen.getByText(/Built with High-Performance Backend Infrastructure/i)).toBeInTheDocument();
    expect(screen.getByText('Languages')).toBeInTheDocument();
    expect(screen.getByText('Databases')).toBeInTheDocument();
  });

  it('should render logo cloud with brand icons and capsule pills', () => {
    const handleSelectSkill = vi.fn();
    render(<AboutSkills selectedSkill={null} onSelectSkill={handleSelectSkill} />);

    /* TypeScript appears in both logo cloud label and capsule pill */
    const tsInstances = screen.getAllByText('TypeScript');
    expect(tsInstances.length).toBeGreaterThanOrEqual(2);
  });

  it('should invoke onSelectSkill when a capsule pill is clicked', () => {
    const handleSelectSkill = vi.fn();
    render(<AboutSkills selectedSkill={null} onSelectSkill={handleSelectSkill} />);

    /* Find a capsule pill (role=button) containing TypeScript */
    const tsPills = screen.getAllByRole('button').filter(
      (btn) => btn.textContent.includes('TypeScript')
    );
    expect(tsPills.length).toBeGreaterThanOrEqual(1);
    fireEvent.click(tsPills[0]);

    expect(handleSelectSkill).toHaveBeenCalledWith('TypeScript');
  });
});