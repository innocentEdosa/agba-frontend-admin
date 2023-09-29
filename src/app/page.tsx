"use client"

import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import { Button, Input, Select, Textarea } from "@/atoms";
import { ButtonGenre, ButtonVariant } from "@/atoms/Button";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={styles.main}>
      <Button genre={ButtonGenre.Text} variant={ButtonVariant.Primary}>
        Hello
      </Button>
      <Input label="hello" placeholder="hello bro" />
      <Textarea label="hello" placeholder="yes bro" />
      <Select
        name=""
        onBlur={() => {}}
        onChange={() => {}}
        placeholder="select..."
        label="le"
        options={[
          { label: "label1", value: "vaue1" },
          { label: "label2", value: "vaue2" },
        ]}
      />
    </main>
  );
}
