import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Start the API server with TypeScript support
const apiServer = spawn('npx', [
  'tsx',
  '--tsconfig',
  'tsconfig.api.json',
  'src/api/server.ts'
], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    NODE_ENV: 'development',
    PORT: 3001,
  },
});

// Start the Vite dev server
const viteServer = spawn('vite', ['--host', '--port', '8080'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    NODE_ENV: 'development',
  },
});

// Handle process exit
const handleExit = () => {
  if (apiServer) {
    apiServer.kill('SIGTERM');
  }
  if (viteServer) {
    viteServer.kill('SIGTERM');
  }
  process.exit(0);
};

// Handle process signals
process.on('SIGINT', handleExit);
process.on('SIGTERM', handleExit);
process.on('exit', handleExit);

// Handle API server errors
apiServer.on('error', (err) => {
  console.error('❌ API server error:', err);
  handleExit();
});

apiServer.on('close', (code) => {
  if (code !== 0) {
    console.error(`❌ API server exited with code ${code}`);
    handleExit();
  }
});

// Handle Vite server errors
viteServer.on('error', (err) => {
  console.error('❌ Vite server error:', err);
  handleExit();
});

viteServer.on('close', (code) => {
  if (code !== 0) {
    console.error(`❌ Vite server exited with code ${code}`);
    handleExit();
  }
});

console.log('🚀 Starting development servers...');
console.log('🌐 API server: http://localhost:3001');
console.log('⚡ Vite dev server: http://localhost:8080');
