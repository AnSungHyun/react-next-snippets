"use client"

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import {useEffect} from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/snippets/1");
  }, []);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
