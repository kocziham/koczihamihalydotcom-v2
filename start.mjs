import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || '8080';

console.log(`[start] PORT=${port}`);
console.log(`[start] SITE_URL=${process.env.SITE_URL || 'https://koczihamihaly.com'}`);

const proc = spawn('node', ['dist/server/entry.mjs'], {
  cwd: __dirname,
  stdio: 'inherit',
  env: {
    ...process.env,
    PORT: port,
    SITE_URL: process.env.SITE_URL || 'https://koczihamihaly.com',
  },
});

proc.on('error', (err) => {
  console.error('[start] spawn error:', err);
  process.exit(1);
});

proc.on('exit', (code, signal) => {
  console.error(`[start] process exited: code=${code} signal=${signal}`);
  process.exit(code || 1);
});

process.on('SIGTERM', () => {
  console.log('[start] SIGTERM received, killing child process');
  proc.kill();
});
