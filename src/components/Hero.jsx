import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Copy, Check, Download } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { VariableFontHover } from '@/components/ui/variable-font-hover';
import { SocialIcon } from '@/components/ui/social-icon';

// Interactive Fluid & Particle Mesh Canvas
function FluidInteractiveCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse coordinates
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      isActive: false,
      radius: 170
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
    };

    canvas.parentElement.addEventListener('mousemove', handleMouseMove);
    canvas.parentElement.addEventListener('mouseleave', handleMouseLeave);

    // Particle nodes definition
    const particleCount = Math.min(Math.floor((width * height) / 11000), 55);
    const particles = [];

    const isDarkMode = () => document.documentElement.classList.contains('dark');

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1.2,
        baseRadius: Math.random() * 2 + 1.2,
        colorType: Math.random() > 0.4 ? 'zinc' : 'blue',
      });
    }

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      const dark = isDarkMode();
      const zincColor = dark ? 'rgba(16, 185, 129, ' : 'rgba(9, 9, 11, ';
      const blueColor = dark ? 'rgba(37, 99, 235, ' : 'rgba(63, 63, 70, ';
      const neutralColor = dark ? 'rgba(255, 255, 255, ' : 'rgba(9, 9, 11, ';

      // Ambient Mouse Glow
      if (mouse.isActive) {
        const gradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, mouse.radius * 1.5
        );
        gradient.addColorStop(0, dark ? 'rgba(16, 185, 129, 0.12)' : 'rgba(9, 9, 11, 0.06)');
        gradient.addColorStop(0.5, dark ? 'rgba(37, 99, 235, 0.06)' : 'rgba(63, 63, 70, 0.03)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      // Update & Draw Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse interactivity
        if (mouse.isActive) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (1 - dist / mouse.radius) * 3;
            p.x -= (dx / dist) * force;
            p.y -= (dy / dist) * force;
            p.radius = p.baseRadius * 1.6;
          } else {
            p.radius = p.baseRadius;
          }
        } else {
          p.radius = p.baseRadius;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        const col = p.colorType === 'zinc' ? zincColor : blueColor;
        ctx.fillStyle = `${col}0.6)`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * (dark ? 0.15 : 0.12);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `${neutralColor}${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connect particle to mouse
        if (mouse.isActive) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * (dark ? 0.35 : 0.25);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `${col}${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvas.parentElement) {
        canvas.parentElement.removeEventListener('mousemove', handleMouseMove);
        canvas.parentElement.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}

export default function Hero() {
  const [emailCopied, setEmailCopied] = useState(false);
  const dev = PORTFOLIO_DATA.developer;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(dev.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <section id="about" className="relative min-h-[85vh] flex items-center justify-center pt-24 sm:pt-28 pb-14 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#FAFAFA] dark:bg-[#09090B] text-[#09090B] dark:text-[#FAFAFA] transition-colors duration-300">
      
      {/* Interactive Fluid Particle Canvas Background */}
      <FluidInteractiveCanvas />

      {/* Subtle Ambient Radial Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-[#09090B]/5 via-[#3F3F46]/3 to-transparent dark:from-[#10B981]/10 dark:via-[#2563EB]/5 dark:to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center space-y-8 sm:space-y-9 flex flex-col items-center">
        
        {/* Clean Editorial Typography */}
        <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-[3.65rem] tracking-[-0.04em] leading-tight text-[#09090B] dark:text-[#FAFAFA]"
          >
            <VariableFontHover
              label="Hi, I'm Muhammad Fabian Rizky"
              fromFontVariationSettings="'wght' 650, 'slnt' 0"
              toFontVariationSettings="'wght' 850, 'slnt' -6"
              staggerDuration={0.015}
              staggerFrom="first"
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="justify-center font-semibold"
            />
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl sm:text-2xl font-medium tracking-tight text-[#09090B] dark:text-[#E4E4E7] leading-snug flex justify-center"
          >
            <VariableFontHover
              label="Software Developer & System Builder"
              fromFontVariationSettings="'wght' 400, 'slnt' 0"
              toFontVariationSettings="'wght' 800, 'slnt' -8"
              staggerDuration={0.012}
              staggerFrom="first"
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="justify-center"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-[#71717A] dark:text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed font-normal flex justify-center text-center"
          >
            <VariableFontHover
              label='I am Fabian, a 3rd-semester informatics student at UPN "Veteran" Jakarta with a strong interest in backend development and system design. I am always eager to learn, solve problems, and contribute to real-world development projects.'
              fromFontVariationSettings="'wght' 400, 'slnt' 0"
              toFontVariationSettings="'wght' 700, 'slnt' -6"
              staggerDuration={0.005}
              staggerFrom="first"
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="justify-center text-center leading-relaxed"
            />
          </motion.div>
        </div>

        {/* Primary Action Buttons & Socials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          {/* Explore Projects Primary CTA */}
          <motion.a
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            href="#projects"
            className="inline-flex items-center gap-2 font-heading font-semibold text-sm py-3.5 px-6 rounded-xl bg-[#09090B] dark:bg-[#FAFAFA] text-[#FAFAFA] dark:text-[#09090B] hover:bg-[#27272A] dark:hover:opacity-90 transition-all shadow-md group"
          >
            <span>Explore My Work</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#10B981] dark:text-[#059669]" />
          </motion.a>

          {/* Copy Email Button */}
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 font-heading font-semibold text-sm py-3.5 px-4 rounded-xl bg-[#FFFFFF] dark:bg-[#18181B] text-[#09090B] dark:text-[#FAFAFA] border border-[#E4E4E7] dark:border-[#27272A] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] transition-all shadow-sm"
          >
            {emailCopied ? (
              <>
                <Check className="w-4 h-4 text-[#10B981]" />
                <span className="text-[#10B981] font-mono text-xs">Email Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#71717A] dark:text-[#A1A1AA]" />
                <span>Copy Email</span>
              </>
            )}
          </motion.button>

          {/* Direct Social & CV Links */}
          <div className="flex items-center gap-2 sm:ml-2">
            <SocialIcon
              platform="cv"
              href={dev.resumeUrl}
              label="View CV"
              size="md"
              variant="outline"
            />
            <SocialIcon
              platform="github"
              href={dev.github}
              label="GitHub Profile"
              size="md"
              variant="outline"
            />
            <SocialIcon
              platform="linkedin"
              href={dev.linkedin}
              label="LinkedIn Profile"
              size="md"
              variant="outline"
            />
            <SocialIcon
              platform="instagram"
              href={dev.instagram}
              label="Instagram Profile"
              size="md"
              variant="outline"
            />
          </div>

        </motion.div>

      </div>
    </section>
  );
}
