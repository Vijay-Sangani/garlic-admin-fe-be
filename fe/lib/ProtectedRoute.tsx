"use client";

import { useRouter } from "next/navigation";
import { FC, PropsWithChildren, useEffect } from "react";

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  if (!token) {
    return null;
  }

  return <div>{children}</div>;
};
