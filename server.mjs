import http from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const port = process.env.PORT || 8080;
const __dirname = dirname(fileURLToPath(import.meta.url));

const { handler, startServer } = await import('./dist/server/entry.mjs');
console.log('DEBUG: handler type:', typeof handler);
console.log('DEBUG: startServer type:', typeof startServer);

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url || '/', `http://${req.headers.host}`);
    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : req,
      duplex: 'half',
    });

    const response = await handler(request);

    if (!response) {
      console.error('Handler returned undefined');
      res.writeHead(500);
      res.end('Handler returned undefined');
      return;
    }

    res.writeHead(response.status, Object.fromEntries(response.headers));
    res.end(await response.text());
  } catch (err) {
    console.error('Error:', err);
    res.writeHead(500);
    res.end('Internal Server Error');
  }
});

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
