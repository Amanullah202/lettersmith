"use client";
import React, { useState } from "react";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF or DOCX files are allowed.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      file,
    }));
  };

  const handleSubmit = () => {
    const payload = {
      ...formData,
    };

    console.log("Submitted Payload:", payload);

    if (onSubmit) {
      onSubmit(payload);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 p-4 border border-neutral-300 rounded-lg overflow-y-auto text-white">
      {/* Prompt */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Prompt</label>
        <input
          name="prompt"
          type="text"
          value={formData.prompt}
          onChange={handleChange}
          className="w-full bg-black border border-neutral-600 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="e.g., Write a cover letter for a frontend dev role"
        />
      </div>

      {/* Job Description */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Job Description</label>
        <textarea
          name="jobDescription"
          rows="4"
          value={formData.jobDescription}
          onChange={handleChange}
          className="w-full bg-black border border-neutral-600 px-3 py-2 rounded-md resize-none outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Paste job description here..."
        />
      </div>

      {/* CV Text */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Your CV (Text)</label>
        <textarea
          name="cvText"
          rows="6"
          value={formData.cvText}
          onChange={handleChange}
          className="w-full bg-black border border-neutral-600 px-3 py-2 rounded-md resize-none outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Paste your CV here..."
        />
      </div>

      {/* OR Separator */}
      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-neutral-700" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-black px-2 text-sm text-neutral-500">OR</span>
        </div>
      </div>

      {/* File Upload */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">
          Upload CV File (.pdf or .docx)
        </label>
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          className="w-full text-sm text-white bg-black border border-neutral-600 file:border-0 file:rounded-md file:px-4 file:py-2 file:bg-neutral-700 hover:file:bg-neutral-600 cursor-pointer"
        />
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

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="mt-4 w-full border-4 border-white text-white font-bold py-3 rounded-md hover:bg-white hover:text-black transition-all duration-200 tracking-wide"
      >
        Generate Cover Letter
      </button>
    </div>
  );
};

export default Input;
