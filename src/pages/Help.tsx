import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { BookOpen, Lightbulb, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Help = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navbar />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Help & Documentation</h1>
          <p className="text-xl text-muted-foreground">
            Learn how to get the most out of AI Quiz Builder
          </p>
        </div>

        {/* Quick Guide */}
        <Card className="p-8 mb-8 bg-gradient-card animate-fade-in">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Lightbulb className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">How to write topics for best results</h2>
              <p className="text-muted-foreground mb-4">
                Follow these tips to generate high-quality, relevant questions
              </p>
            </div>
          </div>

          <div className="space-y-4 pl-16">
            <div>
              <h3 className="font-semibold mb-2">✓ Be specific</h3>
              <p className="text-sm text-muted-foreground mb-1">
                Instead of "Biology", use "Photosynthesis in C3 and C4 plants"
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">✓ Include context</h3>
              <p className="text-sm text-muted-foreground mb-1">
                Add level or scope: "Introduction to Sorting Algorithms for undergraduate CS students"
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">✓ Paste syllabus excerpts</h3>
              <p className="text-sm text-muted-foreground mb-1">
                Use the Source Text field in Advanced options to provide detailed context
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">✓ Specify learning outcomes</h3>
              <p className="text-sm text-muted-foreground mb-1">
                "Students should be able to explain the differences between..." helps align questions
              </p>
            </div>
          </div>
        </Card>

        {/* FAQ */}
        <Card className="p-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Can quizzes be graded automatically?</AccordionTrigger>
              <AccordionContent>
                Yes! MCQ and True/False questions can be auto-graded. For Short Answer questions,
                we provide suggested answers that you can use as grading rubrics. When exporting
                to Google Forms, auto-grading can be set up for objective questions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>How accurate are the generated questions?</AccordionTrigger>
              <AccordionContent>
                Our AI uses Gemini's advanced language model to generate high-quality questions.
                However, we always recommend human review (human-in-the-loop) to ensure accuracy
                and alignment with your specific syllabus. The preview and edit feature makes this
                easy.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>What question formats are supported?</AccordionTrigger>
              <AccordionContent>
                We support Multiple Choice Questions (MCQ), True/False, and Short Answer formats.
                Each format includes explanations and is mapped to Bloom's taxonomy levels. You
                can select multiple formats in a single generation session.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>How do I export questions?</AccordionTrigger>
              <AccordionContent>
                After generating and reviewing your questions, click the Export button in the
                preview page. You can export to PDF (with custom headers/footers), CSV (for
                spreadsheets), or directly to Google Forms. The export preserves all formatting
                and explanations.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>Can I save questions to reuse later?</AccordionTrigger>
              <AccordionContent>
                Yes! Use the "Save to Bank" button on any question to add it to your Question Bank.
                From the Bank page, you can search, filter, and organize your saved questions. You
                can also bulk-select questions to create new quizzes or export them.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>What difficulty levels are available?</AccordionTrigger>
              <AccordionContent>
                We offer Easy, Medium, Hard, and Mixed difficulty levels. These map to Bloom's
                taxonomy: Easy focuses on Remember/Understand, Medium on Apply, and Hard on
                Analyze/Evaluate/Create. The Mixed option provides a balanced distribution across
                all levels.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>Is there a limit on question generation?</AccordionTrigger>
              <AccordionContent>
                You can generate 1-50 questions per session. For larger quizzes, we recommend
                breaking them into multiple sessions or topics for better quality and alignment.
                There are no daily limits on generation sessions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger>How do I regenerate a single question?</AccordionTrigger>
              <AccordionContent>
                In the preview page, each question card has a "Regenerate" button. This will
                create a new version of just that question while preserving all others. You can
                regenerate as many times as needed to find the perfect fit.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        {/* Contact */}
        <Card className="p-8 mt-8 bg-gradient-hero text-center animate-fade-in">
          <MessageCircle className="w-12 h-12 mx-auto mb-4 text-white" />
          <h2 className="text-2xl font-bold text-white mb-2">Still have questions?</h2>
          <p className="text-white/90 mb-6">
            We're here to help! Reach out to our support team for assistance.
          </p>
          <Button asChild variant="secondary" size="lg">
            <Link to="/settings">Contact Support</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Help;