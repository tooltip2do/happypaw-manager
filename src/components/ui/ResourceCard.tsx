
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResourceCardProps {
  title: string;
  description: string;
  image?: string;
  category: string;
  readTime?: string;
  className?: string;
  onClick?: () => void;
}

export default function ResourceCard({
  title,
  description,
  image,
  category,
  readTime,
  className,
  onClick,
}: ResourceCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-white shadow-card border border-border/40 card-hover",
        className
      )}
      onClick={onClick}
    >
      {image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-xs font-medium text-petcare-blue bg-petcare-blue/10 py-1 px-2 rounded-full">
            {category}
          </span>
          {readTime && (
            <span className="text-xs text-muted-foreground">
              {readTime} min read
            </span>
          )}
        </div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        <div className="mt-3 flex items-center text-sm font-medium text-petcare-blue">
          <span>Read more</span>
          <BookOpen className="ml-1 h-3 w-3" />
        </div>
      </div>
    </div>
  );
}
