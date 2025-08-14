// This file contains mock data for development purposes
// In production, this data would come from the backend API

import type { Listener } from "@shared/schema";

export const mockListeners: Listener[] = [
  {
    id: 1,
    name: "Annie Gonyora",
    bio: "Licensed social worker with 8 years experience. Specializes in anxiety management and workplace stress. Fluent in English only.",
    specialties: ["Anxiety", "Stress", "Career"],
    languages: ["English"],
    rating: "4.9",
    reviewCount: 127,
    imageUrl: "/annie_gonyora.png",
    isAvailable: true,
  },
  {
    id: 2,
    name: "Marcus Johnson",
    bio: "Certified peer support specialist focusing on relationship challenges and major life transitions. Warm, empathetic listening style.",
    specialties: ["Relationships", "Life Changes", "Grief"],
    languages: ["English", "Español"],
    rating: "4.8",
    reviewCount: 94,
    imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    isAvailable: true,
  },
  {
    id: 3,
    name: "Lisa Rodriguez",
    bio: "Psychology graduate specializing in support and young adult challenges. Creates inclusive and affirming spaces for all identities.",
    specialties: ["Young Adults", "Identity"],
    languages: ["English", "Français"],
    rating: "5.0",
    reviewCount: 73,
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    isAvailable: true,
  },
];
