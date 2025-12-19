import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, CheckCircle2, Circle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateQuiz } from "@/api"; // ✅ Use api.ts

interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
}

interface QuizResult {
  questionIndex: number;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation?: string;
}

const Generate = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState<string | null>(null);
  const [parsedQuiz, setParsedQuiz] = useState<QuizQuestion[] | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);

  const [formData, setFormData] = useState({
    topic: "",
    count: 10,
    difficulty: "Medium",
  });

  const parseQuizData = (quizText: string): QuizQuestion[] | null => {
    try {
      // Try to parse the JSON directly
      const parsed = JSON.parse(quizText);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return null;
    } catch (error) {
      console.error("Failed to parse quiz JSON:", error);
      return null;
    }
  };

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const handleQuizSubmit = () => {
    if (!parsedQuiz) return;

    const results: QuizResult[] = parsedQuiz.map((question, index) => {
      const userAnswer = userAnswers[index] || "";
      const isCorrect = userAnswer === question.answer;
      
      return {
        questionIndex: index,
        userAnswer,
        correctAnswer: question.answer,
        isCorrect,
        explanation: question.explanation
      };
    });

    setQuizResults(results);
    setQuizSubmitted(true);
    
    const correctCount = results.filter(r => r.isCorrect).length;
    const totalQuestions = results.length;
    
    toast({
      title: "Quiz Submitted!",
      description: `You scored ${correctCount}/${totalQuestions} (${Math.round((correctCount/totalQuestions) * 100)}%)`,
    });
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setQuizSubmitted(false);
    setQuizResults([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.topic.trim()) {
      toast({
        title: "Error",
        description: "Please enter a topic to continue.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setGeneratedQuiz(null);
    setParsedQuiz(null);
    setUserAnswers({});
    setQuizSubmitted(false);
    setQuizResults([]);

    try {
      const quizText = await generateQuiz({
        topic: formData.topic,
        difficulty: formData.difficulty,
        numQuestions: formData.count,
      });

      if (!quizText) throw new Error("No quiz generated");

      setGeneratedQuiz(quizText);
      
      // Try to parse the quiz data
      const parsed = parseQuizData(quizText);
      if (parsed) {
        setParsedQuiz(parsed);
      }

      toast({
        title: "Success",
        description: `Generated ${formData.count} questions on '${formData.topic}'`,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to generate quiz. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fillSampleTopic = () => {
    setFormData({
      topic: "Photosynthesis in Plants",
      count: 5,
      difficulty: "Medium",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Generate Quiz Questions</h1>
          <p className="text-muted-foreground text-lg">
            Configure your quiz parameters and let AI create high-quality questions for you.
          </p>
        </div>

        <Card className="p-8 bg-gradient-card animate-fade-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Topic */}
            <div className="space-y-2">
              <Label htmlFor="topic" className="text-base font-semibold">Topic *</Label>
              <Textarea
                id="topic"
                placeholder="e.g., Photosynthesis, Sorting Algorithms"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="min-h-[100px] resize-none"
              />
            </div>

            {/* Number of Questions */}
            <div className="space-y-2">
              <Label htmlFor="count" className="text-base font-semibold">Number of Questions</Label>
              <Input
                id="count"
                type="number"
                min={1}
                max={50}
                value={formData.count}
                onChange={(e) => setFormData({ ...formData, count: parseInt(e.target.value) || 1 })}
              />
            </div>

            {/* Difficulty */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Difficulty</Label>
              <RadioGroup value={formData.difficulty} onValueChange={(val) => setFormData({ ...formData, difficulty: val })}>
                {["Easy", "Medium", "Hard", "Mixed"].map((level) => (
                  <div key={level} className="flex items-center space-x-2">
                    <RadioGroupItem value={level} id={level.toLowerCase()} />
                    <Label htmlFor={level.toLowerCase()} className="font-normal cursor-pointer">{level}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button type="submit" className="flex-1 bg-gradient-hero hover:opacity-90" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating Questions...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Questions
                  </>
                )}
              </Button>
              <Button type="button" variant="outline" onClick={fillSampleTopic}>
                Use sample topic
              </Button>
            </div>
          </form>
        </Card>

        {/* Interactive Quiz */}
        {parsedQuiz && parsedQuiz.length > 0 && !quizSubmitted ? (
          <Card className="p-6 mt-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Interactive Quiz</h2>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                  {parsedQuiz.length} Questions
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {Object.keys(userAnswers).length} of {parsedQuiz.length} answered
              </div>
            </div>
            
            <div className="space-y-6">
              {parsedQuiz.map((question, index) => (
                <Card key={index} className="p-6 border-l-4 border-l-blue-500 bg-gray-50/50">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 leading-relaxed">
                      {question.question}
                    </h3>
                  </div>
                  
                  <div className="ml-11 space-y-3">
                    <RadioGroup
                      value={userAnswers[index] || ""}
                      onValueChange={(value) => handleAnswerSelect(index, value)}
                    >
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all">
                          <RadioGroupItem value={option} id={`q${index}-option${optionIndex}`} />
                          <Label 
                            htmlFor={`q${index}-option${optionIndex}`} 
                            className="flex-1 cursor-pointer text-gray-900"
                          >
                            <span className="font-medium text-gray-700 mr-2">
                              {String.fromCharCode(65 + optionIndex)}.
                            </span>
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <Button 
                onClick={handleQuizSubmit}
                className="bg-gradient-hero hover:opacity-90 px-8 py-3 text-lg"
                disabled={Object.keys(userAnswers).length === 0}
              >
                Submit Quiz
              </Button>
            </div>
          </Card>
        ) : quizSubmitted && quizResults.length > 0 ? (
          <Card className="p-6 mt-8">
            {/* Scorecard */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Quiz Results</h2>
                <Button onClick={resetQuiz} variant="outline" size="sm">
                  Take Quiz Again
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-blue-600">
                    {quizResults.filter(r => r.isCorrect).length}
                  </div>
                  <div className="text-sm text-gray-600">Correct Answers</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-red-600">
                    {quizResults.filter(r => !r.isCorrect).length}
                  </div>
                  <div className="text-sm text-gray-600">Incorrect Answers</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-green-600">
                    {Math.round((quizResults.filter(r => r.isCorrect).length / quizResults.length) * 100)}%
                  </div>
                  <div className="text-sm text-gray-600">Score</div>
                </div>
              </div>
            </div>
            
            {/* Question Results */}
            <div className="space-y-6">
              {quizResults.map((result, index) => {
                const question = parsedQuiz![result.questionIndex];
                return (
                  <Card key={index} className={`p-6 border-l-4 ${
                    result.isCorrect ? 'border-l-green-500 bg-green-50/30' : 'border-l-red-500 bg-red-50/30'
                  }`}>
                    <div className="flex items-start gap-3 mb-4">
                      <div className={`text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
                        result.isCorrect ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {result.questionIndex + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 leading-relaxed">
                        {question.question}
                      </h3>
                    </div>
                    
                    <div className="ml-11 space-y-3">
                      {question.options.map((option, optionIndex) => {
                        const isUserAnswer = option === result.userAnswer;
                        const isCorrectAnswer = option === result.correctAnswer;
                        const isSelected = isUserAnswer;
                        
                        return (
                          <div
                            key={optionIndex}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              isCorrectAnswer
                                ? "bg-green-50 border-green-200 text-green-900"
                                : isSelected && !isCorrectAnswer
                                ? "bg-red-50 border-red-200 text-red-900"
                                : "bg-white border-gray-200"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                                isCorrectAnswer ? "bg-green-500" : isSelected ? "bg-red-500" : "bg-gray-200"
                              }`}>
                                {isCorrectAnswer ? (
                                  <CheckCircle2 className="w-4 h-4 text-white" />
                                ) : isSelected ? (
                                  <Circle className="w-4 h-4 text-white" />
                                ) : (
                                  <Circle className="w-4 h-4 text-gray-500" />
                                )}
                              </div>
                              <span className="font-medium text-gray-700">
                                {String.fromCharCode(65 + optionIndex)}.
                              </span>
                              <span className="text-gray-900">{option}</span>
                              {isCorrectAnswer && (
                                <span className="ml-auto bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                                  Correct Answer
                                </span>
                              )}
                              {isSelected && !isCorrectAnswer && (
                                <span className="ml-auto bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                                  Your Answer
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {result.explanation && (
                      <div className="ml-11 mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">Explanation:</h4>
                        <p className="text-blue-800 text-sm leading-relaxed">{result.explanation}</p>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </Card>
        ) : generatedQuiz ? (
          <Card className="p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Generated Quiz (Raw Format):</h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap overflow-x-auto">
                {generatedQuiz}
              </pre>
            </div>
          </Card>
        ) : null}
      </div>
    </div>
  );
};

export default Generate;
