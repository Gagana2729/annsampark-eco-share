import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Clock, Users, MapPin, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { donationService } from "@/services";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const Food = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats] = useState({ meals: 5678, peopleFed: 1234, partnerNGOs: 45 });

  useEffect(() => {
    fetchFoodDonations();
  }, []);

  const fetchFoodDonations = async () => {
    try {
      const response = await donationService.getAllDonations({ type: "food", status: "available" });
      setDonations(response.data || []);
    } catch (error) {
      console.error("Error fetching food donations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDonateClick = () => {
    if (!user) {
      toast.error("Please login to donate food");
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

  const handleClaim = async (donationId: string) => {
    if (!user) {
      toast.error("Please login to claim donations");
      navigate("/login");
      return;
    }

    try {
      await donationService.claimDonation(donationId);
      toast.success("Food donation claimed successfully!");
      fetchFoodDonations();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to claim donation");
    }
  };

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
              <CardTitle className="text-3xl font-bold text-primary">{stats.meals}</CardTitle>
              <CardDescription>Meals Donated</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-3xl font-bold text-primary">{stats.peopleFed}</CardTitle>
              <CardDescription>People Fed</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-3xl font-bold text-primary">{stats.partnerNGOs}</CardTitle>
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

        {/* Available Food Donations */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Available Food Donations</CardTitle>
            <CardDescription>Fresh food donations waiting to be claimed</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : donations.length === 0 ? (
              <div className="text-center py-8">
                <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-xl text-muted-foreground">No food donations available right now</p>
                <p className="text-sm text-muted-foreground mt-2">Check back soon or be the first to donate!</p>
                <Button className="mt-4" onClick={handleDonateClick}>
                  <Heart className="w-4 h-4 mr-2" />
                  Donate Food
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {donations.map((donation) => (
                  <Card key={donation._id} className="border hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{donation.itemName}</h3>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {donation.quantity} servings
                          </p>
                          <p className="text-sm text-muted-foreground">
                            By: {donation.donorId?.fullName || "Anonymous"}
                            {donation.donorId?.organizationName && ` (${donation.donorId.organizationName})`}
                          </p>
                        </div>
                        <Badge className="bg-green-500">Available</Badge>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">{donation.description}</p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {donation.location?.address || "Location not specified"}
                        </span>
                        {donation.expiryTime && (
                          <span className="flex items-center gap-1 text-orange-600 font-medium">
                            <Clock className="w-4 h-4" />
                            Expires: {new Date(donation.expiryTime).toLocaleString()}
                          </span>
                        )}
                      </div>

                      <Button onClick={() => handleClaim(donation._id)} className="w-full">
                        <Heart className="w-4 h-4 mr-2" />
                        Claim This Donation
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

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
            <Button size="lg" className="bg-white text-primary hover:bg-white/90" onClick={handleDonateClick}>
              <Heart className="w-5 h-5 mr-2" />
              Donate Food Now
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

export default Food;
