
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import HorizontalDatingFilter from "@/components/filter/HorizontalDatingFilter";
import DatingProfilesGrid from "@/components/DatingGridProfiles";
import React from "react";

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
      <Header />
      <main className="flex-1 flex flex-col items-center">
        <HorizontalDatingFilter />
        <DatingProfilesGrid />
      </main>
    </div>
  );
};

export default Dashboard;
