import api from "./api";

// Las operaciones de cliente requieren el JWT almacenado por AuthContext.
const authConfig = () => ({
	headers: {
		Authorization: `Bearer ${localStorage.getItem("token")}`
	}
});

export const actualizarUsuario = async (id, datos) => {
	// El backend espera el objeto Cliente completo, incluido su usuario anidado.
	const response = await api.put(`/clientes/${id}`, datos, authConfig());
	return response.data;
};
