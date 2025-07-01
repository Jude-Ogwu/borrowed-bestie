// Simple build script for Render deployment
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create dist directory if it doesn't exist
if (!fs.existsSync(path.join(__dirname, 'dist'))) {
  fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });
}

console.log('Building React client application...');
try {
  // We assume the client was built by npm run build:client before this script
  console.log('Client build should be complete, checking for files...');
  
  // Locate the built client files (check if they exist)
  const clientDistDir = path.join(__dirname, 'dist', 'public');
  if (!fs.existsSync(clientDistDir) || !fs.readdirSync(clientDistDir).length) {
    console.error('Client build files not found. Make sure to run "npm run build:client" first');
    process.exit(1);
  }
} catch (error) {
  console.error('Failed to verify client build:', error);
  process.exit(1);
}

// Create a server.js file in the dist directory
const serverContent = `
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import fs from 'fs';

// Setup dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App start time for uptime calculations
const appStartTime = new Date();

const app = express();

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create a simple log function
function log(message) {
  const time = new Date().toLocaleTimeString();
  console.log(\`\${time} [server] \${message}\`);
}

// Add a health check endpoint - this helps with monitoring and quicker startup detection
app.get('/health', (req, res) => {
  const uptime = Math.round((new Date() - appStartTime) / 1000);
  res.status(200).json({ 
    status: 'ok',
    uptime: \`\${uptime}s\`
  });
});

// Setup static file serving first for better performance
// Serve static files from the built client app with aggressive caching
const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir, {
  maxAge: '1d', // Cache static assets for 1 day
  etag: true,
  lastModified: true
}));

// Setup API routes
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
      bio: "Creative arts therapist specializing in depression support and creative expression as healing. Non-binary and LGBTQ+ affirming.",
      specialties: ["Depression", "Creative Therapy", "LGBTQ+"],
      languages: ["English"],
      rating: "4.8",
      reviewCount: 91,
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      isAvailable: true,
    }
  ];
  
  res.json(listeners);
});

// For all other routes, serve index.html (for client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

// Get port from environment variable or default to 10000
const PORT = process.env.PORT || 10000;

// Create HTTP server
const server = createServer(app);

// Send "ready" message to process manager
process.on('message', (message) => {
  if (message === 'ready') {
    process.send('ready');
  }
});

// Start server
server.listen(PORT, '0.0.0.0', () => {
  log(\`Server running on port \${PORT}\`);
  // Indicate that the server is ready
  if (process.send) {
    process.send('ready');
  }
});

export default app;
`;

// Write the server.js file to the dist directory
fs.writeFileSync(path.join(__dirname, 'dist', 'server.js'), serverContent);

console.log('Build completed successfully!'); 