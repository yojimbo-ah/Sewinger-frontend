import { useContext } from "react"
import { AuthContext } from "../../../Contexts/AuthContext"
import { adminDeleteProductMutation } from "../../../utils/adminhttp"
import { queryClient } from "../../../utils/http"
import { useMutation } from "@tanstack/react-query";
import Button from "../../../UI/shop/Button";
import ButtonText from "../../../UI/shop/ButtonText";

export default function FormDenyProduct ({ref , productId}) {
    const {token} = useContext(AuthContext) ;
    const {data , isPending , mutate , isError} = useMutation({
        mutationFn : () => {
            return adminDeleteProductMutation({jwtToken : token , productId : productId })
        } ,
        onSuccess : () => {
            queryClient.invalidateQueries([]) ;
            setTimeout(() => {
                ref.current.close() ;
            } , 4000)
        } ,
        onError : (error) => {
            console.log(error) ;
            console.log(error.info) ;
        }
    })

    function handleFormSubmit () {
        mutate() ;
    }

    return <form action={handleFormSubmit} className="pt-6 h-full">
        <div className="bg-white p-6 rounded-lg flex flex-col shadow-lg h-full">
            <h2>Are you sure do you want to delete the product ?</h2>
            {data && <h2 className="text-green-500 text-center text-2xl"> 
                product was deleted Succufully
            </h2>}
            {isError && <h2 className="text-red-500 text-2xl text-center">
                Couldnt delete product , error accured
            </h2>}
            <div className="flex justify-end gap-4 mt-auto">
                {!data && !isPending && <ButtonText type='button' handleClick={() => {ref.current.close()}} name='Cancel' />}
                {!data && !isPending && <Button name='delete' />}
                {isPending && <p>Submitting ...</p>}
            </div>
        </div>
    </form>
}