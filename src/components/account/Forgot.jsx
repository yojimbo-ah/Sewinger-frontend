import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import Input from "../../UI/Input"
import Button from "../../UI/Button"
import ErrorParagraph from "../../UI/ErrorParagraph"
import { isEmail ,isEmpty , isLength } from "../../utils/helper"
import { fetchResetAccount } from "../../utils/http"

export default function Forgot () {

    const [email , setEmail] = useState('') ;
    const [error , setError] = useState({
        valid : false ,
        value : ''
    }) ;
    const [focus , setFocus] = useState(true) ;

    const {isSuccess , isError , mutate , isPending} = useMutation({
        mutationFn : fetchResetAccount ,
        onSuccess : () => {
            console.log('success')
        } ,
        onError : (error) => {
            const eError = error.infi.email ;
            setError({
                valid : false ,
                value : eError
            })
        }
    })

    function handleChange (event) {
        setEmail(event.target.value) ;
        const email = event.target.value ;
        if (isEmpty(email)) {
            setError({
                valid : false ,
                value : 'cant leave is empty'
            })
        } else if (!isEmail(email)) {
            setError({
                valid : false ,
                value : 'invadalid email format'
            })
        } else {
            setError({
                valid : true ,
                value : ''
            })
        }
    }


    function handleClick (formData) {
        const email = formData.get('email') ;
        mutate({email})
    }

    function handleFocus () {
        setFocus(true) ;
    }

    function handleRemoveFocus () {
        setFocus(false) ;
    }

    const errorExists = !error.valid ;
    return <div className="flex justify-center pt-20" >
        <form action={handleClick} className="w-4/5 mt-8 md:w-2/5 bg-gray-50 border-gray-100 border-4 items-start shadow-xl">
            <h2 className="ml-6 text-3xl mt-4" >
                Reset your account
            </h2>
            <Input value={email} onChange={handleChange} disable={isPending}
            type='email' name='email' id='email' label='E-mail :' 
            onFocus={handleFocus} onBlur={handleRemoveFocus}
            showError={!error.valid && !focus}
            isValid={error.valid && !focus}
            />
            {!error.valid && !focus && <ErrorParagraph value={error.value} /> }
            {!isSuccess && <p className="mt-8 ml-6" >
                an email would be sent to your inbox (active for 15 min)
            </p>}
            {isSuccess && <p className="text-green-800 text-xl mt-4 text-center">
                Email was sent to your inbox
            </p>}
            <p className="items-end mt-20 flex justify-end" >
                {!isPending && <Link to='/account/login' className="mb-8 mr-4  hover:text-orange-400 transition-colors duration-200" >
                    Login
                </Link>}
                {!isPending && <Button disable={errorExists} name='confirm' onClick={handleClick}/>}
                {isPending && <span className="mb-8 mr-6 " >
                    ...submitting
                </span>}
            </p>   
        </form> 
    </div>
}