type GenerateQuizParams = {
  topic: string;
  difficulty: string;
  numQuestions: number;
};

export async function generateQuiz({
  topic,
  difficulty,
  numQuestions,
}: GenerateQuizParams): Promise<string> {
  const response = await fetch("http://localhost:5001/api/generate-quiz", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      topic,
      difficulty,
      numQuestions,
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Failed to generate quiz");
  }

  const data = await response.json();

  return data.quiz;
}
