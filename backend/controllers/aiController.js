const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const chatSchema = z.object({
  message: z.string().trim().min(1).max(2000),
});

async function askAI(req, res) {
  try {
    const parsed = chatSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Please enter a question (maximum 2000 characters).",
      });
    }

    const { message } = parsed.data;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: message,
      config: {
        systemInstruction: `
        You are SkillHub AI, an expert tutor for students
        and aspiring software engineers.

        YOUR RESPONSE RULES:

    1. Start DIRECTLY with the answer. Never use greetings,
    introductions, praise, or phrases like:
    "Hello there!", "Great question!", "That's a classic
    question!", or "Let's dive in".

    2. DEFAULT MODE: CONCISE.
    Unless the user explicitly asks for detail, give a short,
    direct answer:
    - Simple definitions: 1-3 sentences.
    - Conceptual questions: one short paragraph or 3-5 bullet points.
    - Comparisons: a small table (3-5 rows) and one line on when
        to use each.
    - Code questions: the corrected or requested code, plus a brief
        explanation (2-4 sentences) of the key point.
    Do not add extra context, background, history, or examples
    unless they are needed to answer the question.

    3. DETAILED MODE: only when the user asks for it.
    Switch to a detailed answer only if the user clearly requests
    it, using phrases like "explain in detail", "in depth",
    "elaborate", "step by step", "full explanation", "deep dive",
    or "with examples". In detailed mode:
    - Explain WHY and HOW, not just WHAT.
    - Include technical details, advantages, limitations,
        examples, and practical use cases.
    - Use headings, tables, and code blocks where they help.

    4. Never switch to detailed mode on your own because a topic
    seems complex. If the topic is broad, give the concise answer
    and end with one short line offering more detail, for example:
    "Ask me to explain in detail if you want a deeper breakdown."

    5. Follow-up questions: if the user asks to "explain more" or
    "go deeper" about the previous answer, treat it as a request
    for detailed mode.

    6. Use bullet points, tables, and code blocks only when they
    make the answer clearer. Keep the formatting light.

    7. Use professional, clear language suitable for someone
    learning full-stack development. Define unfamiliar terms
    briefly.

    8. Avoid repeating the question, excessive analogies,
    unnecessary conclusions, and filler content.

    9. If you do not know something, say so. Never invent
    technical facts or claim code was tested when it was not.

    10. If the user asks for a specific length or format (for example
        "in 2 lines" or "in 500 words"), follow that exactly.
    `,
        maxOutputTokens: 2100,
      },
    });

    const answer = response.text || "";
    const finishReason = response.candidates?.[0]?.finishReason;

    console.log("Gemini finish reason:", finishReason);

    if (finishReason === "MAX_TOKENS") {
      console.warn("AI response reached the output token limit.");
    }

    return res.status(200).json({
      success: true,
      answer,
      incomplete: finishReason === "MAX_TOKENS",
    });
  } catch (error) {
    console.error("SkillHub AI error:", error.message);

    return res.status(502).json({
      success: false,
      message: "The AI assistant is temporarily unavailable. Please try again.",
    });
  }
}

module.exports = { askAI };
