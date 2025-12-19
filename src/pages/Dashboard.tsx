import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Download, Trash2, Eye, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data
const sessions = [
  {
    id: "session-1",
    topic: "Photosynthesis in Plants",
    questionCount: 10,
    difficulty: "Medium",
    created: "2025-10-05",
  },
  {
    id: "session-2",
    topic: "Sorting Algorithms",
    questionCount: 15,
    difficulty: "Hard",
    created: "2025-10-04",
  },
  {
    id: "session-3",
    topic: "Indian Freedom Movement",
    questionCount: 8,
    difficulty: "Easy",
    created: "2025-10-03",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Track your quiz generation history and analytics
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8 animate-fade-in">
          <Card className="p-6 bg-gradient-card hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Questions</p>
                <p className="text-3xl font-bold">156</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg. Generation Time</p>
                <p className="text-3xl font-bold">8.5s</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-accent" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">This Month</p>
                <p className="text-3xl font-bold">33</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Sessions */}
        <Card className="p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Generation Sessions</h2>
            <Button variant="outline" onClick={() => navigate("/generate")}>
              Create New
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Topic</TableHead>
                  <TableHead className="text-center">Questions</TableHead>
                  <TableHead className="text-center">Difficulty</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessions.map((session) => (
                  <TableRow key={session.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{session.topic}</TableCell>
                    <TableCell className="text-center">{session.questionCount}</TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className={
                          session.difficulty === "Easy"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : session.difficulty === "Medium"
                            ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                            : "bg-red-50 text-red-700 border-red-200"
                        }
                      >
                        {session.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell>{session.created}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigate(`/preview/${session.id}`)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive/10">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;