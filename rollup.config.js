import {terser} from 'rollup-plugin-terser';

export default {
  input: './bot/index.js',
  output: {
    file: './bot/bundle.js',
    format: 'cjs',
  },
  plugins: [
    terser({
      ecma: 8,
      compress: {toplevel: true},
      mangle: {toplevel: true},
    }),
  ],
};
