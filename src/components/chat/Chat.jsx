import { useQuery } from "@tanstack/react-query"
import { AuthContext } from "../../Contexts/AuthContext"
import { useContext, useState, useRef } from "react"
import { getfriendsQuery } from "../../utils/chathttp"
import { useParams, Outlet } from "react-router-dom"
import { Menu, X } from "lucide-react"

import ChatHeader from "./UI/ChatHeader"
import FriendsSideBar from "./FriendsSideBar"
import Modal from "../../UI/MyProducts/Modal"
import CreateChat from "./createChat/CreateChat"

export default function Chat() {
    const params = useParams()
    const friendId = params.friendId
    const { token } = useContext(AuthContext)
    const createChatRef = useRef()
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

    const { data } = useQuery({
        queryKey: ['friends'],
        queryFn: () => {
            return getfriendsQuery({ jwtToken: token })
        }
    })

    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen)
    }

    const closeMobileSidebar = () => {
        setIsMobileSidebarOpen(false)
    }

    return (
        <div className="flex h-full min-h-0 flex-col bg-gradient-to-br from-orange-50 via-white to-orange-50">
            <Modal ref={createChatRef}>
                <CreateChat ref={createChatRef} />
            </Modal>

            <div className="mb-4 ml-3 flex shrink-0 flex-wrap items-center gap-4 pt-3 pr-3">
                {/* Mobile Menu Toggle Button */}
                <button
                    onClick={toggleMobileSidebar}
                    className="md:hidden p-2 rounded-lg bg-white hover:bg-orange-50 border-2 border-gray-200 hover:border-orange-400 
                        transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                >
                    {isMobileSidebarOpen ? (
                        <X className="w-6 h-6 text-gray-700" />
                    ) : (
                        <Menu className="w-6 h-6 text-gray-700" />
                    )}
                </button>

                <ChatHeader onClick={() => createChatRef.current.open()} />
            </div>

            <div className="relative flex min-h-0 flex-1 overflow-hidden">
                {/* Desktop Sidebar - Always visible on medium+ screens */}
                <div className="hidden h-full md:block md:w-80 md:shrink-0">
                    {data && <FriendsSideBar friends={data.friends} />}
                </div>

                {/* Mobile Sidebar Overlay */}
                {isMobileSidebarOpen && (
                    <div
                        className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
                        onClick={closeMobileSidebar}
                    ></div>
                )}

                {/* Mobile Sidebar - Slides from left */}
                <div
                    className={`md:hidden fixed top-16 left-0 h-[calc(100vh-64px)] w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
                        isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between p-4 border-b-2 border-gray-200 bg-gradient-to-r from-orange-50 to-white">
                        <h2 className="text-xl font-bold text-gray-800">Friends</h2>
                        <button
                            onClick={closeMobileSidebar}
                            className="p-2 rounded-lg hover:bg-orange-100 transition-colors duration-200"
                        >
                            <X className="w-6 h-6 text-gray-700" />
                        </button>
                    </div>

                    {/* Sidebar Content */}
                    <div className="h-[calc(100%-72px)] overflow-y-auto" onClick={closeMobileSidebar}>
                        {data && <FriendsSideBar friends={data.friends} />}
                    </div>

                    {/* Orange accent border on right edge */}
                    <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-orange-500 to-orange-600"></div>
                </div>

                {/* Main Chat Area */}
                <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}