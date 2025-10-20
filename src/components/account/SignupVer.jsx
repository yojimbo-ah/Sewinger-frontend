import { useParams , useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { fetchSignupVer } from "../../utils/http";
import Button from "../../UI/Button";

export default function SignUpVer () {
    const { token } = useParams() ;
    const navigate = useNavigate() ;
    const {isSuccess , mutate , isPending , data , isError} = useMutation({
        mutationFn : ({status}) => {
            fetchSignupVer({token : token , status : status}) ;
        } , 
        onError : (error) => {
            console.log(error.info) 
        } ,
        onSuccess : (result) => {
            console.log(result)
            setTimeout(() => {
                console.log('account has been created') 
                navigate('/account/login') ;
            } , 5000)
        }
    })

    function handleCreate () {
        mutate({status : true}) ;
    }

    function handleDelte () {
        mutate({status : false}) ;
    }
    console.log(`isSuccess : ${isSuccess} 
                isPending : ${isPending}
                data : ${data} 
                isError : ${isError} 
        `)
    return <div className="flex justify-center pt-20" >
        <main className="w-4/5 mt-8 md:w-2/5 py-40 bg-gray-50 border-gray-100 border-4 shadow-xl ">
            {!isError && !isPending && !isSuccess && <h2 className="text-3xl text-center">
                do you wanna validate your account ?
            </h2>}
            {isSuccess && <h2 className="text-3xl text-center">
                {data}
            </h2>}
            {isPending && <h2 className="text-3xl text-center">
                ...Submiting
            </h2>}
            {!isError && !isPending && !isSuccess && <p className="text-center mt-8">
                <Button handleClick={handleDelte} name='Cancel'  />
                <Button handleClick={handleCreate} name='Confirm' />
            </p>}
            {isError && <h2>
                Cant validate account     
            </h2>}
            {isSuccess && <h2 className="text-3xl text-center">
                Account has been created <br/> welcome to Swinger   
            </h2>}
        </main> 
    </div>
}