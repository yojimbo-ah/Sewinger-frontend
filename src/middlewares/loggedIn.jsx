import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute ({children}) {
    const {token , loading} = useContext(AuthContext) ;


    if (loading) {
        return <div className="flex justify-center items-center">
            <p>
                loading
            </p>
        </div>
    }
    if (!token) {
        return <Navigate to="/account/login"  replace/>
    }

    return <>{children}</>
}