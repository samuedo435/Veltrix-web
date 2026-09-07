# 👟 Veltrix Web

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.x-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Status](https://img.shields.io/badge/Estado-En_Desarrollo-green)]()

Interfaz de usuario para la tienda de calzado **Veltrix**, desarrollada como una Single Page Application (SPA) responsiva con **React**, **Vite** y **Bootstrap**. Consume la API REST expuesta por el servicio backend.

---

## 🚀 Características Principales

- 🛍️ **Catálogo de Calzado:** Filtrado por categoría (*Hombre, Mujer, Niños, Unisex*) y ordenamiento dinámico por precio (*ascendente y descendente*).
- 🛒 **Carrito de Compras Persistente:** Gestión del estado global sincronizada con la sesión activa mediante `CartProvider`.
- 🔐 **Autenticación JWT:** Inicio de sesión y registro de usuarios. Los endpoints protegidos adjuntan automáticamente el token Bearer JWT.
- 📱 **Diseño Responsivo:** Adaptado a dispositivos móviles, tablets y escritorios utilizando Bootstrap.

---

## 🛠️ Stack Tecnológico

- **Framework/Librería:** React
- **Herramienta de Construcción:** Vite
- **Enrutamiento:** React Router
- **Cliente HTTP:** Axios
- **Estilos:** Bootstrap
- **Linter:** ESLint

---

## 🔗 Proyectos Relacionados (Backend)

Este frontend se comunica de manera independiente con un servicio backend:

- **Repositorio Backend:** [Veltrix Backend (Spring Boot)](https://github.com/samuedo435/Veltrix-StandAlone.git)
- **Documentación de la API:** Una vez iniciado el backend, puedes acceder a Swagger UI en `http://localhost:8080/swagger-ui.html`

---

## ⚙️ Configuración del Entorno de Desarrollo

### Requisitos Previos
- Node.js (versión 18.x o superior recomendada)
- npm (o yarn/pnpm)
- El servidor backend de Veltrix en ejecución en `http://localhost:8080`

## Instalación e Inicio
```
# 1. Clonar el repositorio
git clone https://github.com/samuedo435/Veltrix-web.git
cd veltrix-web

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```
Por defecto, la aplicación estará disponible en http://localhost:5173.

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
