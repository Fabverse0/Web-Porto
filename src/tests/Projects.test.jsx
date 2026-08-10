import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Projects from '../components/Projects';

describe('Seam 4: Projects Showcase Component', () => {
  it('should render project cards and metrics', () => {
    const handleSelectProject = vi.fn();
    render(<Projects selectedSkill={null} onSelectProject={handleSelectProject} />);

    expect(screen.getByText(/Production Backend Architecture Showcase/i)).toBeInTheDocument();
    expect(screen.getByText(/High-Throughput Payment & Settlement API/i)).toBeInTheDocument();
  });

  it('should trigger modal handler when clicking project card CTA', () => {
    const handleSelectProject = vi.fn();
    render(<Projects selectedSkill={null} onSelectProject={handleSelectProject} />);

    const ctaButtons = screen.getAllByText(/View Architecture & Scalar API Specs/i);
    expect(ctaButtons.length).toBeGreaterThan(0);
    
    fireEvent.click(ctaButtons[0]);
    expect(handleSelectProject).toHaveBeenCalled();
  });
});
