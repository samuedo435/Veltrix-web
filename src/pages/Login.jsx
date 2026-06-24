import { useState } from "react";
import api from "../services/api";
import {login as loginService} from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Login() {

    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        
        try {
        
            const response =
                await loginService(
                    correo,
                    password
                );
            
            await login(response.token);
            
        } catch (error) {
        
            console.error(error);
        
            if (error.response) {
                console.error(
                    error.response.data
                );
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