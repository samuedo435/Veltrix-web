import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/floating-cart.css";

function FloatingCart() {
    const location = useLocation();
    const navigate = useNavigate();
    const { carrito } = useCart();

    if (location.pathname === "/carrito") {
        return null;
    }

    const cantidadArticulos = carrito.reduce(
        (total, item) => total + (Number(item.cantidad) || 0),
        0
    );

    return (
        <button
            type="button"
            className="floating-cart-btn"
            onClick={() => navigate("/carrito")}
            aria-label={`Ir al carrito${cantidadArticulos ? `, ${cantidadArticulos} artículos` : ""}`}
        >
            {cantidadArticulos > 0 && (
                <span className="floating-cart-count" aria-hidden="true">
                    {cantidadArticulos}
                </span>
            )}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
        </button>
    );
}

export default FloatingCart;