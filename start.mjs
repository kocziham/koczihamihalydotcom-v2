console.log('Starting with PORT:', process.env.PORT || '8080');
console.log('SITE_URL:', process.env.SITE_URL || 'https://koczihamihaly.com');

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

try {
  await import('./dist/server/entry.mjs');
  console.log('Server started successfully');
} catch (err) {
  console.error('Failed to import entry:', err);
  process.exit(1);
}
