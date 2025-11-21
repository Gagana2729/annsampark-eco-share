import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search, TreePine, ShoppingCart, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { donationService } from "@/services";
import { toast } from "sonner";

const Books = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGenre, setFilterGenre] = useState("all");
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 1234, sold: 567, treesSaved: 89 });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await donationService.getAllDonations({ type: "books", status: "available" });
      setBooks(response.data || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDonateClick = () => {
    if (!user) {
      toast.error("Please login to donate books");
      navigate("/login");
      return;
    }
    navigate("/donor-dashboard");
  };

  const handleRequest = async (bookId: string) => {
    if (!user) {
      toast.error("Please login to request books");
      navigate("/login");
      return;
    }

    try {
      await donationService.claimDonation(bookId);
      toast.success("Book requested successfully!");
      fetchBooks();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to request book");
    }
  };

  const filteredBooks = books.filter(book =>
    (filterGenre === "all" || book.genre === filterGenre) &&
    (book.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <BookOpen className="w-12 h-12 text-primary" />
            BookBlock
          </h1>
          <p className="text-2xl text-muted-foreground mb-4">Share Knowledge, Sustain the Planet 📖</p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Enable students, readers, and organizations to donate or request second-hand books easily.
            Reduce paper waste while helping learners access affordable resources.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-primary">{stats.total}</CardTitle>
              <CardDescription>Books Donated</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-primary">{stats.sold}</CardTitle>
              <CardDescription>Books Distributed</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-primary flex items-center justify-center gap-2">
                <TreePine className="w-8 h-8" />
                {stats.treesSaved}
              </CardTitle>
              <CardDescription>Trees Saved 🌳</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="bg-card p-6 rounded-2xl shadow-[var(--shadow-soft)] mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search books by title or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterGenre} onValueChange={setFilterGenre}>
              <SelectTrigger>
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="fiction">Fiction</SelectItem>
                <SelectItem value="non-fiction">Non-Fiction</SelectItem>
              </SelectContent>
            </Select>
            <Button className="gap-2" onClick={handleDonateClick}>
              <BookOpen className="w-4 h-4" />
              Donate Book
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-xl text-muted-foreground">No books available at the moment</p>
            <p className="text-sm text-muted-foreground mt-2">Be the first to donate!</p>
            <Button className="mt-4" onClick={handleDonateClick}>
              <BookOpen className="w-4 h-4 mr-2" />
              Donate Books
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <Card key={book._id} className="group overflow-hidden hover:shadow-[var(--shadow-hover)] transition-all">
                {book.images && book.images[0] && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={book.images[0]}
                      alt={book.itemName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">{book.itemName}</CardTitle>
                  <CardDescription className="line-clamp-2">{book.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline">Quantity: {book.quantity}</Badge>
                    <Badge>{book.type}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">Free</span>
                    <Button size="sm" className="gap-2" onClick={() => handleRequest(book._id)}>
                      <ShoppingCart className="w-4 h-4" />
                      Request
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
