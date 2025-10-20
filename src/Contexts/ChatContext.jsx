import ChatContext from "./ChatCreateContext";
import { useState } from "react";

export function ChatProvider ({children}) {
    const [chatDetails , setChatDetails] = useState({
        friendId : undefined ,
        publicChat : undefined
    })


    function setPrivateChat (friendId) {
        setChatDetails(prev => {
            return {
                ...prev ,
                friendId : friendId
            }
        })
    }

    function setPublicChat (chatId) {
        setChatDetails(prev => {
            return {
                ...prev ,
                publicChat : chatId
            }
        })
    }

    const chatContext = {
        chatDetails : chatDetails ,
        changePrivateChat : setPrivateChat ,
        changePublicChat : setPublicChat
    }

    return <ChatContext.Provider value={chatContext} >
            {children}
    </ChatContext.Provider >
} 
