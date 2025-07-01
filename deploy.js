#!/usr/bin/env node

// Deploy script for Render.com
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('⚙️ Starting deployment process...');

try {
  // Step 1: Build the client
  console.log('📦 Building client application...');
  execSync('npm run build:client', { stdio: 'inherit' });
  
  // Step 2: Build the server bundle
  console.log('📦 Building server bundle...');
  execSync('node build-for-render.js', { stdio: 'inherit' });
  
  console.log('✅ Build completed successfully!');
  console.log('\n🚀 To deploy to Render:');
  console.log('1. Commit these changes to your Git repository');
  console.log('2. Push to your connected Git provider (GitHub, GitLab, etc.)');
  console.log('3. Render will automatically deploy from your connected repository');
  console.log('\nNote: To avoid the loading screen, we\'ve added:');
  console.log('- Preboot configuration in render.yaml');
  console.log('- Health check endpoint at /health');
  console.log('- Optimized static file serving with caching');
  
} catch (error) {
  console.error('❌ Deployment preparation failed:', error);
  process.exit(1);
} 