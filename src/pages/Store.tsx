
import { useState } from "react";
import { Search, Filter, ShoppingBag, ChevronDown, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// High-quality product data with Amazon-sourced images
const products = [
  {
    id: 1,
    name: "Royal Canin Premium Dog Food",
    description: "Size-specific nutrition with exclusive kibble technologies for optimal health",
    price: 56.99,
    image: "https://images-na.ssl-images-amazon.com/images/I/81VL9zXiDZL._AC_SL1500_.jpg",
    rating: 4.8,
    reviews: 4223,
    category: "Food",
    petType: "Dog",
    bestseller: true,
    source: "Amazon"
  },
  {
    id: 2,
    name: "FEANDREA Cat Tree Tower",
    description: "Multi-level cat condo with scratching posts, perches and cozy hammock",
    price: 75.99,
    image: "https://images-na.ssl-images-amazon.com/images/I/71cUXyZHxfL._AC_SL1500_.jpg",
    rating: 4.6,
    reviews: 2189,
    category: "Toys & Accessories",
    petType: "Cat",
    source: "Amazon"
  },
  {
    id: 3,
    name: "Tractive GPS Pet Tracker",
    description: "Real-time location tracking with activity monitoring for dogs and cats",
    price: 49.99,
    image: "https://images-na.ssl-images-amazon.com/images/I/51jnQ89qRtL._AC_SL1000_.jpg",
    rating: 4.5,
    reviews: 864,
    category: "Tech",
    petType: "All",
    bestseller: true,
    source: "Amazon"
  },
  {
    id: 4,
    name: "Orthopedic Dog Bed",
    description: "Memory foam dog bed with removable washable cover for enhanced comfort",
    price: 69.95,
    image: "https://images-na.ssl-images-amazon.com/images/I/81QR7pH5VrL._AC_SL1500_.jpg",
    rating: 4.7,
    reviews: 3512,
    category: "Beds & Furniture",
    petType: "Dog",
    source: "Amazon"
  },
  {
    id: 5,
    name: "Outward Hound Nina Ottosson Puzzle Toy",
    description: "Interactive treat puzzle to challenge your pet's mind and reduce boredom",
    price: 24.95,
    image: "https://images-na.ssl-images-amazon.com/images/I/718LHW6mllL._AC_SL1500_.jpg",
    rating: 4.5,
    reviews: 1678,
    category: "Toys & Accessories",
    petType: "Dog",
    source: "Amazon"
  },
  {
    id: 6,
    name: "Blue Buffalo Indoor Cat Food",
    description: "Natural dry cat food with real chicken and brown rice for indoor cats",
    price: 36.99,
    image: "https://images-na.ssl-images-amazon.com/images/I/81AYU3O3M1L._AC_SL1500_.jpg",
    rating: 4.7,
    reviews: 3095,
    category: "Food",
    petType: "Cat",
    source: "Amazon"
  }
];

export default function Store() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.petType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page-container page-transition">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pet Store</h1>
        <p className="text-muted-foreground">
          Shop for premium pet food, toys, accessories, and wellness products.
        </p>
      </div>

      {/* Search and filters */}
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

      {/* Store tabs */}
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
            Showing {filteredProducts.length} products
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 staggered-fade-in">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="shadow-sm card-hover">
                <div className="relative">
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" 
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
                    Source: {product.source}
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
                    <span className="text-lg font-semibold">${product.price}</span>
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
            ))}
          </div>
        </TabsContent>
        
        {/* Other tabs would have similar content but filtered by category */}
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

      {/* Featured section */}
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

      {/* Image Attribution */}
      <div className="text-xs text-muted-foreground mt-8 mb-6">
        <p>Image Sources: All product images are from Amazon.com and are used for demonstration purposes only.</p>
        <p>Pet photos courtesy of Unsplash photographers.</p>
      </div>
    </div>
  );
}
