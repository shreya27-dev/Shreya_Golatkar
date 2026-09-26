import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const trail = useRef({ x: -100, y: -100 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return; // leave touch/coarse pointers alone
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.documentElement.classList.add('has-custom-cursor');

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      dotRef.current?.style.setProperty('transform', `translate3d(${e.clientX}px, ${e.clientY}px, 0)`);
      if (reducedMotion) {
        trailRef.current?.style.setProperty('transform', `translate3d(${e.clientX}px, ${e.clientY}px, 0)`);
      }
    };

    const interactive = 'a, button, .magnetic-link, [role="button"], input, summary';
    const onOver = (e: Event) => (e.target as Element).closest(interactive) && document.documentElement.classList.add('cursor-active');
    const onOut = (e: Event) => (e.target as Element).closest(interactive) && document.documentElement.classList.remove('cursor-active');

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    if (!reducedMotion) {
      const loop = () => {
        trail.current.x += (pos.current.x - trail.current.x) * 0.18;
        trail.current.y += (pos.current.y - trail.current.y) * 0.18;
        trailRef.current?.style.setProperty('transform', `translate3d(${trail.current.x}px, ${trail.current.y}px, 0)`);
        raf.current = requestAnimationFrame(loop);
      };
      raf.current = requestAnimationFrame(loop);
    }

    return () => {
      document.documentElement.classList.remove('has-custom-cursor', 'cursor-active');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={trailRef} className="cursor-trail" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}