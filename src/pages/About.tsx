import { Users, Target, Eye } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold text-foreground mb-4">About AnnSampark</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Building a sustainable future through smart redistribution
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-card p-8 rounded-2xl shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all duration-300">
            <Target className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-3xl font-bold mb-4 text-foreground">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To minimize food and resource waste by connecting surplus donors with people in need 
              through a smart, transparent online platform. We believe no food or knowledge should go to waste 
              when there are people who need them.
            </p>
          </div>

          <div className="bg-card p-8 rounded-2xl shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all duration-300">
            <Eye className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-3xl font-bold mb-4 text-foreground">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              To build a sustainable community where no food or knowledge goes to waste. 
              We envision a world where technology bridges the gap between abundance and need, 
              creating a circular economy of sharing and caring.
            </p>
          </div>
        </div>

        <div className="bg-accent/30 p-12 rounded-2xl mb-20">
          <div className="flex items-center gap-4 mb-6">
            <Users className="w-12 h-12 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">What We Do</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-primary mb-3">Food Redistribution</h3>
              <p className="text-muted-foreground">
                Connect restaurants and event organizers with NGOs and charities to redistribute surplus food
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary mb-3">Book Sharing</h3>
              <p className="text-muted-foreground">
                Enable students and readers to donate or purchase second-hand books at affordable prices
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary mb-3">Cloth Donation</h3>
              <p className="text-muted-foreground">
                Facilitate the donation of gently used clothing to those in need through verified NGOs
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Department of Computer Science & Engineering<br />
            Jain Institute of Technology, Davanagere
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
