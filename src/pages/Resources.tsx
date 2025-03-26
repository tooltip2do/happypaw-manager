
import { useState } from "react";
import { Search, BookOpen, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ResourceCard from "@/components/ui/ResourceCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const resources = [
  {
    id: 1,
    title: "How to Introduce a New Pet to Your Home",
    description: "Learn the best practices for bringing a new pet into your household and ensuring a smooth transition for everyone.",
    category: "Tips & Advice",
    readTime: "5",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Summer Pet Safety Guide",
    description: "Protect your pets from heat, water dangers, and other summer hazards with these essential tips.",
    category: "Health & Safety",
    readTime: "7",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Understanding Pet Nutrition Labels",
    description: "Decode pet food ingredients and nutrition facts to make the best diet choices for your furry friends.",
    category: "Nutrition",
    readTime: "8",
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "Basic Pet First Aid Techniques",
    description: "Learn essential first aid skills that could save your pet's life in an emergency situation.",
    category: "Health & Safety",
    readTime: "10",
    image: "https://images.unsplash.com/photo-1612774594896-b7a4b11d3faa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    title: "Adopting a Senior Pet: What to Expect",
    description: "Discover the joys and considerations of adopting older pets, from health care to creating a comfortable environment.",
    category: "Adoption",
    readTime: "6",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    title: "Pet-Friendly Houseplants Guide",
    description: "A comprehensive list of safe plants for homes with pets, and which toxic varieties to avoid.",
    category: "Home & Living",
    readTime: "4",
    image: "https://images.unsplash.com/photo-1602934585219-e5bac4dea7a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  }
];

// Emergency contacts
const emergencyContacts = [
  {
    id: 1,
    name: "Animal Poison Control Center",
    phone: "(888) 426-4435",
    description: "24/7 emergency poison hotline for animals"
  },
  {
    id: 2,
    name: "Central Emergency Animal Hospital",
    phone: "(555) 123-4567",
    description: "Open 24/7 for emergency care"
  },
  {
    id: 3,
    name: "Pet Rescue Hotline",
    phone: "(555) 987-6543",
    description: "For reporting strays or animal abuse"
  }
];

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = resources.filter(resource => 
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page-container page-transition">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Resource Hub</h1>
        <p className="text-muted-foreground">
          Access educational articles, guides, and emergency information for pet care.
        </p>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col space-y-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search for resources..." 
            className="pl-10 py-6 text-base shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="rounded-full">
            All Categories
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Sort By: Popular
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Resources tabs */}
      <Tabs defaultValue="articles" className="mb-10">
        <TabsList className="mb-6">
          <TabsTrigger value="articles">Articles & Guides</TabsTrigger>
          <TabsTrigger value="emergency">Emergency Resources</TabsTrigger>
          <TabsTrigger value="videos">Videos & Tutorials</TabsTrigger>
        </TabsList>
        
        <TabsContent value="articles" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 staggered-fade-in">
            {filteredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                title={resource.title}
                description={resource.description}
                category={resource.category}
                readTime={resource.readTime}
                image={resource.image}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="emergency" className="space-y-4">
          <div className="bg-petcare-coral/5 border border-petcare-coral/20 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-medium mb-4">Emergency Contacts</h2>
            <div className="space-y-4">
              {emergencyContacts.map((contact) => (
                <div key={contact.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-white rounded-lg shadow-sm">
                  <div>
                    <h3 className="font-medium">{contact.name}</h3>
                    <p className="text-sm text-muted-foreground">{contact.description}</p>
                  </div>
                  <a 
                    href={`tel:${contact.phone}`}
                    className="mt-2 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-petcare-coral hover:bg-petcare-coral/90"
                  >
                    {contact.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-medium mb-2">Common Pet Emergencies</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-petcare-coral"></span>
                  <span>Difficulty breathing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-petcare-coral"></span>
                  <span>Seizures</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-petcare-coral"></span>
                  <span>Severe bleeding</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-petcare-coral"></span>
                  <span>Suspected poisoning</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-petcare-coral"></span>
                  <span>Trauma/injury</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-medium mb-2">Pet Emergency Kit Essentials</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-petcare-teal"></span>
                  <span>Pet first aid guide</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-petcare-teal"></span>
                  <span>Gauze, bandages, and adhesive tape</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-petcare-teal"></span>
                  <span>Digital thermometer</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-petcare-teal"></span>
                  <span>Hydrogen peroxide</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-petcare-teal"></span>
                  <span>Pet carrier or transport</span>
                </li>
              </ul>
            </div>
          </div>
          
          <Button className="w-full">Find Emergency Veterinary Services Near Me</Button>
        </TabsContent>
        
        <TabsContent value="videos" className="space-y-4">
          <div className="text-center py-8">
            <h3 className="text-lg font-medium mb-2">Video Tutorials Coming Soon</h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We're working on adding video tutorials to help you learn pet care techniques. Check back soon!
            </p>
            <Button variant="outline" className="mt-4">
              Browse Articles Instead
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Featured categories */}
      <section className="mb-10">
        <h2 className="section-title mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-5 text-center hover:shadow-md transition-shadow">
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-petcare-blue/10 mb-3">
              <BookOpen className="h-6 w-6 text-petcare-blue" />
            </div>
            <h3 className="font-medium text-sm">Health & Wellness</h3>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 text-center hover:shadow-md transition-shadow">
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-petcare-coral/10 mb-3">
              <BookOpen className="h-6 w-6 text-petcare-coral" />
            </div>
            <h3 className="font-medium text-sm">Training & Behavior</h3>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 text-center hover:shadow-md transition-shadow">
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-petcare-teal/10 mb-3">
              <BookOpen className="h-6 w-6 text-petcare-teal" />
            </div>
            <h3 className="font-medium text-sm">Nutrition</h3>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 text-center hover:shadow-md transition-shadow">
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-petcare-sage/10 mb-3">
              <BookOpen className="h-6 w-6 text-petcare-sage" />
            </div>
            <h3 className="font-medium text-sm">New Pet Guides</h3>
          </div>
        </div>
      </section>
    </div>
  );
}
