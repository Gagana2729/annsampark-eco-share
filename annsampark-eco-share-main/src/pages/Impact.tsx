import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Heart, BookOpen, Shirt, Users, MapPin, Clock, Award } from "lucide-react";

const Impact = () => {
  const stats = [
    { icon: Heart, label: "Meals Donated", value: "5,678", color: "text-primary" },
    { icon: BookOpen, label: "Books Shared", value: "1,234", color: "text-primary" },
    { icon: Shirt, label: "Clothes Donated", value: "2,456", color: "text-primary" },
    { icon: Users, label: "People Helped", value: "3,890", color: "text-primary" },
    { icon: MapPin, label: "Partner NGOs", value: "45", color: "text-primary" },
    { icon: Clock, label: "Avg Response Time", value: "< 2 hrs", color: "text-primary" },
    { icon: TrendingUp, label: "CO₂ Saved (kg)", value: "12,500", color: "text-primary" },
    { icon: Award, label: "Success Rate", value: "94%", color: "text-primary" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16 animate-fade-in">
          <TrendingUp className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-foreground mb-4">Our Impact</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time metrics showing the difference we're making together
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <Card key={idx} className="text-center hover:shadow-[var(--shadow-hover)] transition-all">
              <CardHeader className="pb-2">
                <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-[var(--shadow-soft)]">
            <CardHeader>
              <CardTitle className="text-2xl">Environmental Impact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-accent/30 rounded-lg">
                <span className="text-muted-foreground">Food Waste Reduced</span>
                <span className="text-2xl font-bold text-primary">3.2 tons</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-accent/30 rounded-lg">
                <span className="text-muted-foreground">Trees Saved (Books)</span>
                <span className="text-2xl font-bold text-primary">89</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-accent/30 rounded-lg">
                <span className="text-muted-foreground">Textile Waste Prevented</span>
                <span className="text-2xl font-bold text-primary">1.8 tons</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-soft)]">
            <CardHeader>
              <CardTitle className="text-2xl">Social Impact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-accent/30 rounded-lg">
                <span className="text-muted-foreground">Families Supported</span>
                <span className="text-2xl font-bold text-primary">850+</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-accent/30 rounded-lg">
                <span className="text-muted-foreground">Students Helped</span>
                <span className="text-2xl font-bold text-primary">1,200+</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-accent/30 rounded-lg">
                <span className="text-muted-foreground">Community Partners</span>
                <span className="text-2xl font-bold text-primary">78</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Monthly Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-around gap-4 px-8">
              {[65, 75, 82, 78, 88, 94].map((height, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-primary rounded-t-lg hover:bg-primary/80 transition-all cursor-pointer"
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-sm text-muted-foreground">Month {idx + 1}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-muted-foreground mt-6">
              Showing donation activity growth over the last 6 months
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Impact;
