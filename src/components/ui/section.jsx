import { cn } from "@/lib/utils";
import React from "react";

export function SectionTitle({ children, className }) {
  return (
    <h1 className={cn("font-semibold text-3xl text-green-600", className)}>
      {children}
    </h1>
  );
}

export function SectionSubtitle({ children, className }) {
  return (
    <h1 className={cn("font-semibold text-xl text-green-600 mt-6", className)}>
      {children}
    </h1>
  );
}
