import React, { useEffect, useRef, useState } from 'react';

/* Blend-difference follower: dot tracks instantly, ring lerps.
   Enhancement only — native cursor stays, touch + reduced-motion excluded. */
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setOn(true);
    let x = -100, y = -100, rx = -100, ry = -100, raf = 0, running = true, hovering = false;

    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target && e.target.closest ? e.target.closest('a,button,[role="button"]') : null;
      if (!!t !== hovering) {
        hovering = !!t;
        if (ringRef.current) ringRef.current.classList.toggle('is-hover', hovering);
      }
      if (dotRef.current) dotRef.current.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`;
    };
    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      if (running) raf = requestAnimationFrame(loop);
    };

    /* Pause rAF when tab hidden — no wasted frames */
    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('visibilitychange', onVis);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('visibilitychange', onVis);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!on) return null;
  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
