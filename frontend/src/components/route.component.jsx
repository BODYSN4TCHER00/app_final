import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { UserContext } from "../context/auth.context";

export default function ProtectedRoute() {
  const { user, isAuth } = useContext(UserContext);

  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
}
