import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Mail } from "lucide-react";

const Team = () => {
  const members = [
    { name: "ANU D K", id: "4JD22CS010" },
    { name: "ARATI R H", id: "4JD22CS015" },
    { name: "CHETHANA P N", id: "4JD22CS026" },
    { name: "GAGANA G N", id: "4JD22CS035" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/20 to-background pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold text-foreground mb-4">Our Team</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet the dedicated students behind AnnSampark
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {members.map((member, idx) => (
            <Card key={idx} className="text-center group hover:shadow-[var(--shadow-hover)] transition-all hover:-translate-y-2">
              <CardHeader>
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <CardTitle className="text-xl">{member.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground font-mono">{member.id}</p>
                <p className="text-sm text-primary mt-2">Team Member</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-card p-10 rounded-2xl shadow-[var(--shadow-soft)] text-center">
          <GraduationCap className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Department of Computer Science & Engineering
          </h2>
          <p className="text-xl text-muted-foreground mb-6">
            Jain Institute of Technology, Davanagere
          </p>
          
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Mail className="w-5 h-5 text-primary" />
            <a href="mailto:annsampark@jitdavanagere.edu.in" className="text-primary hover:underline">
              annsampark@jitdavanagere.edu.in
            </a>
          </div>
        </div>

        <div className="mt-12 bg-accent/30 p-8 rounded-2xl">
          <h3 className="text-2xl font-bold text-center text-foreground mb-6">Project Guidance</h3>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            This project was developed as part of our academic curriculum under the guidance of 
            the faculty at Jain Institute of Technology, with a vision to create sustainable 
            solutions for real-world social and environmental challenges.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Team;
