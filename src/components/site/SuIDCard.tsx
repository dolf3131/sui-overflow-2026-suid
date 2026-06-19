"use client";

import React from "react";
import { motion } from "framer-motion";
import { Fingerprint, CheckCircle2 } from "lucide-react";

interface SuIDCardProps {
  className?: string;
}

export function SuIDCard({ className = "" }: SuIDCardProps) {
  return (
    <div
      className={`relative overflow-hidden border-2 border-[color:var(--border)] bg-white p-6 ${className}`}
    >
      <div className="absolute -right-10 -top-10 opacity-5">
        <Fingerprint size={200} strokeWidth={1} />
      </div>

      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center bg-[color:var(--primary)] font-black text-[color:var(--primary-foreground)]">
              S
            </div>
            <span className="font-mono text-xs font-bold tracking-widest text-[color:var(--muted)]">
              PASSPORT
            </span>
          </div>
          <CheckCircle2 className="text-[color:var(--success)]" size={24} />
        </div>

        <div className="mt-4 grid gap-1">
          <div className="font-mono text-xs font-bold text-[color:var(--muted)]">
            ISSUED TO
          </div>
          <div className="text-xl font-black tracking-normal">
            Sui Overflow Builder
          </div>
          <div className="mt-2 font-mono text-[10px] sm:text-xs">
            0x3f9...c92a (zkLogin)
          </div>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-4 border-t-2 border-dashed border-[color:var(--border)] pt-4">
          <div>
            <div className="font-mono text-[10px] font-bold text-[color:var(--muted)]">
              VERIFIED EVENTS
            </div>
            <div className="font-mono text-sm font-black">12</div>
          </div>
          <div>
            <div className="font-mono text-[10px] font-bold text-[color:var(--muted)]">
              RESUME PDF
            </div>
            <div className="font-mono text-sm font-black text-[color:var(--primary)]">
              READY
            </div>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-center border-t-2 border-[color:var(--border)] pt-4">
          {/* Mock Barcode */}
          <div className="flex h-8 w-full gap-[2px]">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="h-full bg-black"
                style={{ width: `${Math.random() * 4 + 1}px`, opacity: 0.8 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
