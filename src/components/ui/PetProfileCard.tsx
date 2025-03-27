
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
          src={image}
          alt={name}
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
