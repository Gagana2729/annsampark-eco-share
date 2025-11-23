import { Target, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Objectives = () => {
  const objectives = [
    {
      title: "Unified Donation Platform",
      description: "Create an easy-to-use platform for food, book, and cloth donations accessible to all stakeholders"
    },
    {
      title: "Transparent Tracking System",
      description: "Enable real-time GPS tracking and status updates for all donations from post to delivery"
    },
    {
      title: "Smart Matching Algorithm",
      description: "Automatically match donors with the nearest receivers based on location, need, and availability"
    },
    {
      title: "Community Engagement",
      description: "Encourage sustainable habits and active participation from restaurants, individuals, and NGOs"
    },
    {
      title: "Impact Measurement",
      description: "Provide data analytics and metrics showing environmental and social impact of redistributions"
    },
    {
      title: "Zero-Waste Future",
      description: "Work towards a circular economy where no usable resource goes to waste in our communities"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/20 to-background pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <Target className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-foreground mb-4">Our Objectives</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Clear goals driving our mission towards a sustainable future
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {objectives.map((objective, idx) => (
            <Card key={idx} className="shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all group">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary mt-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xl">{objective.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground pl-9">{objective.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-card p-10 rounded-2xl shadow-[var(--shadow-soft)] text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Expected Outcomes</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-8 text-left">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg text-primary">Short-term (3-6 months)</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Onboard 50+ donors and 25+ receiver NGOs</li>
                <li>• Facilitate 500+ successful redistributions</li>
                <li>• Establish GPS tracking and notification system</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-lg text-primary">Long-term (1-2 years)</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Scale to multiple cities across Karnataka</li>
                <li>• Reduce food waste by 40% in partner locations</li>
                <li>• Create measurable environmental and social impact</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Objectives;
