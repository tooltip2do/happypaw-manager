
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
    mutationFn: async (newPet: NewPet) => {
      // Get the current authenticated user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      const petData = {
        ...newPet,
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
  });

  return {
    pets,
    isLoading,
    addPet: addPet.mutate,
    isAdding: addPet.isPending,
  };
};
