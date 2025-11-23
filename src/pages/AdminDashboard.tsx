import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Users, Package, CheckCircle, Loader2, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { userService, donationService } from "@/services";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDonations: 0,
    verifiedUsers: 0,
    pendingVerification: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, donationsRes] = await Promise.all([
        userService.getAllUsers(),
        donationService.getAllDonations({})
      ]);

      const usersData = usersRes.data || [];
      const donationsData = donationsRes.data || [];

      setUsers(usersData);
      setDonations(donationsData);

      setStats({
        totalUsers: usersData.length,
        totalDonations: donationsData.length,
        verifiedUsers: usersData.filter((u: any) => u.verified).length,
        pendingVerification: usersData.filter((u: any) => !u.verified && u.role === "receiver").length
      });
    } catch (error: any) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyUser = async (userId: string) => {
    try {
      await userService.verifyUser(userId);
      toast.success("User verified successfully!");
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to verify user");
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-purple-500";
      case "donor": return "bg-blue-500";
      case "receiver": return "bg-green-500";
      default: return "bg-gray-500";
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
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-2">
            <Shield className="w-10 h-10 text-primary" />
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">Welcome, {user?.fullName}! Manage platform users and donations.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : stats.totalUsers}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Donations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent-foreground">
                {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : stats.totalDonations}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Verified Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : stats.verifiedUsers}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-500">
                {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : stats.pendingVerification}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Verifications */}
        {stats.pendingVerification > 0 && (
          <Card className="mb-8 border-orange-200 bg-orange-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-orange-600" />
                Pending Verifications
              </CardTitle>
              <CardDescription>NGOs/Receivers waiting for verification</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users
                  .filter(u => !u.verified && u.role === "receiver")
                  .map((user) => (
                    <Card key={user._id} className="border">
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold">{user.fullName}</h3>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            {user.organizationName && (
                              <p className="text-sm text-muted-foreground">
                                Organization: {user.organizationName}
                              </p>
                            )}
                            <p className="text-sm text-muted-foreground">
                              Joined: {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Badge className={getRoleColor(user.role)}>
                              {user.role}
                            </Badge>
                            <Button
                              size="sm"
                              onClick={() => handleVerifyUser(user._id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Verify
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* All Users */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              All Users
            </CardTitle>
            <CardDescription>Manage platform users</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="space-y-4">
                {users.map((user) => (
                  <Card key={user._id} className="border">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{user.fullName}</h3>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          {user.organizationName && (
                            <p className="text-sm text-muted-foreground">
                              Organization: {user.organizationName}
                            </p>
                          )}
                          <p className="text-sm text-muted-foreground">
                            Impact Score: {user.impactScore || 0}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          <Badge className={getRoleColor(user.role)}>
                            {user.role}
                          </Badge>
                          {user.verified ? (
                            <Badge className="bg-green-500">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          ) : (
                            <Badge variant="outline">Not Verified</Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* All Donations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              All Donations
            </CardTitle>
            <CardDescription>Monitor platform donations</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : donations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No donations yet</p>
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
                          <p className="text-sm text-muted-foreground">
                            Donor: {donation.donorId?.fullName || "Unknown"}
                          </p>
                          {donation.claimedBy && (
                            <p className="text-sm text-muted-foreground">
                              Claimed by: {donation.claimedBy.fullName || "Unknown"}
                            </p>
                          )}
                        </div>
                        <Badge className={getStatusColor(donation.status)}>
                          {donation.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{donation.description}</p>
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

export default AdminDashboard;
