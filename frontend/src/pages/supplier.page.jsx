import { useContext } from "react";
import { UserContext } from "../context/auth.context";
import { useNavigate, Link } from "react-router-dom";

import NavBar from "../components/nav.component";
import { logout } from "../services/auth.service";

export default function SupplierPage() {
  const { setUser, setIsAuth } = useContext(UserContext);
  const nav = useNavigate();

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
      <NavBar api_name={"productos"} api_uri={"/product"}>
        <input
          className="cursor-pointer"
          type="button"
          value={"CERRAR SESION"}
          onClick={() => onLogout()}
        />
      </NavBar>
      <div className="flex flex-col h-full items-center justify-center">
        <h1 className="text-center text-3xl font-bold tracking-widest">
          PROVEEDORES
        </h1>
        <Link to={"/supplier/new"}>AÑADIR PROVEEDORES</Link>
        <Link className="" to={"/supplier/view"}>
          VER PROVEEDORES
        </Link>
        <Link className="" to={"/supplier/update"}>
          MODIFICAR PROVEEDORES
        </Link>
        <Link className="" to={"/supplier/delete"}>
          ELIMINAR PROVEEDORES
        </Link>
      </div>
    </>
  );
}
