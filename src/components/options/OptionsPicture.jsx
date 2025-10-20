import { useContext, useState , useRef } from "react"
import { AuthContext } from "../../Contexts/AuthContext"
import { useMutation } from "@tanstack/react-query";
import { editProfileMutation } from "../../utils/detailhttp";

import ImageInput from "../chat/createChat/ImageInput";


export default function OptionsName ({ref}) {
    const {token , login} = useContext(AuthContext) ;
    const profileImageRef = useRef() ;
    // the profile image state is for showing the profile image in the frontend only ,
    // it creates the src string that we use in the ImageInput components
    const [profileImage , setProfileImage] = useState(null) ;

    // the file state is for sending the date for the backend only , it doesnt show in
    // the frontend
    const [file , setFile] = useState(null) ;
    const {data , isPending , mutate} = useMutation({
        mutationFn : () => {
            return editProfileMutation({jwtToken : token , image : file })
        } ,
        onSuccess : (data) => {
            // login in with new details (meaning setting the new profile picture
            // with the new json web token since it encoded in it)
            login({token : data.jwtToken , user : data.user })
            console.log('this is the image data') ;
            console.log(data) ;
            setTimeout(() => {
                ref.current.close() ;
            } , 3000)
        }
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

    function handleApprove () {
        mutate () ;
    }

    return <div className="border-none flex flex-col justify-center h-full">
        <div className="flex flex-col justify-center items-center h-3/4">
            <ImageInput profileImage={profileImage} handleImageUpload={handleImageUpload} imageNull={setProfileImageToNull} ref={profileImageRef} />
        </div>
        <div className="h-1/4 flex justify-end items-end mb-4 mr-4">
            {!data && !isPending && <div className="flex gap-4">
                <button onClick={() => ref.current.close()} className="hover:text-orange-400 transition-colors duration-200">
                    close
                </button>
                <button onClick={handleApprove} className={`bg-orange-300 p-2 shadow-md transition-all duration-200
                    hover:bg-orange-400 hover:shadow-lg hover:shadow-orange-300 
                    `}>
                    approve
                </button>                
            </div>}
            {isPending && <div>...submitting</div> }
            {data && <div className="text-green-400">
                success image changed
                </div>}
        </div>
    </div>
}