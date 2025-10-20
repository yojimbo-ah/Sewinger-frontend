import { useContext , useState } from "react"
import { AuthContext } from "../../../../Contexts/AuthContext"
import { useMutation } from "@tanstack/react-query"


import { editGroupChatMutation } from "../../../../utils/chathttp";

export default function EditPublicChat ({ref , handleChatDialogChange , groupChatData}) {
    const {token} = useContext(AuthContext) ;

    const {mutate , data} = useMutation({
        mutationFn : () => {
            return editGroupChatMutation({jwtToken : token })
        } ,
        onSuccess : () => {

        }
    })
    return <div className="flex flex-col items-center h-full w-full gap-4 pt-4">
        <h2>
            Edit your group
        </h2>
        
        <button onClick={() => {
                handleChatDialogChange('info')
                ref.current.close()
            }}>
            close
        </button>
    </div>
}