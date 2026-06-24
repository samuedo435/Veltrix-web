import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

function Productos() {

    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const cargarProductos = async () => {

            try {

                const response =
                    await api.get("/productos");

                setProductos(response.data);

            } catch (error) {

                console.error(
                    "Error al cargar productos",
                    error
                );

            } finally {

                setLoading(false);
            }
        };

        cargarProductos();

    }, []);

    if (loading) {

        return <h2>Cargando productos...</h2>;
    }

    return (

        <div>

            <h1>Catálogo Veltrix</h1>

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap"
                }}
            >
                {
                    productos.map(producto => (
                    
                        <ProductCard
                            key={producto.id}
                            producto={producto}
                        />
                    
                    ))
                }
            </div>

        </div>
    );
}

export default Productos;