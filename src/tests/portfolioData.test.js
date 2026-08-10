import { describe, it, expect } from 'vitest';
import { PORTFOLIO_DATA } from '../data/portfolioData';

describe('Seam 1: Portfolio Data Integrity & Terminal Commands', () => {
  it('should have exact personal profile details for Muhammad Fabian Rizky (Fab.Dev)', () => {
    expect(PORTFOLIO_DATA.developer.name).toBe('Muhammad Fabian Rizky');
    expect(PORTFOLIO_DATA.developer.brandName).toBe('Fab.Dev');
    expect(PORTFOLIO_DATA.developer.email).toBe('mfabian.rizky@gmail.com');
    expect(PORTFOLIO_DATA.developer.github).toBe('https://github.com/Fabverse0');
    expect(PORTFOLIO_DATA.developer.linkedin).toBe('https://www.linkedin.com/in/fabianrizky');
  });

  it('should contain all required CLI terminal dictionary commands', () => {
    const requiredCommands = ['help', 'bio', 'skills', 'projects', 'cv', 'contact', 'ping', 'sudo', 'matrix'];
    requiredCommands.forEach(cmd => {
      expect(PORTFOLIO_DATA.terminalCommands[cmd]).toBeDefined();
      expect(typeof PORTFOLIO_DATA.terminalCommands[cmd]).toBe('string');
      expect(PORTFOLIO_DATA.terminalCommands[cmd].length).toBeGreaterThan(0);
    });
  });

  it('should validate that all showcase projects have valid OpenAPI 3.0 specs', () => {
    expect(PORTFOLIO_DATA.projects.length).toBeGreaterThan(0);
    PORTFOLIO_DATA.projects.forEach(project => {
      expect(project.openApiSpec).toBeDefined();
      expect(project.openApiSpec.openapi).toBe('3.0.0');
      expect(project.openApiSpec.info.title).toBeDefined();
      expect(project.openApiSpec.paths).toBeDefined();
    });
  });
});
