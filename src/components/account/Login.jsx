import Input from "../../UI/Input.jsx"
import Button from "../../UI/Button.jsx"
import ErrorParagraph from "../../UI/ErrorParagraph.jsx"

import { Link , useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { useState , useContext } from "react"

import { isEmail , isEmpty , isLength } from "../../utils/helper.js"
import { fetchLogin } from "../../utils/http.js"

import { AuthContext } from "../../Contexts/AuthContext.jsx"

const min = 6 ;
const max = 20 ;


export default function Login () {
    const navigate = useNavigate() ;

    const {login} = useContext(AuthContext) ;

    const [currentFrom , setCurrentForm] = useState({
        email : '' ,
        password : ''
    })

    const [focussed , setFocussed] = useState({
        password : true ,
        email : true
    })

    const [errors , setErrors] = useState({
        password : {
            valid : false ,
            value : ''
        } ,
        email : {
            valid : false ,
            value : ''
        }
    }) ;

    const {data , mutate , isPending , isError , isSuccess} = useMutation({
        mutationFn : fetchLogin ,
        onSuccess : ({message , token , user  }) => {
            setTimeout(() => {
                login({token , user});
                navigate('/shop')
            }, 5000) 
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
        }
    })

    function handleAction (formData) {
        const email = formData.get('email')
        const password = formData.get('password') ;
        const data = {
            email ,
            password
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

        if (name === 'email') {
            const email = event.target.value ;
            if (isEmpty(email)) {
                setErrors((prev) => {
                    return {
                        ...prev ,
                        email : {
                            valid : false ,
                            value : 'cant leave the email empty'
                        }
                    }
                })
            } else if (!isEmail(email)) {
                setErrors(prev => {
                    return {
                        ...prev , 
                        email : {
                            valid : false ,
                            value : 'invalid email , try again'
                        }
                    }
                })
            } else {
                setErrors(prev => {
                    return {
                        ...prev ,
                        email : {
                            valid : true ,
                            value : ''
                        }
                    }
                })
            }
        } else if (name === 'password') {
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
        }
    }


    function handleFocus (name) {
        setFocussed(prev => {
            return {
                ...prev ,
                [name] : true
            }
        })
    }
    function handleRemoveFocus (name) {
        setFocussed(prev => {
            return {
                ...prev , 
                [name] : false
            }
        })
    }

    const errorExists = !errors.email.valid || !errors.password.valid ;

    return <div className="flex justify-center " >
        <form action={handleAction} className="w-4/5 mt-8 md:w-2/5 bg-gray-50 border-gray-100 border-4 items-start shadow-xl">
            <h2 className="ml-6 text-3xl mt-4" >
                add yout login information
            </h2>
            <Input disable={isPending} value={currentFrom.email} onChange={handleChange} 
                type='email' name='email' id='email' label='E-mail :' 
                onFocus={handleFocus} onBlur={handleRemoveFocus} 
                showError={!errors.email.valid && !focussed.email}
                isValid={errors.email.valid && !focussed.email}
                />

            {!errors.email.valid && !focussed.email && <ErrorParagraph value={errors.email.value} />}

            <Input disable={isPending} value={currentFrom.password} onChange={handleChange}
                type='password' name='password' id='password' label='Password :'
                onFocus={handleFocus} onBlur={handleRemoveFocus} 
                showError={!errors.password.valid && !focussed.password}
                isValid={errors.password.valid && !focussed.password}
                />

            {!errors.password.valid && !focussed.password && <ErrorParagraph value={errors.password.value} />}

            <p className="mt-6 ml-6">
                <Link className="hover:text-orange-500 transition-colors duration-100 " to='/account/forgot' >
                    forgot account ?
                </Link>  
            </p>


            {isSuccess && <p className="text-green-800 text-xl mt-4 text-center">
                welcome back to Sewinger
            </p>}
            <p className="items-end mt-20 flex justify-end" >
                {!isPending && <Link to='/account/signup' className="mb-8 mr-4  hover:text-orange-400 transition-colors duration-200" >
                    Signup
                </Link>}
                {!isPending && <Button disable={errorExists} name='login'/>}
                {isPending && <span className="mb-8 mr-6 " >
                    ...submitting
                </span>}
            </p>   
        </form> 
    </div>
}