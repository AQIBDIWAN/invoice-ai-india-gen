
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Bot, ArrowLeft, Eye, Printer } from "lucide-react";
import SellerForm from "@/components/invoice/SellerForm";
import CustomerForm from "@/components/invoice/CustomerForm";
import ProductsForm from "@/components/invoice/ProductsForm";
import InvoiceDetailsForm from "@/components/invoice/InvoiceDetailsForm";
import InvoicePreview from "@/components/invoice/InvoicePreview";
import AIInvoiceGenerator from "@/components/invoice/AIInvoiceGenerator";
import InvoiceSummary from "@/components/invoice/InvoiceSummary";
import { useInvoice } from "@/contexts/InvoiceContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

const CreateInvoice = () => {
  const [activeTab, setActiveTab] = useState<string>("manual");
  const { resetInvoice } = useInvoice();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handlePrintInvoice = () => {
    const printButton = document.querySelector("#invoice-preview button") as HTMLButtonElement;
    if (printButton) {
      printButton.click();
    } else {
      toast.error("Couldn't find print button. Please try again.");
    }
  };

  // Open preview in a new window without resetting the invoice data
  const handleViewPreview = () => {
    // Open a new window with just the invoice content
    const previewWindow = window.open('', '_blank');
    
    if (previewWindow && document.querySelector("#invoice-print")) {
      // Get the invoice content
      const content = document.querySelector("#invoice-print")?.innerHTML;
      
      // Write the content to the new window with appropriate styling
      previewWindow.document.write(`
        <html>
          <head>
            <title>Invoice Preview</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                margin: 0; 
                padding: 10mm;
                font-size: 14px;
              }
              .invoice-paper { 
                width: 100%;
                max-width: 210mm;
                margin: 0 auto;
                padding: 0;
              }
              /* Include all other necessary styles from InvoicePreview.tsx */
              table { width: 100%; border-collapse: collapse; }
              th, td { padding: 5px; text-align: left; }
              th { border-bottom: 1px solid #ddd; }
              td { border-bottom: 1px solid #eee; }
              .text-right { text-align: right; }
              .text-center { text-align: center; }
              .font-bold { font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="invoice-paper">
              ${content}
            </div>
          </body>
        </html>
      `);
      
      // Prevent the window from closing immediately
      previewWindow.document.close();
    } else {
      toast.error("Couldn't generate preview. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Button variant="ghost" className="mb-2 -ml-2" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold">Create Invoice</h1>
          <p className="text-gray-500">Fill in the details to generate an invoice</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetInvoice}>
            Reset
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manual" className="flex gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Manual Entry</span>
            <span className="sm:hidden">Manual</span>
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex gap-2">
            <Bot className="h-4 w-4" />
            <span className="hidden sm:inline">AI Generator</span>
            <span className="sm:hidden">AI</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="manual">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-4 sm:p-6">
                <SellerForm />
              </Card>
              
              <Card className="p-4 sm:p-6">
                <CustomerForm />
              </Card>
              
              <Card className="p-4 sm:p-6">
                <InvoiceDetailsForm />
              </Card>
              
              <Card className="p-4 sm:p-6">
                <ProductsForm />
              </Card>
              
              <div className="max-w-md ml-auto">
                <InvoiceSummary />
              </div>
            </div>
            
            {!isMobile && (
              <div className="lg:col-span-1">
                <div className="sticky top-6">
                  <InvoicePreview />
                </div>
              </div>
            )}
            
            {isMobile && (
              <div className="lg:col-span-1">
                <Card className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Invoice Actions</h3>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={handlePrintInvoice}
                      className="flex items-center gap-2"
                    >
                      <Printer className="h-4 w-4" />
                      Print Invoice
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Complete the form to generate your invoice. Click the button above to print it.</p>
                </Card>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="ai">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <AIInvoiceGenerator />
              
              <Card className="p-4 sm:p-6">
                <SellerForm />
              </Card>
              
              <Card className="p-4 sm:p-6">
                <CustomerForm />
              </Card>
              
              <Card className="p-4 sm:p-6">
                <InvoiceDetailsForm />
              </Card>
              
              <Card className="p-4 sm:p-6">
                <ProductsForm />
              </Card>
              
              <div className="max-w-md ml-auto">
                <InvoiceSummary />
              </div>
            </div>
            
            {!isMobile && (
              <div className="lg:col-span-1">
                <div className="sticky top-6">
                  <InvoicePreview />
                </div>
              </div>
            )}
            
            {isMobile && (
              <div className="lg:col-span-1">
                <Card className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Invoice Actions</h3>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={handlePrintInvoice}
                      className="flex items-center gap-2"
                    >
                      <Printer className="h-4 w-4" />
                      Print Invoice
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Complete the form to generate your invoice. Click the button above to print it.</p>
                </Card>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreateInvoice;
