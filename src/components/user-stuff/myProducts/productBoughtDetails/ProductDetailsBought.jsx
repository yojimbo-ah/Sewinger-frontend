import { useParams } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../../../../Contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";

import { getUserWhoBoughtProductQuery } from "../../../../utils/sellerhttp.js";
import ProductDetailsBoughtItem from "./ProductDetailsBoughtItem.jsx" ;


export default function ProductDetailsBought ({}) {
    const params = useParams() ;
    const productId = params.productId ;
    const {token} = useContext(AuthContext) ;
    const {data} = useQuery({
        queryKey : ['seller' , 'buy' , 'users'] ,
        queryFn : () => {
            return getUserWhoBoughtProductQuery({jwtToken : token , productId : productId}) ;
        }
    })

    console.log(data) ;
    return <div className="flex">
            {data && data.users.map(user => {
                return <ProductDetailsBoughtItem data={user} />
            })}
    </div>
} 