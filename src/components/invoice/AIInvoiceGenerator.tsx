
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { AIInvoiceData, generateInvoiceFromText } from "@/services/aiService";
import { useInvoice } from "@/contexts/InvoiceContext";
import { useToast } from "../ui/use-toast";
import { Bot, LoaderCircle } from "lucide-react";

const AIInvoiceGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { setSeller, setCustomer, setProducts, setInvoiceDetails } = useInvoice();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please provide a description of the invoice you want to generate",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const aiData: AIInvoiceData = await generateInvoiceFromText(prompt);
      
      // Update the invoice data with AI generated content
      if (aiData.seller) {
        setSeller(prev => ({
          ...prev,
          ...aiData.seller
        }));
      }
      
      if (aiData.customer) {
        setCustomer(prev => ({
          ...prev,
          ...aiData.customer
        }));
      }
      
      if (aiData.products && aiData.products.length > 0) {
        setProducts(aiData.products.map(p => ({
          id: p.id || crypto.randomUUID(),
          name: p.name || "",
          unit: p.unit || "Nos",
          quantity: p.quantity || 1,
          unitPrice: p.unitPrice || 0,
          discountRate: p.discountRate || 0,
          tax: p.tax || 18,
          total: 0 // Will be calculated later
        })));
      }
      
      if (aiData.invoiceDetails) {
        setInvoiceDetails(prev => ({
          ...prev,
          ...aiData.invoiceDetails
        }));
      }
      
      toast({
        title: "Invoice Generated",
        description: "AI has populated the invoice fields based on your description"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate invoice from your description",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AI Invoice Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Describe the invoice you want to create. For example: 'Create an invoice for ABC Enterprises selling 5 laptops at Rs.45000 each to XYZ Corp with GST 27AAPFU0939F1ZV with payment via UPI.'"
          className="min-h-32"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleGenerate} 
          disabled={isLoading || !prompt.trim()} 
          className="ml-auto"
        >
          {isLoading && <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />}
          Generate with AI
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AIInvoiceGenerator;
