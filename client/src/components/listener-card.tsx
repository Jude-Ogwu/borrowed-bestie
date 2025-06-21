import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Clock, Globe } from "lucide-react";
import type { Listener } from "@shared/schema";

interface ListenerCardProps {
  listener: Listener;
  onBookClick: (listener: Listener) => void;
}

export function ListenerCard({ listener, onBookClick }: ListenerCardProps) {
  const getSpecialtyColor = (specialty: string) => {
    const colors: Record<string, string> = {
      Anxiety: "bg-teal-100 text-teal-700",
      Stress: "bg-coral-100 text-coral-600",
      Career: "bg-lavender-100 text-lavender-500",
      Relationships: "bg-coral-100 text-coral-600",
      "Life Changes": "bg-teal-100 text-teal-700",
      Grief: "bg-lavender-100 text-lavender-500",
      "LGBTQ+": "bg-lavender-100 text-lavender-500",
      "Young Adults": "bg-teal-100 text-teal-700",
      Identity: "bg-coral-100 text-coral-600",
    };
    return colors[specialty] || "bg-slate-100 text-slate-700";
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl dark:hover:shadow-2xl transition-all transform hover:-translate-y-1 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={listener.imageUrl}
          alt={`${listener.name} - Professional headshot`}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white">{listener.name}</h3>
          <div className="flex items-center space-x-1">
            <Star className="text-yellow-400" size={16} fill="currentColor" />
            <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">{listener.rating}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {listener.specialties.slice(0, 3).map((specialty) => (
            <Badge
              key={specialty}
              variant="secondary"
              className={`text-sm font-medium ${getSpecialtyColor(specialty)}`}
            >
              {specialty}
            </Badge>
          ))}
        </div>

        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed line-clamp-3">
          {listener.bio}
        </p>

        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center text-slate-500 dark:text-slate-400">
            <Clock size={14} className="mr-1" />
            Next: Today 3:00 PM
          </div>
          <div className="flex items-center text-slate-500 dark:text-slate-400">
            <Globe size={14} className="mr-1" />
            {listener.languages.slice(0, 2).join(", ")}
          </div>
        </div>

        <Button
          onClick={() => onBookClick(listener)}
          className="w-full bg-gradient-teal text-white hover:bg-teal-600 transition-all transform hover:scale-105"
        >
          Book with {listener.name.split(" ")[0]}
        </Button>
      </CardContent>
    </Card>
  );
}
