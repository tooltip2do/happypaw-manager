import { useState, useEffect } from "react";
import { Search, Filter, ShoppingBag, ChevronDown, Heart, ShoppingCart, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  petType: string;
  bestseller?: boolean;
  source?: string;
}

const productSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  price: z.string().transform((val) => Number(val)),
  image: z.string().url({ message: "Please enter a valid image URL" }),
  category: z.string().min(1, { message: "Please select a category" }),
  petType: z.string().min(1, { message: "Please select a pet type" }),
});

export default function Store() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      image: "",
      category: "Food",
      petType: "Dog",
    },
  });

  useEffect(() => {
    const savedProducts = localStorage.getItem("petStoreProducts");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("petStoreProducts", JSON.stringify(products));
  }, [products]);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.petType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onSubmit = (values: z.infer<typeof productSchema>) => {
    const newProduct: Product = {
      id: Date.now(),
      name: values.name,
      description: values.description,
      price: Number(values.price),
      image: values.image,
      rating: 5.0,
      reviews: 0,
      category: values.category,
      petType: values.petType,
      source: "Custom"
    };

    setProducts([...products, newProduct]);
    setIsAddProductOpen(false);
    form.reset();
    
    toast({
      title: "Product Added",
      description: `${values.name} has been added to your store.`,
    });
  };

  return (
    <div className="page-container page-transition">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pet Store</h1>
          <p className="text-muted-foreground">
            Shop for premium pet food, toys, accessories, and wellness products.
          </p>
        </div>
        <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Create a new product for your pet store.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Premium Dog Food" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="High-quality ingredients for your pet" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Price ($)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" min="0" placeholder="29.99" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/image.jpg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <select 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            {...field}
                          >
                            <option value="Food">Food & Treats</option>
                            <option value="Toys">Toys & Accessories</option>
                            <option value="Health">Health & Wellness</option>
                            <option value="Tech">Pet Tech</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="petType"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Pet Type</FormLabel>
                        <FormControl>
                          <select 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            {...field}
                          >
                            <option value="Dog">Dog</option>
                            <option value="Cat">Cat</option>
                            <option value="Bird">Bird</option>
                            <option value="Fish">Fish</option>
                            <option value="Small Animal">Small Animal</option>
                            <option value="All">All Pets</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">Add Product</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col space-y-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search products..." 
            className="pl-10 py-6 text-base shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="rounded-full">
            Pet Type: All
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Category: All
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Price: All
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Sort By: Popular
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-10">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Products</TabsTrigger>
          <TabsTrigger value="food">Food & Treats</TabsTrigger>
          <TabsTrigger value="toys">Toys & Accessories</TabsTrigger>
          <TabsTrigger value="health">Health & Wellness</TabsTrigger>
          <TabsTrigger value="tech">Pet Tech</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="text-sm text-muted-foreground mb-4">
            {filteredProducts.length === 0 ? 
              "No products found. Add your first product!" : 
              `Showing ${filteredProducts.length} products`
            }
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 staggered-fade-in">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <ShoppingBag className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-2">Your store is empty</h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  Add your first product to get started. Click the "Add Product" button above.
                </p>
                <Button onClick={() => setIsAddProductOpen(true)} className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Add Your First Product
                </Button>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <Card key={product.id} className="shadow-sm card-hover">
                  <div className="relative">
                    <div className="aspect-square overflow-hidden rounded-t-lg">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                        }}
                      />
                    </div>
                    <button className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-center">
                      <Heart className="h-4 w-4 text-gray-600 hover:text-petcare-coral" />
                    </button>
                    {product.bestseller && (
                      <div className="absolute top-3 left-3 bg-petcare-coral/90 text-white text-xs font-medium px-2 py-1 rounded-full">
                        Bestseller
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 bg-white/80 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full">
                      Source: {product.source || "Custom"}
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div>
                      <CardTitle className="text-base">{product.name}</CardTitle>
                      <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
                      <div className="flex items-center space-x-1 text-xs">
                        <span className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span 
                              key={i} 
                              className={`h-3 w-3 text-yellow-500 ${i < Math.floor(product.rating) ? 'fill-yellow-500' : 'fill-none'}`}
                            >
                              ★
                            </span>
                          ))}
                        </span>
                        <span className="text-muted-foreground">({product.reviews})</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="food" className="space-y-4">
          <div className="text-center py-8">
            <h3 className="text-lg font-medium mb-2">Browse Food & Treats</h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Select the "All Products" tab to see our full range of pet products, including food and treats.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="toys" className="space-y-4">
          <div className="text-center py-8">
            <h3 className="text-lg font-medium mb-2">Browse Toys & Accessories</h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Select the "All Products" tab to see our full range of pet products, including toys and accessories.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="health" className="space-y-4">
          <div className="text-center py-8">
            <h3 className="text-lg font-medium mb-2">Browse Health & Wellness</h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Select the "All Products" tab to see our full range of pet products, including health and wellness items.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="tech" className="space-y-4">
          <div className="text-center py-8">
            <h3 className="text-lg font-medium mb-2">Browse Pet Tech</h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Select the "All Products" tab to see our full range of pet products, including pet tech.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <section className="mb-10">
        <div className="bg-gradient-to-r from-petcare-blue/10 to-petcare-teal/10 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="md:max-w-lg">
              <h2 className="text-xl font-semibold mb-2">PetCare Premium Subscription</h2>
              <p className="text-muted-foreground mb-4 md:mb-0">
                Get exclusive discounts, free shipping, and early access to new products with our Premium subscription.
              </p>
            </div>
            <Button className="self-start bg-petcare-blue hover:bg-petcare-blue/90">Learn More</Button>
          </div>
        </div>
      </section>

      <div className="text-xs text-muted-foreground mt-8 mb-6">
        <p>Image Sources: Product images are from user uploads or defaults.</p>
        <p>Pet photos courtesy of Unsplash photographers.</p>
      </div>
    </div>
  );
}
