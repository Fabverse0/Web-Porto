import React, { useState, useEffect } from 'react';
import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSkills from './components/AboutSkills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cursor from './components/Cursor';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return <motion.div aria-hidden="true" className="scroll-progress" style={{ scaleX }} />;
}

export default function App() {
  const [selectedSkill, setSelectedSkill] = useState(null);
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
        <ScrollProgress />
        <Cursor />
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
          />
          <Experience />
          <Contact />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}
