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

function App() {

    return (

        <BrowserRouter>

            <Navbar />

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

            </Routes>

        </BrowserRouter>

    );
}

export default App;