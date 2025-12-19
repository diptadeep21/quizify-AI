import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Download,
  Save,
  RefreshCw,
  Trash2,
  Edit,
  CheckCircle2,
  ChevronDown,
  FileText,
  Table,
  FileSpreadsheet,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Mock data for demonstration
const mockQuestions = [
  {
    id: "q1",
    type: "mcq",
    difficulty: "Medium",
    questionText: "What is the primary function of chlorophyll in photosynthesis?",
    options: [
      { label: "A", text: "To absorb light energy", isCorrect: true },
      { label: "B", text: "To produce oxygen", isCorrect: false },
      { label: "C", text: "To store glucose", isCorrect: false },
      { label: "D", text: "To transport water", isCorrect: false },
    ],
    correctAnswer: "A",
    explanation: "Chlorophyll absorbs light energy, primarily in the blue and red wavelengths, which powers the photosynthesis process.",
    tags: ["photosynthesis", "chlorophyll", "plant-biology"],
    bloomLevel: "Remember",
    reviewed: false,
  },
  {
    id: "q2",
    type: "tf",
    difficulty: "Easy",
    questionText: "Photosynthesis occurs only in the presence of sunlight.",
    correctAnswer: "True",
    explanation: "Photosynthesis requires light energy to convert carbon dioxide and water into glucose and oxygen.",
    tags: ["photosynthesis", "light-reactions"],
    bloomLevel: "Understand",
    reviewed: false,
  },
  {
    id: "q3",
    type: "short",
    difficulty: "Hard",
    questionText: "Explain the role of stomata in photosynthesis and how they regulate gas exchange.",
    correctAnswer: "Stomata are small pores on leaf surfaces that allow CO2 to enter for photosynthesis and O2 to exit. Guard cells regulate their opening and closing based on environmental conditions.",
    explanation: "Stomata play a crucial role in gas exchange. They open to allow CO2 intake during photosynthesis and close to prevent water loss during hot or dry conditions.",
    tags: ["stomata", "gas-exchange", "plant-anatomy"],
    bloomLevel: "Analyze",
    reviewed: false,
  },
];

const Preview = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [questions, setQuestions] = useState(mockQuestions);
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>(["q1"]);

  const toggleExpanded = (id: string) => {
    setExpandedQuestions((prev) =>
      prev.includes(id) ? prev.filter((qid) => qid !== id) : [...prev, id]
    );
  };

  const handleSaveQuestion = (id: string) => {
    toast({
      title: "Saved to Question Bank",
      description: "Question has been added to your question bank.",
    });
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
    toast({
      title: "Question Deleted",
      description: "Question has been removed from this session.",
    });
  };

  const handleMarkReviewed = (id: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, reviewed: true } : q)));
    toast({
      title: "Marked as Reviewed",
      description: "Question has been marked as reviewed.",
    });
  };

  const handleExport = (format: string) => {
    toast({
      title: `Exporting as ${format}`,
      description: `Your quiz will be exported as ${format} format.`,
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 border-green-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Hard":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "mcq":
        return "MCQ";
      case "tf":
        return "True/False";
      case "short":
        return "Short Answer";
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navbar />

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Preview & Edit Quiz</h1>
              <p className="text-muted-foreground">
                Session ID: {sessionId}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-gradient-hero hover:opacity-90">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => handleExport("PDF")}>
                  <FileText className="w-4 h-4 mr-2" />
                  Export PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("CSV")}>
                  <Table className="w-4 h-4 mr-2" />
                  Export CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("Google Forms")}>
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Export to Google Forms
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Metadata Card */}
          <Card className="p-6 bg-gradient-card">
            <div className="flex flex-wrap gap-4 items-center">
              <div>
                <span className="text-sm text-muted-foreground">Topic:</span>
                <p className="font-semibold">Photosynthesis in Plants</p>
              </div>
              <Separator orientation="vertical" className="h-10" />
              <div>
                <span className="text-sm text-muted-foreground">Questions:</span>
                <p className="font-semibold">{questions.length}</p>
              </div>
              <Separator orientation="vertical" className="h-10" />
              <div>
                <span className="text-sm text-muted-foreground">Difficulty:</span>
                <p className="font-semibold">Mixed</p>
              </div>
              <Separator orientation="vertical" className="h-10" />
              <div>
                <span className="text-sm text-muted-foreground">Types:</span>
                <p className="font-semibold">MCQ, True/False, Short Answer</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Questions List */}
        <div className="space-y-4 animate-fade-in">
          {questions.map((question, index) => (
            <Card key={question.id} className="overflow-hidden">
              <Collapsible
                open={expandedQuestions.includes(question.id)}
                onOpenChange={() => toggleExpanded(question.id)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-lg">Question {index + 1}</span>
                        <Badge variant="outline" className={getDifficultyColor(question.difficulty)}>
                          {getTypeLabel(question.type)} • {question.difficulty}
                        </Badge>
                        {question.reviewed && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Reviewed
                          </Badge>
                        )}
                      </div>
                      <CollapsibleTrigger className="w-full text-left">
                        <p className="text-lg font-medium hover:text-primary transition-colors">
                          {question.questionText}
                        </p>
                      </CollapsibleTrigger>
                    </div>
                  </div>

                  <CollapsibleContent className="space-y-4">
                    {/* Options for MCQ */}
                    {question.type === "mcq" && question.options && (
                      <div className="space-y-2 pl-4">
                        {question.options.map((option) => (
                          <div
                            key={option.label}
                            className={`p-3 rounded-lg border ${
                              option.isCorrect
                                ? "bg-green-50 border-green-200"
                                : "bg-muted/50 border-border"
                            }`}
                          >
                            <span className="font-semibold mr-2">{option.label}.</span>
                            {option.text}
                            {option.isCorrect && (
                              <CheckCircle2 className="w-4 h-4 inline ml-2 text-green-600" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* True/False answer */}
                    {question.type === "tf" && (
                      <div className="pl-4">
                        <div className="p-3 rounded-lg border bg-green-50 border-green-200 inline-block">
                          <span className="font-semibold">Correct Answer:</span> {question.correctAnswer}
                        </div>
                      </div>
                    )}

                    {/* Short Answer */}
                    {question.type === "short" && (
                      <div className="pl-4">
                        <div className="p-4 rounded-lg border bg-muted/50">
                          <span className="font-semibold block mb-2">Suggested Answer:</span>
                          <p className="text-sm">{question.correctAnswer}</p>
                        </div>
                      </div>
                    )}

                    {/* Explanation */}
                    <div className="pl-4">
                      <Collapsible>
                        <CollapsibleTrigger className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
                          <ChevronDown className="w-4 h-4" />
                          Explanation
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2 p-4 rounded-lg bg-accent/10 border border-accent/20">
                          <p className="text-sm">{question.explanation}</p>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pl-4">
                      {question.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      <Badge variant="outline" className="text-xs">
                        Bloom: {question.bloomLevel}
                      </Badge>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSaveQuestion(question.id)}
                      >
                        <Save className="w-4 h-4 mr-1" />
                        Save to Bank
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMarkReviewed(question.id)}
                        disabled={question.reviewed}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        {question.reviewed ? "Reviewed" : "Mark as Reviewed"}
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <RefreshCw className="w-4 h-4 mr-1" />
                        Regenerate
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteQuestion(question.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            </Card>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button variant="outline" className="flex-1" onClick={() => navigate("/generate")}>
            Generate More Questions
          </Button>
          <Button className="flex-1 bg-gradient-hero hover:opacity-90" onClick={() => navigate("/dashboard")}>
            <Save className="w-4 h-4 mr-2" />
            Save Session
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Preview;