import React from "react";
import { SiteHeader } from "@/components/site/SiteHeader";

export default function VerifyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full bg-[color:var(--surface)]">
      <SiteHeader />
      <main className="py-20">{children}</main>
    </div>
  );
}
