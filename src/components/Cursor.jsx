import React, { useEffect, useRef, useState } from 'react';

/* Blend-difference follower with context states.
   Enhancement only - native cursor stays; touch + reduced-motion excluded.
   States: is-hover (link/button) - is-text (inputs) - is-drag (draggable surface)
   - is-media (photos/covers, blend switched off so it stays visible) - is-down - is-hidden. */
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setOn(true);

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;
    let running = true;
    const cur = { hover: false, text: false, drag: false, media: false, down: false, hidden: false };

    /* Apply a class to both nodes only when the boolean actually changes */
    const setCls = (key, cls, next) => {
      if (cur[key] === next) return;
      cur[key] = next;
      if (dotRef.current) dotRef.current.classList.toggle(cls, next);
      if (ringRef.current) ringRef.current.classList.toggle(cls, next);
    };

    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target;
      const closest = t && t.closest ? (sel) => t.closest(sel) : () => null;

      const isText = !!closest('input,textarea,[contenteditable="true"],[data-cursor="text"]');
      const isDrag = !!closest('[data-cursor="drag"]');
      const isMedia = !!closest('img,video,[data-cursor="media"],.plate-media,.plate');
      const isHover = !isText && !isDrag && !!closest('a,button,[role="button"],[data-cursor="hover"]');

      setCls('text', 'is-text', isText);
      setCls('drag', 'is-drag', isDrag && !isText);
      setCls('media', 'is-media', isMedia);
      setCls('hover', 'is-hover', isHover);
      setCls('hidden', 'is-hidden', false);

      if (dotRef.current) {
        dotRef.current.style.transform = 'translate(' + x + 'px,' + y + 'px) translate(-50%,-50%)';
      }
    };

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
      }
      if (running) raf = requestAnimationFrame(loop);
    };

    const onDown = () => setCls('down', 'is-down', true);
    const onUp = () => setCls('down', 'is-down', false);
    const onLeave = () => setCls('hidden', 'is-hidden', true);
    const onEnter = () => setCls('hidden', 'is-hidden', false);

    /* Pause rAF when tab hidden - no wasted frames */
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
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    window.addEventListener('blur', onLeave);
    window.addEventListener('focus', onEnter);
    document.addEventListener('visibilitychange', onVis);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      window.removeEventListener('blur', onLeave);
      window.removeEventListener('focus', onEnter);
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