import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Projects from '../components/Projects';

describe('Seam 4: Projects Showcase Component', () => {
  it('should render project cards and metrics', () => {
    const handleOpenModal = vi.fn();
    render(<Projects selectedSkill={null} onOpenModal={handleOpenModal} />);

    expect(screen.getByText(/Production-Grade Systems & High-Throughput APIs/i)).toBeInTheDocument();
    expect(screen.getByText(/High-Throughput Payment & Settlement API/i)).toBeInTheDocument();
  });

  it('should trigger modal handler when clicking project card CTA', () => {
    const handleOpenModal = vi.fn();
    render(<Projects selectedSkill={null} onOpenModal={handleOpenModal} />);

    const ctaButtons = screen.getAllByText(/View Architecture & Specs/i);
    expect(ctaButtons.length).toBeGreaterThan(0);
    
    fireEvent.click(ctaButtons[0]);
    expect(handleOpenModal).toHaveBeenCalled();
  });
});
