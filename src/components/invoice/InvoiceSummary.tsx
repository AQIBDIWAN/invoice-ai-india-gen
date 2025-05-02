
import { useInvoice } from "@/contexts/InvoiceContext";
import { formatIndianCurrency, numberToWords } from "@/utils/gstUtils";

const InvoiceSummary = () => {
  const { 
    calculateSubTotal, 
    calculateTotalDiscount, 
    calculateTotalTax, 
    calculateGrandTotal 
  } = useInvoice();

  const subTotal = calculateSubTotal();
  const totalDiscount = calculateTotalDiscount();
  const totalTax = calculateTotalTax();
  const grandTotal = calculateGrandTotal();

  return (
    <div className="border rounded-md p-4 bg-gray-50 animate-fade-in">
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal:</span>
          <span>{formatIndianCurrency(subTotal)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Discount:</span>
          <span>- {formatIndianCurrency(totalDiscount)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">GST:</span>
          <span>+ {formatIndianCurrency(totalTax)}</span>
        </div>
        
        <div className="border-t pt-2 flex justify-between font-bold">
          <span>Total:</span>
          <span>{formatIndianCurrency(grandTotal)}</span>
        </div>
        
        <div className="text-xs text-gray-600 italic pt-2">
          <span>Amount in words: </span>
          <span>{numberToWords(grandTotal)}</span>
        </div>
      </div>
    </div>
  );
};

export default InvoiceSummary;
