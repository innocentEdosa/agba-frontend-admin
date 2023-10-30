"use client";

import queryClient from "@/api/queryClient";
import { ResponsiveContextWrapper } from "@/contexts";
import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import PrivatRoute from "./protect";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <PrivatRoute protectedRoutes={["/dashboard", "/courses"]}>
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
          {children}
        </ResponsiveContextWrapper>
      </PrivatRoute>
    </QueryClientProvider>
  );
};

export default Providers;
