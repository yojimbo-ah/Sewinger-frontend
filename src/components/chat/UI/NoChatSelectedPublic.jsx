import { useContext , useEffect} from "react";
import ChatContext from "../../../Contexts/ChatCreateContext";
import { useNavigate } from "react-router-dom";

import { MessageCircle , Users} from "lucide-react";

export default function NoChatSelectedPublic ({}) {
    const {chatDetails} = useContext(ChatContext) ;
    const navigate = useNavigate() ;

    useEffect(() => {
        if (chatDetails.publicChat) {
            navigate(`/chat/public/${chatDetails.publicChat}`) ;
        }  
    } , [navigate])


    return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50">
            <div className="text-center animate-fadeIn">
                {/* Icon Container */}
                <div className="relative mb-6 inline-block">
                    <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 
                                  rounded-full flex items-center justify-center
                                  shadow-lg transition-all duration-300
                                  hover:shadow-xl hover:scale-105
                                  animate-pulse-slow">
                        <MessageCircle size={48} className="text-orange-600" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 
                                  bg-gradient-to-br from-orange-400 to-orange-500 
                                  rounded-full flex items-center justify-center
                                  shadow-md animate-bounce-slow">
                        <Users size={20} className="text-white" />
                    </div>
                </div>

                {/* Text Content */}
                <h2 className="text-2xl font-bold text-gray-800 mb-2 animate-slideUp">
                    No Chat Selected
                </h2>
                <p className="text-gray-600 mb-6 animate-slideUp" style={{ animationDelay: '0.1s' }}>
                    Select a group from the list to start chatting
                </p>

                {/* Decorative Elements */}
                <div className="flex justify-center gap-2 animate-slideUp" style={{ animationDelay: '0.2s' }}>
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes pulseSlow {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.8;
                    }
                }
                
                @keyframes bounceSlow {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-8px);
                    }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }
                
                .animate-slideUp {
                    animation: slideUp 0.6s ease-out forwards;
                    opacity: 0;
                }
                
                .animate-pulse-slow {
                    animation: pulseSlow 3s ease-in-out infinite;
                }
                
                .animate-bounce-slow {
                    animation: bounceSlow 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}