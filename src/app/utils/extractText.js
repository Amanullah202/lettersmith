// src/app/utils/extractText.js

import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";

// set the PDF worker (browser-safe)
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export async function extractTextFromFile(file) {
  const type = file.type;
  const isPDF = type === "application/pdf";
  const isDOCX =
    type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  if (!isPDF && !isDOCX) {
    return {
      text: "",
      error: "Unsupported file format. Only PDF and DOCX are supported.",
    };
  }

  try {
    const buffer = await file.arrayBuffer();

    if (isPDF) {
      const loadingTask = pdfjsLib.getDocument({ data: buffer });
      const pdf = await loadingTask.promise;

      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map((item) => item.str).join(" ");
        fullText += strings + "\n";
      }

      if (!fullText.trim()) {
        return {
          text: "",
          error:
            "Parsing succeeded but no readable text was found in the PDF. It may contain scanned images or protected layers.",
        };
      }

      return { text: fullText.trim(), error: null };
    }

    if (isDOCX) {
      const result = await mammoth.extractRawText({ arrayBuffer: buffer });

      if (!result.value.trim()) {
        return {
          text: "",
          error:
            "DOCX parsed but no text was extracted. File might be encrypted or empty.",
        };
      }

      return { text: result.value.trim(), error: null };
    }

    return { text: "", error: "Unhandled file type." };
  } catch (err) {
    console.error("Parsing error:", err);
    return {
      text: "",
      error:
        "An unexpected error occurred while parsing the file. Try pasting your CV instead.",
    };
  }
}
