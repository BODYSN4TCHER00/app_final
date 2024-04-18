import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { logout } from "../services/auth.service";
import NavBar from "../components/nav.component";
import { getProducts } from "../services/product.service";
import { useAuth } from "../hooks/auth.hooks";

export default function ViewProductPage() {
  const { setUser, setIsAuth } = useAuth();
  const [products, setProducts] = useState([]);
  const nav = useNavigate();

  async function fetchProducts() {
    const { data } = await getProducts();
    setProducts(data.productos);
    // console.log(products)
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

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <NavBar api_name={"PRODUCTOS"} api_uri={"/product"}>
        <input
          className="cursor-pointer"
          type="button"
          value={"CERRAR SESION"}
          onClick={() => onLogout()}
        />
      </NavBar>
      <h1 className="text-center font-bold text-3xl">TODOS LOS PRODUCTOS</h1>
      <div className="overflow-x-scroll border self-center max-h-screen bg-zinc-700">
        <table>
          <tbody>
            <tr className="border">
              <th className="border">Código</th>
              <th className="border">Nombre</th>
              <th className="border">Descripcion</th>
              <th className="border">Status</th>
              <th className="border">Proveedor</th>
              <th className="border">Creado</th>
            </tr>
            {products.map((product, index) => {
              return (
                <tr className="border">
                  <td className="border">{product.product_code}</td>
                  <td className="border">{product.product_name}</td>
                  <td className="border">{product.product_desc}</td>
                  <td className="border">{product.product_status}</td>
                  <td className="border">{product.product_provider}</td>
                  <td className="border">{product.created_at}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
