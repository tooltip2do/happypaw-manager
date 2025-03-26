
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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

export const usePets = () => {
  const queryClient = useQueryClient();

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
    mutationFn: async (newPet: Omit<Pet, "id" | "owner_id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("pets")
        .insert([newPet])
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
