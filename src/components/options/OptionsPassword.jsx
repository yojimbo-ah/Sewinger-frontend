import { useContext } from "react"
import { AuthContext } from "../../Contexts/AuthContext" ;
import { useMutation } from "@tanstack/react-query" ;
import { fetchResetAccount } from "../../utils/http";

export default function OptionsName ({ref}) {
    const {user , token , logout} = useContext(AuthContext) ;
    const {data , isPending , isSuccess , mutate} = useMutation({
        mutationFn : () => {
            return fetchResetAccount({email : user.email}) ;
        } ,
        onSuccess : () => {
            setTimeout(() => {
                logout () ;
            } , 4000)
        }
    })
    function handleResetPassword () {
        mutate() ;
    }

    return <div className="border-none flex  justify-center">
        <div className="flex flex-col gap-5">
            <h2 className="mt-6 text-2xl">
                Send edit request
            </h2>
            <p>
                You will be loged out of your account and an email would be sent to you ,
                you can countinue there
            </p>
            <div className="flex gap-5 ">
                <button className="hover:text-orange-400 transition-colors duration-200"
                onClick={() => ref.current.close()}>
                    Cancel
                </button>
                <button disabled={isPending} onClick={handleResetPassword}
                className="hover:text-orange-400 transition-colors duration-200">
                    Send
                </button>
            </div>
        </div>
    </div>
}