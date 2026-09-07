import React, { useState, useEffect, lazy, Suspense } from 'react';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSkills from './components/AboutSkills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
const ProjectModal = lazy(() => import('./components/ProjectModal'));

export default function App() {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('fab_dev_theme') || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('fab_dev_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-300">
        {/* Document header */}
        <Navbar theme={theme} onToggleTheme={toggleTheme} />

        {/* Main content */}
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
          <Experience />
          <Contact />
        </main>

        <Footer />

        {/* Interactive project detail modal */}
        <Suspense fallback={null}>
          {activeModalProject && (
            <ProjectModal
              project={activeModalProject}
              onClose={() => setActiveModalProject(null)}
            />
          )}
        </Suspense>
      </div>
    </MotionConfig>
  );
}
