import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import NavBar from "../components/nav.component";
import { logout } from "../services/auth.service";
import { useAuth } from "../hooks/auth.hooks";
import { getSupplierInfo } from "../services/supplier.service";

export default function ViewSuppliersPage() {
  const [suppliers, setSuppliers] = useState([]);
  const { setUser, setIsAuth } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    fetchSuppliers();
  }, []);

  async function fetchSuppliers() {
    const { data } = await getSupplierInfo();
    const suppliers = data.proveedores;
    setSuppliers(suppliers);
  }

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
      <h1 className="text-center font-bold text-3xl">Todos los Proveedores</h1>
      <div className="overflow-x-scroll border self-center max-h-screen bg-zinc-700">
        <table>
          <tbody>
            <tr className="border">
              <th className="border">Id</th>
              <th className="border">Nombre</th>
              <th className="border">Apellido</th>
              <th className="border">Compañia</th>
              <th className="border">Teléfono</th>
              <th className="border">Email</th>
              <th className="border">Creado en</th>
            </tr>
            {suppliers.map((supplier, index) => {
              return (
                <tr className="border">
                  <td className="border">{supplier.supplier_id}</td>
                  <td className="border">{supplier.supplier_fname}</td>
                  <td className="border">{supplier.supplier_lname}</td>
                  <td className="border">{supplier.supplier_com_name}</td>
                  <td className="border">{supplier.supplier_phone}</td>
                  <td className="border">{supplier.supplier_email}</td>
                  <td className="border">{supplier.created_at}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
