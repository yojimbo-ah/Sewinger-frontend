import { CircleUser, UserMinus, MessageCircle, User, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../../Contexts/AuthContext";
import { deleteFriendMutation } from "../../../../utils/chathttp";
import { queryClient } from "../../../../utils/http";

export default function FriendItem({ data, onRemove, isPending }) {
    const [isHovered, setIsHovered] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    
    const { mutate, isError, isPending: mutationIsPending, isSuccess } = useMutation({
        mutationFn: () => {
            return deleteFriendMutation({ jwtToken: token, friendId: data.friendId });
        },
        onSuccess: () => {
            console.log('success');
            setShowSuccess(true);
            setTimeout(() => {
                queryClient.invalidateQueries(['friends']) ;
                setShowSuccess(false);
                if (onRemove) {
                    onRemove(data.friendId);
                }
            }, 1500);
        },
        onError: (error) => {
            console.error('Error removing friend:', error);
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 3000);
        }
    });

    const handleRemoveFriend = () => {
        if (!mutationIsPending && !isPending) {
            console.log('request has been sent');
            mutate();
        }
    };

    const isLoading = mutationIsPending || isPending;

    return (
        <div 
            className="group bg-white w-52 rounded-xl shadow-lg border border-gray-200 hover:border-orange-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 overflow-hidden relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Success Overlay */}
            {showSuccess && (
                <div className="absolute inset-0 bg-green-50 bg-opacity-95 z-10 flex flex-col items-center justify-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
                    <p className="text-green-700 font-semibold">Friend Removed!</p>
                </div>
            )}

            {/* Error Overlay */}
            {showError && (
                <div className="absolute inset-0 bg-red-50 bg-opacity-95 z-10 flex flex-col items-center justify-center">
                    <AlertCircle className="h-12 w-12 text-red-500 mb-2" />
                    <p className="text-red-700 font-semibold text-center px-4">Failed to remove friend</p>
                    <p className="text-red-600 text-sm mt-1">Please try again</p>
                </div>
            )}

            {/* Profile Section */}
            <div className="pt-6 pb-4 flex flex-col items-center bg-gradient-to-b from-gray-50 to-white">
                <div className="relative mb-4">
                    <div 
                        onClick={() => {
                            if (!isLoading) {
                                navigate(`/profile/${data.friendId}`);
                            }
                        }}
                        className={`w-24 h-24 rounded-full shadow-xl ring-4 ring-white transition-all duration-300 group-hover:ring-orange-200 group-hover:shadow-2xl ${
                            isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                        }`}
                    >
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

                <div className="text-center space-y-1">
                    <div className="flex items-center space-x-2">
                        <User size={16} className="text-gray-500" />
                        <h3 className={`font-bold text-lg text-black group-hover:text-orange-600 transition-colors duration-200 ${
                            isLoading ? 'opacity-50' : ''
                        }`}>
                            {data.name.firstName} {data.name.lastName}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Info Section */}
            <div className={`px-6 py-4 bg-white transition-opacity duration-200 ${
                isLoading ? 'opacity-50' : ''
            }`}>
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
            <div className="px-6 pb-6 flex gap-3">
                <button
                    disabled={isLoading}
                    onClick={handleRemoveFriend}
                    className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isLoading
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 hover:scale-105 active:scale-95 border border-red-200 hover:border-red-300'
                    }`}
                >
                    {isLoading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                            <span>Removing...</span>
                        </>
                    ) : (
                        <>
                            <UserMinus size={16} />
                            <span>Remove</span>
                        </>
                    )}
                </button>
            </div>

            {/* Hover Accent Bar */}
            <div className={`h-1 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                isLoading ? 'opacity-50' : ''
            }`}></div>
        </div>
    );
}