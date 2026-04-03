"use client";

import { DevModeProvider } from "@/contexts/DevModeContext";

export default function DevModeProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DevModeProvider>{children}</DevModeProvider>;
}
