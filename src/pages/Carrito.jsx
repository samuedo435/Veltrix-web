import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getProductImage } from "../utils/productImages.js";
import Footer from "../components/Footer";
import "../styles/carrito.css";

function Carrito() {
    const {
        carrito,
        total,
        actualizarCantidad,
        eliminarDelCarrito
    } = useCart();

    const subtotal = total;

    return (
        <>
            <div className="carrito-page container py-5">
            <div className="row g-4">
                <div className="col-lg-8">
                    <section className="carrito-panel">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div>
                                <p className="carrito-eyebrow">Checkout</p>
                                <h1 className="carrito-title">Tu carrito</h1>
                            </div>
                            <span className="carrito-count">{carrito.length} productos</span>
                        </div>

                        {carrito.length === 0 ? (
                            <div className="carrito-empty">
                                <h4>Tu carrito está vacío.</h4>
                                <p>Explora el catálogo y encuentra tu próximo par favorito.</p>
                                <Link to="/productos" className="btn btn-primary carrito-btn">Ver productos</Link>
                            </div>
                        ) : (
                            <div className="carrito-items-list">
                                {carrito.map(item => (
                                    <div key={item.id} className="carrito-item-card">
                                        <div className="carrito-item-image">
                                            <img src={getProductImage(item.nombre) || item.imagen || "https://via.placeholder.com/220x180.png?text=Veltrix"} alt={item.nombre} />
                                        </div>

                                        <div className="carrito-item-details">
                                            <div className="d-flex justify-content-between align-items-start gap-3">
                                                <div>
                                                    <h5>{item.nombre}</h5>
                                                    <p className="carrito-item-category">{item.categoriaNombre || "Sin categoría"}</p>
                                                </div>
                                                <button
                                                    className="carrito-remove"
                                                    onClick={() => eliminarDelCarrito(item.id)}
                                                >
                                                    Eliminar
                                                </button>
                                            </div>

                                            <div className="carrito-item-footer">
                                                <div className="carrito-quantity">
                                                    <label>Cantidad</label>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={item.cantidad}
                                                        onChange={(e) => actualizarCantidad(item.id, e.target.value)}
                                                    />
                                                </div>

                                                <div className="carrito-price">${(item.precio * item.cantidad).toLocaleString()}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>

                <div className="col-lg-4">
                    <aside className="carrito-summary">
                        <h3>Resumen</h3>

                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>${subtotal.toLocaleString()}</span>
                        </div>

                        <div className="summary-row">
                            <span>Envío</span>
                            <span>Gratis</span>
                        </div>

                        <div className="summary-row total-row">
                            <span>Total</span>
                            <span>${total.toLocaleString()}</span>
                        </div>

                        <Link to="/checkout" className="btn w-100 finalizar-btn">Finalizar compra</Link>
                    </aside>
                </div>
            </div>
            </div>
            <Footer />
        </>
    );
}

export default Carrito;
