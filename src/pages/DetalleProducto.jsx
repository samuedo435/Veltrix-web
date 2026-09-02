import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerProductoPorId, obtenerProductos } from "../services/productoService";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import "../styles/detalle-producto.css";
import { getProductImage } from "../utils/productImages.js";

function DetalleProducto() {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cantidad, setCantidad] = useState(1);
    const { agregarAlCarrito } = useCart();

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [detalle, lista] = await Promise.all([
                    obtenerProductoPorId(id),
                    obtenerProductos()
                ]);

                setProducto(detalle);
                setProductos(lista);
                setCantidad(1);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        cargarDatos();
    }, [id]);

    const productosRelacionados = useMemo(() => {
        if (!producto || productos.length === 0) return [];

        return productos
            .filter((item) => item.id !== producto.id && item.categoriaNombre === producto.categoriaNombre)
            .slice(0, 3);
    }, [producto, productos]);

    const incrementar = () => {
        if (!producto) return;
        if (cantidad < producto.stock) {
            setCantidad((prev) => prev + 1);
        }
    };

    const decrementar = () => {
        setCantidad((prev) => Math.max(1, prev - 1));
    };

    if (loading) {
        return (
            <div className="container py-5">
                <h2>Cargando producto...</h2>
            </div>
        );
    }

    if (!producto) {
        return (
            <div className="container py-5">
                <h2>Producto no encontrado</h2>
            </div>
        );
    }

    const placeholder = "https://via.placeholder.com/800x600.png?text=Zapatilla+Veltrix";
    const imageUrl = getProductImage(producto.nombre) || producto.imagen || placeholder;
    
    return (
        <main className="detalle-producto-page container py-5">
            <section className="detalle-top row gy-5 align-items-center">
                <div className="col-12">
                    <div className="detalle-info-card">
                        <div className="detalle-info-content">
                            <p className="detalle-category">{producto.categoriaNombre || "Sin categoría"}</p>
                            <h1 className="detalle-title">{producto.nombre}</h1>
                            <p className="detalle-price">${producto.precio.toLocaleString()}</p>
                            <div className="detalle-meta d-flex flex-wrap gap-3 mb-4">
                                <span className="detalle-stock">Stock: {producto.stock}</span>
                                <span className="detalle-id">Referencia: {producto.id}</span>
                            </div>

                            <div className="detalle-quantity mb-4">
                                <label className="form-label">Cantidad</label>
                                <div className="cantidad-selector">
                                    <button type="button" onClick={decrementar} className="cantidad-btn">-</button>
                                    <span>{cantidad}</span>
                                    <button type="button" onClick={incrementar} className="cantidad-btn">+</button>
                                </div>
                            </div>

                            <button
                                className="btn agregar-btn"
                                onClick={() => agregarAlCarrito({ ...producto, cantidad }, cantidad)}
                                disabled={producto.stock === 0}
                            >
                                {producto.stock > 0 ? "Agregar al carrito" : "Agotado"}
                            </button>

                            <div className="detalle-description mt-4">
                                <h2>Descripción</h2>
                                <p>{producto.descripcion}</p>
                            </div>
                        </div>

                        <div className="detalle-image-card">
                            <img src={imageUrl} alt={producto.nombre} />
                        </div>
                    </div>
                </div>
            </section>

            {productosRelacionados.length > 0 && (
                <section className="related-section mt-5">
                    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                        <div>
                            <h2>Productos relacionados</h2>
                            <p className="text-muted">Descubre más zapatillas similares a esta categoría.</p>
                        </div>
                    </div>

                    <div className="related-grid">
                        {productosRelacionados.map((item) => (
                            <ProductCard key={item.id} producto={item} />
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}

export default DetalleProducto;
