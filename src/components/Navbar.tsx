
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { FileText, Plus, User, LogOut } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface UserData {
  username: string;
  isLoggedIn: boolean;
}

const Navbar = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [sellerLogo, setSellerLogo] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Check if user is logged in on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedLogo = localStorage.getItem('sellerLogo');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (storedLogo) {
      setSellerLogo(storedLogo);
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };
  
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            {sellerLogo ? (
              <img 
                src={sellerLogo} 
                alt="Seller Logo" 
                className="h-8 w-8 object-contain"
              />
            ) : (
              <FileText className="h-6 w-6 text-invoice-primary" />
            )}
            <span className="font-bold text-xl text-invoice-dark">InvoiceAI</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/dashboard" className="text-gray-600 hover:text-invoice-primary transition-colors">
              Dashboard
            </Link>
            <Link to="/create-invoice" className="text-gray-600 hover:text-invoice-primary transition-colors">
              Create Invoice
            </Link>
          </nav>
          
          <div className="flex items-center gap-3">
            {user?.isLoggedIn ? (
              <>
                {/* User info and logout */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium hidden sm:inline">
                    {user.username}
                  </span>
                  <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <Button variant="outline" asChild>
                <Link to="/login">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Link>
              </Button>
            )}
            
            <Button asChild>
              <Link to="/create-invoice">
                <Plus className="h-4 w-4 mr-2" />
                New Invoice
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
