"use client";
import React, { useState, useRef, useEffect } from "react";
import Uploader from "./Uploader"; 
const Input = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    prompt: "",
    jobDescription: "",
    cvText: "",
    file: null,
    tone: "",
    language: "",
    length: "",
    style: "",
  });

  const [showUploader, setShowUploader] = useState(false);
  const promptRef = useRef(null);

  useEffect(() => {
    if (promptRef.current) {
      promptRef.current.style.height = "auto";
      promptRef.current.style.height = `${Math.min(
        promptRef.current.scrollHeight,
        10 * 24
      )}px`;
    }
  }, [formData.prompt]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = () => {
    setShowUploader(true);
  };

  const handleUploaderDone = (parsedText) => {
    setFormData((prev) => ({
      ...prev,
      cvText: prev.cvText
        ? prev.cvText.trim() + "\n\n" + parsedText.trim()
        : parsedText.trim(),
    }));
    setShowUploader(false);
  };

  const handleUploaderClose = () => {
    setShowUploader(false);
  };

  const handleSubmit = () => {
    const payload = { ...formData };
    console.log("Submitted Payload:", payload);
    if (onSubmit) onSubmit(payload);
  };

  return (
    <>
      {/* Modal */}
      {showUploader && (
        <Uploader onDone={handleUploaderDone} onClose={handleUploaderClose} />
      )}

      {/* Form */}
      <div className="w-full h-full flex flex-col border border-neutral-300 rounded-lg bg-black text-white">
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Prompt */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Prompt</label>
            <textarea
              name="prompt"
              ref={promptRef}
              value={formData.prompt}
              onChange={handleChange}
              rows={1}
              className="w-full bg-black border border-neutral-600 px-3 py-2 rounded-md resize-none outline-none focus:ring-2 focus:ring-cyan-500 overflow-y-auto max-h-[240px]"
              placeholder="e.g., Write a cover letter for a frontend dev role"
            />
          </div>

          {/* Job Description */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Job Description</label>
            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              rows={5}
              className="w-full bg-black border border-neutral-600 px-3 py-2 rounded-md resize-none outline-none focus:ring-2 focus:ring-cyan-500 overflow-y-auto max-h-[120px]"
              placeholder="Paste job description here..."
            />
          </div>

          {/* CV Text */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Your CV (Text)</label>
            <textarea
              name="cvText"
              value={formData.cvText}
              onChange={handleChange}
              rows={5}
              className="w-full bg-black border border-neutral-600 px-3 py-2 rounded-md resize-none outline-none focus:ring-2 focus:ring-cyan-500 overflow-y-auto max-h-[120px]"
              placeholder="Paste your CV here..."
            />
          </div>

          {/* OR separator */}
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-700" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-black px-2 text-sm text-neutral-500">OR</span>
            </div>
          </div>

          {/* File Upload Button */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">
              Upload CV File (.pdf or .docx)
            </label>
            <button
              onClick={handleFileUpload}
              className="w-full border border-neutral-600 px-4 py-2 rounded-md bg-neutral-800 text-white hover:bg-neutral-700 transition-all duration-150 text-sm"
            >
              Upload File
            </button>
          </div>

          {/* Tone */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Tone</label>
            <select
              name="tone"
              value={formData.tone}
              onChange={handleChange}
              className="w-full bg-black text-white border border-neutral-600 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">Select tone</option>
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="enthusiastic">Enthusiastic</option>
              <option value="friendly">Friendly</option>
            </select>
          </div>

          {/* Language */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Language</label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full bg-black text-white border border-neutral-600 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">Select language</option>
              <option value="english">English</option>
              <option value="urdu">Urdu</option>
              <option value="french">French</option>
            </select>
          </div>

          {/* Length */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Length</label>
            <select
              name="length"
              value={formData.length}
              onChange={handleChange}
              className="w-full bg-black text-white border border-neutral-600 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">Select length</option>
              <option value="short">Short</option>
              <option value="medium">Medium</option>
              <option value="long">Long</option>
            </select>
          </div>

          {/* Style */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Style</label>
            <select
              name="style"
              value={formData.style}
              onChange={handleChange}
              className="w-full bg-black text-white border border-neutral-600 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">Select style</option>
              <option value="minimalist">Minimalist</option>
              <option value="creative">Creative</option>
              <option value="formal">Formal</option>
              <option value="informal">Informal</option>
            </select>
          </div>
        </div>

        {/* Fixed Submit Button */}
        <div className="p-4 border-t border-neutral-800 bg-black">
          <button
            onClick={handleSubmit}
            className="w-full border-4 border-white text-white font-bold py-3 rounded-md hover:bg-white hover:text-black transition-all duration-200 tracking-wide"
          >
            Generate Cover Letter
          </button>
        </div>
      </div>
    </>
  );
};

export default Input;
