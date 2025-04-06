
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

const Dashboard = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // In a real app, this would handle actual logout logic
    navigate("/login");
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-theme-light/5 to-theme-main/5 dark:from-theme-dark dark:to-theme-purple/80">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-theme-purple dark:text-theme-light">Dashboard</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="border-theme-accent text-theme-accent hover:bg-theme-accent/10 dark:border-theme-accent/80 dark:text-theme-light"
            >
              Logout
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg bg-white shadow-md border border-theme-light/20 transition-all duration-300 transform hover:translate-y-[-4px] hover:shadow-lg dark:bg-black/20 dark:backdrop-blur-md dark:border-white/10">
            <h2 className="text-xl font-semibold text-theme-purple mb-4 dark:text-theme-accent">Welcome to Your Dashboard</h2>
            <p className="text-gray-600 dark:text-gray-300">
              This is a placeholder dashboard page. In a real application, you would see your content here.
            </p>
          </div>
          
          <div className="p-6 rounded-lg bg-gradient-to-br from-theme-purple/10 to-theme-main/10 shadow-md border border-theme-light/20 transition-all duration-300 transform hover:translate-y-[-4px] hover:shadow-lg dark:from-theme-purple/20 dark:to-theme-main/20 dark:border-white/10">
            <h2 className="text-xl font-semibold text-theme-accent mb-4 dark:text-theme-light">Account Status</h2>
            <p className="text-gray-600 dark:text-gray-300">
              You are currently logged in. This page is just a demonstration of successful authentication.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
