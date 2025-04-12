import React from "react";
import { motion } from "framer-motion";

export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-[#0A6847] to-[#7ABA78]">
      {/* Spinner */}
      <motion.div
        className="w-24 h-24 border-8 border-[#F6E9B2] border-t-[#F3CA52] rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
      />

      {/* Loading text with animation */}
      <motion.h1
        className="mt-8 text-3xl font-bold text-[#F6E9B2] font-mono"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Loading, please wait...
      </motion.h1>

      {/* Moving dots */}
      <motion.div
        className="flex space-x-2 mt-4"
        variants={{
          animate: {
            transition: {
              repeat: Infinity,
              staggerChildren: 0.2,
            },
          },
        }}
        animate="animate"
      >
        {[...Array(3)].map((_, i) => (
          <motion.span
            key={i}
            className="w-3 h-3 bg-[#F3CA52] rounded-full"
            variants={{
              animate: {
                y: [0, -10, 0],
              },
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
