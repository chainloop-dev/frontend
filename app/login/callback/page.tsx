"use client";

import { useEffect } from "react";
import { useAuth } from "@contexts/auth";
import { useRouter } from "next/navigation";

export default function Component() {
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    const token = params.get("t");
    if (token == null) {
      return console.warn("token not found");
    }

    login(token);
    router.push("/dashboard");
  }, [login, router]);

  return "";
}
