import { Link } from "react-router-dom";
import { ArrowRight, Heart, BookOpen, Shirt, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen flex items-center justify-center bg-[var(--gradient-hero)] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920')] bg-cover bg-center opacity-20"></div>
        
        <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            AnnSampark
          </h1>
          <p className="text-2xl md:text-3xl mb-4 font-light">
            Smart Redistribution of Surplus Food, Books & Clothes
          </p>
          <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto">
            Connecting donors and receivers for a zero-waste, sustainable future
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <Link to="/food">
              <Button size="lg" className="gap-2 bg-white text-primary hover:bg-white/90">
                <Heart className="w-5 h-5" />
                Donate Food
              </Button>
            </Link>
            <Link to="/books">
              <Button size="lg" variant="outline" className="gap-2 bg-white/10 text-white border-white hover:bg-white/20">
                <BookOpen className="w-5 h-5" />
                Donate Books
              </Button>
            </Link>
            <Link to="/clothes">
              <Button size="lg" variant="outline" className="gap-2 bg-white/10 text-white border-white hover:bg-white/20">
                <Shirt className="w-5 h-5" />
                Donate Clothes
              </Button>
            </Link>
          </div>

          <Link to="/login">
            <Button size="lg" variant="outline" className="gap-2 bg-white/5 text-white border-white/50 hover:bg-white/15">
              Join as Charity / NGO
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/70" />
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">Why AnnSampark?</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every day, tons of food goes to waste while millions go hungry. Books sit unused on shelves 
            while students struggle to afford them. Clothing is discarded when it could warm someone in need. 
            AnnSampark bridges this gap using technology, creating a community-driven platform for 
            sustainable redistribution with real-time tracking, GPS-enabled delivery, and transparent impact metrics.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;
