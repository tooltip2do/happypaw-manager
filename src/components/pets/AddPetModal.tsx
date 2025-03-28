
import { useState } from "react";
import { useForm } from "react-hook-form";
import { X, Upload } from "lucide-react";
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
import { NewPet } from "@/hooks/usePets";

interface PetFormValues {
  name: string;
  type: string;
  breed: string;
  age: string;
  image: FileList | null;
}

interface AddPetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPetAdded: (pet: NewPet & { image?: File }) => void;
}

export default function AddPetModal({
  open,
  onOpenChange,
  onPetAdded,
}: AddPetModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<PetFormValues>({
    defaultValues: {
      name: "",
      type: "",
      breed: "",
      age: "",
      image: null,
    },
  });

  const onSubmit = async (data: PetFormValues) => {
    setIsSubmitting(true);
    try {
      const newPet: NewPet & { image?: File } = {
        name: data.name,
        type: data.type,
        breed: data.breed,
        age: data.age,
      };

      // Add image if selected
      if (data.image && data.image.length > 0) {
        newPet.image = data.image[0];
      }

      await onPetAdded(newPet);
      form.reset();
      setImagePreview(null);
    } catch (error: any) {
      console.error("Error adding pet:", error);
      toast.error("Failed to add pet");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      form.setValue("image", files);
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
    }
  };

  const closeModal = () => {
    form.reset();
    setImagePreview(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Pet</DialogTitle>
          <DialogDescription>
            Enter your pet's information to create a profile.
          </DialogDescription>
          <Button
            variant="ghost"
            className="absolute right-4 top-4 rounded-sm p-0 h-auto"
            onClick={closeModal}
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
                  <FormLabel>Pet Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your pet's name" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pet Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Dog">Dog</SelectItem>
                        <SelectItem value="Cat">Cat</SelectItem>
                        <SelectItem value="Bird">Bird</SelectItem>
                        <SelectItem value="Fish">Fish</SelectItem>
                        <SelectItem value="Small Animal">Small Animal</SelectItem>
                        <SelectItem value="Reptile">Reptile</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 2 years" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="breed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Breed</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Golden Retriever, Maine Coon" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Pet Photo</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <div className="flex items-center gap-4">
                        <Input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="pet-image-upload"
                          onChange={handleImageChange}
                          {...field}
                        />
                        <label
                          htmlFor="pet-image-upload"
                          className="flex cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-accent"
                        >
                          <Upload className="h-4 w-4" />
                          Upload Photo
                        </label>
                        <span className="text-xs text-muted-foreground">
                          {imagePreview ? "Photo selected" : "No photo selected (optional)"}
                        </span>
                      </div>
                      {imagePreview && (
                        <div className="relative mt-2 h-32 w-32 overflow-hidden rounded-md border border-input">
                          <img
                            src={imagePreview}
                            alt="Pet preview"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Pet"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
