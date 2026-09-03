import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {

const { isAuthenticated, loading: authLoading } = useAuth();
const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem("carrito");

    if (!carritoGuardado) return [];

    try {
        return JSON.parse(carritoGuardado);
    } catch {
        localStorage.removeItem("carrito");
        return [];
    }
});

// Limpia el carrito solo cuando cambie el estado de autenticación
useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
        setCarrito([]);
        localStorage.removeItem("carrito");
    }
}, [authLoading, isAuthenticated]); // Sin 'carrito' aquí

// Sincronizar el carrito en localStorage solo cuando hay cambios en el carrito y el usuario está autenticado
useEffect(() => {
    if (authLoading || !isAuthenticated) return;

    localStorage.setItem("carrito", JSON.stringify(carrito));
}, [carrito, isAuthenticated, authLoading]);

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