"use client"

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface ScrollStackProps {
  items: React.ReactNode[];
  className?: string;
  itemDistance?: number;
}

const StackCard = ({
  children,
  index,
  totalItems,
  scrollYProgress,
  itemDistance = 0.05,
}: {
  children: React.ReactNode;
  index: number;
  totalItems: number;
  scrollYProgress: MotionValue<number>;
  itemDistance?: number;
}) => {
  // Target position where this card becomes the "top" active card in the scroll stack
  const targetScale = 1 - (totalItems - index) * 0.05; 
  
  // As user scrolls past this component's top, it starts to stick and scale down
  // The threshold where it begins to stick
  const startProgress = index * itemDistance;
  
  // Calculate relative scale
  const scale = useTransform(
    scrollYProgress,
    [startProgress, 1],
    [1, targetScale]
  );
  
  // Calculate relative Y offset (overlapping effect)
  const y = useTransform(
    scrollYProgress,
    [startProgress, 1],
    [0, (totalItems - index) * -20]
  );

  return (
    <motion.div
      style={{ scale, y }}
      className="sticky top-32 w-full pt-4 origin-top"
    >
      {children}
    </motion.div>
  );
};

export function ScrollStack({ items, className = "", itemDistance = 0.15 }: ScrollStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className={`relative flex flex-col items-center ${className}`}>
      {/* We add extra padding at the bottom based on items to ensure enough scroll space */}
      <div style={{ height: `${items.length * 40}vh`, width: '100%' }} className="absolute invisible" />
      
      {items.map((item, index) => (
        <StackCard 
          key={index} 
          index={index} 
          totalItems={items.length} 
          scrollYProgress={scrollYProgress}
          itemDistance={itemDistance}
        >
          {item}
        </StackCard>
      ))}
    </div>
  );
}
