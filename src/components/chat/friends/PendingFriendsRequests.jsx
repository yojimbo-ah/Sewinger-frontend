import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";
import { getUserPendingRequests } from "../../../utils/chathttp";

import { RefreshCcw } from "lucide-react";

import EmptyMenu from "../../../UI/emptyMenu/EmptyMenu";
import PendingRequestItem from "./MyPendingRequests/PendingRequestItem";
import Header from "./Header";

export default function PendingFriendsRequests ({changePage , currentPage}) {
    const {token , user} = useContext(AuthContext) ;
    const {data} = useQuery({
        queryKey : ['friends' , 'requests' , 'prending'] ,
        queryFn : () => {
            return getUserPendingRequests({jwtToken : token}) ;
        }
    })
    console.log(data) ;
    return <div className="flex flex-col">
        <Header currentPage={currentPage} changePage={changePage} />
        <div className="flex gap-4 mt-8 mx-6">
            {data && data.pendingRequests.map(request => {
                return <PendingRequestItem key={request.friendId} data={request} />
            })}
            {data && data.pendingRequests.length === 0 && <EmptyMenu icon={<RefreshCcw size={64} className="mx-auto text-gray-400" />} 
            header="You dont have any pending requests" 
            paragraph="Send requests to people and be friend with them" />}
        </div>
    </div>
}