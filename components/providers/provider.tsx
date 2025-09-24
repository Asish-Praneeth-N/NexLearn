"use client";

import React, { ReactNode, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { CourseCountProvider } from "../context/CourseCountContext";

interface ProviderProps {
  children: ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isSignedIn && user) {
      const userEmail = user.primaryEmailAddress?.emailAddress;

      if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-out")) {
        return;
      }

      if (pathname.startsWith("/analytics") && userEmail !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        router.push("/dashboard");
        return;
      }

      CheckIsNewUser().then(() => {
        if (
          userEmail &&
          userEmail === process.env.NEXT_PUBLIC_ADMIN_EMAIL &&
          !pathname.startsWith("/analytics")
        ) {
          router.push("/analytics");
        }
      });
    }
  }, [isSignedIn, user, router, pathname]);

  const CheckIsNewUser = async () => {
    try {
      const res = await axios.post("/api/create-user", { user });
      console.log(res.data);
    } catch (error) {
      console.error("Error checking or creating user:", error);
    }
  };

  return <CourseCountProvider>{children}</CourseCountProvider>;
};

export default Provider;
