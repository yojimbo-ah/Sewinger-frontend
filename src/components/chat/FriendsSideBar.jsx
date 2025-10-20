import FriendChat from "./FriendChat"

export default function FriendsSideBar ({friends , onClick}) {


    return <div className="basis-1/4 flex flex-col gap-2 h-full bg-gradient-to-b from-orange-100 to-orange-50 p-3 border-r border-orange-200 shadow-sm">
        {friends.map(friend => {
            return  <FriendChat key={friend.friendId} data={friend} onClick={onClick}/>
        })}
    </div>
}