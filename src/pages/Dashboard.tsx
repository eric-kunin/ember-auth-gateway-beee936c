
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import AnimatedBackground from "@/components/AnimatedBackground";
import DatingFilter from "@/components/filter/DatingFilter";
import DatingProfilesGrid from "@/components/DatingGridProfiles";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "react-router-dom";
import React from "react";
import logo from "@/assets/images/logo.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  
  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logout fails, redirect to login page
      navigate("/login");
    }
  };
  
  return (
    <div className="relative w-full min-h-screen flex flex-col">
      <AnimatedBackground />
      
      {/* Dashboard Header */}
      <header className="w-full py-4 px-6 flex justify-between items-center z-50 bg-gradient-to-r from-white/5 to-transparent backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#9D4EDD] to-[#C77DFF] shadow-xl">
              <img 
                src={logo}
                alt="Logo" 
                className="h-8 w-8 object-contain drop-shadow-lg"
              />
            </div>
            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              AkhlaDate
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="text-white border-white/20 hover:bg-white/10"
          >
            Logout
          </Button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center">
        <DatingFilter />
        <DatingProfilesGrid />
      </main>
    </div>
  );
};

export default Dashboard;
