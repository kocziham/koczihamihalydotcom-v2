import { fileURLToPath } from 'url';
import { dirname } from 'path';

const port = process.env.PORT || 8080;
const __dirname = dirname(fileURLToPath(import.meta.url));

const { startServer } = await import('./dist/server/entry.mjs');

const server = await startServer(port);

if (server) {
  server.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port}`);
  });

  server.on('error', (err) => {
    console.error('Server error:', err);
    process.exit(1);
  });

  process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down');
    server.close(() => process.exit(0));
  });
} else {
  console.log('startServer returned null, server already listening');
}
