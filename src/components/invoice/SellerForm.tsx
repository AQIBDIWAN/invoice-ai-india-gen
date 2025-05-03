
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Search, Upload } from "lucide-react";
import { Seller, useInvoice } from "@/contexts/InvoiceContext";
import { fetchGSTDetails, validateGST } from "@/utils/gstUtils";
import { useToast } from "@/components/ui/use-toast";
import { toast } from "@/components/ui/sonner";

const SellerForm = () => {
  const { seller, setSeller } = useInvoice();
  const [isLoading, setIsLoading] = useState(false);
  const [sellerLogo, setSellerLogo] = useState<string | null>(() => {
    // Check if logo exists in localStorage
    return localStorage.getItem('sellerLogo');
  });
  const { toast: useToastFn } = useToast();

  const handleGSTSearch = async () => {
    if (!seller.gstNumber || !validateGST(seller.gstNumber)) {
      useToastFn({
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
        useToastFn({
          title: "GST Details Found",
          description: "Seller details have been populated from GST database",
        });
      }
    } catch (error) {
      useToastFn({
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
  
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 1MB)
      if (file.size > 1024 * 1024) {
        toast.error("Logo file is too large. Maximum size is 1MB.");
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error("Please select a valid image file.");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const logoData = event.target?.result as string;
        setSellerLogo(logoData);
        localStorage.setItem('sellerLogo', logoData);
        
        // Also update the logo in the seller context
        setSeller(prev => ({
          ...prev,
          logo: logoData
        }));
        
        toast.success("Logo uploaded successfully");
      };
      reader.onerror = () => {
        toast.error("Failed to read the image file");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Seller Information</h2>
        
        <div className="flex items-center gap-2">
          {sellerLogo && (
            <img 
              src={sellerLogo} 
              alt="Seller Logo" 
              className="h-10 w-10 object-contain border rounded"
            />
          )}
          <div className="relative">
            <input 
              type="file" 
              id="seller-logo-upload" 
              accept="image/*" 
              onChange={handleLogoUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <Button variant="outline" size="sm" className="relative">
              <Upload className="h-4 w-4 mr-2" />
              {sellerLogo ? "Change Logo" : "Upload Logo"}
            </Button>
          </div>
        </div>
      </div>
      
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
