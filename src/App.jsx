import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import DetalleProducto from "./pages/DetalleProducto";
import Carrito from "./pages/Carrito";
import FloatingCart from "./components/FloatingCart";
import { Checkout } from "./pages/Checkout";
import { useCart } from "./context/CartContext";

// Adaptador que entrega al checkout el carrito global y su acción de limpieza.
function CheckoutPage() {
    const { carrito, vaciarCarrito } = useCart();

    return <Checkout carrito={carrito} vaciarCarrito={vaciarCarrito} />;
}

function App() {

    return (

        <BrowserRouter>

            {/* La navegación y el carrito flotante rodean todas las páginas. */}
            <Navbar />

            {/* Las rutas públicas se mantienen aquí para que el mapa de la app
                sea visible en un único punto. */}
            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/productos"
                    element={<Productos />}
                />

                <Route
                    path="/profile"
                    element={<Profile />}
                />

                <Route
                    path="*"
                    element={<Navigate to="/" />}
                />

                <Route
                    path="/productos/:id"
                    element={<DetalleProducto />}
                />

                <Route
                    path="/carrito"
                    element={<Carrito />}
                />

                <Route
                    path="/checkout"
                    element={<CheckoutPage />}
                />

            </Routes>

            <FloatingCart />

        </BrowserRouter>

    );
}

export default App;