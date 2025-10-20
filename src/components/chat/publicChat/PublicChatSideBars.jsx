import GroupChat from "./GroupChat";

export default function PublicChatSideBar({ chats }) {
    return (
        <div className="w-full md:basis-1/4 flex flex-col gap-2 h-full bg-gradient-to-b from-orange-100 to-orange-50 p-3 md:border-r border-orange-200 shadow-sm overflow-y-auto">
            {chats && chats.length > 0 ? (
                chats.map(data => {
                    return <GroupChat key={data.chat} data={data} />
                })
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                    <p className="text-gray-500 text-lg font-medium">No group chats yet</p>
                    <p className="text-gray-400 text-sm mt-2">Create or join a group to start chatting!</p>
                </div>
            )}
        </div>
    )
}