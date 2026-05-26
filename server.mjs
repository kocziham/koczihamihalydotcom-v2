import { createServer } from 'http';

try {
  const { default: handler } = await import('./dist/server/entry.mjs');

  const port = process.env.PORT || 4321;
  const host = '0.0.0.0';

  const server = createServer(handler);
  server.listen(port, host, () => {
    console.log(`✓ Server listening on http://${host}:${port}`);
  });

  server.on('error', (err) => {
    console.error('Server error:', err);
    process.exit(1);
  });
} catch (err) {
  console.error('Failed to start server:', err);
  process.exit(1);
}
