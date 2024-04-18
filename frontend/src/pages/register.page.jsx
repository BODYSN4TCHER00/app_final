import { useContext } from "react";
import { useForm, useFormState } from "react-hook-form";
import { addUser } from "../services/auth.service";
import { Link } from "react-router-dom";

import { UserContext } from "../context/auth.context";

export default function RegisterPage() {
  const { user, setUser } = useContext(UserContext);

  const { handleSubmit, errors, register } = useForm();
  const submitForm = async (data) => {
    console.log(data);
    const res = await addUser(data);
    console.log(res);
  };

  return (
    <>
      <Link to={"/"}>Regresar</Link>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Registro
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="max-w-sm mx-auto"
          onSubmit={handleSubmit(submitForm)}
          autoComplete="off"
        >
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Nombre de Usuario
            </label>
          </div>
          <div className="mb-5">
            <input
              type="text"
              id="username"
              placeholder="user1234"
              {...register("username", {
                required: "El nombre de usuario es requerido",
              })}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray"
            >
              Contraseña
            </label>
          </div>
          <div className="mb-5">
            <input
              type="password"
              id="password"
              className="bg-gray-900 border border-gray-300"
              {...register("password", {
                required: "La contraseña es requerida",
              })}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray"
            >
              Teléfono
            </label>
          </div>
          <div className="mb-5">
            <input
              type="text"
              id="phone"
              className="bg-gray-900 border border-gray-300"
              {...register("phone", { required: "El teléfono es requerido" })}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="firstname"
              className="block mb-2 text-sm font-medium text-gray"
            >
              Nombres
            </label>
          </div>
          <div className="mb-5">
            <input
              type="text"
              id="firstname"
              className="bg-gray-900 border border-gray-300"
              {...register("firstname", {
                required: "Los nombres son requeridos",
              })}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="lastname"
              className="block mb-2 text-sm font-medium text-gray"
            >
              Apellidos
            </label>
          </div>
          <div className="mb-5">
            <input
              type="text"
              id="lastname"
              className="bg-gray-900 border border-gray-300"
              {...register("lastname", {
                required: "Los apellidos son requeridos",
              })}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray"
            >
              Correo Electrónico
            </label>
          </div>
          <div className="mb-5">
            <input
              type="email"
              id="email"
              className="bg-gray-900 border border-gray-300"
              {...register("email", { required: "El correo es requerido" })}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="gender"
              className="block mb-2 text-sm font-medium text-gray"
            >
              Genero
            </label>
          </div>
          <div className="mb-5">
            <input
              type="text"
              id="gender"
              className="bg-gray-900 border border-gray-300"
              {...register("gender", { required: "El genero es requerido" })}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="birthdate"
              className="block mb-2 text-sm font-medium text-gray"
            >
              Fecha de Nacimiento
            </label>
          </div>
          <div className="mb-5">
            <input
              type="text"
              id="birthdate"
              className="bg-gray-900 border border-gray-300"
              {...register("birthdate", {
                required: "La fecha de nacimiento es requerida",
              })}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="age"
              className="block mb-2 text-sm font-medium text-gray"
            >
              Edad
            </label>
          </div>
          <div className="mb-5">
            <input
              type="number"
              id="age"
              className="bg-gray-900 border border-gray-300"
              {...register("age", { required: "La edad es requerida" })}
            />
          </div>
          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    </>
  );
}
