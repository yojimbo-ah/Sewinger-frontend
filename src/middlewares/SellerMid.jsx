import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Navigate } from "react-router-dom";
import SendSellerRequest from "../components/user-stuff/myProducts/SendSellerRequest";
import RequestHasBeenSent from "../components/user-stuff/myProducts/RequestHasBeenSent";


export default function SellerMid ({children}) {
    const {token , loading , user} = useContext(AuthContext) ;


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

    if (user.power === 'client') {
        if (!user.sentRequest) {
            return <SendSellerRequest />
        }
        return <RequestHasBeenSent />
    }

    return <>{children}</>
}