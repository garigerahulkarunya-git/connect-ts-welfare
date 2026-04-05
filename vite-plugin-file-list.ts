import fs from 'fs';
import path from 'path';
import type { Plugin } from 'vite';

/**
 * Vite plugin that exposes an API to list files in public asset folders at runtime.
 * This enables true live add/delete of images without rebuilding.
 */
export function fileListPlugin(): Plugin {
  return {
    name: 'file-list-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/__api/beneficiary-stories') {
          const dir = path.resolve(__dirname, 'public/assets/beneficiary_stories');
          try {
            const files = fs.readdirSync(dir).filter(f =>
              /\.(png|jpg|jpeg|webp)$/i.test(f)
            );
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(files));
          } catch {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify([]));
          }
          return;
        }

        if (req.url === '/__api/homepage-gallery') {
          const dir = path.resolve(__dirname, 'public/assets/homepage_gallery');
          try {
            const files = fs.readdirSync(dir).filter(f =>
              /\.(png|jpg|jpeg|webp)$/i.test(f)
            );
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(files));
          } catch {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify([]));
          }
          return;
        }

        next();
      });
    },
  };
}
