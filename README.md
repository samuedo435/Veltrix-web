# Veltrix Web

Frontend de la tienda Veltrix, construido con React, Vite, React Router y Axios.
La interfaz está en español y consume un backend REST local.

## Ejecutar el proyecto

```bash
npm install
npm run dev
```

El backend debe estar disponible en `http://localhost:8080/api`. La instancia
Axios compartida está definida en `src/services/api.js`.

## Scripts

- `npm run dev`: inicia el servidor de desarrollo.
- `npm run build`: genera la versión de producción en `dist`.
- `npm run lint`: ejecuta ESLint sobre los archivos JavaScript y JSX.
- `npm run preview`: sirve localmente la compilación de producción.

## Organización

- `src/pages`: pantallas de inicio, catálogo, detalle, carrito, checkout, login y perfil.
- `src/components`: navegación, pie de página, carrito flotante y tarjeta de producto.
- `src/context`: estado global de autenticación y carrito.
- `src/services`: llamadas HTTP agrupadas por recurso del backend.
- `src/styles`: estilos asociados a cada pantalla o componente.
- `src/utils`: utilidades compartidas, como el mapa de imágenes locales.

El orden de providers en `src/main.jsx` es intencional: `CartProvider` depende
del estado de autenticación para restaurar y persistir el carrito de la sesión activa.
