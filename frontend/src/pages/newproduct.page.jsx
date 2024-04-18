import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { UserContext } from "../context/auth.context";
import { logout } from "../services/auth.service";
import NavBar from "../components/nav.component";
import { newProduct } from "../services/product.service";
import { getSupplierInfo} from "../services/supplier.service";

export default function NewProductPage() {
  const { setUser, setIsAuth } = useContext(UserContext);
  const [options, setOptions] = useState(null);
  const nav = useNavigate();
  const arr = [];

  useEffect(() => {
    getSupplierInfo().then((res) => {
      for (let i = 0; i < res.data.proveedores.length; i++) {
        // console.log(res.data.proveedores[i].supplier_id);
        arr.push(res.data.proveedores[i].supplier_id);
      }
      setOptions(arr);
    });
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  function submitNewProduct(data) {
    console.log(data);
    newProduct(data).then((res) => console.log(res.data));
  }

  function onLogout() {
    logout().then(
      async (data) => {
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
      <NavBar api_name={"PRODUCTOS"} api_uri={"/product"}>
        <input
          className="cursor-pointer"
          type="button"
          value={"CERRAR SESION"}
          onClick={() => onLogout()}
        />
      </NavBar>
      <div className="items-center flex justify-center h-full">
        <form
          onSubmit={handleSubmit(submitNewProduct)}
          autoComplete="off"
          className="bg-zinc-700 p-5 rounded-md"
        >
          <h1 className="text-center text-3xl tracking-widest font-bold">
            Nuevo Producto
          </h1>
          <div className="flex flex-col">
            <label htmlFor="productCode">Codigo del Producto</label>
            <input
              className="w-full"
              id="productCode"
              type="text"
              {...register("productCode", { required: true })}
            />
          </div>
          <div>
            <label htmlFor="productName">Nombre del Producto</label>
            <input
              className="w-full"
              id="productName"
              type="text"
              {...register("productName", { required: true })}
            />
          </div>
          <div>
            <label htmlFor="productDesc">Descripcion del Producto</label>
            <input
              className="w-full"
              id="productDesc"
              type="text"
              multiple={true}
              {...register("productDesc", { required: true })}
            />
          </div>
          <div>
            <label htmlFor="productStatus">Estado del Producto</label>
            <select
              id="productStatus"
              className="block"
              {...register("productStatus", { required: true })}
            >
              <option value={"agotado"}>AGOTADO</option>
              <option value={"disponible"}>DISPONIBLE</option>
            </select>
          </div>
          <div>
            <label htmlFor="productProvider">Proveedor</label>
            <select
              id="productProvider"
              className="block"
              {...register("productProvider", { required: true })}
            >
              <option disabled>Selecciona un Proveedor</option>
              {options !== null ? (
                options.map((item, i) => {
                  return (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  );
                })
              ) : (
                <option disabled>No hay proveedores</option>
              )}
            </select>
          </div>
          <input className="bg-red-800 p-2 rounded-md mx-auto mt-5 block" type="submit" />
        </form>
      </div>
    </>
  );
}
