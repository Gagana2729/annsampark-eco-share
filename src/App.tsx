import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import About from "./pages/About";
import Problem from "./pages/Problem";
import Objectives from "./pages/Objectives";
import Methodology from "./pages/Methodology";
import Food from "./pages/Food";
import Books from "./pages/Books";
import Clothes from "./pages/Clothes";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import DonorDashboard from "./pages/DonorDashboard";
import ReceiverDashboard from "./pages/ReceiverDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Impact from "./pages/Impact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/problem" element={<Problem />} />
            <Route path="/objectives" element={<Objectives />} />
            <Route path="/methodology" element={<Methodology />} />
            <Route path="/food" element={<Food />} />
            <Route path="/books" element={<Books />} />
            <Route path="/clothes" element={<Clothes />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/donor-dashboard" element={<DonorDashboard />} />
            <Route path="/receiver-dashboard" element={<ReceiverDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
