"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

import { SuiJsonRpcClient, getJsonRpcFullnodeUrl } from "@mysten/sui/jsonRpc";
import { Transaction } from "@mysten/sui/transactions";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { decodeSuiPrivateKey } from "@mysten/sui/cryptography";

const PACKAGE_ID = "0x6929ada47f1d3a6ef94a73e0896a99cfc985cb5e878952032ed73592a423137a";

export default function IssuerPortalPage() {
  const [loading, setLoading] = useState(false);
  const [eventName, setEventName] = useState("");
  const [recipient, setRecipient] = useState("");
  const { toast } = useToast();

  const handleIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventName || !recipient) return;
    setLoading(true);

    try {
      const adminKey = process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY;
      if (!adminKey) throw new Error("Admin secret key is missing from environment variables.");

      const { secretKey } = decodeSuiPrivateKey(adminKey);
      const keypair = Ed25519Keypair.fromSecretKey(secretKey);
      const client = new SuiJsonRpcClient({ url: getJsonRpcFullnodeUrl("testnet"), network: "testnet" });

      const tx = new Transaction();
      // Generate a mock hash for the credential ID
      const randomHash = Math.random().toString(16).substring(2, 6);

      tx.moveCall({
        target: `${PACKAGE_ID}::credential::issue_credential`,
        arguments: [
          tx.pure.address(recipient),
          tx.pure.string(randomHash),
          tx.pure.string("Sui Korea Community"), // Hardcoded Issuer for Demo
          tx.pure.string(eventName), // Credential Type
          tx.pure.string("https://suid.app/metadata/" + randomHash),
        ],
      });

      const res = await client.signAndExecuteTransaction({
        signer: keypair,
        transaction: tx,
        options: {
          showEffects: true,
          showEvents: true,
        },
      });

      console.log("Transaction Result:", res);
      toast(`Credential issued successfully on Testnet! Hash: ${randomHash}`, "success");
      setEventName("");
      setRecipient("");
    } catch (err: any) {
      console.error(err);
      toast("Transaction failed: " + err.message, "error");
    } finally {
      setLoading(false);
    }
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
            <h2 className="text-2xl font-bold">Issue On-Chain Credential</h2>
            <p className="text-sm text-[color:var(--muted)]">Powered by Sui Testnet</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleIssue} className="grid gap-6">
              <div className="grid gap-2">
                <label className="font-bold text-sm">Recipient Address (Sui)</label>
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
                Execute Transaction
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
