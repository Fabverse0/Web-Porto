import React, { useState } from 'react';
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

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#09090B]">
      {/* Floating Navbar */}
      <Navbar />

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
