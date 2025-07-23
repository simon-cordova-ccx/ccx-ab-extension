const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const replace = require('@rollup/plugin-replace');
const serve = require('rollup-plugin-serve');
const livereload = require('rollup-plugin-livereload');
const { WebSocketServer } = require('ws');
const chokidar = require('chokidar');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  input: 'popup/popup.js',
  output: {
    file: 'dist/popup/popup.js',
    format: 'es',
    sourcemap: isDev
  },
  plugins: [
    resolve({ browser: true }),
    commonjs(),
    replace({
      preventAssignment: true,
      __IS_DEV__: isDev
    }),
    isDev && serve({
      contentBase: 'dist',
      port: 3000
    }),
    isDev && livereload({
      watch: ['dist', 'scripts'],
      verbose: true
    }),
    isDev && {
      name: 'watch-scripts',
      buildStart() {
        const wss = new WebSocketServer({ port: 8080 });
        wss.on('connection', (ws) => {
          console.log('WebSocket client connected');
          ws.on('message', (message) => console.log('Received:', message));
        });
        chokidar.watch(['scripts/**/*.js', 'scripts/config.json']).on('change', (path) => {
          console.log(`File changed: ${path}`);
          wss.clients.forEach((client) => {
            if (client.readyState === client.OPEN) {
              client.send(JSON.stringify({ type: 'file-changed', path }));
            }
          });
        });
      }
    }
  ].filter(Boolean)
};