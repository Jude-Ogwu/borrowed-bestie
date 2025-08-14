import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Filter, X } from "lucide-react";

interface BookingFilterProps {
  onFiltersChange: (filters: BookingFilters) => void;
}

export interface BookingFilters {
  sessionType?: string;
  specialty?: string;
  language?: string;
  availability?: string;
  gender?: string;
}

export function BookingFilter({ onFiltersChange }: BookingFilterProps) {
  const [filters, setFilters] = useState<BookingFilters>({});

  const sessionTypes = [
    { value: "15", label: "Quick Chat (15 min)", price: "$15" },
    { value: "30", label: "Deep Dive (30 min)", price: "$25" },
    { value: "60", label: "Extended Support (60 min)", price: "$40" },
  ];

  const specialties = [
    "Anxiety", "Stress", "Career", "Relationships", "Life Changes", 
    "Grief", "Young Adults", "Identity"
  ];

  const languages = ["English", "Spanish", "French", "Mandarin"];

  const availabilityOptions = [
    { value: "24hrs", label: "Next 24 Hours" },
    { value: "week", label: "This Week" },
    { value: "flexible", label: "Flexible" },
  ];

  const genderOptions = [
    { value: "any", label: "Any Gender" },
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
    { value: "non-binary", label: "Non-binary" },
  ];

  const updateFilter = (key: keyof BookingFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFiltersChange({});
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800 dark:text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter size={20} />
            <span>Filter Listeners</span>
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFilterCount}
              </Badge>
            )}
          </div>
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            >
              <X size={16} />
              Clear
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Session Type */}
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
            Session Type
          </label>
          <div className="grid grid-cols-1 gap-2">
            {sessionTypes.map((session) => (
              <button
                key={session.value}
                onClick={() => updateFilter('sessionType', session.value)}
                className={`p-3 text-left border rounded-lg transition-all ${
                  filters.sessionType === session.value
                    ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300"
                    : "border-slate-200 dark:border-slate-600 hover:border-teal-300 dark:hover:border-teal-600"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock size={16} />
                    <span className="font-medium text-slate-800 dark:text-white">{session.label}</span>
                  </div>
                  <span className="text-teal-600 dark:text-teal-400 font-semibold">{session.price}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Specialty */}
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
            Specialty
          </label>
          <Select value={filters.specialty || ""} onValueChange={(value) => updateFilter('specialty', value)}>
            <SelectTrigger className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600">
              <SelectValue placeholder="Select specialty..." />
            </SelectTrigger>
            <SelectContent>
              {specialties.map((specialty) => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Language */}
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
            Language
          </label>
          <Select value={filters.language || ""} onValueChange={(value) => updateFilter('language', value)}>
            <SelectTrigger className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600">
              <SelectValue placeholder="Select language..." />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language} value={language}>
                  {language}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Availability */}
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
            Availability
          </label>
          <Select value={filters.availability || ""} onValueChange={(value) => updateFilter('availability', value)}>
            <SelectTrigger className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600">
              <SelectValue placeholder="Select availability..." />
            </SelectTrigger>
            <SelectContent>
              {availabilityOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Gender Preference */}
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
            Gender Preference
          </label>
          <Select value={filters.gender || ""} onValueChange={(value) => updateFilter('gender', value)}>
            <SelectTrigger className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600">
              <SelectValue placeholder="Any gender..." />
            </SelectTrigger>
            <SelectContent>
              {genderOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}