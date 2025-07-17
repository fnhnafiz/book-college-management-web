"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PrivateRoutes({ children }) {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.email) {
      router.replace("/login");
    }
  }, [router]);

  return children;
}
