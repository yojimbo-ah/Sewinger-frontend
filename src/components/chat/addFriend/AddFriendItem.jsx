import { useMutation } from "@tanstack/react-query"
import { AuthContext } from "../../../Contexts/AuthContext"
import { useContext } from "react"
import { queryClient } from "../../../utils/http";
import { addFriendReqeustMutation, approveFriendRequest } from "../../../utils/chathttp";
import { CircleUser, UserPlus, UserCheck, UserX, Clock, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AddFriendItem({ data, tag }) {
    const { token } = useContext(AuthContext);
    const naviagte = useNavigate() ;
    const { mutate: addFriendMutate, isPending: isPendingFriend } = useMutation({
        mutationFn: () => {
            return addFriendReqeustMutation({ jwtToken: token, friendId: data._id });
        },
        onSuccess: () => {
            queryClient.setQueryData(['users', 'search', tag], (old) => {
                const newData = { ...old };
                newData.users = newData.users.map(user => {
                    if (user._id.toString() === data._id.toString()) {
                        data.status = 'pending';
                        data.sentBy = 'me';
                    }
                    return user;
                })
                return newData;
            })
        }
    })

    const { mutate: approveFriendMutate, isPending: isPendingApproveFriend } = useMutation({
        mutationFn: () => {
            return approveFriendRequest({ jwtToken: token, friendId: data._id, approve: true });
        },
        onSuccess: () => {
            queryClient.setQueryData(['users', 'search', tag], (old) => {
                const newData = { ...old };
                newData.users = newData.users.map(user => {
                    if (user._id.toString() === data._id.toString()) {
                        data.status = 'friend';
                    }
                    return user;
                })
                return newData;
            })
        }
    })

    const { mutate: notApproveFriendMutate, isPending: isPendingNotApprove } = useMutation({
        mutationFn: () => {
            return approveFriendRequest({ jwtToken: token, friendId: data._id, approve: false });
        },
        onSuccess: () => {
            queryClient.setQueryData(['users', 'search', tag], (old) => {
                const newData = { ...old };
                newData.users = newData.users.map(user => {
                    if (user._id.toString() === data._id.toString()) {
                        data.status = 'normal';
                    }
                    return user;
                })
                return newData;
            })
        }
    })

    function handleSendFriendRequest() {
        addFriendMutate();
    }

    function handleFriendRequestApproving() {
        approveFriendMutate();
    }

    function handleFriendRequestNotApproving() {
        notApproveFriendMutate();
    }

    const isLoading = isPendingFriend || isPendingApproveFriend || isPendingNotApprove;

    return (
        <div className="group bg-white w-52 rounded-xl shadow-lg border border-gray-200 hover:border-orange-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 overflow-hidden">
            {/* Status Badge */}
            {data.status !== 'normal' && (
                <div className="absolute top-4 right-4 z-10">
                    {data.status === 'friend' && (
                        <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                            <UserCheck size={12} />
                            <span>Friend</span>
                        </div>
                    )}
                    {data.status === 'pending' && (
                        <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                            <Clock size={12} />
                            <span>Pending</span>
                        </div>
                    )}
                </div>
            )}

            {/* Profile Section */}
            <div className="pt-6 pb-4 flex flex-col items-center bg-gradient-to-b from-gray-50 to-white relative">
                {/* Profile Picture */}
                <div onClick={() => {
                    naviagte(`/profile/${data._id.toString()}`) ;
                }}
                className="w-24 h-24 rounded-full shadow-xl ring-4 ring-white transition-all duration-300 group-hover:ring-orange-200 group-hover:shadow-2xl mb-4">
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
                {/* Pending request sent by friend - Approve/Decline */}
                {data.status === 'pending' && data.sentBy === 'friend' && (
                    <div className="flex gap-3">
                        <button 
                            disabled={isLoading}
                            onClick={handleFriendRequestNotApproving}
                            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                isLoading
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 hover:scale-105 active:scale-95 border border-red-200'
                            }`}
                        >
                            <UserX size={16} />
                            <span>Decline</span>
                        </button>

                        <button
                            disabled={isLoading}
                            onClick={handleFriendRequestApproving}
                            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                isLoading
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-orange-500 hover:bg-orange-600 text-white hover:scale-105 active:scale-95 shadow-md hover:shadow-lg'
                            }`}
                        >
                            <Check size={16} />
                            <span>Approve</span>
                        </button>
                    </div>
                )}

                {/* Pending request sent by me - Cancel */}
                {data.status === 'pending' && data.sentBy === 'me' && (
                    <button 
                        disabled={isLoading}
                        onClick={handleFriendRequestNotApproving}
                        className={`w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                            isLoading
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:scale-105 active:scale-95'
                        }`}
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                                <span>Canceling...</span>
                            </>
                        ) : (
                            <>
                                <UserX size={16} />
                                <span>Cancel Request</span>
                            </>
                        )}
                    </button>
                )}

                {/* Normal status - Send request */}
                {data.status === 'normal' && (
                    <button 
                        disabled={isLoading}
                        onClick={handleSendFriendRequest}
                        className={`w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                            isLoading
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-orange-500 hover:bg-orange-600 text-white hover:scale-105 active:scale-95 shadow-md hover:shadow-lg'
                        }`}
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Sending...</span>
                            </>
                        ) : (
                            <>
                                <UserPlus size={16} />
                                <span>Send Request</span>
                            </>
                        )}
                    </button>
                )}

                {/* Already friends */}
                {data.status === 'friend' && (
                    <div className="w-full flex items-center justify-center space-x-2 py-2 px-3 bg-green-50 text-green-700 rounded-lg border border-green-200">
                        <UserCheck size={16} />
                        <span className="text-sm font-medium">Already a friend</span>
                    </div>
                )}
            </div>

            {/* Hover Accent Bar */}
            <div className="h-1 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </div>
    );
}