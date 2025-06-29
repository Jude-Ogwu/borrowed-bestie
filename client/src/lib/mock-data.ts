// This file contains mock data for development purposes
// In production, this data would come from the backend API

import type { Listener } from "@shared/schema";

export const mockListeners: Listener[] = [
  {
    id: 1,
    name: "Sarah Chen",
    bio: "Licensed social worker with 8 years experience. Specializes in anxiety management and workplace stress. Fluent in English and Mandarin.",
    specialties: ["Anxiety", "Stress", "Career"],
    languages: ["English", "中文"],
    rating: "4.9",
    reviewCount: 127,
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
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
    bio: "Psychology graduate specializing in LGBTQ+ support and young adult challenges. Creates inclusive and affirming spaces for all identities.",
    specialties: ["LGBTQ+", "Young Adults", "Identity"],
    languages: ["English", "Français"],
    rating: "5.0",
    reviewCount: 73,
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    isAvailable: true,
  },
];
