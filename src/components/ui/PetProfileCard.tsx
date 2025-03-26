
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface PetProfileCardProps {
  name: string;
  type: string;
  breed: string;
  age: string;
  image: string;
  className?: string;
  onClick?: () => void;
}

export default function PetProfileCard({
  name,
  type,
  breed,
  age,
  image,
  className,
  onClick,
}: PetProfileCardProps) {
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
