import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AboutSkills from '../components/AboutSkills';

describe('AboutSkills Component (spec roster redesign)', () => {
  it('should render section title and skill category bands', () => {
    const handleSelectSkill = vi.fn();
    render(<AboutSkills selectedSkill={null} onSelectSkill={handleSelectSkill} />);

    expect(screen.getByText(/Built with High-Performance Backend Infrastructure/i)).toBeInTheDocument();
    expect(screen.getByText('Languages')).toBeInTheDocument();
    expect(screen.getByText('Databases')).toBeInTheDocument();
  });

  it('should render derived stat line and expose pill name+level to AT', () => {
    const handleSelectSkill = vi.fn();
    render(<AboutSkills selectedSkill={null} onSelectSkill={handleSelectSkill} />);

    /* stat line dihitung dari data: 17 skills, 4 kategori, 7 expert */
    expect(
      screen.getByLabelText(/17 tools across 4 domains, 7 at expert level/i)
    ).toBeInTheDocument();

    /* logo cloud strip sudah dihapus - tidak ada lagi elemen .skill-logo-cloud */
    const cloudNodes = document.querySelectorAll('.skill-logo-cloud');
    expect(cloudNodes.length).toBe(0);

    /* pill expert mengekspos nama + level ke screen reader */
    const tsPill = screen.getByRole('button', { name: /TypeScript - Expert/i });
    expect(tsPill).toHaveAttribute('aria-pressed', 'false');
  });

  it('should invoke onSelectSkill when a capsule pill is clicked', () => {
    const handleSelectSkill = vi.fn();
    render(<AboutSkills selectedSkill={null} onSelectSkill={handleSelectSkill} />);

    const tsPills = screen.getAllByRole('button').filter(
      (btn) => btn.textContent.includes('TypeScript')
    );
    expect(tsPills.length).toBeGreaterThanOrEqual(1);
    fireEvent.click(tsPills[0]);

    expect(handleSelectSkill).toHaveBeenCalledWith('TypeScript');
  });
});