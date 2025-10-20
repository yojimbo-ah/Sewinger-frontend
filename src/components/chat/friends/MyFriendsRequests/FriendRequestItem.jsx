import { useContext } from "react";
import { AuthContext } from "../../../../Contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { approveFriendRequest } from "../../../../utils/chathttp";
import { queryClient } from "../../../../utils/http";
import { CircleUser, UserX, Check, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FriendRequestItem({ data }) {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate() ;

    const { mutate, isPending } = useMutation({
        mutationFn: ({ approve }) => {
            return approveFriendRequest({ jwtToken: token, friendId: data.friendId, approve: approve })
        },
        onSuccess: () => {
            return queryClient.invalidateQueries(['friends', 'requests'])
        }
    })

    function handleApproveRequest() {
        mutate({ approve: true });
    }

    function handleDeleteRequest() {
        mutate({ approve: false });
    }

    return (
        <div className="group bg-white w-52 rounded-xl shadow-lg border border-gray-200 hover:border-orange-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 overflow-hidden">
            
            {/* Friend Request Badge */}
            <div className="absolute top-4 right-4 z-10">
                <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                    <Mail size={12} />
                    <span>Request</span>
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

            {/* Action Buttons */}
            <div className="px-6 pb-6">
                <div className="flex gap-3 w-full">
                    {/* Remove/Decline Button */}
                    <button
                        disabled={isPending}
                        onClick={handleDeleteRequest}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 h-11 ${
                            isPending
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 hover:scale-105 active:scale-95 border border-red-200 hover:border-red-300'
                        }`}
                    >
                        {isPending ? (
                            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                <UserX size={16} />
                                <span>Remove</span>
                            </>
                        )}
                    </button>

                    {/* Approve Button */}
                    <button
                        disabled={isPending}
                        onClick={handleApproveRequest}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 h-11 ${
                            isPending
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-orange-500 hover:bg-orange-600 text-white hover:scale-105 active:scale-95 shadow-md hover:shadow-lg'
                        }`}
                    >
                        {isPending ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                <Check size={16} />
                                <span>Approve</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Hover Accent Bar */}
            <div className="h-1 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </div>
    );
}