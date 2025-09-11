const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const replace = require('@rollup/plugin-replace');
const serve = require('rollup-plugin-serve');
const livereload = require('rollup-plugin-livereload');
const { WebSocketServer } = require('ws');
const chokidar = require('chokidar');

const isDev = process.env.NODE_ENV === 'development';

module.exports = [
  // Bundle for popup.js
  {
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
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
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
          chokidar.watch(['scripts/**/*.js', 'popup/popup.js', 'scripts/config.json']).on('change', (path) => {
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
  },
  // Bundle for background.js
  {
    input: 'scripts/background.js',
    output: {
      file: 'dist/scripts/background.js',
      format: 'es',
      sourcemap: isDev
    },
    plugins: [
      resolve({ browser: true }),
      commonjs(),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
        __IS_DEV__: isDev
      })
    ]
  },
  // Bundle for content.js
  {
    input: 'scripts/content.js',
    output: {
      file: 'dist/scripts/content.js',
      format: 'iife', // Changed from 'es' to 'iife' for content script compatibility
      sourcemap: isDev
    },
    plugins: [
      resolve({ browser: true }),
      commonjs(),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
        __IS_DEV__: isDev
      })
    ]
  }
];