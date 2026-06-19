import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { ZkLoginProvider } from "@/components/auth/ZkLoginProvider";
import { ToastProvider } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "SuID",
  description:
    "Verified career records, resume PDF issuance, and issuer credentials on Sui.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-[color:var(--foreground)]">
        <Script
          src="https://accounts.google.com/gsi/client"
          async
          defer
          strategy="afterInteractive"
        />
        <div className="nb-fade-up min-h-full flex flex-col">
          <ToastProvider>
            <ZkLoginProvider>{children}</ZkLoginProvider>
          </ToastProvider>
        </div>
      </body>
    </html>
  );
}
