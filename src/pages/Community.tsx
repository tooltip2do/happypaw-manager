
import { useState } from "react";
import { Heart, Search, Users, MessageSquare, Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const posts = [
  {
    id: 1,
    title: "Tips for helping a new rescue dog adjust",
    author: "Emily Chen",
    authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    content: "I recently adopted a 2-year-old rescue dog and wanted to share some tips that helped us in the first few weeks...",
    likes: 24,
    comments: 8,
    time: "2 hours ago",
    tags: ["Rescue", "Dog Training", "Adoption"]
  },
  {
    id: 2,
    title: "Cat behavior question - scratching new furniture",
    author: "James Wilson",
    authorImage: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    content: "My 1-year-old tabby has started scratching our new couch despite having two scratching posts. Any advice on redirecting this behavior?",
    likes: 16,
    comments: 12,
    time: "5 hours ago",
    tags: ["Cat Behavior", "Training", "Help"]
  },
  {
    id: 3,
    title: "Lost dog in Central Park area - please help!",
    author: "Sarah Johnson",
    authorImage: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    content: "Our golden retriever Max went missing in the Central Park area yesterday around 5 PM. He's wearing a blue collar with tags...",
    likes: 42,
    comments: 15,
    time: "1 day ago",
    tags: ["Lost Pet", "Emergency", "Help"]
  }
];

const events = [
  {
    id: 1,
    title: "Downtown Dog Park Meetup",
    date: "Saturday, June 18",
    time: "10:00 AM - 12:00 PM",
    location: "Central Dog Park, New York",
    attendees: 15,
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Pet Adoption Fair",
    date: "Sunday, June 19",
    time: "11:00 AM - 4:00 PM",
    location: "Community Center, Brooklyn",
    attendees: 47,
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  }
];

export default function Community() {
  return (
    <div className="page-container page-transition">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pet Community</h1>
        <p className="text-muted-foreground">
          Connect with other pet owners, find and share advice, and join pet-friendly events.
        </p>
      </div>

      {/* Search and actions */}
      <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 mb-6">
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search community..." className="pl-9" />
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button className="bg-petcare-teal hover:bg-petcare-teal/90">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>
      </div>

      {/* Community tabs */}
      <Tabs defaultValue="discussions" className="mb-10">
        <TabsList className="mb-6">
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="lost-found">Lost & Found</TabsTrigger>
        </TabsList>
        
        <TabsContent value="discussions" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
            {/* Discussion feed */}
            <div className="col-span-1 lg:col-span-5 space-y-4 staggered-fade-in">
              {posts.map((post) => (
                <Card key={post.id} className="shadow-sm card-hover">
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-2">
                      <img 
                        src={post.authorImage} 
                        alt={post.author} 
                        className="h-8 w-8 rounded-full object-cover" 
                      />
                      <div>
                        <CardTitle className="text-base">{post.title}</CardTitle>
                        <CardDescription>
                          By {post.author} • {post.time}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{post.content}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <button className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Sidebar */}
            <div className="col-span-1 lg:col-span-2 space-y-4">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">Community Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>Be respectful to other pet owners</p>
                  <p>Share helpful and accurate information</p>
                  <p>Keep personal information private</p>
                  <p>Report lost pets in the Lost & Found section</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">Popular Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      Dog Training
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      Cat Health
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      Adoption
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      Pet Food
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      New Pet
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="events" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title">Upcoming Events</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 staggered-fade-in">
            {events.map((event) => (
              <Card key={event.id} className="shadow-sm card-hover overflow-hidden">
                <div className="aspect-video">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="h-full w-full object-cover" 
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{event.title}</CardTitle>
                  <CardDescription>
                    {event.date} • {event.time}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{event.attendees} attending</span>
                  </div>
                  <p className="text-sm mt-2">{event.location}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="lost-found" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title">Lost & Found Pets</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Report Pet
            </Button>
          </div>
          
          <Card className="shadow-sm p-6 bg-petcare-coral/5 border-petcare-coral/20">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <img 
                src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                alt="Lost dog" 
                className="h-24 w-24 rounded-lg object-cover"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-medium">Golden Retriever - Missing since June 14</h3>
                <p className="text-sm text-muted-foreground">Last seen near Central Park, wearing blue collar with tags. Answers to Max. Friendly and approachable.</p>
                <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>Contact: Sarah Johnson</span>
                  <span>•</span>
                  <span>555-123-4567</span>
                </div>
              </div>
              <Button>Contact Owner</Button>
            </div>
          </Card>
          
          <div className="bg-petcare-blue/5 rounded-2xl p-6 md:p-8 text-center">
            <h3 className="text-lg font-medium mb-2">Help Reunite Pets with Their Families</h3>
            <p className="text-muted-foreground max-w-xl mx-auto mb-4">
              Report any lost or found pets in your area. Sharing detailed information and photos can help reunite pets with their owners quickly.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Report Lost Pet
              </Button>
              <Button variant="outline">
                Report Found Pet
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
