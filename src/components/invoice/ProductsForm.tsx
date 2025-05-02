
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Trash2, Plus } from "lucide-react";
import { useInvoice } from "@/contexts/InvoiceContext";
import { formatIndianCurrency } from "@/utils/gstUtils";

const ProductsForm = () => {
  const { products, setProducts, addProduct, removeProduct } = useInvoice();

  const handleChange = (id: string, field: string, value: string | number) => {
    setProducts(prevProducts => 
      prevProducts.map(product => {
        if (product.id === id) {
          const updatedProduct = { ...product, [field]: value };
          
          // Recalculate total when quantity, price, or discount changes
          if (field === 'quantity' || field === 'unitPrice' || field === 'discountRate' || field === 'tax') {
            const quantity = field === 'quantity' ? Number(value) : product.quantity;
            const unitPrice = field === 'unitPrice' ? Number(value) : product.unitPrice;
            const discountRate = field === 'discountRate' ? Number(value) : product.discountRate;
            const tax = field === 'tax' ? Number(value) : product.tax;
            
            const subtotal = quantity * unitPrice;
            const discountAmount = (subtotal * discountRate) / 100;
            const taxableAmount = subtotal - discountAmount;
            const taxAmount = (taxableAmount * tax) / 100;
            
            updatedProduct.total = taxableAmount + taxAmount;
          }
          
          return updatedProduct;
        }
        return product;
      })
    );
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Products / Services</h2>
        <Button onClick={addProduct} variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add Item
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Discount %</TableHead>
              <TableHead>GST %</TableHead>
              <TableHead>Total</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Input
                    value={product.name}
                    onChange={(e) => handleChange(product.id, 'name', e.target.value)}
                    placeholder="Item name"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={product.unit}
                    onChange={(e) => handleChange(product.id, 'unit', e.target.value)}
                    placeholder="Unit"
                    className="w-16 md:w-20"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={product.quantity}
                    onChange={(e) => handleChange(product.id, 'quantity', Number(e.target.value))}
                    min="1"
                    className="w-16 md:w-20"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={product.unitPrice}
                    onChange={(e) => handleChange(product.id, 'unitPrice', Number(e.target.value))}
                    min="0"
                    className="w-20 md:w-28"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={product.discountRate}
                    onChange={(e) => handleChange(product.id, 'discountRate', Number(e.target.value))}
                    min="0"
                    max="100"
                    className="w-16 md:w-20"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={product.tax}
                    onChange={(e) => handleChange(product.id, 'tax', Number(e.target.value))}
                    min="0"
                    className="w-16 md:w-20"
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {formatIndianCurrency(product.total || 0)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeProduct(product.id)}
                    disabled={products.length === 1}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductsForm;
