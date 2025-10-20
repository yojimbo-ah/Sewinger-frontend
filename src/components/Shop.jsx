import Item from "../UI/shop/Item";

import { useContext, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../utils/http";

export default function Shop() {
  const {token , user} = useContext(AuthContext) ;
  const [slideMenu , setSlideMenu] = useState(false) ;

  const {data , isPending , isError , isSuccess } = useQuery({
    queryFn : fetchProducts ,
    queryKey : ['products'] 
  })

  console.log(data) ;
  return (
    <div className="flex flex-wrap gap-4 px-5  border-b-orange-500 p-2   w-full">
      {isPending && <h2>
        fetching products
      </h2>}
      {isError && <h2>
        Error happened  
      </h2>}
      {data && data.map(product => {
        return <Item key={product._id} data={product} />
      })}
    </div>
  );
}