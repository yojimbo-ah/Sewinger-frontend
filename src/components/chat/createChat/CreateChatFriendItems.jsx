

export default function CreateChatFriendItem ({data , onClick , active}) {
    let CSSclass = `flex items-center gap-2 bg-gray-200 p-2 shadow-lg
            hover:bg-orange-200 hover:shadow-orange-300 transition-all duration-200
        `
    if (active) {
        CSSclass = `flex items-center gap-2 bg-orange-400 transition-all duration-200 p-2 shadow-lg shadow-orange-300` ;
    }



    return <button onClick={() => onClick(data.friendId)}
        className={CSSclass}>
        <div className="w-9 h-9 rounded-full bg-red-600">
            
        </div>
        <div>
            {data.name.firstName} {data.name.lastName}
        </div>
    </button>
}