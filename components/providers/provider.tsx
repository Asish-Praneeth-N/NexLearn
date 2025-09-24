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
    if (!isSignedIn || !user) return;

    const userEmail = user.primaryEmailAddress?.emailAddress;

    // Function to check or create a new user
    const checkIsNewUser = async () => {
      try {
        await axios.post("/api/create-user", { user });
      } catch (err) {
        console.error("Error checking or creating user:", err);
      }
    };

    // Skip sign-in or sign-out pages
    if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-out")) return;

    // Non-admin users cannot access analytics
    if (pathname.startsWith("/analytics") && userEmail !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      router.push("/dashboard");
      return;
    }

    // Check if admin user and redirect to analytics if needed
    checkIsNewUser().then(() => {
      if (
        userEmail &&
        userEmail === process.env.NEXT_PUBLIC_ADMIN_EMAIL &&
        !pathname.startsWith("/analytics")
      ) {
        router.push("/analytics");
      }
    });
  }, [isSignedIn, user, router, pathname]);

  return <CourseCountProvider>{children}</CourseCountProvider>;
};

export default Provider;
