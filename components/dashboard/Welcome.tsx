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
      transition={{ duration: 0.5 }}
      className="p-8 glass-dark rounded-3xl shadow-2xl relative overflow-hidden border border-white/10 group"
    >
      {/* Animated Background Gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px] -z-10 group-hover:bg-indigo-600/30 transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px] -z-10 group-hover:bg-purple-600/30 transition-colors duration-500" />

      <div className="relative z-10">
        <h1 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight">
          Hello, <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">{user?.fullName}</span> 👋
        </h1>
        <p className="text-base md:text-lg text-gray-400 max-w-2xl">
          Welcome back to your <span className="text-white font-semibold">AI Learning Hub</span>. Ready to master something new today?
        </p>
      </div>
    </motion.div>
  );
};

export default Welcome;
