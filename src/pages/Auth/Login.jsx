import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { toast } from "sonner";

import api from "../../lib/Axios";
import useAuth from "../../hooks/useAuth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      return toast.error("Todos los campos son obligatorios");
    }

    try {
      const { data } = await api.post("/users/login", {
        email,
        password,
      });

      if (data.response === "success") {
        localStorage.setItem("token-MERN", data.token);
        setAuth(data.user);
        setEmail("");
        setPassword("");
        navigate("/");
      }
    } catch (error) {
      console.log(`[CREATE_USER_ERROR]: ${error}`);
      toast.error(error.response.data.message);
    }
  };

  if (auth._id) return <Navigate to="/" />;

  return (
    <form onSubmit={onSubmit} className="space-y-7">
      <div className="w-full max-w-lg relative">
        <label
          htmlFor="email"
          className="absolute -top-2 left-2 px-4 font-bold text-xs bg-gray-100"
        >
          Correo electrónico
        </label>
        <input
          id="email"
          type="text"
          className="w-full border border-gray-500/30 bg-transparent py-3 px-5 rounded-full outline-none placeholder:text-gray-400"
          placeholder="tucorreo@example.com"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="w-full max-w-lg relative">
        <label
          htmlFor="password"
          className="absolute -top-2 left-2 px-4 font-bold text-xs bg-gray-100"
        >
          Contraseña
        </label>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          className="w-full border border-gray-500/30 bg-transparent py-3 px-5 rounded-full outline-none placeholder:text-gray-400"
          placeholder="********"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full hover:bg-gray-200 transition-colors duration-300"
        >
          {showPassword ? (
            <i className="fi fi-rr-unlock"></i>
          ) : (
            <i className="fi fi-rr-lock"></i>
          )}
        </button>
      </div>

      <div className="text-right">
        <Link to="/auth/forgot-password" className="text-sm text-gray-500">
          ¿Olvidaste tu contraseña?
        </Link>
      </div>
      <div>
        <button
          type="submit"
          className="w-full bg-black text-white rounded-full py-3 px-5"
        >
          Ingresar
        </button>
      </div>
      <div className="text-center">
        <p>
          ¿No tienes una cuenta?{" "}
          <Link to="/auth/register" className="font-bold hover:underline">
            Registrate
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginPage;
