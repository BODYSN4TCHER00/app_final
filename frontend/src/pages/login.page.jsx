import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/auth.context";
import { login } from "../services/auth.service";

export default function LoginPage() {
  const [serverMsg, setServerMsg] = useState("");
  const { setUser, setIsAuth, isAuth } = useContext(UserContext);

  const nav = useNavigate();

  useEffect(() => {
    if (isAuth) {
      setTimeout(nav, 2000, "/product");
    }
  }, [isAuth]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  function submitForm(data) {
    login(data).then(
      (res) => {
        if (res.data.token) {
          setUser(res.data);
          setIsAuth(true);
        }

        if (res.data.mensaje) {
          setServerMsg(res.data.mensaje.toUpperCase());
          setTimeout(setServerMsg, 1500, "");
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8 mx-auto lg:py-0 bg-gradient-to-br from-blue-500 to-indigo-600">
      <div className="w-full bg-white rounded-lg shadow-xl dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0 dark:border-gray-700">
        <Link className="ml-4 mt-4 text-sm font-semibold text-blue-500 hover:text-blue-700 dark:text-blue-300" to={"/"}>
          ← Regresar
        </Link>
        {serverMsg !== "" && (
          <div className="mx-5 my-2 p-2 text-center text-white bg-red-500 rounded-md shadow">
            {serverMsg}
          </div>
        )}
        <h1 className="py-4 text-2xl font-bold text-center text-gray-700 dark:text-white">
          Iniciar Sesión
        </h1>
        <form
          className="px-8 pb-8 space-y-6"
          onSubmit={handleSubmit(submitForm)}
        >
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
              Nombre de Usuario
            </label>
            <input
              id="username"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              type="text"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <span className="text-xs text-red-600">Este campo es obligatorio</span>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
              Contraseña
            </label>
            <input
              id="password"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-xs text-red-600">Este campo es obligatorio</span>
            )}
          </div>
          <input
            className="w-full px-4 py-2 font-semibold text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
            type="submit"
            value="Iniciar Sesión"
          />
        </form>
      </div>
    </div>
  );
}
