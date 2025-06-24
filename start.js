// Simple wrapper script to start the application and handle ESM pathways on Windows
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve, join } from 'path';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

// Set NODE_ENV based on environment or default to development
const NODE_ENV = process.env.NODE_ENV || 'development';
process.env.NODE_ENV = NODE_ENV;

// Resolve server entry point
const serverEntrypoint = resolve(__dirname, 'server', 'index.ts');
const tsxBin = join(__dirname, 'node_modules', '.bin', 'tsx');

console.log(`Starting BorrowedBestie in ${NODE_ENV} mode...`);

// Start the server using spawn and tsx
const serverProcess = spawn(
  process.platform === 'win32' ? 'npx.cmd' : 'npx',
  ['tsx', serverEntrypoint],
  { 
    stdio: 'inherit',
    env: { ...process.env }
  }
);

serverProcess.on('error', (err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

serverProcess.on('exit', (code) => {
  if (code !== 0) {
    console.log(`Server process exited with code ${code}`);
    process.exit(code);
  }
}); 