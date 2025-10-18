import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function askGemini(question, knowledgeBase) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const contextText = knowledgeBase.map(file =>
      `[File: ${file.name}, Type: ${file.type}]\n${file.content}`
    ).join('\n\n');

    const fullPrompt = `You are a helpful assistant. Use the following context documents to answer the question. 
If the required information is NOT found in the documents, you MUST respond with the exact phrase: "Information not found in documents." 

--- KNOWLEDGE BASE START ---
${contextText}
--- KNOWLEDGE BASE END ---

Question: ${question}`;

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: fullPrompt }]
        }
      ],
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 2048
      }
    });

    const response = await result.response;
    const responseText = response.text().trim();

    if (responseText.length > 0) {
      return responseText;
    } else {
      const safetyReason = result.candidates?.[0]?.finishReason;
      if (safetyReason === 'SAFETY' || safetyReason === 'RECITATION') {
        return "The content was blocked due to safety guidelines. Please try rephrasing your question.";
      }
      return "Model Response Error: No answer generated.";
    }

  } catch (error) {
    console.error("Error calling Generative AI:", error);
    return "!!! API CALL FAILED: Check API key or network status in console !!!";
  }
}