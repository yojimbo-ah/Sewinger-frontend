import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useParams , useNavigate } from "react-router-dom"

import Button from "../../UI/Button"
import Input from "../../UI/Input"
import ErrorParagraph from "../../UI/ErrorParagraph"

import { isEmpty , isLength } from "../../utils/helper"
import {fetchResetAccountVer} from "../../utils/http.js"

const min = 6 ;
const max = 20 ;

export default function ForgotVer () {
    const { token } = useParams() ;
    const navigate = useNavigate();

    const [currentForm , setCurrentForm] = useState({
        password : '' ,
        confirmPassword : ''
    })
    const [defaultError , setDefaultError] = useState(undefined) ;
    const [errors , setErrors] = useState({
        password : {
            valid : false ,
            value : ''
        } ,
        confirmPassword : {
            valid : false ,
            value : ''
        }
    })
    
    const [focus , setFocus] = useState({
        password : true ,
        confirmPassword : true
    })

    const {isPending ,  isSuccess , mutate} = useMutation({
        mutationFn : ({data}) => {
            console.log(data);
            return fetchResetAccountVer({data : data , token}) ;
        } ,
        onSuccess : () => {
            console.log('success') ;
            setTimeout(() => {
                navigate('/account/login') ;
            } , 6000)
            
        } ,
        onError : (error) => {
            const errors = error.info.errors ;
            if (errors.email) {
                setErrors(prev => {
                    return {
                        ...prev ,
                        email : {
                            valid : false ,
                            value : errors.email
                        }
                    }
                })
            }
            if (errors.password) {
                setErrors(prev => {
                    return {
                        ...prev ,
                        password : {
                            valid : false ,
                            value : errors.password
                        }
                    }
                })
            }
            if (errors.token) {
                setDefaultError(errors.token) ;
            }
        }
    })

    function handleAction (formData) {
        const password = formData.get('password') ;
        const confirmPassword = formData.get('confirmPassword') ;
        const data = {
            password ,
            confirmPassword
        }

        mutate({data : data}) ;
    }

    function handleChange (event , name) {
        setCurrentForm(prev => {
            return {
                ...prev ,
                [name] : event.target.value
            }
        })

        if (name === 'password') {
            const password = event.target.value ;
            if (isEmpty(password)) {
                setErrors(prev => {
                    return {
                        ...prev ,
                        password : {
                            valid : false ,
                            value : 'cant leave the password field empty'
                        }
                    }
                })
            } else if (!isLength(password , min , max)) {
                setErrors(prev => {
                    return {
                        ...prev ,
                        password : {
                            valid : false ,
                            value : `the password must be between ${min} and ${max} characters`
                        }
                    }
                })
            } else {
                setErrors(prev => {
                    return {
                        ...prev ,
                        password : {
                            valid : true ,
                            value : ''
                        }
                    }
                })
            }
        } else if (name === 'confirmPassword') {
            const confirmPassword = event.target.value ;
            const password = currentForm.password ;
            console.log(confirmPassword);
            console.log(password)
            if (confirmPassword.trim() !== password.trim()) {
                setErrors(prev => {
                    return {
                        ...prev ,
                        [name] : {
                            valid : false ,
                            value : 'confirmation password doesnt match the passowrd'
                        }
                    }
                })
            } else {
                setErrors(prev => {
                    return {
                        ...prev ,
                        [name] : {
                            valid : true ,
                            value : ''
                        }
                    }
                })
            }
        }
    }

    function handleFocus (name) {
        setFocus(prev => {
            return {
                ...prev ,
                [name] : true
            }
        })
    }
    function handleRemoveFocus (name) {
        setFocus(prev => {
            return {
                ...prev , 
                [name] : false
            }
        })
    }

    const errorExists = !errors.password.valid || !errors.confirmPassword.valid ;
    return <div className="flex justify-center pt-20" >
        <form action={handleAction} className="w-4/5 mt-8 md:w-2/5 bg-gray-50 border-gray-100 border-4 items-start shadow-xl">
            <h2 className="ml-6 text-3xl mt-4" >
                Reset your password
            </h2>

            <Input value={currentForm.password} onChange={handleChange}
            type='password' name='password' id='password' label='Password :'
            onFocus={handleFocus} onBlur={handleRemoveFocus} 
            showError={!errors.password.valid && !focus.password}
            isValid={errors.password.valid && !focus.password}
            />
            {!errors.password.valid && !focus.password && <ErrorParagraph value={errors.password.value} />}

            <Input value={currentForm.confirmPassword} onChange={handleChange}
            type='password' name='confirmPassword' id='confirmPassword' label='Confirm password :'
            onFocus={handleFocus} onBlur={handleRemoveFocus} 
            showError={!errors.confirmPassword.valid && !focus.confirmPassword}
            isValid={errors.confirmPassword.valid && !focus.confirmPassword} 
            />
            {!errors.confirmPassword.valid && !focus.confirmPassword && <ErrorParagraph value={errors.confirmPassword.value} />}
            {defaultError && <ErrorParagraph value={defaultError} />}
            {isSuccess && <p className="text-green-800 text-xl mt-4 text-center">
               Password has been reseted
            </p>}

            <p className="items-end mt-20 flex justify-end" >
                {!isPending && <Button  disable={errorExists} name='confirm'/>}
                {isPending && <span className="mb-8 mr-6  " >
                    ...submitting
                </span>}
            </p>   
        </form> 
    </div>
}