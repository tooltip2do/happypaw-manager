
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Define the product type
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

const Store = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    description: "",
    price: 0,
    image: "",
  });
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // Load products from localStorage on component mount
  useEffect(() => {
    const savedProducts = localStorage.getItem("petStoreProducts");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  // Save products to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem("petStoreProducts", JSON.stringify(products));
  }, [products]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle price separately to ensure it's a number
    if (name === "price") {
      setNewProduct({
        ...newProduct,
        [name]: parseFloat(value) || 0, // Convert to number and default to 0 if NaN
      });
    } else {
      setNewProduct({
        ...newProduct,
        [name]: value,
      });
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!newProduct.name || !newProduct.description || newProduct.price <= 0) {
      toast.error("Please fill all required fields and ensure price is greater than zero");
      return;
    }
    
    // Add new product with a unique id
    const newProductWithId = {
      ...newProduct,
      id: Date.now(),
    };
    
    setProducts([...products, newProductWithId]);
    
    // Reset form
    setNewProduct({
      name: "",
      description: "",
      price: 0,
      image: "",
    });
    
    setIsAddingProduct(false);
    toast.success("Product added successfully!");
  };

  const toggleAddProductForm = () => {
    setIsAddingProduct(!isAddingProduct);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Pet Store</h1>
          <p className="text-muted-foreground mt-2">
            Find all the supplies your pet needs for a happy, healthy life.
          </p>
        </div>
        <Button 
          onClick={toggleAddProductForm} 
          className="mt-4 md:mt-0"
        >
          {isAddingProduct ? "Cancel" : "Add New Product"}
        </Button>
      </div>

      {isAddingProduct && (
        <Card className="mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleAddProduct}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={newProduct.name}
                    onChange={handleInputChange} 
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    value={newProduct.description}
                    onChange={handleInputChange} 
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="price">Price ($) *</Label>
                  <Input 
                    id="price" 
                    name="price" 
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={newProduct.price}
                    onChange={handleInputChange} 
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input 
                    id="image" 
                    name="image" 
                    value={newProduct.image}
                    onChange={handleInputChange} 
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <Button type="submit" className="w-full">Add Product</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products yet. Add your first product!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              {product.image ? (
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/400x300?text=Product+Image"; 
                    }}
                  />
                </div>
              ) : (
                <div className="aspect-video w-full bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">No image available</p>
                </div>
              )}
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-muted-foreground mt-2">{product.description}</p>
                <p className="text-lg font-bold mt-4">${product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button variant="outline" className="w-full">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Store;
