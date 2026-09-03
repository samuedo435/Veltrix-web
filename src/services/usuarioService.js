import api from "./api";

const authConfig = () => ({
	headers: {
		Authorization: `Bearer ${localStorage.getItem("token")}`
	}
});

export const actualizarUsuario = async (id, datos) => {
	const response = await api.put(`/usuarios/${id}`, datos, authConfig());
	return response.data;
};
