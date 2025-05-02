
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Bot, Printer } from "lucide-react";
import SellerForm from "@/components/invoice/SellerForm";
import CustomerForm from "@/components/invoice/CustomerForm";
import ProductsForm from "@/components/invoice/ProductsForm";
import InvoiceDetailsForm from "@/components/invoice/InvoiceDetailsForm";
import InvoicePreview from "@/components/invoice/InvoicePreview";
import AIInvoiceGenerator from "@/components/invoice/AIInvoiceGenerator";
import InvoiceSummary from "@/components/invoice/InvoiceSummary";
import { useInvoice } from "@/contexts/InvoiceContext";

const CreateInvoice = () => {
  const [activeTab, setActiveTab] = useState<string>("manual");
  const { resetInvoice } = useInvoice();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Create Invoice</h1>
          <p className="text-gray-500">Fill in the details to generate an invoice</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetInvoice}>
            Reset
          </Button>
          <Button onClick={() => window.print()}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manual" className="flex gap-2">
            <FileText className="h-4 w-4" />
            Manual Entry
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex gap-2">
            <Bot className="h-4 w-4" />
            AI Generator
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="manual">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <SellerForm />
              </Card>
              
              <Card className="p-6">
                <CustomerForm />
              </Card>
              
              <Card className="p-6">
                <InvoiceDetailsForm />
              </Card>
              
              <Card className="p-6">
                <ProductsForm />
              </Card>
              
              <div className="max-w-md ml-auto">
                <InvoiceSummary />
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <InvoicePreview />
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="ai">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <AIInvoiceGenerator />
              
              <Card className="p-6">
                <SellerForm />
              </Card>
              
              <Card className="p-6">
                <CustomerForm />
              </Card>
              
              <Card className="p-6">
                <InvoiceDetailsForm />
              </Card>
              
              <Card className="p-6">
                <ProductsForm />
              </Card>
              
              <div className="max-w-md ml-auto">
                <InvoiceSummary />
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <InvoicePreview />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreateInvoice;
