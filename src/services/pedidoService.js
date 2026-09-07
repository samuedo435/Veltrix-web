import api from "./api";

const authConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

// El endpoint devuelve la colección visible para la sesión; el filtrado por
// cliente se hace aquí porque el endpoint no recibe clienteId como parámetro.
export const obtenerPedidosPorCliente = async (clienteId) => {
    const response = await api.get("/pedidos", authConfig());
    const pedidos = response.data || [];

    return pedidos.filter(pedido => pedido.clienteId === clienteId);
};