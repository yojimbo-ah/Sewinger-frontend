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
    return <div className="flex flex-col">
        <Header currentPage={currentPage} changePage={changePage} />
        <div className="flex justify-center w-full items-center mt-8 gap-x-1">
            <input onChange={(event) => handleChangeTag(event)} className="bg-orange-100 pl-3 border-orange-500 border-2 shadow-lg shadow-orange-100 rounded-tl-2xl rounded-bl-2xl h-12 w-1/4" type="text" />
            <button onClick={refetch} disabled={isLoading || isValid} className="bg-gray-300 shadow-md shadow-gray-100 h-12 w-12 rounded-tr-2xl rounded-br-2xl flex justify-center items-center">
                <Search />
            </button>
        </div>
        {data && !isLoading && <div className="flex  ml-8 mt-8 gap-4">
            {data.users.map(data => {
                return <AddFriendItem data={data} key={data._id} tag={tag} />
            })}
        </div>}
        {isLoading && <div>
                loading users
            </div>}
    </div>
}