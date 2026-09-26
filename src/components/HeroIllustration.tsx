import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { type PointerEvent } from 'react';

export function HeroIllustration() {
  return (
    <div className="hero-illustration" aria-hidden="true">
      <svg viewBox="0 0 460 460" xmlns="http://www.w3.org/2000/svg">
        <circle cx="230" cy="230" r="205" fill="none" stroke="currentColor" strokeOpacity=".14" />
        <circle cx="230" cy="230" r="150" fill="none" stroke="currentColor" strokeOpacity=".18" />
        <circle cx="230" cy="230" r="95" fill="none" stroke="currentColor" strokeOpacity=".22" />

        {/* outer orbit — a little yarn ball */}
        <g className="hero-orbit hero-orbit-a">
          <g transform="translate(230 25)">
            <circle r="15" fill="hsl(var(--secondary))" />
            <path d="M-8 -2 Q0 6 8 -2 M-6 4 Q0 9 6 4" stroke="hsl(var(--foreground))" strokeWidth="1.4" fill="none" opacity=".5" />
          </g>
        </g>

        {/* mid orbit — a fish, running the opposite way */}
        <g className="hero-orbit hero-orbit-b">
          <g transform="translate(230 80)">
            <ellipse rx="13" ry="8" fill="hsl(var(--accent))" />
            <path d="M11 0 L21 -7 L21 7 Z" fill="hsl(var(--accent))" />
          </g>
        </g>

        {/* inner orbit — a small planet */}
        <g className="hero-orbit hero-orbit-c">
          <g transform="translate(230 135)">
            <circle r="8" fill="hsl(var(--primary))" />
          </g>
        </g>
      </svg>
    </div>
  );
}