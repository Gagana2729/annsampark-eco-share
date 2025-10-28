import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Package, TrendingUp, CheckCircle, Download } from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    { title: "Total Users", value: "1,234", icon: Users, change: "+12%" },
    { title: "Active Donations", value: "89", icon: Package, change: "+8%" },
    { title: "Completed Transfers", value: "456", icon: CheckCircle, change: "+23%" },
    { title: "Impact Score", value: "94%", icon: TrendingUp, change: "+5%" },
  ];

  const users = [
    { name: "Green Valley Restaurant", email: "contact@greenvalley.com", role: "Donor", status: "Active", donations: 45 },
    { name: "Hope Foundation", email: "info@hopefound.org", role: "Receiver", status: "Active", received: 67 },
    { name: "City Library", email: "admin@citylibrary.com", role: "Donor", status: "Active", donations: 123 },
    { name: "Helping Hands NGO", email: "help@handsNGO.org", role: "Receiver", status: "Active", received: 89 },
  ];

  const donations = [
    { id: "D001", donor: "Cafe Bistro", item: "Food", quantity: "40 plates", receiver: "Shelter Home", status: "Completed" },
    { id: "D002", donor: "University Campus", item: "Books", quantity: "25 books", receiver: "Rural School", status: "In Transit" },
    { id: "D003", donor: "Fashion Store", item: "Clothes", quantity: "60 pieces", receiver: "Orphanage", status: "Pending" },
  ];

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, donations, and system analytics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <Card key={idx}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="w-5 h-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <p className="text-sm text-primary mt-1">{stat.change} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-[var(--shadow-soft)]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>System Management</CardTitle>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export Data
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="users" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="users">Registered Users</TabsTrigger>
                <TabsTrigger value="donations">All Donations</TabsTrigger>
              </TabsList>

              <TabsContent value="users" className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Activity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-primary">{user.status}</Badge>
                        </TableCell>
                        <TableCell>
                          {user.role === "Donor" ? `${user.donations} donations` : `${user.received} received`}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="donations" className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Donor</TableHead>
                      <TableHead>Item Type</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Receiver</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {donations.map((donation, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{donation.id}</TableCell>
                        <TableCell>{donation.donor}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{donation.item}</Badge>
                        </TableCell>
                        <TableCell>{donation.quantity}</TableCell>
                        <TableCell>{donation.receiver}</TableCell>
                        <TableCell>
                          <Badge className={
                            donation.status === "Completed" ? "bg-primary" :
                            donation.status === "In Transit" ? "bg-accent-foreground" :
                            "bg-muted text-muted-foreground"
                          }>
                            {donation.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
