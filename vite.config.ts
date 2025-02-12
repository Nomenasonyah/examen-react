// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          // Si un module provient de 'node_modules', le placer dans un chunk séparé
          if (id.includes('node_modules')) {
            return 'vendor'; // Nom du chunk pour les dépendances
          }
        }
      }
    }
  }
});
