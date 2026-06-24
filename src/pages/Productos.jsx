import { useEffect, useState } from "react";
import { obtenerProductos } from "../services/productoService";
import ProductCard from "../components/ProductCard";

function Productos() {

    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return <h2>Cargando...</h2>;
    }

    return (

        <div className="container py-5">

            <h1 className="mb-5">
                Catálogo Veltrix
            </h1>

            <div className="row g-4">

                {
                    productos.map(producto => (

                        <div
                            className="col-lg-4 col-md-6"
                            key={producto.id}
                        >

                            <ProductCard
                                producto={producto}
                            />

                        </div>

                    ))
                }

            </div>

        </div>
    );
}

export default Productos;