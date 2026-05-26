import http from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = parseInt(process.env.PORT || '8080', 10);
const host = '0.0.0.0';

console.log(`Starting server on ${host}:${port}...`);

try {
  const { default: handler } = await import('./dist/server/entry.mjs');

  const server = http.createServer(async (req, res) => {
    try {
      const response = await handler(req);

      // Copy headers
      for (const [key, value] of response.headers) {
        res.setHeader(key, value);
      }

      res.writeHead(response.status);
      res.end(await response.text());
    } catch (error) {
      console.error('Request error:', error);
      res.writeHead(500);
      res.end('Internal Server Error');
    }
  });

  server.listen(port, host, () => {
    console.log(`✓ Server listening on http://${host}:${port}`);
  });

  server.on('error', (err) => {
    console.error('Server error:', err);
    process.exit(1);
  });

} catch (error) {
  console.error('Failed to start:', error);
  process.exit(1);
}
