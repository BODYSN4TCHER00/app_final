import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import NavBar from "../components/nav.component";
import { updateSupplier, getSupplierInfo } from "../services/supplier.service";
import { logout } from "../services/auth.service";

export default function UpdateSupplierPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [suppliers, setSuppliers] = useState([]);
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

  function submitUpdate(data) {
    updateSupplier(data).then(
      (res) => console.log(res.data),
      (err) => console.log(err)
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
      <div className=" items-center flex justify-center h-full">
        <form
          className="flex flex-col p-5 bg-black"
          onSubmit={handleSubmit(submitUpdate)}
        >
          <h1 className="text-center font-bold text-3xl tracking-widest">
            MODIFICAR PROVEEDOR
          </h1>
          <label htmlFor="supplierId">Id del Proveedor</label>
          <select
            id="supplierId"
            className="cursor-pointer"
            {...register("supplierId", { required: true })}
          >
            <option disabled value="">
              SELECCIONA UNA OPCION
            </option>
            {suppliers.map((supplier, index) => {
              return (
                <option key={index} value={supplier.supplier_id}>
                  {supplier.supplier_id}
                </option>
              );
            })}
          </select>
          <div>
            <label htmlFor="supplierFName">Nombre del Proveedor</label>
            <input
              className="w-full"
              id="supplierFName"
              type="text"
              {...register("supplierFName", { required: true })}
            />
          </div>
          <div>
            <label htmlFor="supplierLName">Apellido del Proveedor</label>
            <input
              className="w-full"
              id="supplierLName"
              type="text"
              {...register("supplierLName", { required: true })}
            />
          </div>
          <div>
            <label htmlFor="supplierComName">Nombre de la Compañia</label>
            <input
              id="supplierComName"
              className="block"
              type="text"
              {...register("supplierComName", { required: true })}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="supplierPhone">Teléfono del Proveedor</label>
            <input
              type="tel"
              id="supplierPhone"
              {...register("supplierPhone", { required: true })}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="supplierEmail">Email del Proveedor</label>
            <input
              type="email"
              id="supplierEmail"
              {...register("supplierEmail", { required: true })}
            />
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
