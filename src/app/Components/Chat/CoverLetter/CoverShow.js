"use client";
import React from "react";
import { motion } from "framer-motion";

const Show = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full border border-neutral-300 rounded-lg p-4 flex flex-col bg-neutral-950 text-white overflow-y-auto"
    >
      <h2 className="text-lg font-semibold mb-4 border-b border-neutral-700 pb-2">
        📄 AI Generated Cover Letter
      </h2>

      {data?.aiMessage ? (
        <div className="whitespace-pre-wrap text-sm leading-relaxed font-mono tracking-wide">
          {data.aiMessage}
        </div>
      ) : data?.error ? (
        <div className="text-red-400 text-sm">{data.error}</div>
      ) : (
        <p className="text-neutral-500 text-sm">Waiting for input...</p>
      )}
    </motion.div>
  );
};

export default Show;
