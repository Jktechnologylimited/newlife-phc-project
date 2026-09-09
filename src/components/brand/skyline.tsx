"use client";

import { motion, useReducedMotion } from "framer-motion";

type PathAttrs = {
  d: string;
  stroke?: string;
  strokeWidth?: number;
  strokeOpacity?: number;
  strokeLinecap?: "round" | "square" | "butt" | "inherit";
  strokeLinejoin?: "round" | "miter" | "bevel" | "inherit";
  strokeDasharray?: string;
  fill?: string;
  fillOpacity?: number;
};

const pathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { delay: i * 0.12, duration: 1.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/** A single stroke of the illustration — plain when reduced motion is
 * preferred, hand-drawn (via pathLength) otherwise. Declared at module
 * scope so it isn't recreated on every render. */
function Path({ i, draw, ...rest }: PathAttrs & { i: number; draw: boolean }) {
  if (!draw) return <path {...rest} />;
  return (
    <motion.path
      {...rest}
      custom={i}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={pathVariants}
    />
  );
}

/**
 * A single abstracted line-art illustration of the shared campus:
 * a chapel with a spire on the left, a schoolhouse with a flag on the
 * right, joined by one path. This is the site's one deliberately bold
 * visual element — it recurs (in different accent tones) everywhere a
 * hero needs an image, so Newlife never needs stock photography to
 * feel finished.
 */
export function Skyline({
  className,
  accentClassName = "text-church",
  animate = true,
}: {
  className?: string;
  accentClassName?: string;
  animate?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const draw = animate && !shouldReduceMotion;

  return (
    <svg
      viewBox="0 0 960 340"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* ground line */}
      <Path draw={draw} i={0} d="M40 300 H920" stroke="currentColor" strokeOpacity={0.35} strokeWidth={1.5} />

      {/* trees */}
      <g className="text-ink" opacity={0.55}>
        <Path draw={draw} i={1} d="M120 300 V255" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
        <Path draw={draw} i={1} d="M120 218 L100 258 H140 Z" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" />
        <Path draw={draw} i={2} d="M790 300 V262" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
        <Path draw={draw} i={2} d="M790 230 L768 266 H812 Z" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" />
      </g>

      {/* chapel */}
      <g className="text-ink">
        <Path draw={draw} i={2} d="M190 300 V170 H330 V300" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" />
        {/* arched door */}
        <Path
          draw={draw}
          i={5}
          d="M242 300 V255 a18 18 0 0 1 36 0 V300"
          stroke="currentColor"
          strokeWidth={2}
        />
        {/* rose window */}
        <Path draw={draw} i={4} d="M260 210 a12 12 0 1 0 0.01 0" stroke="currentColor" strokeWidth={2} />
      </g>
      <g className={accentClassName}>
        {/* spire */}
        <Path draw={draw} i={3} d="M190 170 L260 90 L330 170 Z" stroke="currentColor" strokeWidth={2.25} strokeLinejoin="round" />
        <Path draw={draw} i={3} d="M260 90 V56" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" />
        <Path draw={draw} i={3} d="M248 66 H272 M260 56 V78" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" />
      </g>

      {/* connecting path */}
      <Path
        draw={draw}
        i={6}
        d="M330 296 C 430 270, 520 270, 610 296"
        stroke="currentColor"
        strokeOpacity={0.4}
        strokeWidth={2}
        strokeDasharray="1 10"
        strokeLinecap="round"
      />

      {/* schoolhouse */}
      <g className="text-ink">
        <Path draw={draw} i={4} d="M610 300 V190 H800 V300" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" />
        <Path draw={draw} i={5} d="M610 190 L705 150 L800 190" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" />
        {/* windows grid */}
        <Path draw={draw} i={6} d="M636 220 H666 V250 H636 Z" stroke="currentColor" strokeWidth={1.75} />
        <Path draw={draw} i={6} d="M690 220 H720 V250 H690 Z" stroke="currentColor" strokeWidth={1.75} />
        <Path draw={draw} i={6} d="M744 220 H774 V250 H744 Z" stroke="currentColor" strokeWidth={1.75} />
        {/* door */}
        <Path draw={draw} i={7} d="M694 300 V268 H716 V300" stroke="currentColor" strokeWidth={1.75} />
      </g>
      <g className={accentClassName}>
        <Path draw={draw} i={5} d="M705 150 V110" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" />
        <Path draw={draw} i={5} d="M705 110 L735 120 L705 130 Z" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" fill="currentColor" fillOpacity={0.15} />
      </g>
    </svg>
  );
}
