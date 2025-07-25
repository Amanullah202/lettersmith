"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Uploader = ({ onClose, onDone }) => {
  const [fileName, setFileName] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setStatus("parsing");
    setError("");
    setText("");

    try {
      const { extractTextFromFile } = await import("@/utils/extractText");
      const parsed = await extractTextFromFile(file);
      setText(parsed.text);
      if (parsed.error) setError(parsed.error);
      setStatus("done");
    } catch (err) {
      console.error("❌ Runtime error:", err);
      setError("❌ Something went wrong while reading the file.");
      setStatus("error");
    }
  };

  const handleClose = () => {
    onClose?.(status === "idle" ? "cancelled" : "aborted");
  };

  const handleDone = () => {
    onDone?.(text);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-[95vw] sm:w-[600px] max-h-[90vh] bg-black border border-white p-6 rounded-xl flex flex-col gap-4 overflow-hidden shadow-lg"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          <motion.button
            onClick={handleClose}
            className="absolute top-3 right-4 text-white text-lg font-bold"
            whileHover={{ rotate: 90, scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            ×
          </motion.button>

          <motion.h2
            className="text-white text-xl font-semibold"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Upload a PDF or DOCX file
          </motion.h2>

          {status === "idle" && (
            <motion.input
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              className="block w-full text-sm text-white mt-2 bg-neutral-900 border border-white px-4 py-2 rounded-md cursor-pointer"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          )}

          {(status === "parsing" ||
            status === "done" ||
            status === "error") && (
            <motion.div
              className="text-white text-sm mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="mb-2 font-medium">📄 {fileName}</p>
              {status === "parsing" && (
                <motion.p
                  className="text-cyan-300"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                >
                  Parsing file...
                </motion.p>
              )}
              {error && <p className="text-red-500 font-semibold">{error}</p>}
            </motion.div>
          )}

          {text && status === "done" && (
            <motion.div
              className="flex flex-col gap-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label className="text-xs text-neutral-400">
                (Not meant to be read by humans. Formatting may be broken.)
              </label>
              <textarea
                value={text}
                readOnly
                rows={8}
                className="w-full bg-neutral-900 border border-neutral-700 text-white p-3 rounded-md text-sm resize-none overflow-y-auto"
              />
            </motion.div>
          )}

          <motion.div
            className="mt-auto flex justify-between items-center pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {status !== "idle" && (
              <motion.button
                onClick={handleClose}
                className="text-white px-4 py-2 border border-white rounded-md hover:bg-white hover:text-black"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Discard
              </motion.button>
            )}
            {status === "done" && (
              <motion.button
                onClick={handleDone}
                className="text-black bg-white px-4 py-2 rounded-md font-semibold hover:opacity-90"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Done
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Uploader;
