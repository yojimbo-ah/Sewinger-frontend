import { createContext } from "react";

const ChatContext = createContext({
    chatDetails : undefined ,
    changePrivateChat : () => {} ,
    changePublicChat : () => {}
})

export default ChatContext ;