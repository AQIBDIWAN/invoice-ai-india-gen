
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileText, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { useInvoice } from "@/contexts/InvoiceContext";

interface InvoiceRecord {
  id: string;
  number: string;
  customer: string;
  amount: number;
  date: string;
  status: "paid" | "pending";
  customerDetails: {
    businessName: string;
    gstNumber: string;
  };
}

const Dashboard = () => {
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
  const navigate = useNavigate();
  const { resetInvoice } = useInvoice();
  
  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      toast.error("Please login to access dashboard");
      navigate("/login");
    }
  }, [navigate]);
  
  // Load invoices from localStorage
  useEffect(() => {
    const storedInvoices = localStorage.getItem('invoices');
    
    if (storedInvoices) {
      const parsedInvoices: InvoiceRecord[] = JSON.parse(storedInvoices);
      setInvoices(parsedInvoices);
      
      // Calculate totals
      const paid = parsedInvoices
        .filter(inv => inv.status === "paid")
        .reduce((sum, inv) => sum + inv.amount, 0);
      
      const pending = parsedInvoices
        .filter(inv => inv.status === "pending")
        .reduce((sum, inv) => sum + inv.amount, 0);
        
      setTotalPaid(paid);
      setTotalPending(pending);
    }
  }, []);
  
  const handleCreateInvoice = () => {
    resetInvoice();
    navigate("/create-invoice");
  };

  return (
    <div className="space-y-6 animate-enter">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Button variant="ghost" className="mb-2 -ml-2" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Manage your invoices</p>
        </div>
        <Button onClick={handleCreateInvoice}>
          <Plus className="h-4 w-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Invoices</CardTitle>
            <CardDescription>All time</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{invoices.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Revenue</CardTitle>
            <CardDescription>All time</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₹{(totalPaid + totalPending).toLocaleString('en-IN')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pending Payments</CardTitle>
            <CardDescription>All time</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₹{totalPending.toLocaleString('en-IN')}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>Your latest invoice activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-3 pl-4 font-medium">Invoice</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {invoices.length > 0 ? (
                  invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b last:border-none hover:bg-gray-50">
                      <td className="py-3 pl-4">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-400" />
                          {invoice.number}
                        </div>
                      </td>
                      <td className="py-3">{invoice.customer}</td>
                      <td className="py-3">₹{invoice.amount.toLocaleString('en-IN')}</td>
                      <td className="py-3">{new Date(invoice.date).toLocaleDateString('en-IN')}</td>
                      <td className="py-3">
                        <span 
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {invoice.status === 'paid' ? 'Paid' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-gray-500">
                      No invoices yet. Create your first invoice to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
        {invoices.length > 0 && (
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/all-invoices">View All Invoices</Link>
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;
