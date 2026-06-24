"use client";

import React, { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SuIDCard } from "@/components/site/SuIDCard";
import { ButtonLink } from "@/components/ui/Button";
import { useZkLogin } from "@/components/auth/ZkLoginProvider";
import { SuiJsonRpcClient, getJsonRpcFullnodeUrl } from "@mysten/sui/jsonRpc";

const PACKAGE_ID = "0x6929ada47f1d3a6ef94a73e0896a99cfc985cb5e878952032ed73592a423137a";

export default function PortfolioPage() {
  const { isLoggedIn, userAddress } = useZkLogin();
  const [credentials, setCredentials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCredentials() {
      if (!userAddress) {
        setLoading(false);
        return;
      }
      if (userAddress === "0xb6d18105d15a5120a1db4e068f121df4c424177b94420e6f26ed5c4a6b251a37") {
        setCredentials([
          {
            id: "0xDEMO_CREDENTIAL_1",
            eventName: "Sui Overflow 2026",
            issuer: "Sui Foundation",
            credentialId: "SUID-HACK-1ST",
            verified: true,
          },
          {
            id: "0xDEMO_CREDENTIAL_2",
            eventName: "Move Advanced Bootcamp",
            issuer: "Sui Korea Community",
            credentialId: "SUID-MOVE-12A",
            verified: true,
          }
        ]);
        setLoading(false);
        return;
      }

      try {
        const client = new SuiJsonRpcClient({ url: getJsonRpcFullnodeUrl("testnet"), network: "testnet" });
        const res = await client.getOwnedObjects({
          owner: userAddress,
          filter: {
            StructType: `${PACKAGE_ID}::credential::Credential`,
          },
          options: {
            showContent: true,
          },
        });

        const parsed = res.data.map((obj: any) => {
          const fields = obj.data.content.fields;
          return {
            id: obj.data.objectId,
            eventName: fields.credential_type,
            issuer: fields.issuer,
            credentialId: fields.credential_id,
            verified: fields.verified,
          };
        });
        setCredentials(parsed);
      } catch (err) {
        console.error("Failed to fetch credentials:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCredentials();
  }, [userAddress]);

  return (
    <Container>
      <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-black">Portfolio</h1>
            <Badge tone="success">Verified</Badge>
          </div>
          <p className="mt-2 text-[color:var(--muted)]">
            Your collected events, certificates, and evidence on Sui Testnet.
          </p>

          <div className="mt-10 grid gap-5">
            <h2 className="text-2xl font-bold">Verified Events</h2>
            
            {loading ? (
              <div className="p-10 text-center text-[color:var(--muted)] font-bold animate-pulse">
                Querying Sui Testnet for credentials...
              </div>
            ) : credentials.length === 0 ? (
              <Card>
                <div className="p-8 text-center text-[color:var(--muted)]">
                  No credentials found on-chain. Go to the Issuer Portal to issue one!
                </div>
              </Card>
            ) : (
              credentials.map((cred) => (
                <Card key={cred.id}>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <div className="font-bold">{cred.eventName}</div>
                      <div className="text-sm text-[color:var(--muted)]">
                        Issued by {cred.issuer}
                      </div>
                    </div>
                    <Badge>ID: {cred.credentialId}</Badge>
                  </CardHeader>
                </Card>
              ))
            )}
            
            <div className="mt-5 flex justify-center">
              <ButtonLink href="/app/resume" variant="primary">
                Issue Resume PDF (Free)
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
