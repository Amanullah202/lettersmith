"use client";
import React, { useState } from "react";
import { extractTextFromFile } from "@/utils/extractText";

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
      const result = await extractTextFromFile(file);

      if (result.error) {
        setError(`❌ ${result.error}`);
        setStatus("error");
        return;
      }

      if (!result.text || result.text.length < 5) {
        setError("❌ File parsed, but not enough readable text found.");
        setStatus("error");
        return;
      }

      setText(result.text);
      setStatus("done");
    } catch (err) {
      console.error(err);
      setError("❌ Parsing failed. Try pasting your CV manually.");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60">
      <div className="relative w-[95vw] sm:w-[600px] max-h-[90vh] bg-black border border-white p-6 rounded-xl flex flex-col gap-4 overflow-hidden shadow-lg">
        <button
          onClick={handleClose}
          className="absolute top-3 right-4 text-white text-lg hover:text-red-500 font-bold"
        >
          ×
        </button>

        <h2 className="text-white text-xl font-semibold">
          Upload a PDF or DOCX file
        </h2>

        {status === "idle" && (
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            className="block w-full text-sm text-white mt-2 bg-neutral-900 border border-white px-4 py-2 rounded-md cursor-pointer"
          />
        )}

        {(status === "parsing" || status === "done" || status === "error") && (
          <div className="text-white text-sm mt-2">
            <p className="mb-2 font-medium">📄 {fileName}</p>
            {status === "parsing" && (
              <p className="text-cyan-300 animate-pulse">Parsing file...</p>
            )}
            {error && <p className="text-red-500 font-semibold">{error}</p>}
          </div>
        )}

        {text && status === "done" && (
          <div className="flex flex-col gap-2">
            <label className="text-xs text-neutral-400">
              (Not meant to be read by humans. Formatting may be broken.)
            </label>
            <textarea
              value={text}
              readOnly
              rows={8}
              className="w-full bg-neutral-900 border border-neutral-700 text-white p-3 rounded-md text-sm resize-none overflow-y-auto"
            />
          </div>
        )}

        <div className="mt-auto flex justify-between items-center pt-4">
          {status !== "idle" && (
            <button
              onClick={handleClose}
              className="text-white px-4 py-2 border border-white rounded-md hover:bg-white hover:text-black transition-all duration-150"
            >
              Discard
            </button>
          )}
          {status === "done" && (
            <button
              onClick={handleDone}
              className="text-black bg-white px-4 py-2 rounded-md font-semibold hover:opacity-90 transition-all duration-150"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Uploader;
