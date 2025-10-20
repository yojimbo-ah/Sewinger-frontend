import { useQuery } from "@tanstack/react-query"
import { useContext, useRef, useEffect } from "react"
import { AuthContext } from "../../Contexts/AuthContext"
import { getUserChat } from "../../utils/chathttp";
import MessageInput from "./MessageInput";
import { CircleUser } from "lucide-react";
import ChatContext from "../../Contexts/ChatCreateContext";
import { useNavigate } from "react-router-dom";

export default function ChatSection({}) {
  const {chatDetails} = useContext(ChatContext) ;
  const friendId = chatDetails.friendId ;
  const navigate = useNavigate() ;

  if (!friendId) {
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-b from-orange-50 to-orange-100">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-orange-200 flex items-center justify-center mx-auto mb-4">
            <CircleUser size={48} className="text-orange-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">No chat selected</h3>
          <p className="text-gray-600 mt-2">Select a friend to start chatting</p>
        </div>
      </div>
    );
  }
  
  const { token, user } = useContext(AuthContext);
  const messagesEndRef = useRef();
  
  const { data, isPending } = useQuery({
    queryKey: ["chat", friendId],
    queryFn: () => {
      return getUserChat({ jwtToken: token, friendId: friendId });
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data?.chat?.messages]);

  console.log(data)

  if (isPending) return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
    </div>
  );
  
  console.log(friendId);
  
  return (
    <div className="flex flex-col h-full w-full bg-gradient-to-b from-orange-50 to-orange-100">
      {/* Header Section */}
      <div className="flex items-center p-4 bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg
                   border-b-2 border-orange-700">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 mr-3 
                      ring-2 ring-white shadow-md transition-transform duration-300 
                      hover:scale-110">
          {data?.friend?.profileImage ? (
            <img 
              src={data.friend.profileImage} 
              alt={data.friend.name.firstName} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-white">
              <CircleUser size={40} className="text-orange-600" />
            </div>
          )}
        </div>
        <h2 className="font-bold text-white text-lg tracking-wide">
          {data?.friend?.name ? `${data.friend.name.firstName} ${data.friend.name.lastName}` : 'Unknown User'}
        </h2>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-orange-50 via-white to-orange-50">
        <div className="space-y-4">
          {data &&
            data.chat.messages.map((message, index) => {
              const isMe = message.senderId === user.id; 
              const pfp = isMe ? user.profileImage : data.friend.profileImage;
              const userName = isMe ? `${user.firstName} ${user.lastName}` : `${data.friend.name.firstName} ${data.friend.name.lastName}`;
              
              return (
                <div 
                  key={message._id}
                  className={`flex items-start space-x-2 animate-fadeIn ${isMe ? 'flex-row-reverse space-x-reverse' : ''}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Profile Picture */}
                  <div onClick={() => {
                    navigate(`/profile/${message.senderId.toString()}`)
                  }}
                  className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 mt-1 
                                ring-2 ring-orange-200 shadow-sm transition-transform duration-200 
                                hover:scale-110 hover:ring-orange-400">
                    {pfp ? (
                      <img 
                        src={pfp} 
                        alt={userName} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-orange-100">
                        <CircleUser size={32} className="text-orange-600" />
                      </div>
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`px-4 py-3 rounded-2xl max-w-[75%] shadow-md 
                              transition-all duration-300 hover:shadow-lg hover:scale-[1.02]
                              ${isMe
                                ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white"
                                : "bg-white text-gray-800 border border-orange-200"
                              }`}
                  >
                    {/* Text Message */}
                    {message.type === 'text' && (
                      <div className="break-words">
                        {message.message}
                      </div>
                    )}
                    
                    {/* Video Message */}
                    {message.type === 'video' && (
                      <div className="mt-1">
                        <video
                          controls
                          className="rounded-lg max-w-full h-auto max-h-64 
                                   border-2 border-orange-300 
                                   transition-all duration-300 
                                   hover:border-orange-500"
                        >
                          <source src={message.message} />
                        </video>
                      </div>
                    )}
                    
                    {/* Image Message */}
                    {message.type === 'image' && (
                      <div className="mt-1">
                        <img 
                          src={message.message} 
                          alt="Shared image"
                          className="rounded-lg max-w-full h-auto max-h-64 
                                   border-2 border-orange-300 
                                   cursor-pointer transition-all duration-300 
                                   hover:border-orange-500 hover:scale-105"
                          onClick={() => {
                            window.open(message.message, '_blank');
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-gradient-to-r from-orange-100 to-orange-50 border-t-2 border-orange-300 p-4 shadow-lg">
        <MessageInput friendId={friendId} />
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}