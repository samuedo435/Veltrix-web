import api from "./api";

const authConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

// Igual que los pedidos, los detalles se descargan con autenticación y se
// filtran por pedidoId antes de entregarlos al historial del perfil.
export const obtenerDetallesPorPedido = async (pedidoId) => {
    const response = await api.get("/detalles-pedido", authConfig());
    const detalles = response.data || [];
    
    return detalles.filter(detalle => detalle.pedidoId === pedidoId);
};