"use client";

import React from "react";
import { motion } from "framer-motion";

interface MarqueeProps {
  text: string;
  items: string[];
}

export function Marquee({ items }: MarqueeProps) {
  // Duplicate items to ensure smooth infinite scroll
  const scrollItems = [...items, ...items, ...items];

  return (
    <div className="flex w-full overflow-hidden border-b-2 border-t-2 border-[color:var(--border)] bg-[color:var(--primary)] py-4 text-[color:var(--primary-foreground)]">
      <motion.div
        className="flex min-w-full shrink-0 gap-10 pr-10"
        animate={{ x: "-33.33%" }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20,
        }}
      >
        {scrollItems.map((item, idx) => (
          <div key={idx} className="whitespace-nowrap font-mono text-sm font-bold uppercase tracking-widest">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
