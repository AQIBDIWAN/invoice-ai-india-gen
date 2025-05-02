
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useInvoice } from "@/contexts/InvoiceContext";

const InvoiceDetailsForm = () => {
  const { invoiceDetails, setInvoiceDetails } = useInvoice();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInvoiceDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setInvoiceDetails(prev => ({
      ...prev,
      isPaid: checked
    }));
  };

  const handleSelectChange = (value: string) => {
    setInvoiceDetails(prev => ({
      ...prev,
      paymentMethod: value
    }));
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-lg font-semibold text-gray-800">Invoice Details</h2>
      
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="invoiceNumber">Invoice Number</Label>
            <Input 
              id="invoiceNumber"
              name="invoiceNumber"
              value={invoiceDetails.invoiceNumber}
              onChange={handleChange}
            />
          </div>
          
          <div className="flex-1 space-y-2">
            <Label htmlFor="issueDate">Issue Date</Label>
            <Input 
              id="issueDate"
              name="issueDate"
              type="date"
              value={invoiceDetails.issueDate}
              onChange={handleChange}
            />
          </div>
          
          <div className="flex-1 space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input 
              id="dueDate"
              name="dueDate"
              type="date"
              value={invoiceDetails.dueDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Select 
              value={invoiceDetails.paymentMethod} 
              onValueChange={handleSelectChange}
            >
              <SelectTrigger id="paymentMethod">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="UPI">UPI</SelectItem>
                <SelectItem value="Credit Card">Credit Card</SelectItem>
                <SelectItem value="Cheque">Cheque</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1 space-y-2">
            <Label htmlFor="isPaid" className="block mb-3 sm:mb-5">Payment Status</Label>
            <div className="flex items-center space-x-2">
              <Switch 
                id="isPaid"
                checked={invoiceDetails.isPaid}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="isPaid">
                {invoiceDetails.isPaid ? "Paid" : "Unpaid"}
              </Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description / Notes</Label>
          <Textarea 
            id="description"
            name="description"
            placeholder="Additional notes or payment instructions..."
            value={invoiceDetails.description}
            onChange={handleChange}
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailsForm;
