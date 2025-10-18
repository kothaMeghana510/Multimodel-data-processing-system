import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";
import Tesseract from "tesseract.js";
const { createFFmpeg, fetchFile } = await import("@ffmpeg/ffmpeg");

// ✅ Set the workerSrc manually (this works in Vite)
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?worker&url";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export const useFileProcessor = () => {
  const [knowledgeBase, setKnowledgeBase] = useState([]);

  const extractText = async (file) => {
    const fileType = file.name.split(".").pop().toLowerCase();

    if (fileType === "pdf") {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      let text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((item) => item.str).join(" ") + "\n";
      }
      
      return text;
    }

    if (fileType === "docx") {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      return result.value;
    }

    if (fileType === "txt") {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsText(file);
      });
    }

    if(["png", "jpg", "jpeg", "webp"].includes(fileType)){
      return new Promise((resolve, reject) => {
        Tesseract.recognize(file, "eng", {
          logger: (m) => console.log("OCR progess:", m),
        })
        .then(({ data: { text } }) => resolve(text))
          .catch((err) => {
            console.error("OCR error:", err);
            resolve("");
        })
      })
    }

    if (["mp4", "webm", "mov"].includes(fileType)) {
  try {
    if (!ffmpeg.isLoaded()) await ffmpeg.load();

    const inputName = `input.${fileType}`;
    const outputName = "output.wav";

    ffmpeg.FS("writeFile", inputName, await fetchFile(file));
    await ffmpeg.run(
      "-i", inputName,
      "-vn", "-acodec", "pcm_s16le",
      "-ar", "16000", "-ac", "1",
      outputName
    );

    const audioData = ffmpeg.FS("readFile", outputName);

    // 🔥 Placeholder: Transcribe audioData using Whisper
    const transcript = "[Transcription placeholder — integrate Whisper here]";
    return transcript;
  } catch (err) {
    console.error("FFmpeg error:", err);
    return "[Video processing failed]";
  }
}

    return "";
  };

  const handleFile = async (file) => {
    const text = await extractText(file);
    setKnowledgeBase((prev) => [
      ...prev,
      { name: file.name,
        type: file.type, 
        content: text,
      },
    ]);
  };

  return { knowledgeBase, handleFile };
};







// import { useState } from "react";
// import * as pdfjsLib from "pdfjs-dist";
// import mammoth from "mammoth";
// import Tesseract from "tesseract.js";
// const { createFFmpeg, fetchFile } = await import("@ffmpeg/ffmpeg");

// // ✅ Set the workerSrc manually (this works in Vite)
// import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?worker&url";
// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

// export const useFileProcessor = () => {
//   const [knowledgeBase, setKnowledgeBase] = useState([]);

//   const extractText = async (file) => {
//     const fileType = file.name.split(".").pop().toLowerCase();

//     if (fileType === "pdf") {
//       const arrayBuffer = await file.arrayBuffer();
//       const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

//       let text = "";
//       for (let i = 1; i <= pdf.numPages; i++) {
//         const page = await pdf.getPage(i);
//         const content = await page.getTextContent();
//         text += content.items.map((item) => item.str).join(" ") + "\n";
//       }
      
//       return text;
//     }

//     if (fileType === "docx") {
//       const arrayBuffer = await file.arrayBuffer();
//       const result = await mammoth.extractRawText({ arrayBuffer });
//       return result.value;
//     }

//     if (fileType === "txt") {
//       return new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.onload = () => resolve(reader.result);
//         reader.readAsText(file);
//       });
//     }

//     if(["png", "jpg", "jpeg", "webp"].includes(fileType)){
//       return new Promise((resolve, reject) => {
//         Tesseract.recognize(file, "eng", {
//           logger: (m) => console.log("OCR progess:", m),
//         })
//         .then(({ data: { text } }) => resolve(text))
//           .catch((err) => {
//             console.error("OCR error:", err);
//             resolve("");
//         })
//       })
//     }

//     if (["mp4", "webm", "mov"].includes(fileType)) {
//   try {
//     if (!ffmpeg.isLoaded()) await ffmpeg.load();

//     const inputName = `input.${fileType}`;
//     const outputName = "output.wav";

//     ffmpeg.FS("writeFile", inputName, await fetchFile(file));
//     await ffmpeg.run(
//       "-i", inputName,
//       "-vn", "-acodec", "pcm_s16le",
//       "-ar", "16000", "-ac", "1",
//       outputName
//     );

//     const audioData = ffmpeg.FS("readFile", outputName);

//     // 🔥 Placeholder: Transcribe audioData using Whisper
//     const transcript = "[Transcription placeholder — integrate Whisper here]";
//     return transcript;
//   } catch (err) {
//     console.error("FFmpeg error:", err);
//     return "[Video processing failed]";
//   }
// }

//     return "";
//   };

//   const handleFile = async (file) => {
//     const text = await extractText(file);
//     setKnowledgeBase((prev) => [
//       ...prev,
//       { name: file.name, type: file.type, content: text },
//     ]);
//   };

//   return { knowledgeBase, handleFile };
// };



