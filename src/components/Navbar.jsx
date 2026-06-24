import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

function Navbar() {

    const {
        usuario,
        isAuthenticated,
        logout
    } = useAuth();

    return (
        <nav className="navbar-custom">

            <div className="container">

                <div className="d-flex justify-content-between align-items-center py-4">

                    <Link
                        to="/"
                        className="logo"
                    >
                        Veltrix
                    </Link>

                    <div className="d-flex align-items-center gap-4">

                        <Link to="/">
                            Inicio
                        </Link>

                        <Link to="/productos">
                            Tienda
                        </Link>

                        <Link to="/carrito">
                            Carrito
                        </Link>

                        {
                            isAuthenticated ? (
                                <>
                                    <span>
                                        {usuario.correo}
                                    </span>

                                    <button
                                        className="btn-login"
                                        onClick={logout}
                                    >
                                        Cerrar sesión
                                    </button>
                                </>
                            ) : (
                                <Link
                                    className="btn-login"
                                    to="/login"
                                >
                                    Iniciar sesión
                                </Link>
                            )
                        }

                    </div>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;