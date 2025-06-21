import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/booking-modal";
import { ListenerCard } from "@/components/listener-card";
import { Search, Filter } from "lucide-react";
import type { Listener } from "@shared/schema";

export default function Listeners() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedListener, setSelectedListener] = useState<Listener | undefined>();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  const { data: listeners = [], isLoading } = useQuery<Listener[]>({
    queryKey: ["/api/listeners"],
  });

  const specialties = [
    "All",
    "Anxiety",
    "Career",
    "Relationships", 
    "Life Changes",
    "LGBTQ+",
    "Grief",
    "Stress"
  ];

  const filteredListeners = listeners.filter((listener) => {
    const matchesSearch = listener.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listener.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "All" || 
                            listener.specialties.includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  const handleBookListener = (listener: Listener) => {
    setSelectedListener(listener);
    setIsBookingModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Meet Our Besties</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Our trained listeners come from diverse backgrounds and specialize in different areas of support. 
            Find someone who resonates with you.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <Input
                placeholder="Search by name or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="text-slate-500" size={20} />
              <span className="text-sm text-slate-600">Filter by specialty:</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {specialties.map((specialty) => (
              <Button
                key={specialty}
                variant={selectedSpecialty === specialty ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSpecialty(specialty)}
                className={
                  selectedSpecialty === specialty
                    ? "bg-teal-500 hover:bg-teal-600"
                    : "hover:bg-teal-50 hover:border-teal-300"
                }
              >
                {specialty}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-slate-600">
            Showing {filteredListeners.length} of {listeners.length} listeners
            {selectedSpecialty !== "All" && ` specializing in ${selectedSpecialty}`}
          </p>
        </div>

        {/* Listeners Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredListeners.map((listener) => (
            <ListenerCard
              key={listener.id}
              listener={listener}
              onBookClick={handleBookListener}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredListeners.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg mb-4">
              No listeners found matching your criteria.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedSpecialty("All");
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedListener={selectedListener}
      />
    </>
  );
}
