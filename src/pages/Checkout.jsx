import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import Footer from "../components/Footer";
import "../styles/checkout.css";

export function Checkout({ carrito, vaciarCarrito }) {
    const { usuario } = useAuth();

    // Precargar la dirección registrada en el perfil del cliente
    const [direccionEnvio, setDireccionEnvio] = useState(
        usuario?.cliente?.direccion || ""
    );
    const [metodoPago, setMetodoPago] = useState("EFECTIVO"); // Ajustar a Enum backend
    const [procesando, setProcesando] = useState(false);
    const [error, setError] = useState("");

    const totalCalculado = carrito.reduce(
        (sum, item) => sum + item.precio * item.cantidad,
        0
    );

    const handleFinalizarCompra = async (e) => {
        e.preventDefault();
        setProcesando(true);
        setError("");

        try {
            const token = localStorage.getItem("token");

            // Preparar el cuerpo de la petición acorde a CheckoutRequest DTO
            const checkoutPayload = {
                productos: carrito.map((item) => ({
                    productoId: item.id,
                    cantidad: item.cantidad
                })),
                metodoPago: metodoPago,
                direccionEnvio: direccionEnvio
            };

            const response = await api.post("/pedidos/checkout", checkoutPayload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data) {
                vaciarCarrito();
                alert(`¡Pedido #${response.data.pedidoId} realizado con éxito!`);
                // Redirigir al perfil o historial de pedidos
                window.location.href = "/perfil";
            }
        } catch (err) {
            console.error("Error al procesar la compra:", err);
            setError(
                err.response?.data?.message || "Ocurrió un error al procesar tu pedido."
            );
        } finally {
            setProcesando(false);
        }
    };

    return (
        <>
        <div className="checkout-container container py-5">
            <h2>Finalizar Compra</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="row">
                <div className="col-md-7">
                    <form onSubmit={handleFinalizarCompra}>
                        <h4 className="mb-3">Información de Envío</h4>
                        
                        <div className="mb-3">
                            <label htmlFor="direccion" className="form-label">Dirección de Entrega</label>
                            <input
                                type="text"
                                id="direccion"
                                className="form-control"
                                value={direccionEnvio}
                                onChange={(e) => setDireccionEnvio(e.target.value)}
                                required
                            />
                            <small className="text-muted">
                                Confirmaremos esta dirección para la entrega de tus productos.
                            </small>
                        </div>

                        <h4 className="mb-3 mt-4">Método de Pago</h4>
                        <div className="mb-3">
                            <select
                                className="form-select"
                                value={metodoPago}
                                onChange={(e) => setMetodoPago(e.target.value)}
                            >
                                <option value="EFECTIVO">Efectivo</option>
                                <option value="TARJETA">Tarjeta de Crédito / Débito</option>
                                <option value="PSE">PSE</option>
                                <option value="NEQUI">Nequi</option>
                                <option value="DAVIPLATA">Daviplata</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-lg w-100 mt-3"
                            disabled={procesando || carrito.length === 0}
                        >
                            {procesando ? "Procesando pedido..." : "Finalizar Compra"}
                        </button>
                    </form>
                </div>

                <div className="col-md-5">
                    <div className="card p-3 bg-light">
                        <h4>Resumen de Orden</h4>
                        <ul className="list-group list-group-flush my-3">
                            {carrito.map((item) => (
                                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center bg-transparent">
                                    <div>
                                        <h6>{item.nombre}</h6>
                                        <small className="text-muted">Cantidad: {item.cantidad}</small>
                                    </div>
                                    <span>${item.precio * item.cantidad}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="d-flex justify-content-between fw-bold fs-5 border-top pt-2">
                            <span>Total:</span>
                            <span>${totalCalculado}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}