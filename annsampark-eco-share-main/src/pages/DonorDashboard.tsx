import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Heart, MapPin, Clock, Package, Loader2, Image as ImageIcon, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { donationService, userService } from "@/services";

const DonorDashboard = () => {
  const { user } = useAuth();
  const [donationType, setDonationType] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [expiryTime, setExpiryTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [donations, setDonations] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    fetchDonations();
    fetchStats();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await donationService.getMyDonations();
      setDonations(response.data || []);
    } catch (error: any) {
      console.error("Error fetching donations:", error);
    } finally {
      setLoadingData(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await userService.getStats();
      setStats(response.data);
    } catch (error: any) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const donationData = {
        type: donationType,
        itemName,
        quantity: parseInt(quantity),
        description,
        location: {
          address,
          coordinates: {
            lat: 0, // TODO: Add GPS picker
            lng: 0
          }
        },
        ...(donationType === "food" && expiryTime && { expiryTime: new Date(expiryTime).toISOString() })
      };

      await donationService.createDonation(donationData);

      toast.success("Donation Posted Successfully!", {
        description: "Nearby receivers will be notified. You'll receive confirmation soon."
      });

      // Reset form
      setDonationType("");
      setItemName("");
      setQuantity("");
      setDescription("");
      setAddress("");
      setExpiryTime("");

      // Refresh donations list
      fetchDonations();
      fetchStats();
    } catch (error: any) {
      toast.error("Failed to create donation", {
        description: error.response?.data?.message || "Please try again"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (donationId: string) => {
    try {
      await donationService.completeDonation(donationId);
      toast.success("Donation marked as completed!");
      fetchDonations();
      fetchStats();
    } catch (error: any) {
      toast.error("Failed to complete donation", {
        description: error.response?.data?.message || "Please try again"
      });
    }
  };

  const handleDelete = async (donationId: string) => {
    if (!confirm("Are you sure you want to delete this donation?")) return;

    try {
      await donationService.deleteDonation(donationId);
      toast.success("Donation deleted successfully");
      fetchDonations();
      fetchStats();
    } catch (error: any) {
      toast.error("Failed to delete donation", {
        description: error.response?.data?.message || "Please try again"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-500";
      case "claimed": return "bg-blue-500";
      case "in-transit": return "bg-yellow-500";
      case "completed": return "bg-gray-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-2">Donor Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.fullName || "Donor"}! Share your surplus with those who need it.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Donations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {loadingData ? <Loader2 className="w-8 h-8 animate-spin" /> : stats?.totalDonations || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Donations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent-foreground">
                {loadingData ? <Loader2 className="w-8 h-8 animate-spin" /> : stats?.activeDonations || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Impact Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {loadingData ? <Loader2 className="w-8 h-8 animate-spin" /> : stats?.impactScore || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Create Donation Form */}
        <Card className="shadow-[var(--shadow-soft)] mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-primary" />
              Create New Donation
            </CardTitle>
            <CardDescription>Fill in the details to post your donation</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Donation Type *</Label>
                  <Select value={donationType} onValueChange={setDonationType} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select donation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="food">🍛 Food</SelectItem>
                      <SelectItem value="books">📚 Books</SelectItem>
                      <SelectItem value="clothes">👕 Clothes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="itemName">Item Name *</Label>
                  <Input
                    id="itemName"
                    placeholder="e.g., Rice Packets, Textbooks, Winter Jackets"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="e.g., 50"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    min="1"
                  />
                </div>

                {donationType === "food" && (
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Time (for food)</Label>
                    <Input
                      id="expiry"
                      type="datetime-local"
                      value={expiryTime}
                      onChange={(e) => setExpiryTime(e.target.value)}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Provide details about the items..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Pickup Address *</Label>
                <Input
                  id="address"
                  placeholder="Enter full address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  <MapPin className="w-3 h-3 inline mr-1" />
                  GPS location picker coming soon!
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Posting Donation...
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4 mr-2" />
                    Post Donation
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* My Donations List */}
        <Card>
          <CardHeader>
            <CardTitle>My Donations</CardTitle>
            <CardDescription>Track and manage your posted donations</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingData ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : donations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No donations yet. Create your first donation above!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {donations.map((donation) => (
                  <Card key={donation._id} className="border">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{donation.itemName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {donation.type.charAt(0).toUpperCase() + donation.type.slice(1)} • Quantity: {donation.quantity}
                          </p>
                        </div>
                        <Badge className={getStatusColor(donation.status)}>
                          {donation.status}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">{donation.description}</p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {donation.location?.address || "No address"}
                        </span>
                        {donation.expiryTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            Expires: {new Date(donation.expiryTime).toLocaleString()}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        {donation.status === "claimed" && (
                          <Button
                            size="sm"
                            onClick={() => handleComplete(donation._id)}
                          >
                            Mark as Completed
                          </Button>
                        )}
                        {donation.status === "available" && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(donation._id)}
                          >
                            <X className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DonorDashboard;
