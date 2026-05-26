import http from 'http';

const port = process.env.PORT || 8080;

const { default: handler } = await import('./dist/server/entry.mjs');

const server = http.createServer(handler);

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
