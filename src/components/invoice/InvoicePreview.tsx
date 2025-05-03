
import { useRef } from 'react';
import { Button } from '../ui/button';
import { formatIndianCurrency, numberToWords } from '@/utils/gstUtils';
import { useInvoice } from '@/contexts/InvoiceContext';
import { Printer } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const InvoicePreview = () => {
  const { 
    seller, 
    customer, 
    products, 
    invoiceDetails,
    calculateSubTotal,
    calculateTotalDiscount,
    calculateTotalTax,
    calculateGrandTotal
  } = useInvoice();
  
  const invoiceRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const handlePrint = () => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    
    if (printWindow && invoiceRef.current) {
      // Get the content to print
      const content = invoiceRef.current.innerHTML;
      
      // Add necessary styles
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Invoice</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                margin: 0; 
                padding: 10px; 
                font-size: 10px; 
              }
              .invoice-paper { 
                max-width: 100%; 
                margin: 0 auto; 
                page-break-inside: avoid; 
              }
              table { 
                width: 100%; 
                border-collapse: collapse; 
                table-layout: fixed;
              }
              th, td { 
                padding: 4px; 
                text-align: left; 
                overflow-wrap: break-word;
              }
              th { 
                border-bottom: 1px solid #ddd; 
                font-size: 10px;
              }
              td { 
                border-bottom: 1px solid #eee; 
                font-size: 10px;
              }
              .text-right { text-align: right; }
              .text-center { text-align: center; }
              .font-bold { font-weight: bold; }
              .text-gray-600 { color: #666; }
              img { max-height: 40px; }
              .product-table th:nth-child(1) { width: 25%; }
              .product-table th:nth-child(2) { width: 10%; }
              .product-table th:nth-child(3) { width: 8%; }
              .product-table th:nth-child(4) { width: 12%; }
              .product-table th:nth-child(5) { width: 10%; }
              .product-table th:nth-child(6) { width: 10%; }
              .product-table th:nth-child(7) { width: 15%; }
              
              .compact-text { font-size: 9px; }
              .total-section {
                width: 100%;
                max-width: 300px;
                margin-left: auto;
                page-break-inside: avoid;
              }
              @media print {
                body { 
                  -webkit-print-color-adjust: exact; 
                  width: 100%;
                  margin: 0;
                  padding: 5px;
                }
                .invoice-paper {
                  width: 100%;
                  max-width: 100%;
                  break-inside: avoid;
                }
                .header-section { margin-bottom: 10px; }
                .bill-section { margin-bottom: 10px; }
                .product-section { margin-bottom: 10px; }
              }
              @page {
                size: A4;
                margin: 0.3cm;
              }
            </style>
          </head>
          <body>
            <div class="invoice-paper">
              ${content}
            </div>
            <script>
              window.onload = function() { window.print(); window.setTimeout(function() { window.close(); }, 500); }
            </script>
          </body>
        </html>
      `);
      
      printWindow.document.close();
    }
  };
  
  const subTotal = calculateSubTotal();
  const totalDiscount = calculateTotalDiscount();
  const totalTax = calculateTotalTax();
  const grandTotal = calculateGrandTotal();
  
  return (
    <div className="space-y-4" id="invoice-preview">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Invoice Preview</h2>
        <Button onClick={handlePrint} className="flex items-center gap-2">
          <Printer className="h-4 w-4" />
          <span className="hidden sm:inline">Print Invoice</span>
          <span className="sm:hidden">Print</span>
        </Button>
      </div>
      
      <div 
        id="invoice-print" 
        ref={invoiceRef} 
        className="border rounded-lg p-4 sm:p-8 bg-white invoice-paper animate-fade-in overflow-x-auto"
      >
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start gap-4 header-section">
          <div className="flex items-center gap-4">
            {seller.logo && (
              <img 
                src={seller.logo} 
                alt="Seller Logo" 
                className="h-12 w-12 sm:h-16 sm:w-16 object-contain"
              />
            )}
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-invoice-primary">INVOICE</h1>
              <p className="text-xs sm:text-sm text-gray-500"># {invoiceDetails.invoiceNumber}</p>
            </div>
          </div>
          <div className="text-left sm:text-right w-full sm:w-auto">
            <div className="mb-2">
              <p className="font-semibold text-base sm:text-lg">{seller.businessName}</p>
              <p className="text-sm text-gray-600">{seller.address}</p>
              <p className="text-sm text-gray-600">{seller.city}, {seller.state} - {seller.pincode}</p>
            </div>
            <div className="text-xs sm:text-sm">
              <p>GSTIN: {seller.gstNumber}</p>
              <p>Email: {seller.email}</p>
              <p>Phone: {seller.phone}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8 bill-section">
          <div className="space-y-2">
            <h3 className="font-medium text-gray-600">Bill To:</h3>
            <p className="font-semibold">{customer.businessName}</p>
            <p>Attn: {customer.name}</p>
            <p className="text-sm">{customer.address}</p>
            <p className="text-sm">{customer.city}, {customer.state} - {customer.pincode}</p>
            <p className="text-sm">GSTIN: {customer.gstNumber}</p>
            <p className="text-sm">Email: {customer.email}</p>
            <p className="text-sm">Phone: {customer.phone}</p>
          </div>
          
          <div className="space-y-1 text-sm md:text-right">
            <div className="grid grid-cols-2">
              <p className="text-gray-600">Invoice Date:</p>
              <p>{new Date(invoiceDetails.issueDate).toLocaleDateString('en-IN')}</p>
            </div>
            <div className="grid grid-cols-2">
              <p className="text-gray-600">Due Date:</p>
              <p>{new Date(invoiceDetails.dueDate).toLocaleDateString('en-IN')}</p>
            </div>
            <div className="grid grid-cols-2">
              <p className="text-gray-600">Payment Method:</p>
              <p>{invoiceDetails.paymentMethod}</p>
            </div>
            <div className="grid grid-cols-2">
              <p className="text-gray-600">Status:</p>
              <p className={invoiceDetails.isPaid ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                {invoiceDetails.isPaid ? "Paid" : "Unpaid"}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-6 sm:mb-8 overflow-x-auto product-section">
          <div className="min-w-[600px]">
            <table className="w-full text-xs sm:text-sm product-table">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="py-2 text-left">Item</th>
                  <th className="py-2 text-center">Unit</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="py-2 text-right">Price</th>
                  <th className="py-2 text-right">Discount</th>
                  <th className="py-2 text-right">GST</th>
                  <th className="py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const itemTotal = product.quantity * product.unitPrice;
                  const discountAmount = (itemTotal * product.discountRate) / 100;
                  const taxableAmount = itemTotal - discountAmount;
                  const taxAmount = (taxableAmount * product.tax) / 100;
                  const total = taxableAmount + taxAmount;
                  
                  return (
                    <tr key={product.id} className="border-b border-gray-200">
                      <td className="py-2">{product.name}</td>
                      <td className="py-2 text-center">{product.unit}</td>
                      <td className="py-2 text-center">{product.quantity}</td>
                      <td className="py-2 text-right">{formatIndianCurrency(product.unitPrice)}</td>
                      <td className="py-2 text-right">{product.discountRate}%</td>
                      <td className="py-2 text-right">{product.tax}%</td>
                      <td className="py-2 text-right">{formatIndianCurrency(total)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="flex justify-end mb-6 sm:mb-8">
          <div className="w-full sm:w-1/2 total-section">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span>{formatIndianCurrency(subTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount:</span>
                <span>{formatIndianCurrency(totalDiscount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GST:</span>
                <span>{formatIndianCurrency(totalTax)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Total:</span>
                <span>{formatIndianCurrency(grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-3">
          <div className="mb-4">
            <p className="text-xs sm:text-sm italic compact-text">Amount in words: <span className="font-medium">{numberToWords(grandTotal)}</span></p>
          </div>
          
          {invoiceDetails.description && (
            <div className="mb-6">
              <h4 className="text-xs sm:text-sm font-semibold mb-1">Notes:</h4>
              <p className="text-xs sm:text-sm text-gray-600 compact-text">{invoiceDetails.description}</p>
            </div>
          )}
          
          <div className="mt-6 sm:mt-8 text-center text-xs text-gray-500 compact-text">
            <p>This is a computer generated invoice and does not require a physical signature.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
