#!/usr/bin/env node

// This is a CommonJS entry point to help start the server
// and bypass ESM path resolution issues on Windows

// Set NODE_ENV for the child process
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

console.log(`Starting BorrowedBestie in ${process.env.NODE_ENV} mode...`);

// Use the cross-spawn package to handle Windows/Unix differences
const spawn = require('cross-spawn');

// Start the server using tsx
const tsx = spawn.sync('npx', ['tsx', 'server/index.ts'], {
  stdio: 'inherit',
  env: process.env
});

// Exit with the same code as the child process
process.exit(tsx.status); 