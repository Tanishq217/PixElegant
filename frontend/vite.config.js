import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5173, strictPort: true },
  build: { // Add this build configuration
    rollupOptions: {
      external: [
        // Add any Node.js native modules or packages causing issues here.
        // Based on the error log hint, 'neon' might be the culprit,
        // but double-check your full build logs if this doesn't work.
        // If 'neon' isn't directly in your dependencies, it might be a sub-dependency.
        // For now, let's assume 'neon' is the direct or indirect cause mentioned.
        // If the specific package isn't 'neon', replace 'neon' with the correct package name.
        // 'neon' itself is unlikely to be a direct dependency; check packages like database drivers
        // or other libraries that might use native bindings.
        // Given the provided package.json, there isn't an obvious dependency causing this.
        // Let's add a placeholder comment. If the build still fails, you'll need to investigate
        // which specific dependency is pulling in native code.
         // 'problematic-native-package' // Example: Replace with actual package if known
      ]
    }
  }
})