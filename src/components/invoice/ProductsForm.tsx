
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Trash2, Plus } from "lucide-react";
import { useInvoice } from "@/contexts/InvoiceContext";
import { formatIndianCurrency } from "@/utils/gstUtils";
import { useIsMobile } from "@/hooks/use-mobile";

const ProductsForm = () => {
  const { products, setProducts, addProduct, removeProduct } = useInvoice();
  const isMobile = useIsMobile();

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
          <span className="hidden sm:inline">Add Item</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>
      
      {!isMobile && (
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
      )}
      
      {isMobile && (
        <div className="space-y-6">
          {products.map((product, index) => (
            <div key={product.id} className="border rounded-md p-4 space-y-3 relative">
              <div className="absolute top-2 right-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProduct(product.id)}
                  disabled={products.length === 1}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Item {index + 1}</p>
                <Input
                  value={product.name}
                  onChange={(e) => handleChange(product.id, 'name', e.target.value)}
                  placeholder="Item name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-medium mb-1">Unit</p>
                  <Input
                    value={product.unit}
                    onChange={(e) => handleChange(product.id, 'unit', e.target.value)}
                    placeholder="Unit"
                  />
                </div>
                <div>
                  <p className="text-xs font-medium mb-1">Quantity</p>
                  <Input
                    type="number"
                    value={product.quantity}
                    onChange={(e) => handleChange(product.id, 'quantity', Number(e.target.value))}
                    min="1"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-medium mb-1">Unit Price</p>
                  <Input
                    type="number"
                    value={product.unitPrice}
                    onChange={(e) => handleChange(product.id, 'unitPrice', Number(e.target.value))}
                    min="0"
                  />
                </div>
                <div>
                  <p className="text-xs font-medium mb-1">Discount %</p>
                  <Input
                    type="number"
                    value={product.discountRate}
                    onChange={(e) => handleChange(product.id, 'discountRate', Number(e.target.value))}
                    min="0"
                    max="100"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-medium mb-1">GST %</p>
                  <Input
                    type="number"
                    value={product.tax}
                    onChange={(e) => handleChange(product.id, 'tax', Number(e.target.value))}
                    min="0"
                  />
                </div>
                <div>
                  <p className="text-xs font-medium mb-1">Total</p>
                  <p className="border rounded-md p-2 bg-gray-50 font-medium">
                    {formatIndianCurrency(product.total || 0)}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          <Button onClick={addProduct} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Another Item
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductsForm;
