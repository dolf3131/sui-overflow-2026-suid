"use client";

import React, { useState, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import jsPDF from "jspdf";
import { toJpeg } from "html-to-image";
import { CheckCircle2, ShieldCheck, Fingerprint } from "lucide-react";

export default function ResumePage() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const templateRef = useRef<HTMLDivElement>(null);

  const handleIssuePDF = async () => {
    if (!templateRef.current) return;
    setLoading(true);
    
    try {
      // Small artificial delay for UX
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const element = templateRef.current;
      
      // Use html-to-image to render the DOM natively via SVG foreignObject,
      // avoiding all parsing errors related to modern CSS color spaces (lab, oklch).
      const dataUrl = await toJpeg(element, {
        quality: 1.0,
        pixelRatio: 3, // High resolution
        backgroundColor: "#ffffff",
      });

      // A4 format: 210 x 297 mm
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      // Calculate height based on the template's known aspect ratio (800x1131)
      const pdfHeight = (1131 * pdfWidth) / 800;

      pdf.addImage(dataUrl, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("SuID_Verified_Resume.pdf");

      toast("Premium Resume PDF issued successfully!", "success");
    } catch (err: any) {
      console.error(err);
      toast(`Failed to generate PDF: ${err?.message || "Unknown error"}`, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-black">Resume Issue</h1>
              <Badge tone="primary">Paid Action</Badge>
            </div>
            <p className="mt-2 text-[color:var(--muted)]">
              Pay the 10 USDT issue fee to export your verified career records as a premium PDF.
            </p>
          </div>
          <Button
            variant="primary"
            onClick={handleIssuePDF}
            loading={loading}
            className="w-full sm:w-auto h-14 text-lg px-8 [box-shadow:var(--shadow-lg)]"
          >
            Pay 10 USDT & Issue PDF
          </Button>
        </div>

        {/* 
          We render the exact template here on screen inside a scaled-down container 
          so the user can preview exactly what the PDF will look like.
        */}
        <div className="mt-12 bg-[color:var(--surface)] p-4 sm:p-10 border-2 border-[color:var(--border)] overflow-x-auto [box-shadow:var(--shadow)]">
          <div className="flex justify-center min-w-[800px]">
            {/* THIS IS THE DOM NODE HTML2CANVAS WILL CAPTURE */}
            <div 
              ref={templateRef} 
              className="relative w-[800px] h-[1131px] bg-white text-black p-12 flex flex-col box-border border border-gray-200"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {/* Background Watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                <Fingerprint size={600} strokeWidth={0.5} />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between border-b-4 border-black pb-6 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center bg-black text-white text-2xl font-black">
                    S
                  </div>
                  <div>
                    <div className="text-3xl font-black tracking-tight">SuID PASSPORT</div>
                    <div className="font-mono text-sm tracking-widest text-gray-500 uppercase mt-1">Verified Career Record</div>
                  </div>
                </div>
                <div className="text-right">
                  <ShieldCheck size={48} className="text-black ml-auto" />
                  <div className="font-mono text-[10px] font-bold mt-2">SUID-7F3K-2A91</div>
                </div>
              </div>

              {/* Subject Info */}
              <div className="mt-8 grid grid-cols-2 gap-8 relative z-10">
                <div className="bg-gray-50 p-6 border-2 border-black">
                  <div className="font-mono text-xs font-bold text-gray-500 mb-1">ISSUED TO</div>
                  <div className="text-2xl font-black">Sui Overflow Builder</div>
                  <div className="mt-4 font-mono text-xs font-bold">ADDRESS / IDENTITY</div>
                  <div className="font-mono text-sm">0x3f9...c92a (zkLogin)</div>
                </div>
                <div className="bg-gray-50 p-6 border-2 border-black">
                  <div className="font-mono text-xs font-bold text-gray-500 mb-1">ISSUER NETWORK</div>
                  <div className="text-lg font-bold">Walrus Storage Network</div>
                  <div className="mt-4 font-mono text-xs font-bold">VERIFICATION STATUS</div>
                  <div className="flex items-center gap-2 font-mono text-sm font-bold text-green-600 mt-1">
                    <CheckCircle2 size={18} /> Valid Signature
                  </div>
                </div>
              </div>

              {/* Verified Events List */}
              <div className="mt-12 flex-1 relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <h3 className="text-xl font-black tracking-widest uppercase">Verified Records</h3>
                  <div className="h-[2px] flex-1 bg-black opacity-20"></div>
                </div>

                <div className="grid gap-6">
                  {/* Event 1 */}
                  <div className="flex items-center gap-6 p-6 border-2 border-gray-200 relative overflow-hidden bg-white">
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-green-500"></div>
                    <div className="flex-1 pl-4">
                      <div className="text-sm font-bold text-gray-500 mb-1">SUI FOUNDATION</div>
                      <div className="text-2xl font-black">Sui Builder House Seoul</div>
                      <div className="text-lg text-gray-600 mt-1">Hackathon Participant</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 border border-green-200 font-bold text-xs uppercase tracking-wider mb-2">
                        <CheckCircle2 size={14} /> Verified
                      </div>
                      <div className="font-mono text-[10px] text-gray-400">TX: 0x8a92...1f8c</div>
                    </div>
                  </div>

                  {/* Event 2 */}
                  <div className="flex items-center gap-6 p-6 border-2 border-gray-200 relative overflow-hidden bg-white">
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-green-500"></div>
                    <div className="flex-1 pl-4">
                      <div className="text-sm font-bold text-gray-500 mb-1">GLOBAL EVENT</div>
                      <div className="text-2xl font-black">Web3 Global Conference</div>
                      <div className="text-lg text-gray-600 mt-1">Guest Speaker</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 border border-green-200 font-bold text-xs uppercase tracking-wider mb-2">
                        <CheckCircle2 size={14} /> Verified
                      </div>
                      <div className="font-mono text-[10px] text-gray-400">TX: 0x92f1...3d9a</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-auto pt-8 border-t-4 border-black flex items-end justify-between relative z-10">
                <div>
                  <div className="font-mono text-[10px] font-bold text-gray-500">VERIFY AUTHENTICITY ONLINE AT</div>
                  <div className="font-mono text-sm font-black mt-1">suid://verify/7f3k</div>
                </div>
                
                {/* Mock Barcode Block */}
                <div className="flex flex-col items-end">
                  <div className="flex h-12 gap-[2px]">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-full bg-black"
                        style={{ width: `${Math.random() * 3 + 1}px`, opacity: 0.8 }}
                      />
                    ))}
                  </div>
                  <div className="font-mono text-[8px] mt-2 text-gray-400 tracking-widest">
                    POWERED BY SUI OVERFLOW
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
