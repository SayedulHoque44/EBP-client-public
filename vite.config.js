import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
//   define : {
//     global :  "globalThis",
//   },
//   resolve: {
//     alias: {
//         './runtimeConfig': './runtimeConfig.browser',
//     },
// },
})
