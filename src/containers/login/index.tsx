"use client";

import { Button, TextField } from "@/atoms";
import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import styles from "./login.module.css";
import { Direction } from "@/types";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/api/hooks/mutations/auth";
import { toast } from "react-toastify";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { mutate } = useLoginMutation();
  const { handleLoginsuccess } = useAuth();
  const router = useRouter();

  const onSubmit = (data: FieldValues) => {
    const params: {
      identifier: string;
      password: string;
      shouldRemember: boolean;
    } = {
      ...(data as { identifier: string; password: string }),
      shouldRemember: true,
    };
    mutate(params, {
      onSuccess: (res: { token: { token: string; expires_at: string } }) => {
        toast("Login successful", {
          type: toast.TYPE.SUCCESS,
          progress: 0.5,
        });
        handleLoginsuccess(res);
        router.push("/");
      },
    });
  };

  return (
    <div className={styles.wrapper}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="email"
          type="email"
          {...register("identifier")}
          direction={Direction.Vertical}
        />
        <TextField
          type="password"
          label="password"
          {...register("password")}
          direction={Direction.Vertical}
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
