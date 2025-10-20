import { useContext } from "react"
import { AuthContext } from "../../../../Contexts/AuthContext"
import { queryClient } from "../../../../utils/http"
import { useMutation } from "@tanstack/react-query"
import { deleteFriendRequestMutation } from "../../../../utils/chathttp"
import { CircleUser, UserX, Clock } from "lucide-react"
import { useNavigate } from "react-router-dom"


export default function PendingRequestItem({ data }) {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate() ;

    const { mutate, isPending } = useMutation({
        mutationFn: () => {
            return deleteFriendRequestMutation({ jwtToken: token, friendId: data.friendId })
        },
        onSuccess: () => {
            return queryClient.invalidateQueries(['friends', 'requests', 'prending'])
        }
    })

    function handleDeletePendingRequest() {
        mutate();
    }

    return (
        <div className="group bg-white w-52 rounded-xl shadow-lg border border-gray-200 hover:border-orange-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 overflow-hidden">
            
            {/* Pending Status Badge */}
            <div className="absolute top-4 right-4 z-10">
                <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                    <Clock size={12} />
                    <span>Pending</span>
                </div>
            </div>

            {/* Profile Section */}
            <div className="pt-6 pb-4 flex flex-col items-center bg-gradient-to-b from-gray-50 to-white">
                {/* Profile Picture with Animation */}
                <div onClick={() => {
                    navigate(`/profile/${data.friendId}`)
                }}
                className="relative mb-4">
                    <div className="w-24 h-24 rounded-full shadow-xl ring-4 ring-white transition-all duration-300 group-hover:ring-orange-200 group-hover:shadow-2xl">
                        {data.profileImage ? (
                            <img 
                                src={data.profileImage} 
                                className="h-full w-full rounded-full object-cover transition-transform duration-300 group-hover:scale-105" 
                                alt={`${data.name.firstName} ${data.name.lastName}`}
                            />
                        ) : (
                            <div className="h-full w-full rounded-full bg-gray-100 flex items-center justify-center transition-colors duration-300 group-hover:bg-orange-50">
                                <CircleUser className="h-16 w-16 text-gray-400 group-hover:text-orange-400 transition-colors duration-300" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Name Section */}
                <div className="text-center space-y-1">
                    <h3 className="font-bold text-lg text-black group-hover:text-orange-600 transition-colors duration-200">
                        {data.name.firstName} {data.name.lastName}
                    </h3>
                </div>
            </div>

            {/* Info Section */}
            <div className="px-6 py-4 bg-white">
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">First name:</span>
                        <span className="text-sm font-semibold text-black">{data.name.firstName}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">Last name:</span>
                        <span className="text-sm font-semibold text-black">{data.name.lastName}</span>
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <div className="px-6 pb-6">
                <button
                    disabled={isPending}
                    onClick={handleDeletePendingRequest}
                    className={`w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isPending
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 hover:scale-105 active:scale-95 border border-red-200 hover:border-red-300'
                    }`}
                >
                    {isPending ? (
                        <>
                            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                            <span>Removing...</span>
                        </>
                    ) : (
                        <>
                            <UserX size={16} />
                            <span>Remove</span>
                        </>
                    )}
                </button>
            </div>

            {/* Hover Accent Bar */}
            <div className="h-1 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </div>
    );
}