import { useQuery } from "@tanstack/react-query"
import { useContext , useRef, useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthContext";
import { getChatGroup } from "../../../utils/chathttp";
import { CircleUser } from "lucide-react";

import ChatContext from "../../../Contexts/ChatCreateContext";

import MessageInput from "./MessageInput";
import Modal from "../../../UI/MyProducts/Modal";

import PublicChatMeNu from "./editPublicChat/PublicChatMenu";

export default function PublicChatSection({}) {
  const { token, user } = useContext(AuthContext);
  const {chatDetails} = useContext(ChatContext) ;
  const chatId = chatDetails.publicChat ;
  const navigate = useNavigate() ;
  const [currentChatDialog , setCurrentChatDialog] = useState('info') ;
  
  function handleChatDialogChange (page) {
    setCurrentChatDialog(page) ;
  }

  const chatDetailsRef = useRef() ;
  const messagesEndRef = useRef();

  const { data, isPending } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () => {
      return getChatGroup({jwtToken : token , chatId : chatId})
    }
    ,enabled: !!chatId
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data?.groupChat?.messages]);

  if (!chatId) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50 p-6">
        <div className="max-w-md rounded-3xl border border-orange-200 bg-white/90 p-8 text-center shadow-xl backdrop-blur-sm">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-orange-200 shadow-md">
            <CircleUser size={44} className="text-orange-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">No chat selected</h3>
          <p className="mt-2 text-gray-600">Select a group to start chatting</p>
        </div>
      </div>
    );
  }

  if (isPending) return (
    <div className="flex min-h-0 flex-1 items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
    </div>
  );

  const groupChatData = {
    groupChatUsers : data.groupUsers ,
    options : data.groupChat.options
  }

  const findGroupUser = (userId) => {
    return data?.groupUsers?.find(groupUser => groupUser._id === userId);
  };

  return (<>
    <Modal ref={chatDetailsRef}>
      <PublicChatMeNu ref={chatDetailsRef} handleChatDialogChange={handleChatDialogChange} chatDialog={currentChatDialog} groupChatData={groupChatData} />
    </Modal>
    <div className="flex min-h-0 h-full w-full flex-col bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Header Section */}
      <button 
        className="flex items-center gap-3 border-b border-orange-200 bg-white/85 p-4 text-left shadow-sm transition-all duration-300 hover:bg-orange-50/80 backdrop-blur-sm"
        onClick={() => {
          chatDetailsRef.current.open() ;
        }}
      >
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 mr-3 
                      ring-2 ring-orange-100 shadow-md transition-transform duration-300 
                      hover:scale-110">
          {data?.groupChat?.options?.image ? (
            <img 
              src={data.groupChat.options.image} 
              alt={data.groupChat.options.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-white">
              <CircleUser size={40} className="text-orange-600" />
            </div>
          )}
        </div>
        <h2 className="font-semibold text-gray-900 text-lg tracking-wide">
          {data?.groupChat?.options?.name || 'Group Chat'}
        </h2>
      </button>

      {/* Messages Container */}
      <div className="min-h-0 flex-1 overflow-y-auto p-4 bg-[radial-gradient(circle_at_top,_rgba(255,237,213,0.35),_transparent_35%),linear-gradient(to_bottom,_#fff,_#fff7ed)]">
        <div className="space-y-4">
          {data &&
            data.groupChat.messages.map((message, index) => {
              const isMe = message.senderId === user.id; 
              const messageUser = isMe ? user : findGroupUser(message.senderId);
              const pfp = messageUser?.profileImage;
              const userName = messageUser ? `${messageUser.firstName || messageUser.name?.firstName} ${messageUser.lastName || messageUser.name?.lastName}` : 'Unknown User';
              
              return (
                <div 
                  key={message._id}
                  className={`flex items-start space-x-2 animate-fadeIn ${isMe ? 'flex-row-reverse space-x-reverse' : ''}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Profile Picture */}
                  <div onClick={() => {
                    navigate(`/profile/${message.senderId.toString()}`) ;
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
                    className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02]
                              ${isMe
                                ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white"
                                : "border border-orange-100 bg-white text-gray-800"
                              }`}
                  >
                    {/* Show sender name for others' messages */}
                    {!isMe && (
                      <div className="text-xs font-semibold text-orange-600 mb-1">
                        {userName}
                      </div>
                    )}
                    
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
      <div className="border-t border-orange-200 bg-white/90 p-4 shadow-[0_-8px_24px_rgba(249,115,22,0.08)] backdrop-blur-sm">
        <MessageInput chatId={chatId} />
      </div>
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
  </>);
}