import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getProducts, deleteProduct } from "../services/product.service";
import NavBar from "../components/nav.component";

export default function DeleteProductPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data } = await getProducts();
    const products = data.productos;
    // console.log(products)
    setProducts(products);
  }

  function submitDelete(data) {
    deleteProduct(data).then(
      (res) => console.log(res.data),
      (err) => console.log(err)
    );
    setProducts([]);
  }

  return (
    <>
      <NavBar api_name={"productos"} api_uri={"/product"}></NavBar>
      <div className="items-center flex flex-col justify-center h-full">
        <form
          className="bg-zinc-700 flex flex-col p-5"
          onSubmit={handleSubmit(submitDelete)}
        >
          <h1 className="text-center font-bold text-3xl tracking-widest">
            ELIMINAR PRODUCTOS
          </h1>
          <div className="flex flex-col">
            <label htmlFor="productCode">Código del Producto</label>
            <select
              id="productCode"
              {...register("productCode", { required: true })}
            >
              {products.length === 0 ? (
                <option disabled>NO HAY PRODUCTOS</option>
              ) : (
                products.map((product, index) => {
                  return (
                    <option key={index} value={product.product_code}>
                      {product.product_code}
                    </option>
                  );
                })
              )}
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
