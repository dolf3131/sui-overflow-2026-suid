"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function VerifyIndexPage() {
  const [suidUri, setSuidUri] = useState("");
  const router = useRouter();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suidUri) return;
    
    // Extract ID (e.g. from suid://verify/7f3k -> 7f3k)
    const match = suidUri.match(/suid:\/\/verify\/([a-zA-Z0-9]+)/);
    const id = match ? match[1] : suidUri;
    
    router.push(`/verify/${id}`);
  };

  return (
    <Container>
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-black">Public Verification</h1>
        <p className="mt-4 text-[color:var(--muted)]">
          Paste a SuID URI or Verification Hash to check the authenticity of a career record.
        </p>

        <Card className="mt-10 text-left">
          <CardContent className="pt-6">
            <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="e.g. suid://verify/7f3k"
                value={suidUri}
                onChange={(e) => setSuidUri(e.target.value)}
                required
                className="flex-1 border-2 border-[color:var(--border)] p-3 outline-none focus:border-[color:var(--primary)] transition-colors bg-white font-mono text-sm"
              />
              <Button type="submit" variant="primary">
                Verify Record
              </Button>
            </form>
            <div className="mt-4 text-xs text-[color:var(--muted)]">
              Try testing with: <button type="button" onClick={() => setSuidUri("suid://verify/7f3k")} className="underline text-[color:var(--primary)] hover:text-[color:var(--primary)]/80 font-bold">suid://verify/7f3k</button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
