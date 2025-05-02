import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface Product {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  discountRate: number;
  tax: number;
  total: number;
}

export interface Seller {
  gstNumber: string;
  name: string;
  surname: string;
  businessName: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  email: string;
  phone: string;
  logo?: string;
}

export interface Customer {
  gstNumber: string;
  name: string;
  businessName: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  email: string;
  phone: string;
}

export interface InvoiceDetails {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  paymentMethod: string;
  isPaid: boolean;
  description: string;
}

interface InvoiceContextType {
  seller: Seller;
  setSeller: React.Dispatch<React.SetStateAction<Seller>>;
  customer: Customer;
  setCustomer: React.Dispatch<React.SetStateAction<Customer>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  invoiceDetails: InvoiceDetails;
  setInvoiceDetails: React.Dispatch<React.SetStateAction<InvoiceDetails>>;
  addProduct: () => void;
  removeProduct: (id: string) => void;
  calculateSubTotal: () => number;
  calculateTotalTax: () => number;
  calculateTotalDiscount: () => number;
  calculateGrandTotal: () => number;
  resetInvoice: () => void;
}

const defaultInvoiceContext: InvoiceContextType = {
  seller: {
    gstNumber: "",
    name: "",
    surname: "",
    businessName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    email: "",
    phone: "",
    logo: ""
  },
  setSeller: () => {},
  customer: {
    gstNumber: "",
    name: "",
    businessName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    email: "",
    phone: ""
  },
  setCustomer: () => {},
  products: [],
  setProducts: () => {},
  invoiceDetails: {
    invoiceNumber: "",
    issueDate: "",
    dueDate: "",
    paymentMethod: "",
    isPaid: false,
    description: ""
  },
  setInvoiceDetails: () => {},
  addProduct: () => {},
  removeProduct: () => {},
  calculateSubTotal: () => 0,
  calculateTotalTax: () => 0,
  calculateTotalDiscount: () => 0,
  calculateGrandTotal: () => 0,
  resetInvoice: () => {}
};

const InvoiceContext = createContext<InvoiceContextType>(defaultInvoiceContext);

export const useInvoice = () => {
  return useContext(InvoiceContext);
};

export const InvoiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [seller, setSeller] = useState<Seller>({
    gstNumber: "",
    name: "",
    surname: "",
    businessName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    email: "",
    phone: "",
    logo: ""
  });

  // Load seller logo from localStorage
  useEffect(() => {
    const storedLogo = localStorage.getItem('sellerLogo');
    if (storedLogo) {
      setSeller(prev => ({ ...prev, logo: storedLogo }));
    }
  }, []);

  const [customer, setCustomer] = useState<Customer>({
    gstNumber: "",
    name: "",
    businessName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    email: "",
    phone: ""
  });

  const [products, setProducts] = useState<Product[]>([
    {
      id: crypto.randomUUID(),
      name: "",
      unit: "Nos",
      quantity: 1,
      unitPrice: 0,
      discountRate: 0,
      tax: 18, // Default GST rate in India
      total: 0
    }
  ]);

  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetails>({
    invoiceNumber: `INV-${Date.now().toString().slice(-8)}`,
    issueDate: new Date().toISOString().slice(0, 10),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    paymentMethod: "Bank Transfer",
    isPaid: false,
    description: ""
  });

  const addProduct = () => {
    setProducts([
      ...products,
      {
        id: crypto.randomUUID(),
        name: "",
        unit: "Nos",
        quantity: 1,
        unitPrice: 0,
        discountRate: 0,
        tax: 18,
        total: 0
      }
    ]);
  };

  const removeProduct = (id: string) => {
    if (products.length > 1) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  const calculateSubTotal = () => {
    return products.reduce((sum, product) => {
      const productTotal = product.quantity * product.unitPrice;
      return sum + productTotal;
    }, 0);
  };

  const calculateTotalTax = () => {
    return products.reduce((sum, product) => {
      const productTotal = product.quantity * product.unitPrice;
      const discountAmount = (productTotal * product.discountRate) / 100;
      const taxableAmount = productTotal - discountAmount;
      const taxAmount = (taxableAmount * product.tax) / 100;
      return sum + taxAmount;
    }, 0);
  };

  const calculateTotalDiscount = () => {
    return products.reduce((sum, product) => {
      const productTotal = product.quantity * product.unitPrice;
      const discountAmount = (productTotal * product.discountRate) / 100;
      return sum + discountAmount;
    }, 0);
  };

  const calculateGrandTotal = () => {
    return calculateSubTotal() - calculateTotalDiscount() + calculateTotalTax();
  };

  const resetInvoice = () => {
    const storedLogo = localStorage.getItem('sellerLogo');
    
    setSeller({
      gstNumber: "",
      name: "",
      surname: "",
      businessName: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      email: "",
      phone: "",
      logo: storedLogo || ""
    });
    
    setCustomer({
      gstNumber: "",
      name: "",
      businessName: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      email: "",
      phone: ""
    });
    
    setProducts([
      {
        id: crypto.randomUUID(),
        name: "",
        unit: "Nos",
        quantity: 1,
        unitPrice: 0,
        discountRate: 0,
        tax: 18,
        total: 0
      }
    ]);
    
    setInvoiceDetails({
      invoiceNumber: `INV-${Date.now().toString().slice(-8)}`,
      issueDate: new Date().toISOString().slice(0, 10),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      paymentMethod: "Bank Transfer",
      isPaid: false,
      description: ""
    });
  };

  const value = {
    seller,
    setSeller,
    customer,
    setCustomer,
    products,
    setProducts,
    invoiceDetails,
    setInvoiceDetails,
    addProduct,
    removeProduct,
    calculateSubTotal,
    calculateTotalTax,
    calculateTotalDiscount,
    calculateGrandTotal,
    resetInvoice
  };

  return <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>;
};
