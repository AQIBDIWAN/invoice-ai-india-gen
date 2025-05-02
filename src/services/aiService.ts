
import { Customer, InvoiceDetails, Product, Seller } from "../contexts/InvoiceContext";

export interface AIInvoiceData {
  seller: Partial<Seller>;
  customer: Partial<Customer>;
  products: Partial<Product>[];
  invoiceDetails: Partial<InvoiceDetails>;
}

// This is a mock function that simulates AI processing
// In a real app, this would connect to an LLM API
export const generateInvoiceFromText = async (prompt: string): Promise<AIInvoiceData> => {
  console.log("AI processing text:", prompt);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Extract business names from prompt
  const sellerMatch = prompt.match(/seller(?:\s*is|\s*:)?\s*([A-Za-z\s&]+)/i);
  const customerMatch = prompt.match(/customer(?:\s*is|\s*:)?\s*([A-Za-z\s&]+)/i);
  
  // Extract product info
  const productMatches = prompt.match(/(?:product|item|service)(?:\s*is|\s*:)?\s*([A-Za-z\s]+)(?:\s*for|\s*at|\s*costing)?\s*(?:Rs\.?|₹)?\s*(\d+)/gi);
  
  // Extract payment method
  const paymentMatch = prompt.match(/(?:payment|pay|paid)(?:\s*by|\s*via|\s*through|\s*using)?\s*([A-Za-z\s]+)/i);
  
  // Extract GST number
  const gstMatch = prompt.match(/(?:GST|GSTIN)(?:\s*number|\s*:|\s*is)?\s*([0-9A-Z]{15})/i);
  
  // Generate random GST if not found
  const randomGST = `${Math.floor(Math.random() * 30 + 1).toString().padStart(2, '0')}AABCT1234D1Z${Math.floor(Math.random() * 10)}`;
  
  // Parse products
  const products: Partial<Product>[] = [];
  if (productMatches) {
    productMatches.forEach((match, index) => {
      const parts = match.match(/(?:product|item|service)(?:\s*is|\s*:)?\s*([A-Za-z\s]+)(?:\s*for|\s*at|\s*costing)?\s*(?:Rs\.?|₹)?\s*(\d+)/i);
      if (parts && parts.length >= 3) {
        products.push({
          id: crypto.randomUUID(),
          name: parts[1].trim(),
          unit: "Nos",
          quantity: Math.floor(Math.random() * 5) + 1,
          unitPrice: parseInt(parts[2]),
          discountRate: Math.floor(Math.random() * 10),
          tax: 18
        });
      }
    });
  }
  
  // If no products found, add a default one
  if (products.length === 0) {
    const nouns = ["Service", "Product", "Consultation", "Item", "Goods"];
    const adjectives = ["Premium", "Standard", "Professional", "Custom", "Basic"];
    
    products.push({
      id: crypto.randomUUID(),
      name: `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`,
      unit: "Nos",
      quantity: Math.floor(Math.random() * 5) + 1,
      unitPrice: Math.floor(Math.random() * 10000) + 1000,
      discountRate: Math.floor(Math.random() * 10),
      tax: 18
    });
  }
  
  return {
    seller: {
      gstNumber: gstMatch ? gstMatch[1] : randomGST,
      businessName: sellerMatch ? sellerMatch[1].trim() : "ABC Enterprises",
      name: "Supplier",
      state: "Maharashtra",
      city: "Mumbai",
      address: "123 Business Street",
      pincode: "400001",
      email: "info@abcenterprises.com",
      phone: "9876543210"
    },
    customer: {
      gstNumber: `${Math.floor(Math.random() * 30 + 1).toString().padStart(2, '0')}ADFRT1234D1Z${Math.floor(Math.random() * 10)}`,
      businessName: customerMatch ? customerMatch[1].trim() : "XYZ Corporation",
      name: "Customer",
      state: "Delhi",
      city: "New Delhi",
      address: "456 Client Road",
      pincode: "110001",
      email: "info@xyzcorp.com",
      phone: "9876543211"
    },
    products,
    invoiceDetails: {
      paymentMethod: paymentMatch ? paymentMatch[1].trim() : "Bank Transfer",
      description: `Invoice generated based on: "${prompt}"`
    }
  };
};
