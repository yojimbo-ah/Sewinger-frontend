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
    return <div className="flex min-h-0 flex-col gap-6 px-4 pt-4 md:px-6 lg:px-8">
        <Header currentPage={currentPage} changePage={changePage} />
        <div className="flex flex-wrap gap-4">
            {data && data.friendsRequests.map(request => {
                return <FriendRequestItem key={request.friendId} data={request} />
            })}
            {data && data.friendsRequests.length === 0 && <EmptyMenu icon={<Mail size={64} className="mx-auto text-gray-400" />}
            header="You dont have any friend requests for now"
            paragraph="Yous should wait for users to send you friend requests"  />}
        </div>
    </div>
}