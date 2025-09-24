"use client";

import { UserButton } from "@clerk/nextjs";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";

const DashboardHeader = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div
        className="p-5 shadow-md flex items-center bg-neutral-900 text-white/90 backdrop-blur-md border-b border-neutral-800 sticky top-0 z-50 justify-between"
      >
        {/* Mobile Logo & Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-neutral-800 transition"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link href="/">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-2 items-center cursor-pointer"
            >
              <Image
                src="/logonexbgrm.png"
                width={45}
                height={45}
                alt="NexLearn logo"
                priority
              />
              <h2 className="font-extrabold text-2xl text-white">NexLearn</h2>
            </motion.div>
          </Link>
        </div>

        {/* Desktop User Button */}
        <div className="ml-auto">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox:
                  "w-10 h-10 border-2 border-neutral-500 rounded-full shadow-md",
              },
            }}
          />
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 w-64 h-full bg-neutral-900 z-50 shadow-xl p-5 md:hidden"
          >
            <div className="flex justify-end mb-6">
              <button onClick={() => setIsSidebarOpen(false)} className="p-2 rounded-md hover:bg-neutral-800">
                <X className="w-6 h-6" />
              </button>
            </div>
            <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay background */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default DashboardHeader;
