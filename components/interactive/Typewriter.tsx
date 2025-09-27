'use client';
import { motion, useReducedMotion } from 'framer-motion';

type Props = {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
};

export default function Typewriter({
  text,
  delay = 0.08,
  speed = 0.10,
  className = '',
}: Props) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{text}</span>;

  const words = text.split(' ');

  return (
    <span
      className={`contents font-heading ${className}`}
      style={{
        fontFamily: 'var(--font-playfair)', // 🔑 ensures Playfair is applied
        fontWeight: 'inherit',
        lineHeight: 'inherit',
        letterSpacing: 'inherit',
      }}
      aria-label={text}
    >
      <span aria-hidden="true">
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: '0.35em' }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + i * speed, duration: 0.34, ease: 'easeOut' }}
            style={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
            }}
          >
            {word}
            <span style={{ whiteSpace: 'pre' }}> </span>
          </motion.span>
        ))}
      </span>
    </span>
  );
}
