import { useState } from "react";
import api from "../services/api";
import { login } from "../services/authService";

function Login() {

    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await login(
            correo,
            password
        );
        
        localStorage.setItem(
            "token",
            response.token
        );

        } catch (error) {

            console.error("Error:");

            if (error.response) {
                console.error(error.response.data);
            } else {
                console.error(error.message);
            }
        }
    };

    return (
        <div>
            <h2>Login Veltrix</h2>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Correo</label>
                    <br />
                    <input
                        type="correo"
                        value={correo}
                        onChange={(e) =>
                            setCorreo(e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <label>Contraseña</label>
                    <br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)}
                    />
                </div>

                <br />

                <button type="submit">
                    Iniciar sesión
                </button>

            </form>
        </div>
    );
}

export default Login;