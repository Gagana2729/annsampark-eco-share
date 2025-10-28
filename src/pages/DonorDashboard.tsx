import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Heart, MapPin, Clock, Package } from "lucide-react";

const DonorDashboard = () => {
  const [donationType, setDonationType] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Donation Posted Successfully!",
      description: "Nearby receivers will be notified. You'll receive confirmation soon.",
    });
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-2">Donor Dashboard</h1>
          <p className="text-muted-foreground">Share your surplus with those who need it</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Donations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">24</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent-foreground">3</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Impact Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">92%</div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-[var(--shadow-soft)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-primary" />
              Create New Donation
            </CardTitle>
            <CardDescription>Fill in the details to post your donation</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="type">Donation Type</Label>
                <Select value={donationType} onValueChange={setDonationType} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select donation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="books">Books</SelectItem>
                    <SelectItem value="clothes">Clothes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="item">Item Name</Label>
                  <Input id="item" placeholder="e.g., Rice Packets, Textbooks, Winter Jackets" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" type="number" placeholder="e.g., 50" required />
                </div>
              </div>

              {donationType === "food" && (
                <div className="space-y-2">
                  <Label htmlFor="expiry" className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-destructive" />
                    Expiry Time (hours from now)
                  </Label>
                  <Input id="expiry" type="number" placeholder="e.g., 4" required />
                  <p className="text-sm text-muted-foreground">Food should be collected as early as possible</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Additional details about the donation" rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Pickup Location
                </Label>
                <Input id="location" placeholder="Address or GPS coordinates" required />
                <Button type="button" variant="outline" size="sm" className="mt-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  Use Current Location
                </Button>
              </div>

              <Button type="submit" className="w-full" size="lg">
                <Package className="w-5 h-5 mr-2" />
                Post Donation
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { item: "Cooked Rice", quantity: "50 plates", status: "Confirmed", time: "2 hours ago" },
                { item: "Engineering Books", quantity: "15 books", status: "Pending", time: "1 day ago" },
                { item: "Winter Clothes", quantity: "30 pieces", status: "In Transit", time: "3 days ago" },
              ].map((donation, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
                  <div>
                    <p className="font-medium">{donation.item}</p>
                    <p className="text-sm text-muted-foreground">{donation.quantity} • {donation.time}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    donation.status === "Confirmed" ? "bg-primary text-primary-foreground" :
                    donation.status === "Pending" ? "bg-muted text-muted-foreground" :
                    "bg-accent text-accent-foreground"
                  }`}>
                    {donation.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DonorDashboard;
