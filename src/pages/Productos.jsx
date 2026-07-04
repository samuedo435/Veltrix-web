import { useEffect, useMemo, useState } from "react";
import { obtenerProductos } from "../services/productoService";
import ProductCard from "../components/ProductCard";
import "../styles/productos.css";

const categoriasSimuladas = [
    "Todas",
    "Running",
    "Lifestyle",
    "Entrenamiento",
    "Trail"
];

function Productos() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [categoria, setCategoria] = useState("Todas");
    const [ordenPrecio, setOrdenPrecio] = useState("asc");

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                const data = await obtenerProductos();
                setProductos(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        cargarProductos();
    }, []);

    const productosFiltrados = useMemo(() => {
        const buscados = productos.filter((producto) => {
            const texto = `${producto.nombre} ${producto.categoriaNombre}`.toLowerCase();
            return texto.includes(search.toLowerCase());
        });

        const porCategoria = categoria === "Todas"
            ? buscados
            : buscados.filter(producto => producto.categoriaNombre === categoria);

        return [...porCategoria].sort((a, b) => {
            if (ordenPrecio === "asc") {
                return a.precio - b.precio;
            }
            return b.precio - a.precio;
        });
    }, [productos, search, categoria, ordenPrecio]);

    if (loading) {
        return <div className="container py-5"><h2>Cargando...</h2></div>;
    }

    return (
        <main className="productos-page container">
            <section className="productos-hero">
                <h1>Encuentra tu próximo par</h1>
                <p>Explora las zapatillas Veltrix con estilo premium, rendimiento superior y opciones pensadas para cada paso.</p>
            </section>

            <div className="productos-controls">
                <div className="productos-search">
                    <input
                        type="text"
                        placeholder="Buscar por nombre o categoría"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="productos-filters">
                    {categoriasSimuladas.map((item) => (
                        <button
                            key={item}
                            className={`productos-filter-button ${categoria === item ? "active" : ""}`}
                            onClick={() => setCategoria(item)}
                            type="button"
                        >
                            {item}
                        </button>
                    ))}

                    <select
                        className="productos-sort-select"
                        value={ordenPrecio}
                        onChange={(e) => setOrdenPrecio(e.target.value)}
                    >
                        <option value="asc">Precio: menor a mayor</option>
                        <option value="desc">Precio: mayor a menor</option>
                    </select>
                </div>
            </div>

            {productosFiltrados.length === 0 ? (
                <div className="productos-empty">
                    <p>No se encontraron productos con esos criterios.</p>
                </div>
            ) : (
                <div className="productos-grid">
                    {productosFiltrados.map((producto) => (
                        <ProductCard key={producto.id} producto={producto} />
                    ))}
                </div>
            )}
        </main>
    );
}

export default Productos;
