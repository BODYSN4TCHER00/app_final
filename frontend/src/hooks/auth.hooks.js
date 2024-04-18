import { useContext } from "react";
import { UserContext } from "../context/auth.context";

export function useAuth(){
    const context = useContext(UserContext)
    return context
}