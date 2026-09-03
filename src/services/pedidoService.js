import api from "./api";

const authConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const obtenerPedidosPorCliente = async (clienteId) => {
    const response = await api.get("/pedidos", authConfig());
    const pedidos = response.data || [];

    // Filtra los pedidos pertenecientes al cliente logueado
    return pedidos.filter(pedido => pedido.clienteId === clienteId);
};