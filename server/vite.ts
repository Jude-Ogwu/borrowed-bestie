import express, { type Express } from "express";
import * as fs from "fs";
import * as path from "path";
import { createServer, type Server } from "http";

// For CommonJS compatibility
const __dirname = __dirname || process.cwd();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  try {
    // Import Vite dynamically
    const { createServer: createViteServer } = require('vite');
    
    // Create Vite server in middleware mode
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: {
          server
        }
      },
      appType: 'custom'
    });

    // use vite's connect instance as middleware
    app.use(vite.middlewares);
    
    // Serve HTML
    app.use("*", async (req, res, next) => {
      const url = req.originalUrl;

      try {
        // Path to index.html
        const clientTemplate = path.resolve(
          __dirname,
          "..",
          "client",
          "index.html"
        );

        // always reload the index.html file from disk in case it changes
        let template = await fs.promises.readFile(clientTemplate, "utf-8");
        template = template.replace(
          `src="/src/main.tsx"`,
          `src="/src/main.tsx?v=${Date.now()}"`,
        );
        const page = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(page);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } catch (e) {
    console.error("Vite server setup error:", e);
    throw e;
  }
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "..", "dist", "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
