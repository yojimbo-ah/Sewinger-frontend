import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function AdminMid ({children}) {
    const {token , user , loading} = useContext(AuthContext) ;


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

    if (user.power !== 'admin') {
        return <Navigate replace to='/shop' />
    }

    return <>{children}</>
}