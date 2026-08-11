import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSkills from './components/AboutSkills';
import Projects from './components/Projects';
import ScalarHub from './components/ScalarHub';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';

export default function App() {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('fab_dev_theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('fab_dev_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      {/* Floating Navbar with Theme Toggle */}
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <AboutSkills
          selectedSkill={selectedSkill}
          onSelectSkill={setSelectedSkill}
        />
        <Projects
          selectedSkill={selectedSkill}
          onOpenModal={setActiveModalProject}
        />
        <ScalarHub />
        <Experience />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive 4-Tab Project Modal */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </div>
  );
}
