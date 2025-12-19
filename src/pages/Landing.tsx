import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { BookOpen, Zap, FileCheck, Sparkles, TrendingUp, Settings } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              AI Quiz Builder — Generate{" "}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                syllabus-aligned quizzes
              </span>{" "}
              in seconds
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl">
              Enter a topic, choose difficulty and count — we'll create high-quality questions you
              can edit, save and export.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-gradient-hero hover:opacity-90 text-lg">
                <Link to="/generate">Create Quiz</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/help">See Demo Quiz</Link>
              </Button>
            </div>
          </div>
          <div className="relative animate-fade-in">
            <div className="absolute -inset-4 bg-gradient-hero opacity-20 blur-3xl rounded-full"></div>
            <img
              src={heroImage}
              alt="AI Quiz Builder Platform"
              className="relative rounded-2xl shadow-2xl w-full"
            />
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 bg-gradient-card border-primary/10 hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Syllabus-aware</h3>
            <p className="text-muted-foreground">
              Extracts concepts from your topics and maps to learning outcomes for aligned assessment.
            </p>
          </Card>
          <Card className="p-6 bg-gradient-card border-secondary/10 hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Multi-format</h3>
            <p className="text-muted-foreground">
              MCQs, True/False, Short Answer & Explanations. All formats at your fingertips.
            </p>
          </Card>
          <Card className="p-6 bg-gradient-card border-accent/10 hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <FileCheck className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Human-in-the-loop</h3>
            <p className="text-muted-foreground">
              Easily edit and validate questions before export. You're always in control.
            </p>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How it works</h2>
          <p className="text-xl text-muted-foreground">Three simple steps to perfect quizzes</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-hero mx-auto flex items-center justify-center text-white text-2xl font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold">Write topic & choose difficulty</h3>
            <p className="text-muted-foreground">
              Enter your topic and select the question types and difficulty level you need.
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-accent mx-auto flex items-center justify-center text-white text-2xl font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold">Gemini generates questions</h3>
            <p className="text-muted-foreground">
              Our AI analyzes your topic and creates high-quality, syllabus-aligned questions.
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary mx-auto flex items-center justify-center text-white text-2xl font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold">Edit, save, export</h3>
            <p className="text-muted-foreground">
              Review and refine questions, then export to PDF, CSV, or Google Forms.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="p-12 bg-gradient-hero text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to create your first quiz?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join educators worldwide who are saving time and creating better assessments with AI.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg">
            <Link to="/generate">Get Started Now</Link>
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold">AI Quiz Builder</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link to="/dashboard" className="hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link to="/bank" className="hover:text-foreground transition-colors">
                Bank
              </Link>
              <Link to="/help" className="hover:text-foreground transition-colors">
                Help
              </Link>
              <Link to="/settings" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;