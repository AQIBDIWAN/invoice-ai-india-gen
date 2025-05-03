
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { Badge } from "@/components/ui/badge";

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

const AllInvoices = () => {
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      toast.error("Please login to access invoices");
      navigate("/login");
    }
  }, [navigate]);

  // Load invoices from localStorage
  useEffect(() => {
    const storedInvoices = localStorage.getItem('invoices');
    if (storedInvoices) {
      try {
        const parsedData = JSON.parse(storedInvoices);
        
        // Validate that all invoices have proper status values
        const validatedInvoices: InvoiceRecord[] = parsedData.map((invoice: any) => ({
          ...invoice,
          // Ensure status is either "paid" or "pending"
          status: invoice.status === "paid" ? "paid" : "pending"
        }));
        
        setInvoices(validatedInvoices);
      } catch (error) {
        console.error("Error parsing invoices:", error);
        setInvoices([]);
      }
    }
  }, []);

  const handleStatusChange = (invoiceId: string) => {
    const updatedInvoices = invoices.map(invoice => {
      if (invoice.id === invoiceId) {
        const newStatus: "paid" | "pending" = invoice.status === 'paid' ? 'pending' : 'paid';
        return {
          ...invoice,
          status: newStatus
        };
      }
      return invoice;
    });
    
    setInvoices(updatedInvoices);
    localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
    
    toast.success("Invoice status updated");
  };

  return (
    <div className="space-y-6 animate-enter">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Button variant="ghost" className="mb-2" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold">All Invoices</h1>
          <p className="text-gray-500">Manage and track all your invoices</p>
        </div>
        <Button asChild>
          <Link to="/create-invoice">
            Create New Invoice
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoice Records</CardTitle>
          <CardDescription>
            View, filter, and manage all your invoice records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              {invoices.length === 0 && (
                <TableCaption>No invoices found. Create your first invoice to get started.</TableCaption>
              )}
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        {invoice.number}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div>{invoice.customer}</div>
                        <div className="text-xs text-gray-500">
                          {invoice.customerDetails?.gstNumber || "No GST"}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(invoice.date).toLocaleDateString('en-IN')}</TableCell>
                    <TableCell>₹{invoice.amount.toLocaleString('en-IN')}</TableCell>
                    <TableCell>
                      <Badge
                        variant={invoice.status === 'paid' ? "default" : "outline"}
                        className={
                          invoice.status === 'paid' 
                            ? "bg-green-100 text-green-800 hover:bg-green-200" 
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                        }
                      >
                        {invoice.status === 'paid' ? 'Paid' : 'Pending'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleStatusChange(invoice.id)}
                      >
                        Mark as {invoice.status === 'paid' ? 'Pending' : 'Paid'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AllInvoices;
