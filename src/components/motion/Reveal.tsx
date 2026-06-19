"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}

export function Reveal({ children, className = "", delayMs = 0 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: delayMs / 1000, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
