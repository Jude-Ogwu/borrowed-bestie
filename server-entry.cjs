// JavaScript entry point for the server
// This file helps bypass TypeScript loading issues on Windows

// We need to register ts-node to handle TypeScript files
require('ts-node').register({
  transpileOnly: true,
  compilerOptions: {
    module: 'CommonJS',
    esModuleInterop: true,
    moduleResolution: 'node'
  }
});

// Set environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Now require the TypeScript server entry point
require('./server/index.ts'); 