const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');

module.exports = {
  input: 'popup/popup.js',
  output: {
    file: 'dist/popup/popup.js',
    format: 'es',
    sourcemap: false
  },
  plugins: [
    resolve({ browser: true }),
    commonjs()
  ]
};