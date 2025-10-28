import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search, TreePine, ShoppingCart } from "lucide-react";

const Books = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGenre, setFilterGenre] = useState("all");

  const books = [
    { title: "Engineering Mathematics", author: "B.S. Grewal", genre: "academic", condition: "Good", price: "₹200", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400" },
    { title: "Data Structures", author: "Seymour Lipschutz", genre: "academic", condition: "Excellent", price: "₹350", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400" },
    { title: "The Alchemist", author: "Paulo Coelho", genre: "fiction", condition: "Good", price: "Free", image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400" },
    { title: "Physics Vol. 1", author: "H.C. Verma", genre: "academic", condition: "Fair", price: "₹150", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400" },
  ];

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
            Enable students, readers, and organizations to donate or buy second-hand books easily. 
            Reduce paper waste while helping learners access affordable resources.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-primary">1,234</CardTitle>
              <CardDescription>Books Donated</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-primary">567</CardTitle>
              <CardDescription>Books Sold</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-primary flex items-center justify-center gap-2">
                <TreePine className="w-8 h-8" />
                89
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
                  placeholder="Search books by title or author..."
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
            <Button className="gap-2">
              <BookOpen className="w-4 h-4" />
              Donate Book
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book, idx) => (
            <Card key={idx} className="group overflow-hidden hover:shadow-[var(--shadow-hover)] transition-all">
              <div className="h-48 overflow-hidden">
                <img 
                  src={book.image} 
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">{book.title}</CardTitle>
                <CardDescription>{book.author}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">{book.condition}</Badge>
                  <Badge>{book.genre}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{book.price}</span>
                  <Button size="sm" className="gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    {book.price === "Free" ? "Request" : "Buy"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Books;
