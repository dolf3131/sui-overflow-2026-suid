"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2, XCircle } from "lucide-react";

export default function VerifyRecordPage() {
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const isValid = id === "7f3k";

  return (
    <Container>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black mb-8">Record Verification</h1>

        {loading ? (
          <div className="flex flex-col items-center justify-center p-20 space-y-4">
            <div className="w-8 h-8 border-4 border-[color:var(--primary)] border-t-transparent rounded-full animate-spin" />
            <p className="font-mono text-sm font-bold text-[color:var(--muted)] animate-pulse">
              Querying Sui network for suid://verify/{id}...
            </p>
          </div>
        ) : (
          <Card className="overflow-hidden">
            <div className={`h-3 w-full ${isValid ? "bg-[color:var(--success)]" : "bg-red-500"}`} />
            <CardContent className="p-8">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold">
                      {isValid ? "Valid Record" : "Record Not Found"}
                    </h2>
                    {isValid ? (
                      <CheckCircle2 className="text-[color:var(--success)]" />
                    ) : (
                      <XCircle className="text-red-500" />
                    )}
                  </div>
                  <p className="mt-2 font-mono text-sm text-[color:var(--muted)]">
                    Hash: SUID-{id.toUpperCase()}-2A91
                  </p>
                </div>
                {isValid && <Badge tone="success">Verified</Badge>}
              </div>

              {isValid ? (
                <div className="mt-8 space-y-6 border-t-2 border-[color:var(--border)] pt-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-bold text-[color:var(--muted)]">SUBJECT</div>
                      <div className="mt-1 font-mono">0x3f9...c92a</div>
                    </div>
                    <div>
                      <div className="font-bold text-[color:var(--muted)]">ISSUER</div>
                      <div className="mt-1 font-mono">Sui Korea Community</div>
                    </div>
                  </div>

                  <div>
                    <div className="font-bold text-[color:var(--muted)] mb-3">VERIFIED EVENTS</div>
                    <ul className="space-y-3">
                      <li className="flex items-center justify-between border-2 border-[color:var(--border)] p-3 bg-white">
                        <span className="font-bold">Sui Builder House Seoul</span>
                        <Badge>Valid</Badge>
                      </li>
                      <li className="flex items-center justify-between border-2 border-[color:var(--border)] p-3 bg-white">
                        <span className="font-bold">Web3 Global Conference</span>
                        <Badge>Valid</Badge>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="mt-8 p-4 bg-red-50 border-2 border-red-200 text-red-600 font-bold text-center">
                  The requested SuID record could not be found or has been revoked.
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </Container>
  );
}
