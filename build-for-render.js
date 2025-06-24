// Simple build script for Render deployment
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create dist directory if it doesn't exist
if (!fs.existsSync(path.join(__dirname, 'dist'))) {
  fs.mkdirSync(path.join(__dirname, 'dist'));
}

// Create a simple server.js file in the dist directory
const serverContent = `
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import fs from 'fs';

// Setup dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create a simple log function
function log(message) {
  const time = new Date().toLocaleTimeString();
  console.log(\`\${time} [server] \${message}\`);
}

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

// Create dist/public directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Create a simple index.html file if it doesn't exist
const indexPath = path.join(publicDir, 'index.html');
if (!fs.existsSync(indexPath)) {
  fs.writeFileSync(indexPath, \`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Borrowed Bestie</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          color: #333;
        }
        h1 {
          color: #0d9488;
          margin-bottom: 1rem;
        }
        p {
          line-height: 1.6;
        }
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 80vh;
          text-align: center;
        }
        .card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          padding: 2rem;
          margin: 2rem 0;
          max-width: 600px;
        }
        .button {
          background-color: #0d9488;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.375rem;
          font-weight: bold;
          cursor: pointer;
        }
        .listeners {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }
        .listener-card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        .listener-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        .listener-info {
          padding: 1.5rem;
        }
        .listener-name {
          font-size: 1.25rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        .listener-bio {
          margin-bottom: 1rem;
          font-size: 0.875rem;
        }
        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .tag {
          background: #e6f7f5;
          color: #0d9488;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="card">
          <h1>Borrowed Bestie</h1>
          <p>Connect with trained listeners for confidential peer support. No therapy, no judgment—just genuine human connection when you need it most.</p>
        </div>
        
        <h2>Our Besties</h2>
        <div id="listeners" class="listeners">
          <!-- Listeners will be loaded here -->
        </div>
      </div>
      
      <script>
        // Fetch listeners from API
        fetch('/api/listeners')
          .then(response => response.json())
          .then(listeners => {
            const listenersContainer = document.getElementById('listeners');
            
            listeners.forEach(listener => {
              const card = document.createElement('div');
              card.className = 'listener-card';
              
              const specialtiesHtml = listener.specialties.map(specialty => 
                '<span class="tag">' + specialty + '</span>'
              ).join('');
              
              card.innerHTML = 
                '<img src="' + listener.imageUrl + '" alt="' + listener.name + '" class="listener-img">' +
                '<div class="listener-info">' +
                  '<div class="listener-name">' + listener.name + '</div>' +
                  '<div class="listener-bio">' + listener.bio + '</div>' +
                  '<div class="tags">' + specialtiesHtml + '</div>' +
                '</div>';
              
              listenersContainer.appendChild(card);
            });
          })
          .catch(error => console.error('Error fetching listeners:', error));
      </script>
    </body>
  </html>
  \`);
}

// Serve static files from the public directory
app.use(express.static(publicDir));

// For all other routes, serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

// Get port from environment variable or default to 10000
const PORT = process.env.PORT || 10000;

// Create HTTP server
const server = createServer(app);

// Start server
server.listen(PORT, '0.0.0.0', () => {
  log(\`Server running on port \${PORT}\`);
});

export default app;
`;

// Write the server.js file to the dist directory
fs.writeFileSync(path.join(__dirname, 'dist', 'server.js'), serverContent);

console.log('Build completed successfully!'); 