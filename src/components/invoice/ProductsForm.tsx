import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Trash2, Plus } from "lucide-react";
import { useInvoice } from "@/contexts/InvoiceContext";
import { formatIndianCurrency } from "@/utils/gstUtils";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "../ui/select";

const unitOptions = [
  { value: "Nos", label: "Nos" },
  { value: "Kg", label: "Kilogram (Kg)" },
  { value: "g", label: "Gram (g)" },
  { value: "L", label: "Liter (L)" },
  { value: "ml", label: "Milliliter (ml)" },
  { value: "m", label: "Meter (m)" },
  { value: "cm", label: "Centimeter (cm)" },
  { value: "mm", label: "Millimeter (mm)" },
  { value: "Pc", label: "Piece (Pc)" },
  { value: "Box", label: "Box" },
  { value: "Pkg", label: "Package (Pkg)" },
  { value: "Dz", label: "Dozen (Dz)" },
  { value: "Hr", label: "Hour (Hr)" },
  { value: "Day", label: "Day" },
  { value: "Set", label: "Set" },
  { value: "Unit", label: "Unit" },
  { value: "Sq.m", label: "Square Meter" },
  { value: "Sq.ft", label: "Square Feet" },
  { value: "Ream", label: "Ream (Paper)" },
  { value: "Qtl", label: "Quintal" },
  { value: "Ton", label: "Ton" },
  { value: "Bottle", label: "Bottle" },
  { value: "Carton", label: "Carton" },
  { value: "Roll", label: "Roll" },
  { value: "Sheet", label: "Sheet" },
];

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
                <TableHead className="w-[45%]">Item</TableHead>
                <TableHead className="w-[10%]">Unit</TableHead>
                <TableHead className="w-[8%]">Qty</TableHead>
                <TableHead className="w-[12%]">Unit Price</TableHead>
                <TableHead className="w-[10%]">Discount %</TableHead>
                <TableHead className="w-[8%]">GST %</TableHead>
                <TableHead className="w-[12%]">Total</TableHead>
                <TableHead className="w-[3%]"></TableHead>
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
                      className="text-base font-medium min-h-[48px]"
                    />
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={product.unit} 
                      onValueChange={(value) => handleChange(product.id, 'unit', value)}
                    >
                      <SelectTrigger className="w-full min-h-[48px]">
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {unitOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={product.quantity}
                      onChange={(e) => handleChange(product.id, 'quantity', Number(e.target.value))}
                      min="1"
                      className="w-16 md:w-24 text-base min-h-[48px]"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={product.unitPrice}
                      onChange={(e) => handleChange(product.id, 'unitPrice', Number(e.target.value))}
                      min="0"
                      className="w-24 md:w-30 text-base min-h-[48px]"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={product.discountRate}
                      onChange={(e) => handleChange(product.id, 'discountRate', Number(e.target.value))}
                      min="0"
                      max="100"
                      className="w-20 md:w-24 text-base min-h-[48px]"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={product.tax}
                      onChange={(e) => handleChange(product.id, 'tax', Number(e.target.value))}
                      min="0"
                      className="w-16 md:w-20 text-base min-h-[48px]"
                    />
                  </TableCell>
                  <TableCell className="font-medium text-base">
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
            <div key={product.id} className="border rounded-md p-5 space-y-4 relative">
              <div className="absolute top-3 right-3">
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
                <p className="text-sm font-medium mb-2">Item {index + 1}</p>
                <Input
                  value={product.name}
                  onChange={(e) => handleChange(product.id, 'name', e.target.value)}
                  placeholder="Item name"
                  className="text-base font-medium h-14"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-2">Unit</p>
                  <Select 
                    value={product.unit} 
                    onValueChange={(value) => handleChange(product.id, 'unit', value)}
                  >
                    <SelectTrigger className="w-full h-14">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {unitOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Quantity</p>
                  <Input
                    type="number"
                    value={product.quantity}
                    onChange={(e) => handleChange(product.id, 'quantity', Number(e.target.value))}
                    min="1"
                    className="text-base h-14"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-2">Unit Price</p>
                  <Input
                    type="number"
                    value={product.unitPrice}
                    onChange={(e) => handleChange(product.id, 'unitPrice', Number(e.target.value))}
                    min="0"
                    className="text-base h-14"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Discount %</p>
                  <Input
                    type="number"
                    value={product.discountRate}
                    onChange={(e) => handleChange(product.id, 'discountRate', Number(e.target.value))}
                    min="0"
                    max="100"
                    className="text-base h-14"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-2">GST %</p>
                  <Input
                    type="number"
                    value={product.tax}
                    onChange={(e) => handleChange(product.id, 'tax', Number(e.target.value))}
                    min="0"
                    className="text-base h-14"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Total</p>
                  <p className="border rounded-md p-2 bg-gray-50 font-medium text-base h-14 flex items-center">
                    {formatIndianCurrency(product.total || 0)}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          <Button onClick={addProduct} className="w-full h-12">
            <Plus className="h-4 w-4 mr-2" />
            Add Another Item
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductsForm;
