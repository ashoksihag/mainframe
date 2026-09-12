import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' makes asset URLs relative, so the built site works on GitHub
// Pages (https://username.github.io/repo-name/) and custom domains alike.
export default defineConfig({
  base: './',
  plugins: [react()],
});
