import { useContext , useEffect, useState } from "react"
import { AuthContext } from "../../../Contexts/AuthContext"
import { useMutation } from "@tanstack/react-query"
import { isEmpty , isLength } from "../../../utils/helper";

import { userSendSellerRequest } from "../../../utils/http";
import TextArea from "../../../UI/MyProducts/TextArea";



export default function SendSellerRequest () {
    const {token , setSellerRequestToTrue} = useContext(AuthContext) ;
    const [value , setValue] = useState('') ;
    const [error , setError] = useState({
        valid : false ,
        value : ''
    })
    const [focus , setFocus] = useState(true)

    function handleChange (event) {
        const value = event.target.value ;
        setValue(value) ;

        if (isEmpty(value)) {
            setError({
                valid : false ,
                value : 'Cant leave this field empty'
            })
        } else if (!isLength(value , 50 , 500)) {
            setError({
                valid : false ,
                value : 'The length must be between 50 and 500 characters'
            })
        } else {
            setError({
                valid : true ,
                value : ''
            })
        }
    }

    const {data , isPending , mutate} = useMutation({
        mutationFn : ({description}) => {
            return userSendSellerRequest({jwtToken : token , description : description})
        } ,
        onSuccess : () => {
            setSellerRequestToTrue() ;
        }
    })


    function handleFormSubmit () {
        mutate({description : value})
    }

    return <>
        <div className="py-24 flex justify-center">
            <form action={handleFormSubmit} className="bg-gray-100 flex flex-col items-center shadow-lg  w-2/3">
                <h2 className="mt-5 ml-6 text-2xl text-center">
                    Seller request
                </h2>
                <p className="px-10 mt-7 text-center">
                    (you are curenttly not allowed to create or post products on sweinger
                    since you are a client , you can send a requests to admin to make you capable 
                    , it takes between 1 to 5 days to confirm)
                </p>
                <h2 className="mt-8">
                    Add your ideas of products and why do you want to do it
                </h2>
                <TextArea name='description' id='description' cols={60} rows={10} value={value} isValid={error.valid} focus={focus}
                handleChange={(event) => handleChange(event)} onBlur={() => setFocus(false)} onFocus={() => setFocus(true)} showError={!error.valid && !focus} 
                    />
                {!error.valid && !focus && <p className="text-red-500 pt-6">
                        {error.value}
                    </p>}
                {data && <p className="text-green-500 pt-20 text-xl">
                        request has been sent
                    </p>}
                {isPending && <p>
                        submitting ...
                    </p>}
                {!isPending && !data && <button disabled={!error.valid} className="mt-10 mb-6">
                    send
                </button>}

            </form>
        </div>
    </>
}