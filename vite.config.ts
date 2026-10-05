import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative base: the built site works from any URL path
  // (GitHub Pages project URL, Netlify, Vercel, or a plain folder).
  base: './',
});
