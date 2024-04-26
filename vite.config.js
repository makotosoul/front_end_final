import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/front_end_final/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
