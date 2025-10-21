import { AuthContext } from "../../../Contexts/AuthContext"
import { useContext , useState , useRef } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getfriendsQuery } from "../../../utils/chathttp"
import { isEmpty } from "../../../utils/helper"
import { createGroupMutation } from "../../../utils/chathttp"

import ImgaeInput from "./ImageInput"
import Input from "../../../UI/MyProducts/Input"
import CreateChatFriendItem from "./CreateChatFriendItems"

export default function CreateChat ({ref}) {
    const {token} = useContext(AuthContext) ;
    // group of the selected ids of the freinds in the group
    const [currentGroup , setCuurentGroup] = useState([]) ;

    // the profile image state is for showing the profile image in the frontend only ,
    // it creates the src string that we use in the ImageInput components
    const [profileImage , setProfileImage] = useState(null) ;

    // the file state is for sending the date for the backend only , it doesnt show in
    // the frontend
    const [file , setFile] = useState(null) ;

    // this is for the input and the verification of it
    const [value , setValue] = useState('') ;
    const [focus , setFocus] = useState(true) ;
    const [error , setError] = useState({
        value : '' ,
        valid : false
    })
    
    const setProfileImageToNull = () => {
        setFile(null) ;
        setProfileImage(null) ;
    }

    const handleImageUpload = (files) => {
        const file = files[0];
        if (file && file.type.startsWith('image/')) {
            setFile(file) ;
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageData = {
                id: Date.now(),
                src: e.target.result,
                name: file.name,
                size: file.size
                };
                setProfileImage(imageData);
                
            };
            reader.readAsDataURL(file);
            }
    };

    const profileImageRef = useRef() ;

    const {data : dataQuery , isPending : isPendingQuery } = useQuery({
        queryKey : ['friends' , 'create'] ,
        queryFn : () => {
            return getfriendsQuery({jwtToken : token}) ;
        }
    })

    const {data : dataMutation , isPending : isPendingMutation , mutate} = useMutation({
        mutationFn : () => {
            return createGroupMutation({jwtToken : token , name : value , friendGroups : currentGroup , image : file})
        } ,
        onSuccess : () => {
            setTimeout(() => {
                ref.current.close() ;
            } , 3000)
        }
    })

    function handleCreateGroup () {
        mutate () ;
    }


    function handleClickUser (userId) {
        setCuurentGroup(prev => {
            const index = prev.findIndex(friendId => {
                return userId === friendId ;
            })
            let newGroup = [...prev] ;
            if (index >= 0) {
                newGroup.splice(index , 1) ;
                return newGroup ;
            } else {
                newGroup.push(userId) ;
                return newGroup ;
            }
        })

    }

    function handlefocus () {
        setFocus(true) ;
    }

    function handleBlur () {
        setFocus(false) ;
    }

    function handleChange (event) {
        const value = event.target.value ;
        setValue(value) ;
        if (isEmpty(value)) {
            setError({
                value : 'Cant leave this field empty'  ,
                valid : false
            })
        } else {
            setError({
                value : '' ,
                valid : true
            })
        }
    }

    console.log(file) ;
    console.log(profileImage) ;
    console.log(currentGroup) ;

    const disabledButton = !error.valid || currentGroup.length === 0 ;
    return <div className="flex flex-col h-full ml-4 gap-3 pt-16">
        <h2 className="text-2xl">
            this is the create chat section
        </h2>
        <Input focus={focus} isValid={error.valid} name='name' tag='Group name :' type='text' value={value} id='name'
        onFocus={handlefocus} onBlur={handleBlur} onChange={handleChange} showError={!error.valid && !focus}
        />           
        <ImgaeInput profileImage={profileImage} handleImageUpload={handleImageUpload} imageNull={setProfileImageToNull} ref={profileImageRef} />
        <h2 className="font-semibold text-md">
            Select the users :
        </h2>
        <div>
            {dataQuery && dataQuery.friends.map(friend => {
                return <CreateChatFriendItem key={friend.friendId} data={friend} onClick={handleClickUser} active={currentGroup.includes(friend.friendId)} />
            })}
            {isPendingQuery && <div>
                ...getting friends
                </div>}
        </div>
        <div className="h-full w-full flex justify-end items-end pb-4 pr-4">
            {!dataMutation && <div className="flex gap-4">
                <button className="hover:text-orange-400 transition-colors duration-200"
                onClick={() => ref.current.close()}>
                    close
                </button>
                <button onClick={handleCreateGroup} disabled={disabledButton} className={`bg-orange-300 p-2 shadow-lg
                    hover:bg-orange-400 hover:shadow-orange-200 transition-all duration-200
                    `}>
                    create
                </button>                
            </div>}
            {isPendingMutation && !dataMutation && <div>...sending</div>}
            {dataMutation && <div>Group had been created </div>}
        </div>
    </div>
}