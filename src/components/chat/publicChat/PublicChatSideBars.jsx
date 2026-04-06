import GroupChat from "./GroupChat";

export default function PublicChatSideBar({ chats }) {
    return (
        <div className="flex h-full w-80 shrink-0 flex-col gap-2 overflow-y-auto border-r border-orange-200 bg-gradient-to-b from-orange-100 to-orange-50 p-3 shadow-sm">
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