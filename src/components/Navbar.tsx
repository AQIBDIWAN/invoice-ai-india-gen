
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { FileText, Plus, User } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-invoice-primary" />
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
            <Button variant="outline" asChild>
              <Link to="/login">
                <User className="h-4 w-4 mr-2" />
                Login
              </Link>
            </Button>
            
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
