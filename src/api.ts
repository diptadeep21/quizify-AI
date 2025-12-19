// src/api.ts

export interface GenerateQuizParams {
    topic: string;
    difficulty: string;
    numQuestions: number;
  }
  
  export interface GenerateQuizResponse {
    quiz: string;
  }
  
  /**
   * Calls the backend API to generate a quiz using Google Gemini.
   */
  export async function generateQuiz(params: GenerateQuizParams): Promise<string | null> {
    try {
      // Use the Vite proxy path: "/api/generate-quiz"
      const response = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          "Failed to generate quiz. Status:",
          response.status,
          "Message:",
          errorText
        );
        return null;
      }
  
      const data: GenerateQuizResponse = await response.json();
      return data.quiz ?? null;
    } catch (err) {
      console.error("Error fetching quiz:", err);
      return null;
    }
  }
  