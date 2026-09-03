import api from "./api";

const authConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const obtenerDetallesPorPedido = async (pedidoId) => {
    const response = await api.get("/detalles-pedido", authConfig());
    const detalles = response.data || [];
    
    // Filtra los detalles que corresponden a este pedido específico
    return detalles.filter(detalle => detalle.pedidoId === pedidoId);
};