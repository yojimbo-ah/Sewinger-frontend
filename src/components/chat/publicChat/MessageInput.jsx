import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";
import { Send, Image, X } from "lucide-react";
import { getSocket } from "../../../socket/socket";
import { queryClient } from "../../../utils/http";
import { imagesToPublicMutations } from "../../../utils/chathttp";

const REACT_BACKEND_URL = import.meta.env.VITE_REACT_APP_URL ;

// sockets are beign haneled here for real time updating of the public chat

export default function MessageInput({ chatId }) {
    const socket = getSocket();
    const { user, token } = useContext(AuthContext);
    const fileInputRef = useRef(null);

    const [message, setMessage] = useState('');
    const [selectedImages, setSelectedImages] = useState([]); // this images state is just fot show
    const [loading , setLoading] = useState(false) ;
    const [validMessage, setValidMessage] = useState(false);

    function handleMessageChange(event) {
        setMessage(event.target.value);
        if (event.target.value.trim() === '' && selectedImages.length === 0) {
            setValidMessage(false);
        } else {
            setValidMessage(true);
        }
    }

    function handleImageSelect() {
        fileInputRef.current?.click();
    }

    function handleFileChange(event) {
        const files = Array.from(event.target.files);
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        
        setSelectedImages(imageFiles);
        setValidMessage(message.trim() !== '' || imageFiles.length > 0);
        
        // Reset file input
        event.target.value = '';
    }

    function removeImage(index) {
        const newImages = selectedImages.filter((_, i) => i !== index);
        setSelectedImages(newImages);
        setValidMessage(message.trim() !== '' || newImages.length > 0);
    }

    useEffect(() => {
        socket.on('receive_message_public', data => {
            queryClient.setQueryData(['chat', chatId], (old) => {
                if (!old) return old;
                return {
                    ...old,
                    groupChat: {
                        ...old.groupChat,
                        messages: [
                            ...old.groupChat.messages,
                            data
                        ]
                    }
                }
            })
        })

        return () => {
            socket.off('receive_message_public');
        }
    }, [socket, chatId])

    async function handleMessageSend() {
        setLoading(true) ;
        if (selectedImages.length > 0) {
            const formData = new FormData();
            selectedImages.forEach(image => {
                formData.append('images', image);
            });
            formData.append('chatId', chatId);

            try {
                const response = await fetch(`${REACT_BACKEND_URL}chat/images/public`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
                });

                if (response.ok) {
                    setSelectedImages([]);
                }
            } catch (error) {
                console.error('Upload failed:', error);
            }
        }

        if (message.trim()) {
            // Handle text message
            socket.emit('send_message_public', {
                message: message,
                chatId: chatId
            });
        }

        setMessage('');
        setValidMessage(false);
        setLoading(false)
    }


    return (
        <div className="space-y-3">
            {/* Image Preview */}
            {selectedImages.length > 0 && (
                <div className="flex gap-2 p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200 animate-slideDown">
                    {selectedImages.map((image, index) => (
                        <div key={index} className="relative group animate-scaleIn" style={{ animationDelay: `${index * 0.05}s` }}>
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Preview"
                                className="w-16 h-16 object-cover rounded-lg border-2 border-orange-300 
                                         shadow-sm transition-all duration-200 
                                         group-hover:border-orange-500 group-hover:scale-105"
                            />
                            <button
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full 
                                         w-6 h-6 flex items-center justify-center 
                                         shadow-md transition-all duration-200
                                         hover:bg-red-600 hover:scale-110 active:scale-95
                                         opacity-0 group-hover:opacity-100"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Input Bar */}
            <div className='flex gap-2 items-center'>
                <textarea 
                    onChange={handleMessageChange}
                    className="flex-1 h-12 px-4 py-3 rounded-xl 
                             bg-white border-2 border-gray-200
                             focus:border-orange-400 focus:outline-none
                             transition-all duration-200
                             placeholder:text-gray-400
                             resize-none" 
                    value={message} 
                    placeholder='Type a message...'
                />
                
                <button
                    disabled={loading}
                    onClick={handleImageSelect}
                    className='w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 
                             rounded-xl flex items-center justify-center
                             shadow-md transition-all duration-200
                             hover:from-orange-500 hover:to-orange-600 
                             hover:shadow-lg hover:scale-105
                             active:scale-95
                             disabled:opacity-50 disabled:cursor-not-allowed
                             group'
                >
                    <Image size={20} className="text-white transition-transform duration-200 group-hover:scale-110" />
                </button>

                <button 
                    onClick={handleMessageSend} 
                    disabled={!validMessage || loading} 
                    className='px-5 h-12 bg-gradient-to-br from-orange-500 to-orange-600 
                             rounded-xl flex items-center justify-center gap-2
                             shadow-md transition-all duration-200
                             hover:from-orange-600 hover:to-orange-700 
                             hover:shadow-lg hover:scale-105
                             active:scale-95
                             disabled:opacity-50 disabled:cursor-not-allowed
                             group'
                >
                    <Send size={18} className="text-white transition-transform duration-200 group-hover:translate-x-0.5" />
                    <span className='text-white font-medium'>Send</span>
                </button>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>

            <style>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                
                .animate-slideDown {
                    animation: slideDown 0.3s ease-out;
                }
                
                .animate-scaleIn {
                    animation: scaleIn 0.2s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </div>
    );
}