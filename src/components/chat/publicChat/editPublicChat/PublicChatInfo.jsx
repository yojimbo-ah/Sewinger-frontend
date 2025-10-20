import { useContext } from "react"
import { AuthContext } from "../../../../Contexts/AuthContext"
import { getfriendsQuery } from "../../../../utils/chathttp";

import { useQuery } from "@tanstack/react-query";


export default function PublicChatInfo ({groupChatData , ref , handleChatDialogChange }) {
    const {user , token} = useContext(AuthContext) ;
    const {data : dataFriends , isPending} = useQuery({
        queryKey : ['friend'] ,
        queryFn : () => {
            return getfriendsQuery({jwtToken : token})
        }
    })

    console.log(dataFriends) ;
    if (isPending) {
        return <div>
            ...loading
        </div>
    }
    return <div className="flex flex-col h-full w-full">
        <div className="h-full flex flex-col items-center w-full gap-5">
            <h2>
                {groupChatData.options.name}
            </h2>
            <div>
                {groupChatData.options.image &&  <img src={groupChatData.options.image} alt="chat image"
                className="h-36 w-36 rounded-full aspect-square"
                />}
                {!groupChatData.options.image && <p>no image chosen</p>  }
            </div>     
            <div>
                
            </div>       
        </div>
        <div className="flex justify-end h-20 items-end gap-4 pr-4 pb-4">
            <button onClick={() => ref.current.close()}>
                close
            </button>   
            {groupChatData.options.admin === user.id && <button onClick={() => handleChatDialogChange('admin')}>
                    edit
                </button>}         
        </div>

    </div>
}