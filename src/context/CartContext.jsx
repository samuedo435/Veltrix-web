import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {

// El carrito se guarda localmente para sobrevivir a la navegación, pero solo
// se sincroniza después de confirmar que existe una sesión autenticada.
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

// Al cerrar sesión se elimina también la copia local para evitar mezclar
// productos entre cuentas.
useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
        setCarrito([]);
        localStorage.removeItem("carrito");
    }
}, [authLoading, isAuthenticated]);

// Persistir cada cambio del carrito únicamente para la sesión activa.
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

            // Un producto ocupa una sola línea; agregarlo de nuevo acumula sus
            // unidades en lugar de crear una entrada duplicada.
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
        // La interfaz siempre conserva al menos una unidad y convierte a
        // número cualquier valor procedente de un input HTML.
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