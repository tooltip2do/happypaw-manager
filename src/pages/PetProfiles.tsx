
import { useState } from "react";
import { Heart, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PetProfileCard from "@/components/ui/PetProfileCard";
import AddPetModal from "@/components/pets/AddPetModal";
import { usePets, NewPet } from "@/hooks/usePets";

export default function PetProfiles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [addPetModalOpen, setAddPetModalOpen] = useState(false);
  const { pets, isLoading, addPet, isAdding } = usePets();

  const filteredPets = pets.filter(pet => 
    pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pet.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddPet = async (petData: NewPet & { image?: File }) => {
    await addPet(petData);
    setAddPetModalOpen(false);
  };

  return (
    <div className="page-container page-transition">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pet Profiles</h1>
        <p className="text-muted-foreground">
          Manage your pet's information and health records in one place.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 mb-6">
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search pets..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button 
          className="bg-petcare-teal hover:bg-petcare-teal/90"
          onClick={() => setAddPetModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Pet
        </Button>
      </div>

      {/* Pet profiles grid */}
      <div className="staggered-fade-in grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <div className="col-span-full flex justify-center p-8">
            <div className="animate-pulse flex space-x-4">
              <div className="h-10 w-10 rounded-full bg-slate-200"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-4 rounded bg-slate-200"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-4 col-span-2 rounded bg-slate-200"></div>
                    <div className="h-4 col-span-1 rounded bg-slate-200"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : filteredPets.length > 0 ? (
          filteredPets.map((pet) => (
            <PetProfileCard
              key={pet.id}
              name={pet.name}
              type={pet.type}
              breed={pet.breed}
              age={pet.age}
              image={pet.image_url || "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-muted-foreground p-8">
            No pets found. Add your first pet to get started!
          </div>
        )}
        <div 
          className="flex items-center justify-center bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-6 h-full card-hover min-h-[260px] cursor-pointer"
          onClick={() => setAddPetModalOpen(true)}
        >
          <div className="text-center">
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-petcare-blue/10 mb-3">
              <Heart className="h-6 w-6 text-petcare-blue" />
            </div>
            <h3 className="font-medium text-sm mb-2">Add Another Pet</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Add your pet's profile to get personalized care recommendations
            </p>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Pet
            </Button>
          </div>
        </div>
      </div>

      {/* Pet care tips */}
      <div className="mt-16 bg-blue-50 rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="md:max-w-lg">
            <h2 className="text-xl font-semibold mb-2">Want to learn more about pet profiles?</h2>
            <p className="text-muted-foreground mb-4 md:mb-0">
              Discover how detailed pet profiles can help you provide better care and make veterinary visits more effective.
            </p>
          </div>
          <Button variant="outline" className="self-start">Read Tips</Button>
        </div>
      </div>

      {/* Add Pet Modal */}
      <AddPetModal
        open={addPetModalOpen}
        onOpenChange={setAddPetModalOpen}
        onPetAdded={handleAddPet}
      />
    </div>
  );
}
