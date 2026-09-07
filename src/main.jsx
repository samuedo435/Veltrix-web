import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./styles/theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from "./context/CartContext";

// CartProvider debe estar dentro de AuthProvider porque decide si puede
// restaurar y persistir el carrito según el estado de autenticación.
ReactDOM.createRoot(
    document.getElementById("root")
).render(

    <React.StrictMode>

        <AuthProvider>
            <CartProvider>
                <App />
            </CartProvider>
        </AuthProvider>

    </React.StrictMode>

);