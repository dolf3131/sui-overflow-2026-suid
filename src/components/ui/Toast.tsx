"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ToastContextType {
  toast: (message: string, type?: "success" | "error" | "info") => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<"success" | "error" | "info">("info");

  const toast = (msg: string, t: "success" | "error" | "info" = "info") => {
    setMessage(msg);
    setType(t);
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {message && (
        <div className="fixed bottom-4 right-4 z-50 rounded-md bg-[color:var(--foreground)] px-4 py-3 text-sm text-[color:var(--background)] shadow-lg transition-all animate-in slide-in-from-bottom-5">
          {message}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
