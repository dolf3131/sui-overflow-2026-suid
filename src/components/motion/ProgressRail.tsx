"use client";

import React from "react";
import { motion } from "framer-motion";

export function ProgressRail() {
  return (
    <div className="relative h-2 w-full overflow-hidden border-2 border-[color:var(--border)] bg-[color:var(--surface)]">
      <motion.div
        className="h-full bg-[color:var(--primary)]"
        initial={{ width: "0%" }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </div>
  );
}
