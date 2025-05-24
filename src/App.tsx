
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Forbidden from "./pages/Forbidden";
import VerifyAccount from "./pages/VerifyAccount";
import { UpdatePasswordForm } from "@/components/password/UpdatePasswordForm";
import React from "react";

// Create the query client as a constant outside the component
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/verify-account" element={<VerifyAccount />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/forbidden" element={<Forbidden />} />
              <Route path="/update-password" element={
                <div className="min-h-screen w-full flex flex-col bg-[#1E0B36] transition-colors duration-300">
                  <main className="flex-1 flex items-center justify-center">
                    <UpdatePasswordForm />
                  </main>
                </div>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;


// import React from 'react';
// import AnimatedBackground from './components/AnimatedBackground';
// import DatingFilter from './components/DatingFilter';
// import DatingProfileCard from './components/DatingProfileCard';
// import Header from './components/Header';
// import DatingProfilesGrid from './components/DatingGridProfiles';
// import Slidebar from './components/Slidebar';
// import ChatInterface from './components/ChatInterface';


// function App() {
//   return (
//     <div className="relative w-full min-h-screen flex flex-col items-center justify-center">
//       <AnimatedBackground />
//       <Header/>
//       <DatingFilter />
//       <DatingProfilesGrid />
//       {/* <ChatInterface/> */}
//       {/* <Slidebar/> */}
//     </div>
//   );
// }

// export default App;
