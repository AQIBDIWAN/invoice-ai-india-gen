
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
  
  // Improved extraction of business names
  const sellerMatch = prompt.match(/(?:seller|from|by|company)(?:\s*is|\s*:|\s*named)?\s*([A-Za-z0-9\s&,.'"-]+)/i);
  const customerMatch = prompt.match(/(?:customer|client|to|buyer)(?:\s*is|\s*:|\s*named)?\s*([A-Za-z0-9\s&,.'"-]+)/i);
  
  // Better product extraction
  const productMatches = prompt.match(/(?:product|item|service|laptop|computer|phone|sells?|buy|buys?|purchase|order)(?:\s*is|\s*:|\s*at|\s*for)?\s*(?:Rs\.?|₹)?\s*(\d+)/gi);
  const quantityMatch = prompt.match(/(\d+)\s*(?:nos|pcs|qty|pieces|units|laptops?|computers?|phones?|items?)/i);
  
  // Advanced quantity detection
  const numberMatch = prompt.match(/(\d+)(?:\s*(?:nos|pcs|qty|pieces|units|laptops?|computers?|items?|products?))?/i);
  const quantity = quantityMatch ? parseInt(quantityMatch[1]) : (numberMatch ? parseInt(numberMatch[1]) : 1);
  
  // Extract price pattern matches
  const priceMatch = prompt.match(/(?:Rs\.?|₹|INR|price|cost|amount|value|worth|total)(?:\s*[:=])?\s*(\d+[\d,.]*)/i);
  let unitPrice = 0;
  
  if (priceMatch && priceMatch[1]) {
    // Remove commas and convert to number
    unitPrice = parseInt(priceMatch[1].replace(/,/g, ''));
    
    // If it's a total price and we have a quantity, divide to get unit price
    if (quantity > 1 && prompt.toLowerCase().includes('total')) {
      unitPrice = Math.round(unitPrice / quantity);
    }
  } else {
    // Default price if none found
    unitPrice = Math.floor(Math.random() * 5000) + 1000;
  }
  
  // Extract payment method
  const paymentMatch = prompt.match(/(?:payment|pay|paid)(?:\s*by|\s*via|\s*through|\s*using|\s*mode|\s*method|\s*:)?\s*([A-Za-z\s]+)/i);
  
  // Extract GST number
  const gstMatch = prompt.match(/(?:GST|GSTIN)(?:\s*number|\s*:|\s*is|\s*no\.?)?\s*([0-9A-Z]{15})/i);
  
  // Generate random GST if not found
  const randomGST = `${Math.floor(Math.random() * 30 + 1).toString().padStart(2, '0')}AABCT${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}D1Z${Math.floor(Math.random() * 10)}`;
  
  // Extract product name
  const productNameMatch = prompt.match(/(?:sells?|buys?|purchase|order)\s+(\d+)?\s*([A-Za-z\s]+?)(?:\s+for|from|at|to|with|costing)/i);
  
  // Determine product name and category
  let productName = "";
  if (productNameMatch && productNameMatch[2]) {
    productName = productNameMatch[2].trim();
  } else if (prompt.match(/laptop/i)) {
    productName = "Laptop";
  } else if (prompt.match(/phone/i)) {
    productName = "Smartphone";
  } else if (prompt.match(/computer/i)) {
    productName = "Desktop Computer";
  } else {
    const nouns = ["Service", "Product", "Consultation", "Item", "Goods"];
    const adjectives = ["Premium", "Standard", "Professional", "Custom", "Basic"];
    productName = `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
  }
  
  // Parse products
  const products: Partial<Product>[] = [];
  
  // Add main product (always)
  products.push({
    id: crypto.randomUUID(),
    name: productName,
    unit: "Nos",
    quantity: quantity,
    unitPrice: unitPrice,
    discountRate: Math.floor(Math.random() * 10),
    tax: 18
  });
  
  // Extract company names more accurately
  const sellerName = sellerMatch ? 
    sellerMatch[1].replace(/(?:is|:|named|by|from)\s*$/i, '').trim() : 
    "ABC Enterprises";
    
  const customerName = customerMatch ? 
    customerMatch[1].replace(/(?:is|:|named|to|for)\s*$/i, '').trim() : 
    "XYZ Corporation";
  
  return {
    seller: {
      gstNumber: gstMatch ? gstMatch[1] : randomGST,
      businessName: sellerName,
      name: "Supplier",
      state: "Maharashtra",
      city: "Mumbai",
      address: "123 Business Street",
      pincode: "400001",
      email: `info@${sellerName.toLowerCase().replace(/\s+/g, '')}.com`,
      phone: "9876543210"
    },
    customer: {
      gstNumber: `${Math.floor(Math.random() * 30 + 1).toString().padStart(2, '0')}ADFRT${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}D1Z${Math.floor(Math.random() * 10)}`,
      businessName: customerName,
      name: "Customer",
      state: "Delhi",
      city: "New Delhi",
      address: "456 Client Road",
      pincode: "110001",
      email: `info@${customerName.toLowerCase().replace(/\s+/g, '')}.com`,
      phone: "9876543211"
    },
    products,
    invoiceDetails: {
      paymentMethod: paymentMatch ? paymentMatch[1].trim() : "Bank Transfer",
      description: `Invoice generated based on: "${prompt}"`
    }
  };
};
