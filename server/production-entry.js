// Simple production entry point for the server
// This is a plain JavaScript file that will be bundled by esbuild

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static files from the dist/public directory
app.use(express.static(path.join(__dirname, 'public')));

// Define your API routes here
app.get('/api/listeners', (req, res) => {
  // Sample data for listeners
  const listeners = [
    {
      id: 1,
      name: "Sarah Chen",
      bio: "Licensed social worker with 8 years experience. Specializes in anxiety management and workplace stress. Fluent in English and Mandarin.",
      specialties: ["Anxiety", "Stress", "Career"],
      languages: ["English", "中文"],
      rating: "4.9",
      reviewCount: 127,
      imageUrl: "https://images.unsplash.com/photo-1594824388647-82b8e2cd95b9?w=400&h=400&fit=crop&crop=face",
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
    {
      id: 4,
      name: "Dr. James Wilson",
      bio: "Former therapist turned peer support advocate. Specializes in men's mental health and addiction recovery support.",
      specialties: ["Men's Health", "Addiction", "Recovery"],
      languages: ["English"],
      rating: "4.7",
      reviewCount: 156,
      imageUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
      isAvailable: true,
    },
    {
      id: 5,
      name: "Maya Patel",
      bio: "Mindfulness coach and peer counselor with expertise in cultural transition challenges and family dynamics.",
      specialties: ["Cultural Issues", "Family", "Mindfulness"],
      languages: ["English", "हिन्दी", "ગુજરાતી"],
      rating: "4.9",
      reviewCount: 82,
      imageUrl: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=face",
      isAvailable: true,
    },
    {
      id: 6,
      name: "Alex Thompson",
      bio: "Creative arts therapist specializing in depression support and creative expression as healing. Non-binary and affirming.",
      specialties: ["Depression", "Creative Therapy"],
      languages: ["English"],
      rating: "4.8",
      reviewCount: 91,
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      isAvailable: true,
    }
  ];
  
  res.json(listeners);
});

// For all other routes, serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get port from environment variable or default to 10000
const PORT = process.env.PORT || 10000;

// Create HTTP server
const server = createServer(app);

// Start server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

export default app; 