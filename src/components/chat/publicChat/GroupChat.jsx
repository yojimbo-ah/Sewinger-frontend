import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import ChatContext from "../../../Contexts/ChatCreateContext";
import { CircleUser } from "lucide-react"

export default function GroupChat({ data }) {
    const { changePublicChat , chatDetails } = useContext(ChatContext);
    
    const navigate = useNavigate();

    return (
        <button
            onClick={() => {
                changePublicChat(data.chat);
                navigate(`/chat/public/${data.chat}`);
            }}
            className="h-20 gap-3 p-3 bg-gradient-to-r from-orange-50 to-orange-100 
                     rounded-xl flex items-center
                     hover:from-orange-200 hover:to-orange-300 
                     hover:shadow-lg hover:scale-[1.02]
                     active:scale-[0.98]
                     transition-all duration-300 ease-out
                     border border-orange-200 hover:border-orange-400
                     group"
        >
            <div className="flex justify-center items-center shrink-0
                          transition-transform duration-300 
                          group-hover:rotate-6 group-hover:scale-110">
                {data.options.image && (
                    <img 
                        className="w-14 h-14 rounded-full object-cover 
                                 shadow-md ring-2 ring-orange-200 
                                 group-hover:ring-orange-400
                                 transition-all duration-300" 
                        src={data.options.image} 
                        alt={data.options.name} 
                    />
                )}
                {!data.options.image && (
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 
                                  flex items-center justify-center
                                  shadow-md ring-2 ring-orange-200
                                  group-hover:ring-orange-400
                                  transition-all duration-300">
                        <CircleUser size={32} className="text-white" />
                    </div>
                )}
            </div>

            <p className="flex-1 flex items-center text-left font-medium text-gray-800
                        group-hover:text-gray-900 group-hover:translate-x-1
                        transition-all duration-300 truncate">
                {data.options.name}
            </p>
        </button>
    );
}