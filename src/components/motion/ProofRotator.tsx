"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProofState {
  label: string;
  value: string;
  meta: string;
  badge: string;
  badgeClass: string;
}

interface ProofRotatorProps {
  states: ProofState[];
}

export function ProofRotator({ states }: ProofRotatorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % states.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [states.length]);

  return (
    <div className="relative h-[120px] w-full overflow-hidden border-2 border-[color:var(--border)] bg-[color:var(--surface)] p-4 [box-shadow:var(--shadow)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="flex h-full flex-col justify-between"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-black tracking-widest text-[color:var(--muted)]">
                {states[currentIndex].label}
              </div>
              <div className="mt-1 font-mono text-sm font-bold truncate max-w-[200px] sm:max-w-none">
                {states[currentIndex].value}
              </div>
            </div>
            <div
              className={`flex h-8 w-8 items-center justify-center border-2 border-[color:var(--border)] text-xs font-black ${states[currentIndex].badgeClass}`}
            >
              {states[currentIndex].badge}
            </div>
          </div>
          <div className="text-xs font-semibold text-[color:var(--muted)]">
            {states[currentIndex].meta}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
