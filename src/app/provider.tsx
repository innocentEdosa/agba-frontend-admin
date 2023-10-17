"use client"

import { ResponsiveContextWrapper } from "@/contexts";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ResponsiveContextWrapper>{children}</ResponsiveContextWrapper>;
};

export default Providers;
