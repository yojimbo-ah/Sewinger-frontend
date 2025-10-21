import { AuthContext } from "../../../Contexts/AuthContext"
import { useContext } from "react"
import { useQuery } from "@tanstack/react-query"
import { getPendingProductsQuery } from "../../../utils/adminhttp"

import { PackageSearch } from "lucide-react"

import EmptyMenu from "../../../UI/emptyMenu/EmptyMenu.jsx" ;
import HeaderLink from "../../../UI/HeaderLink"
import Item from "./Item"

export default function ProductWaitsVer () {
    const {token} = useContext(AuthContext) ;
    const {data , isPending} = useQuery({
        queryFn : () => {
            return getPendingProductsQuery({jwtToken : token})
        } ,
        queryKey : ['admin' , 'pending']
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
        <div className="pt-6 flex flex-wrap gap-4 px-5  border-b-orange-500 p-2  w-full">
            {data && data.products.map(product => {
                return <Item key={product._id} data={product} />
            }) }
            {data && data.products.length === 0 && <EmptyMenu icon={<PackageSearch size={64} className="mx-auto text-gray-400" />} />}
            {isPending && <p>
                    submitting...
                </p>}
        </div>
    </div>
}