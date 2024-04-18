import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import NavBar from "../components/nav.component";
import { getSupplierInfo, deleteSupplier } from "../services/supplier.service";

export default function DeleteSupplierPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchSuppliers();
  }, [suppliers]);

  async function fetchSuppliers() {
    const { data } = await getSupplierInfo();
    const suppliers = data.proveedores;
    setSuppliers(suppliers);
  }

  function submitDelete(data) {
    deleteSupplier(data).then(
      (res) => console.log(res.data),
      (err) => console.log(err)
    );
    setSuppliers([]);
  }

  return (
    <>
      <NavBar api_name={"proveedores"} api_uri={"/supplier"}></NavBar>
      <div className="items-center flex flex-col justify-center h-full">
        <form
          className="bg-zinc-700 flex flex-col p-5"
          onSubmit={handleSubmit(submitDelete)}
        >
          <h1 className="text-center font-bold text-3xl tracking-widest">
            ELIMINAR PROVEEDORES
          </h1>
          <div className="flex flex-col">
            <label htmlFor="supplierId">Código del Producto</label>
            <select
              id="supplierId"
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
          </div>
          <input
            className="bg-red-800 p-2 rounded-md mx-auto mt-5 block cursor-pointer"
            type="submit"
            value={"Eliminar Producto"}
          />
        </form>
      </div>
    </>
  );
}
