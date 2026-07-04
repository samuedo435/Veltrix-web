import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

    const [carrito, setCarrito] =
        useState([]);

    useEffect(() => {

        const carritoGuardado =
            localStorage.getItem("carrito");

        if (carritoGuardado) {

            setCarrito(
                JSON.parse(carritoGuardado)
            );
        }

    }, []);

    useEffect(() => {

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );

    }, [carrito]);

    const agregarAlCarrito =
        (producto, cantidad = 1) => {

            const existe =
                carrito.find(
                    item =>
                        item.id === producto.id
                );

            if (existe) {

                setCarrito(prev =>
                    prev.map(item =>
                        item.id === producto.id
                            ? {
                                ...item,
                                cantidad:
                                    item.cantidad + cantidad
                            }
                            : item
                    )
                );

            } else {

                setCarrito(prev => [
                    ...prev,
                    {
                        ...producto,
                        cantidad: producto.cantidad || cantidad
                    }
                ]);
            }
        };

    const actualizarCantidad = (id, cantidad) => {
        const cantidadValida = Math.max(1, Number(cantidad) || 1);

        setCarrito(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, cantidad: cantidadValida }
                    : item
            )
        );
    };

    const eliminarDelCarrito =
        (id) => {

            setCarrito(
                carrito.filter(
                    item => item.id !== id
                )
            );
        };

    const vaciarCarrito = () => {

        setCarrito([]);
    };

    const total =
        carrito.reduce(
            (sum, item) =>
                sum +
                item.precio *
                    item.cantidad,
            0
        );

    return (

        <CartContext.Provider
            value={{
                carrito,
                total,
                agregarAlCarrito,
                actualizarCantidad,
                eliminarDelCarrito,
                vaciarCarrito
            }}
        >

            {children}

        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}