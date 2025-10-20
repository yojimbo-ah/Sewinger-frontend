import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Contexts/AuthContext";
import { useContext } from "react";
import { getUserFriendRequests } from "../../../utils/chathttp";


import { Mail } from "lucide-react";
import Header from "./Header";
import FriendRequestItem from "./MyFriendsRequests/FriendRequestItem";
import EmptyMenu from "../../../UI/emptyMenu/EmptyMenu";

export default function FriendsRequests ({changePage , currentPage}) {
    const {token} = useContext(AuthContext) ;
    const {data} = useQuery({
        queryKey : ['friends' , 'requests'] ,
        queryFn : () => {
            return getUserFriendRequests({jwtToken : token}) ;
        } 
    })

    console.log('this is the data') ;
    console.log(data) ;
    return <div className="flex flex-col">
        <Header currentPage={currentPage} changePage={changePage} />
        <div className="flex gap-4 mt-8 mx-6">
            {data && data.friendsRequests.map(request => {
                return <FriendRequestItem key={request.friendId} data={request} />
            })}
            {data && data.friendsRequests.length === 0 && <EmptyMenu icon={<Mail size={64} className="mx-auto text-gray-400" />}
            header="You dont have any friend requests for now"
            paragraph="Yous should wait for users to send you friend requests"  />}
        </div>
    </div>
}