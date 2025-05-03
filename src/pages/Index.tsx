
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { FileText, User, LogOut } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface UserData {
  username: string;
  isLoggedIn: boolean;
}

const Index = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const navigate = useNavigate();
  
  // Check if user is logged in on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex flex-col items-center gap-2">
          <FileText className="h-16 w-16 text-invoice-primary" />
          <h1 className="text-3xl font-bold text-gray-900">InvoiceAI</h1>
          <p className="text-gray-600 mt-2">Create professional, GST-compliant invoices with AI assistance</p>
          
          {user?.isLoggedIn && (
            <div className="mt-2 p-2 bg-gray-100 rounded-lg">
              <p>Welcome, <span className="font-medium">{user.username}</span>!</p>
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link to="/create-invoice">
              Create New Invoice
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="w-full">
            <Link to="/dashboard">
              Go to Dashboard
            </Link>
          </Button>
          
          {user?.isLoggedIn ? (
            <Button onClick={handleLogout} variant="link" className="w-full">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          ) : (
            <Button asChild variant="link" className="w-full">
              <Link to="/login">
                <User className="h-4 w-4 mr-2" />
                Login to Your Account
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
