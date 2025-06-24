// Simple CommonJS server starter that avoids ESM path issues
const path = require('path');
const spawn = require('cross-spawn');
const fs = require('fs');

// Set NODE_ENV for the child process
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

console.log(`Starting BorrowedBestie in ${process.env.NODE_ENV} mode...`);

// Let's try direct access to npx ts-node without ESM specifics
const serverProcess = spawn.sync('npx', [
  'ts-node',
  '--transpileOnly',
  '--compilerOptions', '{"module":"CommonJS"}',
  'server/index.ts'
], {
  stdio: 'inherit',
  env: process.env,
  cwd: process.cwd()
});

// Exit with the same code as the child process
process.exit(serverProcess.status); 