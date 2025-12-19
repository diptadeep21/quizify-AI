import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Trash2, Download, Plus } from "lucide-react";

// Mock data
const mockQuestions = [
  {
    id: "q1",
    type: "MCQ",
    difficulty: "Medium",
    questionText: "What is the primary function of chlorophyll in photosynthesis?",
    tags: ["photosynthesis", "chlorophyll"],
    created: "2025-10-05",
  },
  {
    id: "q2",
    type: "True/False",
    difficulty: "Easy",
    questionText: "Photosynthesis occurs only in the presence of sunlight.",
    tags: ["photosynthesis", "light-reactions"],
    created: "2025-10-05",
  },
  {
    id: "q3",
    type: "Short Answer",
    difficulty: "Hard",
    questionText: "Explain the role of stomata in photosynthesis.",
    tags: ["stomata", "gas-exchange"],
    created: "2025-10-04",
  },
  {
    id: "q4",
    type: "MCQ",
    difficulty: "Easy",
    questionText: "Which algorithm has O(n log n) time complexity?",
    tags: ["algorithms", "complexity"],
    created: "2025-10-04",
  },
];

const Bank = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);

  const filteredQuestions = mockQuestions.filter((q) => {
    const matchesSearch = q.questionText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === "all" || q.type === typeFilter;
    const matchesDifficulty = difficultyFilter === "all" || q.difficulty === difficultyFilter;
    return matchesSearch && matchesType && matchesDifficulty;
  });

  const toggleQuestionSelection = (id: string) => {
    setSelectedQuestions((prev) =>
      prev.includes(id) ? prev.filter((qid) => qid !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedQuestions.length === filteredQuestions.length) {
      setSelectedQuestions([]);
    } else {
      setSelectedQuestions(filteredQuestions.map((q) => q.id));
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Question Bank</h1>
          <p className="text-muted-foreground text-lg">
            Browse, filter, and manage your saved questions
          </p>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6 animate-fade-in">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search questions or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="MCQ">MCQ</SelectItem>
                <SelectItem value="True/False">True/False</SelectItem>
                <SelectItem value="Short Answer">Short Answer</SelectItem>
              </SelectContent>
            </Select>
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Difficulties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Bulk Actions */}
        {selectedQuestions.length > 0 && (
          <Card className="p-4 mb-6 bg-primary/5 border-primary/20 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedQuestions.length} question(s) selected
              </span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-1" />
                  Add to Quiz
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
                <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive/10">
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Questions List */}
        <div className="space-y-4 animate-fade-in">
          {filteredQuestions.length > 0 ? (
            <>
              <div className="flex items-center gap-2 mb-4">
                <Checkbox
                  checked={selectedQuestions.length === filteredQuestions.length}
                  onCheckedChange={selectAll}
                />
                <span className="text-sm text-muted-foreground">Select all</span>
              </div>
              {filteredQuestions.map((question) => (
                <Card key={question.id} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={selectedQuestions.includes(question.id)}
                      onCheckedChange={() => toggleQuestionSelection(question.id)}
                      className="mt-1"
                    />
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <p className="text-lg font-medium flex-1">{question.questionText}</p>
                        <div className="flex gap-2">
                          <Badge variant="outline">{question.type}</Badge>
                          <Badge variant="outline" className={getDifficultyColor(question.difficulty)}>
                            {question.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {question.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">Created: {question.created}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </>
          ) : (
            <Card className="p-12 text-center">
              <Filter className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No questions found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search terms
              </p>
              <Button variant="outline" onClick={() => {
                setSearchTerm("");
                setTypeFilter("all");
                setDifficultyFilter("all");
              }}>
                Clear Filters
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bank;