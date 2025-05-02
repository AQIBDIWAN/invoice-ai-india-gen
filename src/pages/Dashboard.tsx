
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Dummy invoice data for demonstration
  const recentInvoices = [
    { id: 1, number: "INV-2023001", customer: "Reliance Industries Ltd", amount: 245000, date: "2023-05-01", status: "paid" },
    { id: 2, number: "INV-2023002", customer: "Tata Consultancy Services", amount: 78500, date: "2023-05-10", status: "pending" },
    { id: 3, number: "INV-2023003", customer: "Infosys Limited", amount: 125000, date: "2023-05-15", status: "paid" },
    { id: 4, number: "INV-2023004", customer: "Wipro Limited", amount: 54000, date: "2023-05-20", status: "pending" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Manage your invoices</p>
        </div>
        <Button asChild>
          <Link to="/create-invoice">
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Invoices</CardTitle>
            <CardDescription>All time</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">42</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Revenue</CardTitle>
            <CardDescription>All time</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₹24,50,000</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pending Payments</CardTitle>
            <CardDescription>All time</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₹1,32,500</p>
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
                {recentInvoices.map((invoice) => (
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
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">View All Invoices</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;
