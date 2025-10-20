import { useContext } from "react"
import { AuthContext } from "../../../Contexts/AuthContext"
import { useMutation } from "@tanstack/react-query"

import { queryClient } from "../../../utils/http"
import { adminPatchUserPowerMutation } from "../../../utils/adminhttp"

import { CircleUser } from "lucide-react"

export default function SellerRequestItem ({request}) {
    const {token} = useContext(AuthContext) ;
    const {mutate , data , isPending , isError} = useMutation({
        mutationFn : ({status}) => {
            return adminPatchUserPowerMutation({jwtToken : token , userId : request.userId , status : status})
        } ,
        onSuccess : () => {
            queryClient.invalidateQueries(['admin' , 'sellers'])
        } ,
        onError : (error) => {
            console.log(error) ;
        }
    })

    function handleSubmit ({status}) {
        mutate({status : status}) ;
    }

    return <div className="bg-gray-100 p-4 flex flex-col md:flex-row items-center md:items-start shadow-lg rounded-lg gap-4 w-full max-w-2xl">
    {/* Profile Picture */}
    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full shadow-xl flex-shrink-0">
        {request.profilePicture && (
            <img 
                src={request.profilePicture} 
                alt="profile image" 
                className="h-full w-full rounded-full object-cover"
            />
        )}
        {!request.profilePicture && (
            <CircleUser className="h-full w-full text-black" />
        )}
    </div>
    
    {/* Details Section */}
    <div className="flex-1 flex flex-col md:flex-row justify-between items-center md:items-start gap-4 w-full">
        {/* User Info */}
        <div className="flex flex-col items-center md:items-start">
            <div className="text-center md:text-left">
                <p className="mb-2">
                    <span className="font-semibold">First name:</span> {request.name.firstName}
                </p>
                <p className="mb-4">
                    <span className="font-semibold">Last name:</span> {request.name.lastName}
                </p>
            </div>
            
            {/* Description */}
            <div className="text-center md:text-left max-w-xs">
                <p className="text-sm text-gray-700 break-words">
                    {request.description}
                </p>
            </div>
        </div>
        
        {/* Buttons */}
        {!data && !isPending && <div className="flex flex-col gap-2 min-w-fit">
            <button onClick={() => handleSubmit({status : true})}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors duration-200">
                Approve
            </button>
            <button onClick={() => handleSubmit({status : false})}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors duration-200">
                Deny
            </button>
        </div>}
        {!data && isPending && <div className="flex flex-col gap-2 min-w-fit">
                ...Sending
            </div>}
    </div>
</div>
}