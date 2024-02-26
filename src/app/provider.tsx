"use client";

import { ResponsiveContextWrapper } from "@/contexts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import UserContextWrapper from "@/contexts/user";
import AuthContextWrapper from "@/contexts/auth";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ResponsiveContextWrapper>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <AuthContextWrapper>
          <UserContextWrapper>{children}</UserContextWrapper>
        </AuthContextWrapper>
      </ResponsiveContextWrapper>
    </QueryClientProvider>
  );
};

export default Providers;
