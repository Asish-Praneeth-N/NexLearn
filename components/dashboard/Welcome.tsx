"use client";

import { useUser } from "@clerk/nextjs";
import React from "react";
import { motion } from "framer-motion";

const Welcome = () => {
  const { user } = useUser();
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-neutral-900 text-white rounded-2xl shadow-xl relative overflow-hidden border border-neutral-800"
    >
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl pointer-events-none" />
      
      <h1 className="relative text-2xl md:text-4xl font-extrabold mb-2">
        👋 Welcome, {user?.fullName}!
      </h1>
      <p className="relative md:text-lg text-sm text-neutral-400">
        We&apos;re thrilled to have you at the{" "}
        <span className="font-semibold text-white">AI Powered Learning Hub</span>. 🚀   
      </p>
    </motion.div>
  );
};

export default Welcome;
