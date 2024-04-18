import { useContext } from "react";
import { Link } from "react-router-dom";

import NavBar from "../components/nav.component";
import { UserContext } from "../context/auth.context";
import { logout } from "../services/auth.service";

export default function ProductPage() {
  const { setUser, setIsAuth } = useContext(UserContext);

  function onLogout() {
    logout().then(
      (data) => {
        console.log(data.data);
        setUser(null);
        setIsAuth(false);
        setTimeout(nav, 2000, "/");
      },
      (err) => {
        console.log(err);
      }
    );
  }

  return (
    <>
      <NavBar api_name={"proveedores"} api_uri={"/supplier"}>
        <input
          className="cursor-pointer"
          type="button"
          value={"CERRAR SESION"}
          onClick={() => onLogout()}
        />
      </NavBar>
      <div className="flex flex-col h-full items-center justify-center">
        <h1 className="text-center text-3xl font-bold tracking-widest">
          PRODUCTOS
        </h1>
        <Link to={"/product/new"}>AÑADIR PRODUCTOS</Link>
        <Link to={"/product/view"}>VER PRODUCTOS</Link>
        <Link to={"/product/update"}>MODIFICAR PRODUCTOS</Link>
        <Link to={"/product/delete"}>ELIMINAR PRODUCTOS</Link>
      </div>
    </>
  );
}
