import { User, Users , CirclePlus } from "lucide-react"

import HeaderButton from "./HeaderButton"
import HeaderButtonAdd from "./HeaderButtonAdd"

export default function ChatHeader ({onClick}) {

    return <div className="flex gap-5">
        <HeaderButtonAdd icon={<CirclePlus />} text='Create chat' onClick={onClick} />  

        <HeaderButton text='Private' icon={<User />} to="/chat/private" />

        <HeaderButton text='Groups' icon={<Users />} to="/chat/public" />

    </div>
}