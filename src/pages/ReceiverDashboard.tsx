import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Package, MapPin, Clock, Loader2, Search, Heart } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { donationService, userService } from "@/services";

const ReceiverDashboard = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState<any[]>([]);
  const [myRequests, setMyRequests] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchDonations();
    fetchMyRequests();
    fetchStats();
  }, [filterType]);

  const fetchDonations = async () => {
    try {
      const params: any = { status: "available" };
      if (filterType !== "all") {
        params.type = filterType;
      }
      const response = await donationService.getAllDonations(params);
      setDonations(response.data || []);
    } catch (error: any) {
      console.error("Error fetching donations:", error);
      toast.error("Failed to load donations");
    } finally {
      setLoading(false);
    }
  };

  const fetchMyRequests = async () => {
    try {
      const response = await donationService.getMyDonations();
      // Filter for claimed donations
      const claimed = (response.data || []).filter((d: any) => d.claimedBy?._id === user?._id);
      setMyRequests(claimed);
    } catch (error: any) {
      console.error("Error fetching requests:", error);
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

  const handleClaim = async (donationId: string) => {
    try {
      await donationService.claimDonation(donationId);
      toast.success("Donation claimed successfully!", {
        description: "The donor has been notified. Please coordinate for pickup."
      });
      fetchDonations();
      fetchMyRequests();
      fetchStats();
    } catch (error: any) {
      toast.error("Failed to claim donation", {
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
      default: return "bg-gray-500";
    }
  };

  const filteredDonations = donations.filter(donation =>
    donation.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    donation.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-2">Receiver Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome, {user?.organizationName || user?.fullName}! Find and claim available donations.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Claimed Donations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : myRequests.length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed Pickups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent-foreground">
                {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : stats?.completedDonations || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">People Helped</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : stats?.totalItems || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My Claimed Donations */}
        {myRequests.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>My Claimed Donations</CardTitle>
              <CardDescription>Donations you've claimed - coordinate with donors for pickup</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myRequests.map((donation) => (
                  <Card key={donation._id} className="border border-blue-200 bg-blue-50/50">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{donation.itemName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {donation.type.charAt(0).toUpperCase() + donation.type.slice(1)} • Quantity: {donation.quantity}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Donor: {donation.donorId?.fullName || "Unknown"}
                          </p>
                        </div>
                        <Badge className={getStatusColor(donation.status)}>
                          {donation.status}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">{donation.description}</p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {donation.location?.address || "No address"}
                        </span>
                        {donation.expiryTime && (
                          <span className="flex items-center gap-1 text-orange-600">
                            <Clock className="w-4 h-4" />
                            Expires: {new Date(donation.expiryTime).toLocaleString()}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Available Donations */}
        <Card>
          <CardHeader>
            <CardTitle>Available Donations</CardTitle>
            <CardDescription>Browse and claim donations that match your needs</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search donations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="food">🍛 Food</SelectItem>
                  <SelectItem value="books">📚 Books</SelectItem>
                  <SelectItem value="clothes">👕 Clothes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Donations List */}
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : filteredDonations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No donations available at the moment.</p>
                <p className="text-sm mt-2">Check back later or adjust your filters.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredDonations.map((donation) => (
                  <Card key={donation._id} className="border hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold">{donation.itemName}</h3>
                              <p className="text-sm text-muted-foreground">
                                {donation.type.charAt(0).toUpperCase() + donation.type.slice(1)} • Quantity: {donation.quantity}
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                By: {donation.donorId?.fullName || "Anonymous Donor"}
                                {donation.donorId?.organizationName && ` (${donation.donorId.organizationName})`}
                              </p>
                            </div>
                            <Badge className="bg-green-500">Available</Badge>
                          </div>
                        </div>
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

                      <Button
                        onClick={() => handleClaim(donation._id)}
                        className="w-full"
                      >
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
      </div>
    </div>
  );
};

export default ReceiverDashboard;
