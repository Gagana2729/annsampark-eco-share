import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Package, MapPin, Clock, CheckCircle, XCircle } from "lucide-react";

const ReceiverDashboard = () => {
  const { toast } = useToast();

  const handleAccept = (item: string) => {
    toast({
      title: "Request Accepted!",
      description: `Pickup details for ${item} will be sent to you shortly.`,
    });
  };

  const handleReject = (item: string) => {
    toast({
      title: "Request Declined",
      description: `${item} will be offered to other receivers.`,
      variant: "destructive",
    });
  };

  const availableDonations = [
    { id: 1, item: "Cooked Rice", quantity: "50 plates", location: "MG Road Restaurant", distance: "2.3 km", expiry: "3 hours", type: "food" },
    { id: 2, item: "Engineering Textbooks", quantity: "20 books", location: "VTU Campus", distance: "5.1 km", expiry: null, type: "books" },
    { id: 3, item: "Winter Jackets", quantity: "15 pieces", location: "City Mall", distance: "3.8 km", expiry: null, type: "clothes" },
  ];

  const confirmedRequests = [
    { item: "Food Packets", quantity: "30 units", status: "In Transit", eta: "30 mins" },
    { item: "Children's Books", quantity: "10 books", status: "Confirmed", eta: "2 hours" },
  ];

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-2">Receiver Dashboard</h1>
          <p className="text-muted-foreground">View and accept available donations in your area</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Received This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">18</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Pickups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent-foreground">2</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">People Helped</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">450+</div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 shadow-[var(--shadow-soft)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-6 h-6 text-primary" />
              Available Donations Near You
            </CardTitle>
            <CardDescription>First-come, first-served basis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {availableDonations.map((donation) => (
                <div key={donation.id} className="p-6 bg-card border-2 border-border rounded-xl hover:border-primary/50 transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold">{donation.item}</h3>
                        <Badge>{donation.type}</Badge>
                      </div>
                      <p className="text-muted-foreground mb-2">Quantity: {donation.quantity}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {donation.location} • {donation.distance}
                        </span>
                        {donation.expiry && (
                          <span className="flex items-center gap-1 text-destructive font-medium">
                            <Clock className="w-4 h-4" />
                            Collect within {donation.expiry}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => handleAccept(donation.item)} className="gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Accept
                      </Button>
                      <Button onClick={() => handleReject(donation.item)} variant="outline" className="gap-2">
                        <XCircle className="w-4 h-4" />
                        Decline
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Confirmed Requests</CardTitle>
            <CardDescription>Track your accepted donations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {confirmedRequests.map((request, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
                  <div>
                    <p className="font-medium">{request.item}</p>
                    <p className="text-sm text-muted-foreground">{request.quantity}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="mb-1">{request.status}</Badge>
                    <p className="text-sm text-muted-foreground">ETA: {request.eta}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReceiverDashboard;
