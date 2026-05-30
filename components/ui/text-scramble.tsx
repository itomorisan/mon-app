'use client';
import { useEffect, useRef, useState } from 'react';

type TextScrambleProps = {
  children: string;
  duration?: number;
  speed?: number;
  characterSet?: string;
  className?: string;
  trigger?: boolean;
  onScrambleComplete?: () => void;
};

const defaultChars = 'abcdefghijklmnopqrstuvwxyz0123456789';

export function TextScramble({
  children,
  duration = 0.8,
  speed = 0.04,
  characterSet = defaultChars,
  className,
  trigger = true,
  onScrambleComplete,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(children);
  const animating = useRef(false);

  useEffect(() => {
    if (!trigger) return;
    if (animating.current) return;
    animating.current = true;

    const text = children;
    const steps = Math.floor(duration / speed);
    let step = 0;

    const interval = setInterval(() => {
      const progress = step / steps;
      let scrambled = '';
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') { scrambled += ' '; continue; }
        if (progress * text.length > i) {
          scrambled += text[i];
        } else {
          scrambled += characterSet[Math.floor(Math.random() * characterSet.length)];
        }
      }
      setDisplayText(scrambled);
      step++;
      if (step > steps) {
        clearInterval(interval);
        setDisplayText(text);
        animating.current = false;
        onScrambleComplete?.();
      }
    }, speed * 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return <span className={className}>{displayText}</span>;
}
