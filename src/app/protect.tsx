"use client";

import lsKeys from "@/constants/lsKeys";
import useAuth from "@/hooks/useAuth";
import checkIsTokenExpired from "@/utils/checkIsTokenExpired";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SecureLS from "secure-ls";

interface props {
  protectedRoutes?: string[];
  children: React.ReactNode;
}

const PrivatRoute = ({ protectedRoutes, children }: props) => {
  const router = useRouter();
  const pathname = usePathname();
  const pathIsProtected = protectedRoutes?.indexOf(pathname!) !== -1;
  const [isProcessing, setIsProcessing] = useState(true);

  const {} = useAuth();

  useEffect(() => {
    const ls = new SecureLS();
    let tokenParams = ls.get(lsKeys.auth);
    if (
      checkIsTokenExpired(tokenParams?.token?.expires_at) &&
      pathIsProtected
    ) {
      router.replace("/login");
    } else {
      setIsProcessing(false);
    }
  }, [pathIsProtected, router]);

  if (isProcessing && pathIsProtected) return "loading";

  return <>{children}</>;
};

export default PrivatRoute;
