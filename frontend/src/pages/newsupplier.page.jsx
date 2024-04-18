import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/auth.hooks";
import NavBar from "../components/nav.component";
import { logout } from "../services/auth.service";
import { newSupplier } from "../services/supplier.service";

export default function NewSupplierPage() {
  const { setUser, setIsAuth } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const nav = useNavigate();

  function submitNewSupplier(data) {
    newSupplier(data).then(
      (res) => console.log(res.data),
      (err) => console.log(err)
    );
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
      <NavBar api_name={"PROVEEDORES"} api_uri={"/supplier"}>
        <input
          className="cursor-pointer"
          type="button"
          value={"CERRAR SESION"}
          onClick={() => onLogout()}
        />
      </NavBar>
      <div className="flex flex-col h-full items-center justify-center">
        <form
          className="bg-zinc-700 p-5"
          onSubmit={handleSubmit(submitNewSupplier)}
        >
          <h1 className="text-center text-3xl tracking-widest font-bold">
            Nuevo Proveedor
          </h1>
          <div className="flex flex-col">
            <label htmlFor="supplierId">Id del Proveedor</label>
            <input
              id="supplierId"
              type="text"
              {...register("supplierId", { required: true })}
            />
            {errors.supplierId && (
              <span className="text-red-500">{"Este campo es requerido"}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="supplierFName">Nombre del Proveedor</label>
            <input
              id="supplierFName"
              type="text"
              {...register("supplierFName", { required: true })}
            />
            {errors.supplierFName && (
              <span className="text-red-500">{"Este campo es requerido"}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="supplierLName">Apellido del Proveedor</label>
            <input
              id="supplierLName"
              type="text"
              {...register("supplierLName", { required: true })}
            />
            {errors.supplierLName && (
              <span className="text-red-500">{"Este campo es requerido"}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="supplierComName">Nombre de la Compañia</label>
            <input
              id="supplierComName"
              type="text"
              {...register("supplierComName", { required: true })}
            />
            {errors.supplierComName && (
              <span className="text-red-500">{"Este campo es requerido"}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="supplierPhone">Teléfono del Proveedor</label>
            <input
              id="supplierPhone"
              type="tel"
              {...register("supplierPhone", { required: true })}
            />
            {errors.supplierPhone && (
              <span className="text-red-500">{"Este campo es requerido"}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="supplierEmail">Correo del Proveedor</label>
            <input
              id="supplierEmail"
              type="email"
              {...register("supplierEmail", { required: true })}
            />
            {errors.supplierEmail && (
              <span className="text-red-500">{"Este campo es requerido"}</span>
            )}
          </div>
          <input
            className="bg-red-800 p-2 rounded-md mx-auto mt-5 block cursor-pointer"
            type="submit"
          />
        </form>
      </div>
    </>
  );
}
