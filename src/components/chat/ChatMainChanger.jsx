import { useState  } from "react";

import Chat from "./Chat";
import PublicChat from "./publicChat/PublicChat";

export default function ChatMainChanger () {
    const [page , setPage] = useState('privateChat') ;

    function handleChatChange (chat) {
        setPage(chat)
    }
    
    if (page === 'privateChat') {
        return <Chat changePage={handleChatChange} />
    }

    if (page === 'publicChat') {
        return <PublicChat changePage={handleChatChange} />
    }

}