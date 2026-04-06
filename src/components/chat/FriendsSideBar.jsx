import FriendChat from "./FriendChat"

export default function FriendsSideBar ({friends , onClick}) {


    return <div className="flex h-full w-80 shrink-0 flex-col gap-2 overflow-y-auto border-r border-orange-200 bg-gradient-to-b from-orange-100 to-orange-50 p-3 shadow-sm">
        {friends.map(friend => {
            return  <FriendChat key={friend.friendId} data={friend} onClick={onClick}/>
        })}
    </div>
}