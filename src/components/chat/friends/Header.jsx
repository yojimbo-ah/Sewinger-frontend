import HeaderButton from "./HeaderButton"
import { RefreshCcw , Mail , Handshake , CirclePlus} from "lucide-react"

export default function Header ({changePage , currentPage}) {
    return <div className="flex gap-6 pl-4">
        <HeaderButton icon={<CirclePlus />} pageChanger='addFriend' currentPage={currentPage} changePage={() => changePage('addFriend')} />
        <HeaderButton icon={<Handshake />} pageChanger='friends' currentPage={currentPage} changePage={() => changePage('friends')} text='My friends' />
        <HeaderButton icon={<Mail />} pageChanger='friendRequests' currentPage={currentPage} changePage={() => changePage('friendRequests')} text='My friend requests' />
        <HeaderButton icon={<RefreshCcw />} pageChanger='pendingFriends' currentPage={currentPage} changePage={() => changePage('pendingFriends')} text='My pending requests' />
    </div>
}