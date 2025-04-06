
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // In a real app, this would handle actual logout logic
    navigate("/login");
  };
  
  return (
    <div className="min-h-screen bg-theme-purple/10">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-theme-purple">Dashboard</h1>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="border-theme-accent text-theme-accent hover:bg-theme-accent/10"
          >
            Logout
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg bg-white shadow-md border border-theme-light/20">
            <h2 className="text-xl font-semibold text-theme-purple mb-4">Welcome to Your Dashboard</h2>
            <p className="text-gray-600">
              This is a placeholder dashboard page. In a real application, you would see your content here.
            </p>
          </div>
          
          <div className="p-6 rounded-lg bg-gradient-to-br from-theme-purple/10 to-theme-main/10 shadow-md border border-theme-light/20">
            <h2 className="text-xl font-semibold text-theme-accent mb-4">Account Status</h2>
            <p className="text-gray-600">
              You are currently logged in. This page is just a demonstration of successful authentication.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
