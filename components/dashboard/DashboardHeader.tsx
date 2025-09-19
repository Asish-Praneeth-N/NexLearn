"use client";

import { UserButton } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const DashboardHeader = () => {
  const [isDashboard, setIsDashboard] = useState(false);

  useEffect(() => {
    const pathname = window.location.pathname;
    setIsDashboard(pathname.endsWith("/dashboard") || pathname.endsWith("/analytics"));
  }, []);

  return (
    <div
      className={`p-5 shadow-md flex ${
        isDashboard ? "justify-end" : "justify-between"
      } items-center bg-white/70 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-50`}
    >
      {!isDashboard && (
        <Link href="/">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-2 items-center cursor-pointer"
          >
            <Image src="/logo.png" width={45} height={45} alt="NexLearn logo" priority />
            <h2 className="font-extrabold text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              NexLearn
            </h2>
          </motion.div>
        </Link>
      )}

      <UserButton
        afterSignOutUrl="/"
        appearance={{
          elements: {
            userButtonAvatarBox: "w-10 h-10 border-2 border-indigo-500 rounded-full shadow-md",
          },
        }}
      />
    </div>
  );
};

export default DashboardHeader;
