import { Link } from "react-router-dom";

export default function IndexPage() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-4xl font-bold mb-8 text-center">¡BIENVENIDO!</h1>
      <div className="mb-4">
        <Link
          to={"/login"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Ir al Login
        </Link>
      </div>
      <Link
        to={"/register"}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Ir al Registro
      </Link>
    </div>
  );
}
