import { AlertCircle, Trash2, BookX, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Problem = () => {
  const problems = [
    {
      icon: Trash2,
      title: "Food Wastage",
      description: "Restaurants and events waste tons of perfectly good food daily while people go hungry.",
      stat: "40% of food produced is wasted globally"
    },
    {
      icon: BookX,
      title: "Unused Books",
      description: "Students discard or leave books unused after exams, creating unnecessary waste.",
      stat: "67% of textbooks are thrown away after use"
    },
    {
      icon: Users,
      title: "Lack of Coordination",
      description: "No organized platform connects surplus donors with NGOs and people in need.",
      stat: "Inefficient manual coordination wastes time & resources"
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-foreground mb-4">The Problem We're Solving</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Understanding the challenges of resource wastage in our communities
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {problems.map((problem, idx) => (
            <Card key={idx} className="shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all">
              <CardHeader>
                <problem.icon className="w-12 h-12 text-primary mb-4" />
                <CardTitle className="text-2xl">{problem.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{problem.description}</p>
                <p className="text-sm font-semibold text-primary bg-accent/50 p-3 rounded-lg">
                  {problem.stat}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-destructive/10 border-l-4 border-destructive p-8 rounded-r-2xl">
          <h2 className="text-2xl font-bold text-foreground mb-4">The Impact of Inaction</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="text-destructive mt-1">•</span>
              <span>Environmental degradation from landfill waste and resource depletion</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-destructive mt-1">•</span>
              <span>Increased hunger and malnutrition in vulnerable communities</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-destructive mt-1">•</span>
              <span>Educational barriers due to lack of affordable learning resources</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-destructive mt-1">•</span>
              <span>Economic losses from discarded usable goods and materials</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Problem;
