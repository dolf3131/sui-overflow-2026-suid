"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SuIDCard } from "@/components/site/SuIDCard";
import { ButtonLink } from "@/components/ui/Button";

export default function PortfolioPage() {
  return (
    <Container>
      <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-black">Portfolio</h1>
            <Badge tone="success">Verified</Badge>
          </div>
          <p className="mt-2 text-[color:var(--muted)]">
            Your collected events, certificates, and evidence on Sui.
          </p>

          <div className="mt-10 grid gap-5">
            <h2 className="text-2xl font-bold">Verified Events</h2>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <div className="font-bold">Sui Builder House Seoul</div>
                  <div className="text-sm text-[color:var(--muted)]">
                    Hackathon Participant
                  </div>
                </div>
                <Badge>0xSui...</Badge>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <div className="font-bold">Web3 Global Conference</div>
                  <div className="text-sm text-[color:var(--muted)]">
                    Speaker
                  </div>
                </div>
                <Badge>0xWeb3...</Badge>
              </CardHeader>
            </Card>
            
            <div className="mt-5 flex justify-center">
              <ButtonLink href="/app/resume" variant="primary">
                Issue Resume PDF
              </ButtonLink>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="sticky top-24">
            <h2 className="mb-4 text-sm font-bold text-[color:var(--muted)]">
              YOUR SUID PASSPORT
            </h2>
            <SuIDCard className="w-full [box-shadow:var(--shadow)]" />
          </div>
        </div>
      </div>
    </Container>
  );
}
