"use client";
import React, { useState } from "react";
import Input from "./CoverInput";
import Show from "./CoverShow";

const CoverletterFinal = () => {
  const [inputData, setInputData] = useState(null);

  const handleSubmit = (data) => {
    console.log("Received from Input:", data);
    setInputData(data);
  };

  return (
    <div className="w-full" style={{ height: "calc(100vh - 80px)" }}>
      <div className="w-full h-full flex flex-col md:flex-row gap-6 px-6 py-6">
        {/* Left panel */}
        <div className="w-full md:w-1/2 h-full flex flex-col">
          <Show data={inputData} />
        </div>

        {/* Right panel */}
        <div className="w-full md:w-1/2 h-full flex flex-col">
          <Input onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default CoverletterFinal;
