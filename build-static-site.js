// Script to build a static version of the site for GitHub Pages
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create docs directory (GitHub Pages can serve from /docs in main branch)
const docsDir = path.join(__dirname, 'docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

// Sample data for listeners - same as what our API would return
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

// Create a more complete static HTML with embedded data
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Borrowed Bestie</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">
    <style>
      :root {
        --primary: #0d9488;
        --primary-light: #e6f7f5;
        --gray-100: #f3f4f6;
        --gray-200: #e5e7eb;
        --gray-800: #1f2937;
        --gray-900: #111827;
      }
      
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        background-color: #f9fafb;
        color: var(--gray-800);
        line-height: 1.5;
      }
      
      header {
        background-color: white;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        padding: 1rem 0;
        position: sticky;
        top: 0;
        z-index: 10;
      }
      
      .header-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1.5rem;
      }
      
      .logo {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--primary);
      }
      
      nav ul {
        display: flex;
        list-style: none;
        gap: 1.5rem;
      }
      
      nav a {
        text-decoration: none;
        color: var(--gray-800);
        font-weight: 500;
        padding: 0.5rem 0;
      }
      
      nav a:hover {
        color: var(--primary);
      }
      
      .main-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem 1.5rem;
      }
      
      .hero {
        padding: 4rem 0;
        text-align: center;
      }
      
      .hero h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        color: var(--gray-900);
      }
      
      .hero p {
        font-size: 1.25rem;
        max-width: 700px;
        margin: 0 auto 2rem auto;
        color: var(--gray-800);
      }
      
      .btn {
        display: inline-block;
        background-color: var(--primary);
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 0.375rem;
        font-weight: 600;
        text-decoration: none;
        cursor: pointer;
        transition: background-color 0.15s ease;
      }
      
      .btn:hover {
        background-color: #0b7a71;
      }
      
      .section-title {
        font-size: 2rem;
        text-align: center;
        margin: 3rem 0 2rem;
        color: var(--gray-900);
      }
      
      .how-it-works {
        background-color: var(--gray-100);
        padding: 4rem 0;
      }
      
      .steps-container {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        justify-content: center;
        max-width: 1200px;
        margin: 0 auto;
      }
      
      .step-card {
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        padding: 2rem;
        width: 100%;
        max-width: 350px;
        text-align: center;
      }
      
      .step-number {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background-color: var(--primary);
        color: white;
        border-radius: 50%;
        font-weight: bold;
        margin-bottom: 1rem;
      }
      
      .step-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1rem;
      }
      
      .listeners-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
      }
      
      .listener-card {
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        overflow: hidden;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      
      .listener-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 20px rgba(0,0,0,0.1);
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
        font-weight: 600;
        margin-bottom: 0.5rem;
      }
      
      .listener-bio {
        color: var(--gray-800);
        margin-bottom: 1rem;
        font-size: 0.875rem;
      }
      
      .rating {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
        color: #fbbf24;
      }
      
      .rating-text {
        margin-left: 0.5rem;
        color: var(--gray-800);
        font-size: 0.875rem;
      }
      
      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }
      
      .tag {
        background: var(--primary-light);
        color: var(--primary);
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.75rem;
        font-weight: 500;
      }
      
      .languages {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 0.5rem;
      }
      
      .language {
        font-size: 0.75rem;
        color: var(--gray-800);
      }
      
      footer {
        background-color: var(--gray-900);
        color: white;
        padding: 3rem 0;
        margin-top: 4rem;
      }
      
      .footer-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1.5rem;
      }
      
      .footer-section {
        margin-bottom: 2rem;
        min-width: 250px;
      }
      
      .footer-section h3 {
        margin-bottom: 1rem;
        font-size: 1.25rem;
      }
      
      .footer-section ul {
        list-style: none;
      }
      
      .footer-section li {
        margin-bottom: 0.5rem;
      }
      
      .footer-section a {
        color: #e5e7eb;
        text-decoration: none;
      }
      
      .footer-section a:hover {
        text-decoration: underline;
      }
      
      .copy {
        text-align: center;
        padding-top: 1rem;
        margin-top: 2rem;
        border-top: 1px solid #4b5563;
        font-size: 0.875rem;
        color: #d1d5db;
      }
      
      @media (max-width: 768px) {
        .hero h1 {
          font-size: 2rem;
        }
        
        .steps-container {
          flex-direction: column;
          align-items: center;
        }
        
        .footer-container {
          flex-direction: column;
        }
      }
    </style>
  </head>
  <body>
    <header>
      <div class="header-container">
        <div class="logo">Borrowed Bestie</div>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#our-besties">Our Besties</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </nav>
      </div>
    </header>
    
    <main>
      <section id="home" class="hero">
        <div class="main-container">
          <h1>Connect with an Emotional Support Bestie</h1>
          <p>Need someone to talk to? Our trained listeners are here to provide confidential peer support. No therapy, no judgment—just genuine human connection when you need it most.</p>
          <a href="#our-besties" class="btn">Meet Our Besties</a>
        </div>
      </section>
      
      <section id="how-it-works" class="how-it-works">
        <div class="main-container">
          <h2 class="section-title">How It Works</h2>
          <div class="steps-container">
            <div class="step-card">
              <div class="step-number">1</div>
              <h3 class="step-title">Browse Our Besties</h3>
              <p>Explore profiles of our trained listeners and find someone who specializes in what you're going through.</p>
            </div>
            <div class="step-card">
              <div class="step-number">2</div>
              <h3 class="step-title">Book a Session</h3>
              <p>Choose a time that works for you and book a 30-minute or 60-minute session with your selected Bestie.</p>
            </div>
            <div class="step-card">
              <div class="step-number">3</div>
              <h3 class="step-title">Connect & Talk</h3>
              <p>Join your secure session via video or audio call and get the emotional support you need from someone who cares.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section id="our-besties">
        <div class="main-container">
          <h2 class="section-title">Meet Our Besties</h2>
          <div id="listeners" class="listeners-grid">
            <!-- Listeners will be populated here -->
          </div>
        </div>
      </section>
      
      <section id="about">
        <div class="main-container">
          <h2 class="section-title">About Borrowed Bestie</h2>
          <p style="text-align: center; max-width: 800px; margin: 0 auto;">
            Borrowed Bestie connects people who need a supportive ear with trained listeners who care. We're not therapy—we're a bridge when you need human connection. Our platform offers accessible emotional support through confidential, judgment-free conversations with verified listeners who have the training and empathy to help you process your feelings, gain perspective, or simply feel heard.
          </p>
        </div>
      </section>
    </main>
    
    <footer>
      <div class="footer-container">
        <div class="footer-section">
          <h3>Borrowed Bestie</h3>
          <p>Emotional support when you need it most.</p>
        </div>
        <div class="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#our-besties">Our Besties</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Contact Us</h3>
          <ul>
            <li>support@borrowedbestie.com</li>
            <li>+1 (555) 123-4567</li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Legal</h3>
          <ul>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <div class="copy">
        © 2025 Borrowed Bestie. All rights reserved.
      </div>
    </footer>
    
    <script>
      // Listeners data embedded directly in the page
      const listeners = ${JSON.stringify(listeners, null, 2)};
      
      // Function to render the listeners
      function renderListeners() {
        const listenersContainer = document.getElementById('listeners');
        
        listeners.forEach(listener => {
          // Create rating stars
          let stars = '';
          const rating = parseFloat(listener.rating);
          for (let i = 0; i < 5; i++) {
            stars += i < Math.floor(rating) ? '★' : '☆';
          }
          
          // Create specialties tags
          const specialtiesHtml = listener.specialties.map(specialty => 
            \`<span class="tag">\${specialty}</span>\`
          ).join('');
          
          // Create languages list
          const languagesHtml = listener.languages.map(language => 
            \`<span class="language">\${language}</span>\`
          ).join(' · ');
          
          const card = document.createElement('div');
          card.className = 'listener-card';
          card.innerHTML = \`
            <img src="\${listener.imageUrl}" alt="\${listener.name}" class="listener-img">
            <div class="listener-info">
              <div class="listener-name">\${listener.name}</div>
              <div class="rating">
                \${stars}
                <span class="rating-text">\${listener.rating} (\${listener.reviewCount} reviews)</span>
              </div>
              <div class="listener-bio">\${listener.bio}</div>
              <div class="tags">\${specialtiesHtml}</div>
              <div class="languages">\${languagesHtml}</div>
              <a href="#" class="btn" style="width:100%; margin-top:1rem; text-align:center;">Book Session</a>
            </div>
          \`;
          
          listenersContainer.appendChild(card);
        });
      }
      
      // Initialize page
      document.addEventListener('DOMContentLoaded', () => {
        renderListeners();
      });
    </script>
  </body>
</html>
`;

// Write the index.html file to the docs directory
fs.writeFileSync(path.join(docsDir, 'index.html'), htmlContent);

console.log('Static site built successfully in the "docs" directory');
console.log('To use with GitHub Pages:');
console.log('1. Commit and push this code to your GitHub repository');
console.log('2. Go to your repository settings');
console.log('3. Scroll down to the GitHub Pages section');
console.log('4. Select "main" as the branch and "/docs" as the folder');
console.log('5. Click Save');
console.log('Your site will be available at https://[your-username].github.io/[repo-name]/'); 