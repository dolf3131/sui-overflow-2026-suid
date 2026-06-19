"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useZkLogin } from "@/components/auth/ZkLoginProvider";
import { SiteHeader } from "@/components/site/SiteHeader";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isLoading } = useZkLogin();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if we have finished loading the auth state
    // and the user is confirmed to not be logged in.
    if (!isLoading && !isLoggedIn) {
      router.push("/");
    }
  }, [isLoading, isLoggedIn, router]);

  // Show a loading state while we check localStorage / auth status
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[color:var(--background)]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[color:var(--primary)] border-t-transparent" />
          <div className="font-bold text-[color:var(--muted)]">Loading portfolio...</div>
        </div>
      </div>
    );
  }

  // If not loading and not logged in, we return null to avoid flash before redirect kicks in
  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-full bg-[color:var(--background)]">
      <SiteHeader />
      <main className="py-12">{children}</main>
    </div>
  );
}
