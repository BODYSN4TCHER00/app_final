import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

import { logout } from "../services/auth.service";
import { getProducts, updateProduct } from "../services/product.service";
import { getSupplierInfo } from "../services/supplier.service";
import NavBar from "../components/nav.component";

export default function UpdateProductPage() {
  const { setUser, setIsAuth } = useContext(UserContext);
  const [products, setProductIds] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const nav = useNavigate();

  useEffect(() => {
    fetchProductIds();
    fetchSupplierInfo();
  }, []);

  async function fetchProductIds() {
    const { data } = await getProducts();
    const products = data.productos;
    setProductIds(products);
  }

  async function fetchSupplierInfo() {
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
        nav("/");
      },
      (err) => {
        console.log(err);
      }
    );
  }

  function submitUpdate(data) {
    updateProduct(data).then((res) => console.log(res.data));
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
      <div className=" items-center flex justify-center h-full">
        <form
          className="flex flex-col p-5 bg-black"
          onSubmit={handleSubmit(submitUpdate)}
        >
          <h1 className="text-center font-bold text-3xl tracking-widest">
            MODIFICAR PRODUCTO
          </h1>
          <label htmlFor="productCode">Id del producto</label>
          <select
            id="productCode"
            {...register("productCode", { required: true })}
          >
            <option disabled value="">SELECCIONA UNA OPCION</option>
            {products.map((product, index) => {
              return (
                <option key={index} value={product.product_code}>
                  {product.product_code}
                </option>
              );
            })}
          </select>
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
              {suppliers.map((supplier, index) => {
                return (
                  <option key={index} value={supplier.supplier_id}>
                    {supplier.supplier_id}
                  </option>
                );
              })}
            </select>
          </div>
          <input
            className="bg-red-800 p-2 rounded-md mx-auto mt-5 block"
            type="submit"
            value={"MODIFICAR"}
          />
        </form>
      </div>
    </>
  );
}
