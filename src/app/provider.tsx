"use client";

import queryClient from "@/api/queryClient";
import { ResponsiveContextWrapper } from "@/contexts";
import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import PrivatRoute from "./protect";
import UserContextWrapper from "@/contexts/user";
import AuthContextWrapper from "@/contexts/auth";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <PrivatRoute
        protectedRoutes={[
          "/",
          "/courses",
          "/courses/.*",
          "/authors",
          "/authors/.*",
          "/learners*",
          // "/learners/.*",
        ]}>
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
      </PrivatRoute>
    </QueryClientProvider>
  );
};

export default Providers;
