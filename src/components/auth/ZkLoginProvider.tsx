"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useToast } from "@/components/ui/Toast";
import { jwtToAddress } from "@mysten/zklogin";

// We use a deterministic salt for the hackathon MVP. In production, this comes from a Salt Service.
const USER_SALT = "123456789101112131415"; 

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
    // 1. Check local storage for existing session
    const storedJwt = localStorage.getItem("suid_zklogin_jwt");
    if (storedJwt) {
      try {
        const address = jwtToAddress(storedJwt, USER_SALT);
        setIsLoggedIn(true);
        setUserAddress(address);
      } catch (err) {
        console.error("Invalid stored JWT:", err);
        localStorage.removeItem("suid_zklogin_jwt");
      }
    }
    setIsLoading(false);

    // 2. Initialize Google Identity Services
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (clientId && typeof window !== "undefined" && (window as any).google) {
      (window as any).google.accounts.id.initialize({
        client_id: clientId,
        callback: (response: any) => {
          try {
            const jwt = response.credential;
            // Generate the true Sui zkLogin address
            const address = jwtToAddress(jwt, USER_SALT);
            
            setIsLoggedIn(true);
            setUserAddress(address);
            localStorage.setItem("suid_zklogin_jwt", jwt);
            toast("Successfully authenticated via zkLogin!", "success");
          } catch (err) {
            console.error(err);
            toast("Failed to parse Google JWT", "error");
          }
        },
      });
    }
  }, [toast]);

  const login = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) {
      toast("Google Client ID is missing. Please set NEXT_PUBLIC_GOOGLE_CLIENT_ID in Vercel.", "error");
      return;
    }

    if (typeof window !== "undefined" && (window as any).google) {
      (window as any).google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          toast("Please disable popup blocker or use the fallback link.", "error");
        }
      });
    } else {
      toast("Google Identity Services failed to load.", "error");
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserAddress(null);
    localStorage.removeItem("suid_zklogin_jwt");
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
