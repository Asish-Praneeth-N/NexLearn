'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <motion.div
          className="absolute w-32 h-32 border-4 border-t-indigo-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner Ring */}
        <motion.div
          className="absolute w-24 h-24 border-4 border-t-transparent border-r-indigo-400 border-b-transparent border-l-purple-400 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Center Pulse */}
        <motion.div
          className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full blur-md"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute text-white font-bold text-xl z-10">AI</div>
      </div>
    </div>
  );
}
