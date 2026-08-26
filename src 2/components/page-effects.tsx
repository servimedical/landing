"use client";

import { siteConfig } from "@/lib/constants";
import { useNavSpy, useReveal } from "@/lib/hooks/use-interactions";

export function PageEffects() {
  useReveal();
  useNavSpy(siteConfig.spySections);
  return null;
}
