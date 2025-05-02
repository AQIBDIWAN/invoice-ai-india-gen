
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { Seller, useInvoice } from "@/contexts/InvoiceContext";
import { fetchGSTDetails, validateGST } from "@/utils/gstUtils";
import { useToast } from "@/components/ui/use-toast";

const SellerForm = () => {
  const { seller, setSeller } = useInvoice();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGSTSearch = async () => {
    if (!seller.gstNumber || !validateGST(seller.gstNumber)) {
      toast({
        title: "Invalid GST Number",
        description: "Please enter a valid 15-digit GST number",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const details = await fetchGSTDetails(seller.gstNumber);
      if (details) {
        setSeller(prev => ({
          ...prev,
          name: details.name || prev.name,
          surname: details.surname || prev.surname,
          businessName: details.businessName || prev.businessName,
          state: details.state || prev.state,
          city: details.city || prev.city
        }));
        toast({
          title: "GST Details Found",
          description: "Seller details have been populated from GST database",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch GST details",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSeller(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-lg font-semibold text-gray-800">Seller Information</h2>
      
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="gstNumber">GST Number</Label>
            <div className="flex gap-2">
              <Input 
                id="gstNumber"
                name="gstNumber"
                placeholder="22AAAAA0000A1Z5"
                value={seller.gstNumber}
                onChange={handleChange}
                className="flex-1"
              />
              <Button 
                type="button" 
                onClick={handleGSTSearch}
                variant="outline"
                disabled={isLoading}
              >
                <Search className="h-4 w-4 mr-2" />
                {isLoading ? "Searching..." : "Verify"}
              </Button>
            </div>
          </div>
          
          <div className="flex-1 space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input 
              id="businessName"
              name="businessName"
              placeholder="ABC Enterprises"
              value={seller.businessName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="name">First Name</Label>
            <Input 
              id="name"
              name="name"
              placeholder="Raj"
              value={seller.name}
              onChange={handleChange}
            />
          </div>
          
          <div className="flex-1 space-y-2">
            <Label htmlFor="surname">Last Name</Label>
            <Input 
              id="surname"
              name="surname"
              placeholder="Sharma"
              value={seller.surname}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input 
              id="address"
              name="address"
              placeholder="123 Business Street"
              value={seller.address}
              onChange={handleChange}
            />
          </div>
          
          <div className="flex-1 space-y-2">
            <Label htmlFor="city">City</Label>
            <Input 
              id="city"
              name="city"
              placeholder="Mumbai"
              value={seller.city}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="state">State</Label>
            <Input 
              id="state"
              name="state"
              placeholder="Maharashtra"
              value={seller.state}
              onChange={handleChange}
            />
          </div>
          
          <div className="flex-1 space-y-2">
            <Label htmlFor="pincode">PIN Code</Label>
            <Input 
              id="pincode"
              name="pincode"
              placeholder="400001"
              value={seller.pincode}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              name="email"
              type="email"
              placeholder="business@example.com"
              value={seller.email}
              onChange={handleChange}
            />
          </div>
          
          <div className="flex-1 space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input 
              id="phone"
              name="phone"
              placeholder="9876543210"
              value={seller.phone}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerForm;
