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
        (producto) => {

            const existe =
                carrito.find(
                    item =>
                        item.id === producto.id
                );

            if (existe) {

                setCarrito(
                    carrito.map(item =>
                        item.id === producto.id
                            ? {
                                ...item,
                                cantidad:
                                    item.cantidad + 1
                            }
                            : item
                    )
                );

            } else {

                setCarrito([
                    ...carrito,
                    {
                        ...producto,
                        cantidad: 1
                    }
                ]);
            }
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