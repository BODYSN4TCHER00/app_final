import { BrowserRouter, Routes, Route } from "react-router-dom";

import { UserProvider } from "./context/auth.context";

import RegisterPage from "./pages/register.page";
import LoginPage from "./pages/login.page";
import IndexPage from "./pages/index.page";
import ProductPage from "./pages/products.page";
import SupplierPage from "./pages/supplier.page";
import ProtectedRoute from "./components/route.component";
import NewProductPage from "./pages/newproduct.page";
import UpdateProductPage from "./pages/updateproduct.page";
import DeleteProductPage from "./pages/deleteproduct.page";
import ViewProductPage from "./pages/viewproduct.page";
import NewSupplierPage from "./pages/newsupplier.page";
import ViewSuppliersPage from "./pages/viewsuppliers.page";
import UpdateSupplierPage from "./pages/updatesupplier.page";
import DeleteSupplierPage from "./pages/deletesupplier.page";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<h1>PÁGINA NO ENCONTRADA</h1>} />

          <Route element={<ProtectedRoute />}>
            <Route path="/product" element={<ProductPage />} />
            <Route path="/product/new" element={<NewProductPage />} />
            <Route path="/product/view" element={<ViewProductPage />} />
            <Route path="/product/update" element={<UpdateProductPage />} />
            <Route path="/product/delete" element={<DeleteProductPage />} />
            <Route path="/supplier" element={<SupplierPage />} />
            <Route path="/supplier/new" element={<NewSupplierPage />} />
            <Route path="/supplier/view" element={<ViewSuppliersPage />} />
            <Route path="/supplier/update" element={<UpdateSupplierPage />} />
            <Route path="/supplier/delete" element={<DeleteSupplierPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
