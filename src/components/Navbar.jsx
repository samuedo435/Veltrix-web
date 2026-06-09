import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    const {
        usuario,
        isAuthenticated,
        logout
    } = useAuth();

    return (

        <nav
            style={{
                padding: "15px",
                borderBottom: "1px solid gray",
                display: "flex",
                gap: "15px"
            }}
        >

            <Link to="/">
                Inicio
            </Link>

            <Link to="/productos">
                Productos
            </Link>

            {
                isAuthenticated
                    ? (
                        <>
                            <Link to="/profile">
                                Perfil
                            </Link>

                            <span>
                                {usuario.correo}
                            </span>

                            <button
                                onClick={logout}
                            >
                                Cerrar sesión
                            </button>
                        </>
                    )
                    : (
                        <Link to="/login">
                            Iniciar sesión
                        </Link>
                    )
            }

        </nav>

    );
}

export default Navbar;