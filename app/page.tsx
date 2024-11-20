// pages/index.tsx
"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const MyApp = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    } else {
      router.push("/auth/signin");
    }
  }, [router]);

  return null;
};

export default MyApp;
