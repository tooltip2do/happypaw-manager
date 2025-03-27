
import { Edit, Heart, Trash } from "lucide-react";
import { cn } from "@/lib/utils";

interface PetProfileCardProps {
  id?: string;
  name: string;
  type: string;
  breed: string;
  age: string;
  image: string;
  className?: string;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

export default function PetProfileCard({
  id,
  name,
  type,
  breed,
  age,
  image,
  className,
  onClick,
  onEdit,
  onDelete,
  showActions = false,
}: PetProfileCardProps) {
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) onEdit();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) onDelete();
  };

  // Default pet images based on type
  const getDefaultPetImage = () => {
    switch (type.toLowerCase()) {
      case "dog":
        return "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
      case "cat":
        return "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
      case "bird":
        return "https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
      case "fish":
        return "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
      case "rabbit":
        return "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
      case "hamster":
        return "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
      default:
        return "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
    }
  };

  // Use the provided image if valid, otherwise use a default based on pet type
  const imageUrl = image && image !== "undefined" ? image : getDefaultPetImage();

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-white shadow-card border border-border/40 card-hover cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={imageUrl}
          alt={`${name} - ${breed} ${type}`}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="absolute top-3 right-3">
        <div className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm">
          <Heart className="h-4 w-4 text-petcare-coral" />
        </div>
      </div>
      {showActions && (
        <div className="absolute bottom-[60px] right-3 flex flex-col space-y-2">
          <button 
            onClick={handleEdit}
            className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-white"
          >
            <Edit className="h-4 w-4 text-petcare-blue" />
          </button>
          <button 
            onClick={handleDelete}
            className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-white"
          >
            <Trash className="h-4 w-4 text-petcare-coral" />
          </button>
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <span className="text-xs font-medium text-petcare-blue bg-petcare-blue/10 py-1 px-2 rounded-full">
            {type}
          </span>
        </div>
        <div className="mt-1 text-sm text-muted-foreground">
          {breed} • {age}
        </div>
      </div>
    </div>
  );
}
