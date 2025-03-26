import { useState } from "react";
import { Search, MapPin, Calendar, Star, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const providers = [
  {
    id: 1,
    name: "Central Veterinary Clinic",
    type: "Veterinarian",
    image: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviews: 124,
    distance: "1.2 mi",
    address: "123 Main St, New York, NY",
    services: ["Check-ups", "Vaccinations", "Surgery", "Dental Care"]
  },
  {
    id: 2,
    name: "Happy Tails Grooming",
    type: "Groomer",
    image: "https://images.unsplash.com/photo-1516734212186-65266f46ffde?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    reviews: 89,
    distance: "0.8 mi",
    address: "456 Park Ave, New York, NY",
    services: ["Bathing", "Haircuts", "Nail Trimming", "Ear Cleaning"]
  },
  {
    id: 3,
    name: "Pawsome Pet Sitters",
    type: "Pet Sitter",
    image: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviews: 75,
    distance: "2.5 mi",
    address: "789 Broadway, New York, NY",
    services: ["Home Visits", "Overnight Care", "Dog Walking", "Medication Administration"]
  },
  {
    id: 4,
    name: "Elite Dog Training",
    type: "Trainer",
    image: "https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    reviews: 62,
    distance: "3.1 mi",
    address: "101 Dog Lane, New York, NY",
    services: ["Basic Training", "Behavior Modification", "Puppy Classes", "Private Lessons"]
  }
];

export default function Services() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState("grid");

  const filteredProviders = providers.filter(provider => 
    provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="page-container page-transition">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Services & Booking</h1>
        <p className="text-muted-foreground">
          Find and book services for your pets, from veterinarians to groomers and more.
        </p>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col space-y-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search for services or providers..." 
            className="pl-10 py-6 text-base shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="rounded-full">
            <MapPin className="h-4 w-4 mr-1" />
            Near Me
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            <Calendar className="h-4 w-4 mr-1" />
            Available Today
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            <Star className="h-4 w-4 mr-1" />
            4.5+ Rating
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            <Filter className="h-4 w-4 mr-1" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Services tabs */}
      <Tabs defaultValue="all" className="mb-10">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Services</TabsTrigger>
          <TabsTrigger value="vets">Veterinarians</TabsTrigger>
          <TabsTrigger value="groomers">Groomers</TabsTrigger>
          <TabsTrigger value="sitters">Pet Sitters</TabsTrigger>
          <TabsTrigger value="trainers">Trainers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-muted-foreground">
              Showing {filteredProviders.length} results
            </div>
            <div className="flex space-x-2">
              <Button 
                variant={currentView === "grid" ? "default" : "outline"} 
                size="sm"
                onClick={() => setCurrentView("grid")}
              >
                Grid
              </Button>
              <Button 
                variant={currentView === "list" ? "default" : "outline"} 
                size="sm"
                onClick={() => setCurrentView("list")}
              >
                List
              </Button>
            </div>
          </div>
          
          {currentView === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 staggered-fade-in">
              {filteredProviders.map((provider) => (
                <Card key={provider.id} className="shadow-sm card-hover overflow-hidden">
                  <div className="aspect-[4/3]">
                    <img 
                      src={provider.image} 
                      alt={provider.name} 
                      className="h-full w-full object-cover" 
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{provider.name}</CardTitle>
                        <CardDescription>{provider.type}</CardDescription>
                      </div>
                      <span className="flex items-center bg-white rounded-full px-2 py-1 text-xs font-medium shadow-sm">
                        <Star className="h-3 w-3 text-yellow-500 mr-1 fill-yellow-500" />
                        {provider.rating}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {provider.address} ({provider.distance})
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {provider.services.slice(0, 2).map((service) => (
                        <span 
                          key={service} 
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                        >
                          {service}
                        </span>
                      ))}
                      {provider.services.length > 2 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          +{provider.services.length - 2} more
                        </span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Book Appointment</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4 staggered-fade-in">
              {filteredProviders.map((provider) => (
                <Card key={provider.id} className="shadow-sm card-hover">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-48 h-32 md:h-auto">
                      <img 
                        src={provider.image} 
                        alt={provider.name} 
                        className="h-full w-full object-cover" 
                      />
                    </div>
                    <div className="flex-grow p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{provider.name}</h3>
                          <p className="text-sm text-muted-foreground">{provider.type}</p>
                          <div className="flex items-center text-sm mt-1">
                            <Star className="h-3.5 w-3.5 text-yellow-500 mr-1 fill-yellow-500" />
                            <span>{provider.rating}</span>
                            <span className="text-muted-foreground mx-1">•</span>
                            <span className="text-muted-foreground">{provider.reviews} reviews</span>
                            <span className="text-muted-foreground mx-1">•</span>
                            <span className="text-muted-foreground">{provider.distance}</span>
                          </div>
                        </div>
                        <Button>Book</Button>
                      </div>
                      <div className="mt-2 text-sm">
                        <div className="flex items-center text-muted-foreground mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {provider.address}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {provider.services.map((service) => (
                            <span 
                              key={service} 
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        {/* Other tabs would have similar content but filtered by provider type */}
        <TabsContent value="vets" className="space-y-4">
          <div className="text-center py-8">
            <h3 className="text-lg font-medium mb-2">Find Veterinarians Near You</h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Select the "All Services" tab to see our full list of providers, including veterinarians.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="groomers" className="space-y-4">
          <div className="text-center py-8">
            <h3 className="text-lg font-medium mb-2">Find Groomers Near You</h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Select the "All Services" tab to see our full list of providers, including groomers.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="sitters" className="space-y-4">
          <div className="text-center py-8">
            <h3 className="text-lg font-medium mb-2">Find Pet Sitters Near You</h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Select the "All Services" tab to see our full list of providers, including pet sitters.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="trainers" className="space-y-4">
          <div className="text-center py-8">
            <h3 className="text-lg font-medium mb-2">Find Trainers Near You</h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Select the "All Services" tab to see our full list of providers, including trainers.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Featured service */}
      <section className="mb-10">
        <div className="bg-gradient-to-r from-petcare-blue/10 to-petcare-teal/10 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="md:max-w-lg">
              <h2 className="text-xl font-semibold mb-2">Need Emergency Veterinary Care?</h2>
              <p className="text-muted-foreground mb-4 md:mb-0">
                Find 24/7 animal hospitals and emergency veterinary services in your area. Quick access to care when your pet needs it most.
              </p>
            </div>
            <Button className="self-start bg-petcare-coral hover:bg-petcare-coral/90">Find Emergency Care</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
