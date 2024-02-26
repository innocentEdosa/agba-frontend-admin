"use client";

import GeneralLoader from "@/components/GeneralLoader/GeneralLoader";
import lsKeys from "@/constants/lsKeys";
import checkIsTokenExpired from "@/utils/checkIsTokenExpired";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SecureLS from "secure-ls";

interface props {
  protectedRoutes?: string[];
  children: React.ReactNode;
}

const ProtectRoute = ({ children }: props) => {
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(true);
  useEffect(() => {
    const ls = new SecureLS();
    let tokenParams = ls.get(lsKeys.auth);
    if (checkIsTokenExpired(tokenParams?.token?.expires_at)) {
      router.replace("/login");
    } else {
      setIsProcessing(false);
    }
  }, [router]);

  if (isProcessing) return <GeneralLoader />;

  return <>{children}</>;
};

export default ProtectRoute;
