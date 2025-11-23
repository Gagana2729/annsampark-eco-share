import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shirt, Heart, Users, TrendingUp } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Clothes = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleDonateClick = () => {
    if (!user) {
      toast.error("Please login to donate clothes");
      navigate("/login");
      return;
    }
    navigate("/donor-dashboard");
  };

  const handleRegisterNGO = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/receiver-dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <Shirt className="w-12 h-12 text-primary" />
            ClothBlock
          </h1>
          <p className="text-2xl text-muted-foreground mb-4">Donate Clothes, Warm Hearts 👕</p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Your gently used clothing can make a difference. Donate to verified NGOs and help those in need
            while reducing textile waste and promoting sustainable fashion.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Shirt className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-3xl font-bold text-primary">2,456</CardTitle>
              <CardDescription>Clothes Donated</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-3xl font-bold text-primary">890</CardTitle>
              <CardDescription>People Helped</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-3xl font-bold text-primary">34</CardTitle>
              <CardDescription>NGO Partners</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-3xl font-bold text-primary">95%</CardTitle>
              <CardDescription>Impact Score</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-[var(--shadow-soft)]">
            <CardHeader>
              <CardTitle className="text-2xl">What Can You Donate?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <p className="text-muted-foreground">Gently used or new clothing for all ages</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <p className="text-muted-foreground">Winter wear, jackets, sweaters, blankets</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <p className="text-muted-foreground">Children's clothing and school uniforms</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <p className="text-muted-foreground">Footwear in good condition</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <p className="text-muted-foreground">Accessories like scarves, hats, gloves</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-soft)]">
            <CardHeader>
              <CardTitle className="text-2xl">Donation Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <p className="text-muted-foreground">Ensure clothes are clean and washed</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <p className="text-muted-foreground">No torn or heavily damaged items</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <p className="text-muted-foreground">Pack clothes in bags or boxes</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <p className="text-muted-foreground">Specify type and quantity in the form</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <p className="text-muted-foreground">Provide accurate pickup location with GPS</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-[var(--gradient-primary)] text-white p-12 rounded-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Your unused clothes can provide warmth and dignity to someone in need.
            Join our community of donors today!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90" onClick={handleDonateClick}>
              <Shirt className="w-5 h-5 mr-2" />
              Donate Clothes Now
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white/20" onClick={handleRegisterNGO}>
              Register as NGO
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clothes;
