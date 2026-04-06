import { useState } from "react"
import { getUsers } from "../../../utils/chathttp"
import { useContext } from "react"
import { AuthContext } from "../../../Contexts/AuthContext"

import AddFriendItem from "./AddFriendItem"
import Header from "../friends/Header"
import { Search } from "lucide-react"
import { useQuery } from "@tanstack/react-query"

export default function AddFriend ({currentPage , changePage}) {

    // i didnt use useQuery here since i wanted to change the users depending on the search so it will change a lot and saving it on cache and retriving
    // it will take a lot of time 
    
    const {token} = useContext(AuthContext) ;
    const [tag , setTag] = useState('') ;
    const {data , isLoading , refetch} = useQuery({
        queryFn : () => {
            return getUsers({jwtToken : token , tag : tag})
        } ,
        queryKey : ['users' , 'search' , tag] ,
        enabled : false
    })

    function handleChangeTag (event) {
        setTag(event.target.value) ;
    }
    console.log(data) ;
    console.log(tag)

    let isValid = tag === '' ;
    return <div className="flex min-h-0 flex-col gap-6 px-4 pt-4 md:px-6 lg:px-8">
        <Header currentPage={currentPage} changePage={changePage} />
        <div className="flex w-full items-center justify-center gap-x-1">
            <input onChange={(event) => handleChangeTag(event)} className="h-12 w-full max-w-md rounded-tl-2xl rounded-bl-2xl border-2 border-orange-500 bg-orange-50 pl-3 shadow-lg shadow-orange-100 outline-none transition-colors focus:bg-white" type="text" />
            <button onClick={refetch} disabled={isLoading || isValid} className="flex h-12 w-12 items-center justify-center rounded-tr-2xl rounded-br-2xl bg-gray-300 shadow-md shadow-gray-100 transition-colors hover:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-60">
                <Search />
            </button>
        </div>
        {data && !isLoading && <div className="flex flex-wrap gap-4">
            {data.users.map(data => {
                return <AddFriendItem data={data} key={data._id} tag={tag} />
            })}
        </div>}
        {isLoading && <div>
                loading users
            </div>}
    </div>
}