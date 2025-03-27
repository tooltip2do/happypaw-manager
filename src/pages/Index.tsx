import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Calendar, Heart, Activity, Users, BookOpen, ShoppingBag, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import PetProfileCard from "@/components/ui/PetProfileCard";
import AppointmentCard from "@/components/ui/AppointmentCard";
import ResourceCard from "@/components/ui/ResourceCard";
import { usePets, NewPet, Pet } from "@/hooks/usePets";
import AddPetModal from "@/components/pets/AddPetModal";
import EditPetModal from "@/components/pets/EditPetModal";
import DeletePetDialog from "@/components/pets/DeletePetDialog";

const appointments = [
  {
    id: 1,
    title: "Veterinary Check-up",
    date: "Tomorrow, June 15",
    time: "10:00 AM",
    provider: "Dr. Sarah Wilson",
    address: "123 Pet Health Clinic, New York",
    status: "upcoming" as const
  },
  {
    id: 2,
    title: "Grooming Session",
    date: "Saturday, June 18",
    time: "2:30 PM",
    provider: "PetSmart Grooming",
    address: "456 Mall Avenue, New York",
    status: "upcoming" as const
  }
];

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
  }
];

export default function Index() {
  const [addPetModalOpen, setAddPetModalOpen] = useState(false);
  const [editPetModalOpen, setEditPetModalOpen] = useState(false);
  const [deletePetDialogOpen, setDeletePetDialogOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  
  const { 
    pets, 
    isLoading, 
    addPet,
    updatePet,
    deletePet 
  } = usePets();

  const handleAddPet = async (petData: NewPet & { image?: File }) => {
    await addPet(petData);
    setAddPetModalOpen(false);
  };

  const handleEditClick = (pet: Pet) => {
    setSelectedPet(pet);
    setEditPetModalOpen(true);
  };

  const handleDeleteClick = (pet: Pet) => {
    setSelectedPet(pet);
    setDeletePetDialogOpen(true);
  };

  const handleUpdatePet = async (id: string, petData: NewPet & { image?: File }) => {
    await updatePet({ id, pet: petData });
    setEditPetModalOpen(false);
  };

  const handleDeletePet = async () => {
    if (selectedPet) {
      await deletePet(selectedPet.id);
      setDeletePetDialogOpen(false);
    }
  };

  return (
    <div className="page-transition">
      <section className="bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-16 md:pt-12 md:pb-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Your Pet's Wellness Journey Starts Here
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Track health, schedule care, connect with experts, and access resources—all in one place.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="bg-petcare-teal hover:bg-petcare-teal/90 text-white" onClick={() => setAddPetModalOpen(true)}>
                Add Your Pet
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/pet-profiles">Explore Features</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="page-container">
        <section className="mb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/pet-profiles" className="bg-white rounded-xl shadow-card p-4 text-center hover:shadow-hover transition-shadow">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-petcare-coral/10 mb-3">
                <Heart className="h-6 w-6 text-petcare-coral" />
              </div>
              <h3 className="font-medium text-sm">Pet Profiles</h3>
            </Link>
            <Link to="/health" className="bg-white rounded-xl shadow-card p-4 text-center hover:shadow-hover transition-shadow">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-petcare-blue/10 mb-3">
                <Activity className="h-6 w-6 text-petcare-blue" />
              </div>
              <h3 className="font-medium text-sm">Health Tracking</h3>
            </Link>
            <Link to="/services" className="bg-white rounded-xl shadow-card p-4 text-center hover:shadow-hover transition-shadow">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-petcare-teal/10 mb-3">
                <Calendar className="h-6 w-6 text-petcare-teal" />
              </div>
              <h3 className="font-medium text-sm">Appointments</h3>
            </Link>
            <Link to="/community" className="bg-white rounded-xl shadow-card p-4 text-center hover:shadow-hover transition-shadow">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-petcare-sage/20 mb-3">
                <Users className="h-6 w-6 text-petcare-sage" />
              </div>
              <h3 className="font-medium text-sm">Community</h3>
            </Link>
          </div>
        </section>

        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Your Pets</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/pet-profiles">View All</Link>
            </Button>
          </div>
          <div className="staggered-fade-in grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {isLoading ? (
              <div className="col-span-2 flex justify-center p-4">
                <div className="animate-pulse flex space-x-4">
                  <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : pets.length > 0 ? (
              pets.slice(0, 3).map((pet) => (
                <PetProfileCard
                  key={pet.id}
                  id={pet.id}
                  name={pet.name}
                  type={pet.type}
                  breed={pet.breed}
                  age={pet.age}
                  image={pet.image_url || "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"}
                  showActions={true}
                  onEdit={() => handleEditClick(pet)}
                  onDelete={() => handleDeleteClick(pet)}
                />
              ))
            ) : null}
            <div 
              className="flex items-center justify-center bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-6 h-full card-hover min-h-[200px] cursor-pointer"
              onClick={() => setAddPetModalOpen(true)}
            >
              <div className="text-center">
                <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-petcare-blue/10 mb-3">
                  <Heart className="h-6 w-6 text-petcare-blue" />
                </div>
                <h3 className="font-medium text-sm mb-2">Add {pets.length > 0 ? 'Another' : 'Your First'} Pet</h3>
                <p className="text-xs text-muted-foreground">
                  Add your pet's profile to get personalized care recommendations
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Upcoming Appointments</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/services">Book Appointment</Link>
            </Button>
          </div>
          <div className="staggered-fade-in grid grid-cols-1 md:grid-cols-2 gap-4">
            {appointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                title={appointment.title}
                date={appointment.date}
                time={appointment.time}
                provider={appointment.provider}
                address={appointment.address}
                status={appointment.status}
              />
            ))}
          </div>
        </section>

        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Resources For You</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/resources">Browse All</Link>
            </Button>
          </div>
          <div className="staggered-fade-in grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource) => (
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
        </section>

        <section className="mb-10">
          <div className="bg-petcare-blue/5 rounded-2xl p-6 md:p-8">
            <h2 className="section-title mb-6">Explore More</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/community" className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition-shadow">
                <div className="mx-auto h-10 w-10 flex items-center justify-center rounded-full bg-petcare-sage/10 mb-2">
                  <Users className="h-5 w-5 text-petcare-sage" />
                </div>
                <h3 className="font-medium text-sm">Community</h3>
              </Link>
              <Link to="/resources" className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition-shadow">
                <div className="mx-auto h-10 w-10 flex items-center justify-center rounded-full bg-petcare-blue/10 mb-2">
                  <BookOpen className="h-5 w-5 text-petcare-blue" />
                </div>
                <h3 className="font-medium text-sm">Resources</h3>
              </Link>
              <Link to="/store" className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition-shadow">
                <div className="mx-auto h-10 w-10 flex items-center justify-center rounded-full bg-petcare-coral/10 mb-2">
                  <ShoppingBag className="h-5 w-5 text-petcare-coral" />
                </div>
                <h3 className="font-medium text-sm">Store</h3>
              </Link>
              <Link to="/settings" className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition-shadow">
                <div className="mx-auto h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 mb-2">
                  <MoreHorizontal className="h-5 w-5 text-gray-500" />
                </div>
                <h3 className="font-medium text-sm">More</h3>
              </Link>
            </div>
          </div>
        </section>
      </div>
      
      <AddPetModal
        open={addPetModalOpen}
        onOpenChange={setAddPetModalOpen}
        onPetAdded={handleAddPet}
      />
      
      {selectedPet && (
        <>
          <EditPetModal
            pet={selectedPet}
            open={editPetModalOpen}
            onOpenChange={setEditPetModalOpen}
            onPetUpdated={handleUpdatePet}
          />
          
          <DeletePetDialog
            open={deletePetDialogOpen}
            onOpenChange={setDeletePetDialogOpen}
            onConfirm={handleDeletePet}
            petName={selectedPet.name}
          />
        </>
      )}
    </div>
  );
}
