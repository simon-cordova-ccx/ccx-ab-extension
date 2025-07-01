import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
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