import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Clock, Users, MapPin } from "lucide-react";

const Food = () => {
  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <Heart className="w-12 h-12 text-primary" />
            Food Donation
          </h1>
          <p className="text-2xl text-muted-foreground mb-4">Feed the Hungry, Reduce Waste 🍛</p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Bridge the gap between surplus food and empty plates. Connect restaurants, event organizers, 
            and individuals with NGOs and charities to ensure no edible food goes to waste.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-3xl font-bold text-primary">5,678</CardTitle>
              <CardDescription>Meals Donated</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-3xl font-bold text-primary">1,234</CardTitle>
              <CardDescription>People Fed</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-3xl font-bold text-primary">45</CardTitle>
              <CardDescription>Partner NGOs</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-3xl font-bold text-primary">24/7</CardTitle>
              <CardDescription>Real-Time Tracking</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-[var(--shadow-soft)]">
            <CardHeader>
              <CardTitle className="text-2xl">For Donors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <p className="text-muted-foreground">Post surplus food details with quantity and expiry time</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <p className="text-muted-foreground">Share GPS location for easy pickup coordination</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <p className="text-muted-foreground">Get matched with nearest verified NGO automatically</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <p className="text-muted-foreground">Track your donation impact with analytics dashboard</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-soft)]">
            <CardHeader>
              <CardTitle className="text-2xl">For Receivers (NGOs)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <p className="text-muted-foreground">Receive instant notifications about nearby donations</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <p className="text-muted-foreground">Accept or decline based on current capacity</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <p className="text-muted-foreground">Coordinate pickup with GPS-enabled tracking</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <p className="text-muted-foreground">Confirm receipt and report people helped</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-destructive/10 border-l-4 border-destructive p-8 rounded-r-2xl mb-12">
          <div className="flex items-start gap-4">
            <Clock className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Time-Sensitive Collections</h3>
              <p className="text-muted-foreground">
                Food donations include expiry timers to ensure collection happens as early as possible. 
                Our first-come-first-served system prioritizes urgent pickups to minimize waste and 
                maintain food quality and safety.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[var(--gradient-primary)] text-white p-12 rounded-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Whether you're a restaurant with surplus food or an NGO helping those in need, 
            join our platform to create a sustainable food redistribution network.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              <Heart className="w-5 h-5 mr-2" />
              Donate Food Now
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white/20">
              Register as NGO
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Food;
