"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useToast } from "@/components/ui/Toast";

interface ZkLoginContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  userAddress: string | null;
  login: () => void;
  logout: () => void;
}

const ZkLoginContext = createContext<ZkLoginContextType | undefined>(undefined);

export function ZkLoginProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // 1. Check local storage
    const stored = localStorage.getItem("suid_mock_login");
    if (stored === "true") {
      setIsLoggedIn(true);
      setUserAddress("0x3f9...c92a"); // Fixed mock address
    }
    setIsLoading(false);

    // 2. Initialize Google Identity Services
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (clientId && typeof window !== "undefined" && (window as any).google) {
      (window as any).google.accounts.id.initialize({
        client_id: clientId,
        callback: (response: any) => {
          // Triggered when user selects a Google account
          console.log("Google JWT:", response.credential);
          setIsLoggedIn(true);
          setUserAddress("0x3f9...c92a");
          localStorage.setItem("suid_mock_login", "true");
          toast("Successfully logged in with Google!", "success");
        },
      });
    }
  }, [toast]);

  const login = () => {
    if (typeof window !== "undefined" && (window as any).google) {
      // Trigger the Google One Tap / Popup
      (window as any).google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // If popup is blocked, fallback to manual mock
          console.warn("Google popup blocked or skipped, falling back to mock login.");
          setIsLoggedIn(true);
          setUserAddress("0x3f9...c92a");
          localStorage.setItem("suid_mock_login", "true");
          toast("Logged in (Fallback mode)", "success");
        }
      });
    } else {
      // Fallback if script isn't loaded
      setIsLoggedIn(true);
      setUserAddress("0x3f9...c92a");
      localStorage.setItem("suid_mock_login", "true");
      toast("Logged in (Script missing fallback)", "success");
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserAddress(null);
    localStorage.removeItem("suid_mock_login");
    toast("Logged out", "info");
  };

  return (
    <ZkLoginContext.Provider value={{ isLoggedIn, isLoading, userAddress, login, logout }}>
      {children}
    </ZkLoginContext.Provider>
  );
}

export function useZkLogin() {
  const context = useContext(ZkLoginContext);
  if (!context) {
    throw new Error("useZkLogin must be used within a ZkLoginProvider");
  }
  return context;
}
