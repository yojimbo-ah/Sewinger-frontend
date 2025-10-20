import { useQuery } from "@tanstack/react-query"
import { AuthContext } from "../../../Contexts/AuthContext"
import { useContext, useState , useRef } from "react"
import { fetchUserProducts } from "../../../utils/http"

import { CirclePlus , PackageSearch } from "lucide-react"
import HeaderLink from "../../../UI/HeaderLink"
import Item from "./Item"
import Button from "./Button"
import Modal from "../../../UI/MyProducts/Modal"
import ProductForm from "../../../UI/MyProducts/ProductForm"
import EmptyMenu from "../../../UI/emptyMenu/EmptyMenu"


export default function MyProductsPending () {
    const {user , token} = useContext(AuthContext) ;
    const id = user.id ;
    const modalRefCreate = useRef() ;
    const {data , error , isError  , isPending } = useQuery({
        queryFn : ({signal}) => {
            return fetchUserProducts({token , valid : 'notValid' , signal}) ;
        } ,
        queryKey : ['products' , 'notValid'] 
    })

    return <>
    <div className="flex gap-3 pl-5">
        <Button name={<CirclePlus />} onClick={() => modalRefCreate.current.open()} />
        <HeaderLink link='/myProducts/pending' >
            pending
        </HeaderLink>
        <HeaderLink link='/myProducts/posted' >
            posted
        </HeaderLink>            
    </div>
    <div className="pt-6 flex flex-wrap gap-4 px-5  border-b-orange-500 p-2  w-full">

            
        {isPending && <h2>
            fetching products
        </h2>}
        {isError && <h2>
            Error happened  
        </h2>}
        {data && data.products.map(product => {
            return <Item key={product._id} data={product} />
        })}
        {data && data.products.length === 0 && <EmptyMenu icon={<PackageSearch size={64} className="mx-auto text-gray-400" />}
        header="You dont have any pending products" paragraph="Add more products to your list" /> }
    <Modal ref={modalRefCreate}>
        <ProductForm modalRef={modalRefCreate} />
    </Modal>
    </div>
    </>
}