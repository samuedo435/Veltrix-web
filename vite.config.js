import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// React plugin transforma JSX y habilita el flujo de desarrollo de Vite para
// los componentes de la aplicación.
export default defineConfig({
  plugins: [react()],
})
