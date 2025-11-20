import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState("donor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, signUp, user, userRole } = useAuth();

  // Redirect authenticated users
  useEffect(() => {
    if (user && userRole) {
      if (userRole === "donor") navigate("/donor-dashboard");
      else if (userRole === "receiver") navigate("/receiver-dashboard");
      else if (userRole === "admin") navigate("/admin-dashboard");
      else navigate("/");
    }
  }, [user, userRole, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegister) {
        const { error } = await signUp(email, password, fullName, role);
        if (error) toast.error(error.message);
        else toast.success("Account created successfully!");
      } else {
        const { error } = await signIn(email, password);
        if (error) toast.error(error.message);
        else toast.success("Logged in successfully!");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/20 flex items-center justify-center p-4 pt-24">
      <Card className="w-full max-w-md shadow-[var(--shadow-hover)]">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">
            {isRegister ? "Create Account" : "Welcome Back"}
          </CardTitle>
          <CardDescription>
            {isRegister ? "Join AnnSampark community" : "Login to your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter your name" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required 
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">I am a</Label>
              <Select value={role} onValueChange={setRole} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="donor">Donor (Restaurant/Individual)</SelectItem>
                  <SelectItem value="receiver">Receiver (NGO/Charity)</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : (isRegister ? "Register" : "Login")}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-primary font-medium hover:underline"
              >
                {isRegister ? "Login" : "Register"}
              </button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
