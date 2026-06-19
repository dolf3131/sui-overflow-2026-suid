"use client";

import React from "react";
import Link from "next/link";
import { useZkLogin } from "@/components/auth/ZkLoginProvider";
import { Container } from "@/components/ui/Container";

export function SiteHeader() {
  const { isLoggedIn, login, logout } = useZkLogin();

  return (
    <header className="sticky top-0 z-40 border-b-2 border-[color:var(--border)] bg-[color:var(--background)]/90 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-black">
          <div className="flex h-8 w-8 items-center justify-center border-2 border-[color:var(--border)] bg-[color:var(--primary)] text-[color:var(--primary-foreground)]">
            S
          </div>
          <span className="text-xl tracking-tight">SuID</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/app"
            className="hidden text-sm font-semibold hover:text-[color:var(--primary)] sm:block"
          >
            Portfolio
          </Link>
          <Link
            href="/verify"
            className="hidden text-sm font-semibold hover:text-[color:var(--primary)] sm:block"
          >
            Verify
          </Link>
          {isLoggedIn ? (
            <button
              onClick={logout}
              className="border-2 border-[color:var(--border)] px-4 py-1.5 text-sm font-bold transition-all hover:-translate-y-0.5 hover:[box-shadow:var(--shadow-sm)]"
            >
              Disconnect
            </button>
          ) : (
            <button
              onClick={login}
              className="border-2 border-[color:var(--border)] bg-[color:var(--primary)] px-4 py-1.5 text-sm font-bold text-[color:var(--primary-foreground)] transition-all hover:-translate-y-0.5 hover:[box-shadow:var(--shadow-sm)]"
            >
              Connect Google
            </button>
          )}
        </nav>
      </Container>
    </header>
  );
}
