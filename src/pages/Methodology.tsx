import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Methodology = () => {
  const steps = [
    {
      number: "01",
      title: "Donor Registration & Posting",
      description: "Donor registers on the platform and posts details of food, books, or clothes with quantity, condition, and GPS location"
    },
    {
      number: "02",
      title: "Smart Matching System",
      description: "Algorithm matches the donation with the nearest verified receiver (NGO/charity) based on location, need, and capacity"
    },
    {
      number: "03",
      title: "Notification & Confirmation",
      description: "Receiver gets instant popup notification. First-come-first-served basis. Receiver accepts or declines the request"
    },
    {
      number: "04",
      title: "Delivery Coordination",
      description: "Upon confirmation, delivery partner is assigned or receiver arranges pickup. GPS tracking enabled for transparency"
    },
    {
      number: "05",
      title: "Real-Time Tracking",
      description: "Both parties can track donation status: Pending → In Transit → Delivered. Expiry timers for food donations ensure urgency"
    },
    {
      number: "06",
      title: "Confirmation & Reports",
      description: "Receiver confirms receipt. System generates impact reports showing meals served, books distributed, and environmental impact"
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold text-foreground mb-4">How It Works</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our streamlined methodology ensures efficient redistribution from donor to receiver
          </p>
        </div>

        <div className="relative">
          {/* Vertical line connecting steps */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary hidden md:block"></div>

          <div className="space-y-12">
            {steps.map((step, idx) => (
              <div key={idx} className={`flex items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="flex-1 animate-fade-in">
                  <Card className="shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold flex-shrink-0">
                          {step.number}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground mb-3">{step.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Center connector */}
                <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground z-10">
                  <ArrowRight className={`w-6 h-6 ${idx % 2 === 0 ? '' : 'rotate-180'}`} />
                </div>

                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 bg-accent/30 p-10 rounded-2xl text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Key Technology Features</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-card p-6 rounded-xl">
              <h3 className="font-semibold text-lg text-primary mb-2">GPS Integration</h3>
              <p className="text-sm text-muted-foreground">Real-time location tracking for efficient pickup and delivery coordination</p>
            </div>
            <div className="bg-card p-6 rounded-xl">
              <h3 className="font-semibold text-lg text-primary mb-2">Push Notifications</h3>
              <p className="text-sm text-muted-foreground">Instant alerts to registered users about new donations and status updates</p>
            </div>
            <div className="bg-card p-6 rounded-xl">
              <h3 className="font-semibold text-lg text-primary mb-2">Analytics Dashboard</h3>
              <p className="text-sm text-muted-foreground">Comprehensive data visualization for donors, receivers, and administrators</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Methodology;
