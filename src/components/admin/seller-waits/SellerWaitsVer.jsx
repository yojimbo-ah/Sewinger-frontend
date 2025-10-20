import { useContext } from "react"
import { AuthContext } from "../../../Contexts/AuthContext"
import { useQuery } from "@tanstack/react-query"

import { UserCog } from "lucide-react";

import HeaderLink from "../../../UI/HeaderLink";
import SellerRequestItem from "./SellerRequestItem";
import EmptyMenu from "../../../UI/emptyMenu/EmptyMenu";

import { getSellerRequestQuery } from "../../../utils/adminhttp";


export default function SellerWaitsVer () {
    const {token} = useContext(AuthContext) ;

    const {data} = useQuery({
        queryKey : ['admin' , 'sellers'] ,
        queryFn : () => {
            return getSellerRequestQuery({jwtToken : token})
        }
    })
    
    console.log(data) ;
    return <div className="h-full w-full">
        <div className="pl-6 flex gap-4">
            <HeaderLink link='/admin/sellerVer'>
                Users
            </HeaderLink>
            <HeaderLink link='/admin/productVer'>
                Products
            </HeaderLink>
        </div>
        <div className="mt-4 mx-4">
            {data && data.requests.map(request => {
                return <SellerRequestItem request={request} key={request.userId} />
            })}
            {data && data.requests.length === 0 && <EmptyMenu icon={<UserCog size={64} className="mx-auto text-gray-400" />} />}
        </div>
    </div>
}