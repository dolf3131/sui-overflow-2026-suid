"use client";

import React, { ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  offset?: number;
}

export function Parallax({ children, className = "", offset = 50 }: ParallaxProps) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, offset]);

  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
