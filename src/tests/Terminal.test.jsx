import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Terminal from '../components/Terminal';

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('Seam 2: Interactive Terminal Component', () => {
  it('should render initial welcome header and input prompt', () => {
    render(<Terminal />);
    expect(screen.getByText(/Welcome to Fab.Dev Interactive Backend Terminal/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/type 'help', 'matrix'/i)).toBeInTheDocument();
  });

  it('should execute "help" command and output command list', () => {
    render(<Terminal />);
    const input = screen.getByPlaceholderText(/type 'help', 'matrix'/i);
    
    fireEvent.change(input, { target: { value: 'help' } });
    fireEvent.submit(input);

    expect(screen.getByText(/Available Commands:/i)).toBeInTheDocument();
  });

  it('should execute "cv" command and show resume download output', () => {
    render(<Terminal />);
    const input = screen.getByPlaceholderText(/type 'help', 'matrix'/i);
    
    fireEvent.change(input, { target: { value: 'cv' } });
    fireEvent.submit(input);

    expect(screen.getByText(/Initiating download for Fabian_CV.pdf/i)).toBeInTheDocument();
  });

  it('should display error message for invalid command', () => {
    render(<Terminal />);
    const input = screen.getByPlaceholderText(/type 'help', 'matrix'/i);
    
    fireEvent.change(input, { target: { value: 'unknown_cmd' } });
    fireEvent.submit(input);

    expect(screen.getByText(/zsh: command not found: unknown_cmd/i)).toBeInTheDocument();
  });
});
