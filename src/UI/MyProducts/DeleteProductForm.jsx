
import TextButton  from "../../components/user-stuff/myProducts/Button"
import Button from "../shop/Button"
import { deleteProductMutation , queryClient } from "../../utils/http"
import { useMutation } from "@tanstack/react-query"
import { AuthContext } from "../../Contexts/AuthContext"
import { useContext  , useState} from "react"

export default function DeleteProductForm ({modalRef , productId , status}) {
    const {token} = useContext(AuthContext) ;
    const {mutate , isError , error , data} = useMutation({
        mutationFn : () => {
            return deleteProductMutation({jwtToken : token , productId : productId}) ;
        } ,
        onSuccess : () => {
            queryClient.invalidateQueries(['products' , 'valid']) ;
            queryClient.invalidateQueries(['products' , 'notValid']) ;
            setTimeout(() => {
                modalRef.current.close() ;
            } , 4000)
        } ,
        onError : ({error}) => {
            console.log(error);
        }
    })

    function handleDelete () {
        mutate()
    }

    return <>
        <form className="flex flex-col h-full w-full">
            <h2 className="text-2xl mt-7 text-center">
                are you sure in deleting this product ?
            </h2>
            <p className="mt-10 text-center mx-10">
                you cant recover it after you delte so be careful
                all the clients who bought the product will be removed from them
            </p>
            {data && <p className="text-green-800 text-xl text-center mx-16 ">
                product was deleted from cart
            </p>}
            {isError && <p className="text-red-700 text-xl text-center mx-16 ">
                error happened couldnt delete product    
            </p>}


            <div className="mt-auto mr-6 mb-6 flex gap-4 justify-end">
                <TextButton onClick={() => modalRef.current.close()} name='Close' />
                <Button handleClick={handleDelete} name='Delete' />
            </div>
        </form>
    </>
}

