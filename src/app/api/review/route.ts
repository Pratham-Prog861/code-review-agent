import { NextRequest, NextResponse } from "next/server";
import {
  CodeReviewRequest,
  CodeReviewResponse,
  ScaleDownRequest,
  ScaleDownResponse,
} from "@/lib/types";
import { LANGUAGE_CONTEXTS, REVIEW_DEPTH_INSTRUCTIONS } from "@/lib/constants";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SCALEDOWN_API_URL = "https://api.scaledown.xyz/compress/raw";

export async function POST(req: NextRequest) {
  try {
    const body: CodeReviewRequest = await req.json();
    const { code, language, depth, useCompression } = body;

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    const languageContext =
      LANGUAGE_CONTEXTS[language.toLowerCase()] || LANGUAGE_CONTEXTS.javascript;
    const depthInstruction =
      REVIEW_DEPTH_INSTRUCTIONS[depth] || REVIEW_DEPTH_INSTRUCTIONS.standard;

    const context = `
${languageContext}

REVIEW DEPTH: ${depth}
${depthInstruction}

OUTPUT FORMAT:
Return a JSON object with:
- "issues": Array of objects { "line": number | null, "message": "string", "severity": "critical"|"warning"|"info"|"suggestion", "suggestion": "string" }
- "qualityScore": number (0-100)
- "summary": "string"

Analyze the following code:
`;

    let compressedContext = context;
    let originalTokens = Math.ceil(context.length / 4);
    let compressedTokens = originalTokens;

    const scaledownApiKey = process.env.SCALEDOWN_API_KEY;

    if (useCompression && scaledownApiKey) {
      try {
        const scaledownRequest: ScaleDownRequest & { model?: string } = {
          context: context,
          prompt: code,
          scaledown: {
            rate: "auto",
          },
        };

        scaledownRequest.model = "gpt-4o";

        const response = await fetch(SCALEDOWN_API_URL, {
          method: "POST",
          headers: {
            "x-api-key": scaledownApiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(scaledownRequest),
        });

        if (response.ok) {
          const result: ScaleDownResponse = await response.json();
          console.log(
            "ScaleDown API Response:",
            JSON.stringify(result, null, 2),
          );

          const compressed =
            result.compressed_prompt ||
            (result as unknown as Record<string, unknown>).compressed_context ||
            (result as unknown as Record<string, unknown>).output ||
            (result as unknown as Record<string, unknown>).result;

          if (compressed && typeof compressed === "string") {
            compressedContext = compressed;
            originalTokens =
              result.original_prompt_tokens ||
              result.prompt_tokens ||
              originalTokens;
            compressedTokens =
              result.compressed_prompt_tokens ||
              result.completion_tokens ||
              Math.ceil(compressed.length / 4);
            console.log("✓ ScaleDown compression successful");
          } else {
            console.warn(
              "ScaleDown did not return valid compressed prompt. Using original context.",
            );
          }
        } else {
          const errorText = await response.text();
          console.warn(
            "ScaleDown API Error:",
            errorText,
            "- Proceeding without compression",
          );
        }
      } catch (error) {
        console.warn(
          "ScaleDown compression failed:",
          error,
          "- Proceeding without compression",
        );
      }
    } else {
      console.log(
        "Compression disabled or API key not configured - using original context",
      );
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured" },
        { status: 500 },
      );
    }

    const genAI = new GoogleGenerativeAI(geminiKey);

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are an expert Senior Software Engineer.
      
      CONTEXT (Compressed by ScaleDown):
      ${compressedContext}
      
      TASK:
      Review the following code based on the context above.
      
      CODE:
      ${code}
      
      OUTPUT FORMAT:
      Return ONLY a raw JSON object (no markdown, no backticks) with this structure:
      {
        "issues": [
          { "line": number, "message": "string", "severity": "critical"|"warning"|"info"|"suggestion", "suggestion": "string" }
        ],
        "qualityScore": number (0-100),
        "summary": "string (concise, 2-3 sentences max)",
        "refactoredCode": "string (ONLY show the key improvements/fixes, NOT the entire code. Show only the critical changes with comments explaining what was fixed)"
      }
      
      IMPORTANT FOR REFACTORED CODE:
      - DO NOT return the entire code
      - Show ONLY the fixed/improved sections
      - Add comments like "// Fixed: ..." to explain changes
      - Keep it concise and focused on actual improvements
      - If no changes needed, return empty string
    `;

    let reviewData;
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();

      text = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      reviewData = JSON.parse(text);
    } catch (error) {
      console.error("Gemini API Error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return NextResponse.json(
        { error: `Gemini API failed: ${errorMessage}` },
        { status: 500 },
      );
    }

    const responseData: CodeReviewResponse = {
      issues: reviewData.issues || [],
      qualityScore: reviewData.qualityScore || 0,
      summary: reviewData.summary || "No summary available.",
      refactoredCode: reviewData.refactoredCode || "",
      stats: {
        originalTokens: originalTokens,
        compressedTokens: compressedTokens,
        savingsPercentage:
          originalTokens > 0
            ? Math.round(
                ((originalTokens - compressedTokens) / originalTokens) * 100,
              )
            : 0,
        costSavings: 0,
      },
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("API Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Internal Server Error: ${errorMessage}` },
      { status: 500 },
    );
  }
}
