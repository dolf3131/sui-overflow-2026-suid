"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export default function IssuerPortalPage() {
  const [loading, setLoading] = useState(false);
  const [eventName, setEventName] = useState("");
  const [recipient, setRecipient] = useState("");
  const { toast } = useToast();

  const handleIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventName || !recipient) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast(`Credential for "${eventName}" issued to ${recipient}!`, "success");
    setEventName("");
    setRecipient("");
    setLoading(false);
  };

  return (
    <Container>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-black">Issuer Portal</h1>
        <p className="mt-2 text-[color:var(--muted)]">
          Directly issue verified events and certificates to users.
        </p>

        <Card className="mt-10">
          <CardHeader>
            <h2 className="text-2xl font-bold">Issue New Credential</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleIssue} className="grid gap-6">
              <div className="grid gap-2">
                <label className="font-bold text-sm">Recipient Address</label>
                <input
                  type="text"
                  required
                  placeholder="0x..."
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full border-2 border-[color:var(--border)] p-3 outline-none focus:border-[color:var(--primary)] transition-colors bg-[color:var(--surface)]"
                />
              </div>
              <div className="grid gap-2">
                <label className="font-bold text-sm">Event / Certification Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sui Hacker"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-full border-2 border-[color:var(--border)] p-3 outline-none focus:border-[color:var(--primary)] transition-colors bg-[color:var(--surface)]"
                />
              </div>
              <Button type="submit" variant="primary" loading={loading}>
                Issue Credential
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
