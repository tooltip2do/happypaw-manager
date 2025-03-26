
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppointmentCardProps {
  title: string;
  date: string;
  time: string;
  provider: string;
  address?: string;
  status: "upcoming" | "completed" | "cancelled";
  className?: string;
  onClick?: () => void;
}

export default function AppointmentCard({
  title,
  date,
  time,
  provider,
  address,
  status,
  className,
  onClick,
}: AppointmentCardProps) {
  const statusColors = {
    upcoming: "bg-petcare-teal/10 text-petcare-teal",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-white shadow-card border border-border/40 card-hover p-4",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 rounded-full bg-petcare-blue/10 p-2">
            <Calendar className="h-5 w-5 text-petcare-blue" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{title}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              {date} • {time}
            </p>
          </div>
        </div>
        <span className={cn("text-xs font-medium px-2 py-1 rounded-full", statusColors[status])}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      <div className="mt-3 border-t pt-3">
        <p className="text-sm font-medium text-gray-700">{provider}</p>
        {address && <p className="text-xs text-muted-foreground mt-0.5">{address}</p>}
      </div>
    </div>
  );
}
