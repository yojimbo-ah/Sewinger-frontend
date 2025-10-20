import { useState } from "react";


import FriendsRequests from "./FriendsRequests";
import MyFriends from "./MyFriends";
import PendingFriendsRequests from "./PendingFriendsRequests";
import AddFriend from "../addFriend/AddFriend";

export default function Friends () {
    const [page , setPage] = useState('friends') ;

    function handleFunctionChange (page) {
        setPage(page) ;
    }

    if (page === 'friends') {
        return <MyFriends currentPage={page} changePage={handleFunctionChange} />
    }

    if (page === 'pendingFriends') {
        return <PendingFriendsRequests currentPage={page} changePage={handleFunctionChange} />
    }
    
    if (page === 'friendRequests') {
        return <FriendsRequests currentPage={page} changePage={handleFunctionChange} />
    }
    
    if (page === 'addFriend') {
        return <AddFriend currentPage={page} changePage={handleFunctionChange}  />
    }

}