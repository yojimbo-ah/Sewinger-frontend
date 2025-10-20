import { useContext } from "react"
import { AuthContext } from "../../../Contexts/AuthContext"
import { useQuery } from "@tanstack/react-query"
import { getfriendsQuery } from "../../../utils/chathttp";

import { Handshake } from "lucide-react";

import EmptyMenu from "../../../UI/emptyMenu/EmptyMenu";
import FriendItem from "./MyFriends/FriendItem";
import Header from "./Header";

export default function MyFriends ({changePage , currentPage}) {
    const {token} = useContext(AuthContext) ;
    const {data} = useQuery({
        queryKey : ['friends'] ,
        queryFn : () => {
            return getfriendsQuery({jwtToken : token}) ;
        }
    })

    console.log(data) ;
    return <div className="flex flex-col">
        <Header currentPage={currentPage} changePage={changePage} />
        <div className="flex gap-4 mt-8 mx-6">
            {data && data.friends.map(friend => {
                return <FriendItem key={friend.friendId} data={friend} />
            })}     
            {data && data.friends.length === 0 && <EmptyMenu icon={<Handshake size={64} className="mx-auto text-gray-400" />} 
            header="You dont have friends for now" 
            paragraph="Send friend requests to people and accept friends request to start chating" />}    
        </div>
    </div>
}