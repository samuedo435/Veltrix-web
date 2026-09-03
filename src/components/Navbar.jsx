import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";
import { useState } from "react";

function Navbar() {
    const [open, setOpen] = useState(false);

    const { usuario, isAuthenticated, logout } = useAuth();
    const nombreUsuario = usuario?.nombre || usuario?.nombreUsuario || usuario?.correo;

    return (
        <nav className="navbar-custom navbar navbar-expand-lg">
            <div className="container">
                <Link to="/" className="navbar-brand logo">
                    Veltrix
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    aria-controls="navbarNav"
                    aria-expanded={open}
                    aria-label="Toggle navigation"
                    onClick={() => setOpen(!open)}
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className={`collapse navbar-collapse ${open ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-lg-center">
                        <li className="nav-item">
                            <Link to="/" className="nav-link" onClick={() => setOpen(false)}>Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/productos" className="nav-link" onClick={() => setOpen(false)}>Productos</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/carrito" className="nav-link" onClick={() => setOpen(false)}>Carrito</Link>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center gap-3">
                        {isAuthenticated ? (
                            <>
                                <span className="user-email">{nombreUsuario}</span>
                                <button className="btn btn-outline-light btn-sm rounded-pill" onClick={() => { logout(); setOpen(false); }}>
                                    Cerrar sesión
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="btn btn-outline-light btn-sm rounded-pill" onClick={() => setOpen(false)}>
                                Iniciar sesión
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;