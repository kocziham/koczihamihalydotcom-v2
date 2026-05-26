import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { default: handler } = await import('./dist/server/entry.mjs');

const port = process.env.PORT || 4321;
const host = '0.0.0.0';

const server = createServer(handler);
server.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`);
});
