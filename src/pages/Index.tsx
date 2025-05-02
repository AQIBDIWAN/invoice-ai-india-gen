
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex flex-col items-center gap-2">
          <FileText className="h-16 w-16 text-invoice-primary" />
          <h1 className="text-3xl font-bold text-gray-900">InvoiceAI</h1>
          <p className="text-gray-600 mt-2">Create professional, GST-compliant invoices with AI assistance</p>
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
          
          <Button asChild variant="link" className="w-full">
            <Link to="/login">
              Login to Your Account
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
