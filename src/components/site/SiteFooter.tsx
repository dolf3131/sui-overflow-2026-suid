import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-[color:var(--border)] bg-[color:var(--surface)] py-12">
      <Container className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <div className="flex items-center gap-2 font-black">
            <div className="flex h-6 w-6 items-center justify-center border-2 border-[color:var(--border)] bg-[color:var(--primary)] text-xs text-[color:var(--primary-foreground)]">
              S
            </div>
            <span>SuID</span>
          </div>
          <p className="text-sm font-medium text-[color:var(--muted)]">
            Verified career records on Sui.
          </p>
        </div>
        <div className="flex gap-6 text-sm font-semibold">
          <Link href="/" className="hover:text-[color:var(--primary)]">
            Home
          </Link>
          <Link href="/app" className="hover:text-[color:var(--primary)]">
            Portfolio
          </Link>
          <Link href="/verify" className="hover:text-[color:var(--primary)]">
            Verify
          </Link>
        </div>
      </Container>
    </footer>
  );
}
