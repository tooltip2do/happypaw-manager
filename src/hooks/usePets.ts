
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useStorage } from "@/hooks/useStorage";

export interface Pet {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: string;
  image_url?: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export type NewPet = {
  name: string;
  type: string;
  breed: string;
  age: string;
  image_url?: string;
}

export const usePets = () => {
  const queryClient = useQueryClient();
  const { uploadFile } = useStorage();

  const { data: pets = [], isLoading } = useQuery({
    queryKey: ["pets"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Return empty array if not authenticated
        return [];
      }

      const { data, error } = await supabase
        .from("pets")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Failed to fetch pets");
        throw error;
      }

      return data as Pet[];
    },
  });

  const addPet = useMutation({
    mutationFn: async (newPet: NewPet & { image?: File }) => {
      // Get the current authenticated user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      // Handle image upload if provided
      let imageUrl = newPet.image_url;
      if (newPet.image) {
        try {
          imageUrl = await uploadFile(newPet.image, "pets");
        } catch (error) {
          console.error("Image upload failed:", error);
          toast.error("Failed to upload image");
          throw error;
        }
      }

      // Prepare pet data without the image File object
      const petData = {
        name: newPet.name,
        type: newPet.type,
        breed: newPet.breed,
        age: newPet.age,
        image_url: imageUrl,
        owner_id: user.id
      };

      const { data, error } = await supabase
        .from("pets")
        .insert(petData)
        .select()
        .single();

      if (error) {
        toast.error("Failed to add pet");
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
      toast.success("Pet added successfully");
    },
    onError: (error) => {
      console.error("Error adding pet:", error);
      toast.error("An error occurred while adding your pet");
    }
  });

  const updatePet = useMutation({
    mutationFn: async ({ id, pet }: { id: string, pet: NewPet & { image?: File } }) => {
      // Handle image upload if provided
      let imageUrl = pet.image_url;
      if (pet.image) {
        try {
          imageUrl = await uploadFile(pet.image, "pets");
        } catch (error) {
          console.error("Image upload failed:", error);
          toast.error("Failed to upload image");
          throw error;
        }
      }

      // Prepare pet data without the image File object
      const petData = {
        name: pet.name,
        type: pet.type,
        breed: pet.breed,
        age: pet.age,
        ...(imageUrl && { image_url: imageUrl }),
      };

      const { data, error } = await supabase
        .from("pets")
        .update(petData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        toast.error("Failed to update pet");
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
      toast.success("Pet updated successfully");
    },
    onError: (error) => {
      console.error("Error updating pet:", error);
      toast.error("An error occurred while updating your pet");
    }
  });

  const deletePet = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("pets")
        .delete()
        .eq('id', id);

      if (error) {
        toast.error("Failed to delete pet");
        throw error;
      }

      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
      toast.success("Pet deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting pet:", error);
      toast.error("An error occurred while deleting your pet");
    }
  });

  return {
    pets,
    isLoading,
    addPet: addPet.mutate,
    isAdding: addPet.isPending,
    updatePet: updatePet.mutate,
    isUpdating: updatePet.isPending,
    deletePet: deletePet.mutate,
    isDeleting: deletePet.isPending
  };
};
