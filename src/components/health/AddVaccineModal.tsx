
import { useState } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

type VaccineFormValues = {
  name: string;
  pet: string;
  date: string;
  nextDue: string;
  provider: string;
};

interface AddVaccineModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVaccineAdded: (vaccine: any) => void;
  pets: any[];
}

export default function AddVaccineModal({
  open,
  onOpenChange,
  onVaccineAdded,
  pets,
}: AddVaccineModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<VaccineFormValues>({
    defaultValues: {
      name: "",
      pet: "",
      date: "",
      nextDue: "",
      provider: "",
    },
  });

  const onSubmit = async (data: VaccineFormValues) => {
    setIsSubmitting(true);
    try {
      // In a real app, this would be a database call
      const newVaccine = {
        id: Date.now(),
        ...data,
      };
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      onVaccineAdded(newVaccine);
      form.reset();
      onOpenChange(false);
      toast.success("Vaccine record added successfully");
    } catch (error) {
      console.error("Error adding vaccine:", error);
      toast.error("Failed to add vaccine record");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Vaccine Record</DialogTitle>
          <DialogDescription>
            Enter the vaccination details for your pet.
          </DialogDescription>
          <Button
            variant="ghost"
            className="absolute right-4 top-4 rounded-sm p-0 h-auto"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vaccine Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Rabies, DHPP" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pet</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select pet" />
                      </SelectTrigger>
                      <SelectContent>
                        {pets.length > 0 ? (
                          pets.map((pet) => (
                            <SelectItem key={pet.id} value={pet.name}>
                              {pet.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="dummy" disabled>
                            No pets added yet
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date Given</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nextDue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Next Due Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="provider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Provider/Veterinarian</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Dr. Sarah Wilson" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Vaccine Record"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
