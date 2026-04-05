"use client"

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CHARACTERS = '!<>-_\\/[]{}—=+*^?#________';

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  duration?: number;
}

export function ScrambleText({
  text,
  className = "",
  delay = 0,
  speed = 50,
  duration = 800,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text.replace(/./g, ' '));
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const hasAnimated = useRef(false);

  // Core scramble logic
  const scramble = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    let startTime: number | null = null;
    let animationFrameId: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      let nextText = "";
      for (let i = 0; i < text.length; i++) {
        // Space characters remain space
        if (text[i] === ' ') {
          nextText += ' ';
          continue;
        }

        // Determine if we should reveal the real character based on progression
        // Front chars reveal faster than trailing chars
        const charProgressLimit = (i / text.length) * 0.5; 
        if (percentage >= 0.5 + charProgressLimit || percentage === 1) {
          nextText += text[i];
        } else {
          // Scramble
          const randomChar = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          nextText += randomChar;
        }
      }

      setDisplayText(nextText);

      if (percentage < 1) {
        // Control speed roughly by throttling frames or just looping
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  };

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const timeoutId = setTimeout(() => {
        scramble();
      }, delay * 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [isInView, delay]);

  return (
    <motion.span
      ref={containerRef}
      className={`inline-block cursor-default ${className}`}
      onHoverStart={() => {
        if (!isAnimating) scramble();
      }}
    >
      {displayText}
    </motion.span>
  );
}
