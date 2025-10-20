import Input from "../../UI/Input.jsx"
import Button from "../../UI/Button.jsx"
import ErrorParagraph from "../../UI/ErrorParagraph.jsx"

import { Link , useNavigate} from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { useState  } from "react"

import { isEmail , isEmpty , isLength } from "../../utils/helper.js"
import { fetchSignup } from "../../utils/http.js"

const min = 6 ;
const max = 20 ;


export default function Login () {
    const [currentFrom , setCurrentForm] = useState({
        email : '' ,
        password : '' ,
        firstName : '' ,
        lastName : '' ,
        confirmPassword : ''
    })

    const [focussed , setFocussed] = useState({
        password : true ,
        email : true ,
        firstName : true ,
        lastName : true ,
        confirmPassword : true
    })

    const [errors , setErrors] = useState({
        password : {
            valid : false ,
            value : ''
        } ,
        email : {
            valid : false ,
            value : ''
        } ,
        confirmPassword : {
            valid : false ,
            value : ''
        } ,
        firstName : {
            valid : false ,
            value : ''
        } ,
        lastName : {
            valid : false ,
            value : ''
        }
    }) ;
    const navigate = useNavigate() ;

    const {data , error , isPending , isSuccess , mutate} = useMutation({
        mutationFn : fetchSignup ,
        onSuccess : () => {
            setTimeout(() => {
                navigate('/account/login')
            } , 5000)
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
            if (errors.passowrd) {
                setErrors(prev => {
                    return {
                        ...prev ,
                        password : {
                            valid : false ,
                            value : errors.passowrd
                        }
                    }
                })
            }
            if (errors.confirmPassword) {
                setErrors(prev => {
                    return {
                        ...prev ,
                        confirmPassword : {
                            valid : false ,
                            value : errors.confirmPassword
                        }
                    }
                })
            }
            if (errors.firstName) {
                setErrors(prev => {
                    return {
                        ...prev ,
                        firstName : {
                            valid : false ,
                            value : errors.firstName
                        }
                    }
                })
            }
            if (errors.lastName) {
                setErrors(prev => {
                    return {
                        ...prev ,
                        lastName : {
                            valid : false ,
                            value : errors.lastName
                        }
                    }
                })
            }
        }
    })

    function handleAction (formData) {
        const email = formData.get('email')
        const password = formData.get('password') ;
        const confirmPassword = formData.get('confirmPassword') ;
        const firstName = formData.get('firstName') ;
        const lastName = formData.get('lastName') ;
        const data = {
            email ,
            password ,
            confirmPassword ,
            name : {
                firstName , 
                lastName
            }
        }
        mutate({data : data})
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
        } else if (name === 'firstName') {
            const firstName = event.target.value ;
            if (isEmpty(firstName)) {
                setErrors(prev => {
                    return {
                        ...prev ,
                        [name] : {
                            valid : false ,
                            value : 'cant leave the first name empty'
                        }
                    }
                })
            } else if (!isLength(firstName , 3 , 20)) {
                setErrors(prev => {
                    return {
                        ...prev ,
                        [name] : {
                            valid : false ,
                            value : 'between 3 and 20 characters'
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
        } else if (name === 'lastName') {
            const lastName = event.target.value ;
            if (isEmpty(lastName)) {
                setErrors(prev => {
                    return {
                        ...prev ,
                        [name] : {
                            valid : false ,
                            value : 'cant leave the last name empty'
                        }
                    }
                })
            } else if (!isLength(lastName , 3 , 20)) {
                setErrors(prev => {
                    return {
                        ...prev ,
                        [name] : {
                            valid : false ,
                            value : 'between 3 and 20 characters'
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
        } else if (name === 'confirmPassword') {
            const confirmPassword = event.target.value ;;
            const passowrd = currentFrom.password ;
            if (confirmPassword.trim() !== passowrd.trim()) {
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

    const errorExists = !errors.email.valid || !errors.password.valid || !errors.firstName.valid ||
                        !errors.confirmPassword.valid || !errors.lastName.valid

    return <div className="flex justify-center" >
        <form action={handleAction} className="w-4/5 mt-8 md:w-2/5 bg-gray-50 border-gray-100 border-4 items-start shadow-xl">
            <h2 className="ml-6 text-3xl mt-4" >
                add yout login information
            </h2>
            <Input value={currentFrom.email} onChange={handleChange} 
                type='email' name='email' id='email' label='E-mail :' 
                onFocus={handleFocus} onBlur={handleRemoveFocus} 
                showError={!errors.email.valid && !focussed.email}
                isValid={errors.email.valid && !focussed.email} disable={isPending}
                />

            {!errors.email.valid && !focussed.email && <ErrorParagraph value={errors.email.value} />}

            <Input value={currentFrom.firstName} onChange={handleChange}
                type='text' name='firstName' id='firstName' label='First name :'
                onFocus={handleFocus} onBlur={handleRemoveFocus} 
                showError={!errors.firstName.valid && !focussed.firstName}
                isValid={errors.firstName.valid && !focussed.firstName} disable={isPending}
                />

            {!errors.firstName.valid && !focussed.firstName && <ErrorParagraph value={errors.firstName.value} />}

            <Input value={currentFrom.lastName} onChange={handleChange}
                type='text' name='lastName' id='lastName' label='Last name :'
                onFocus={handleFocus} onBlur={handleRemoveFocus} 
                showError={!errors.lastName.valid && !focussed.lastName}
                isValid={errors.lastName.valid && !focussed.lastName} disable={isPending}
                />

            {!errors.lastName.valid && !focussed.lastName && <ErrorParagraph value={errors.lastName.value} />}
            
            <Input value={currentFrom.password} onChange={handleChange}
                type='password' name='password' id='password' label='Password :'
                onFocus={handleFocus} onBlur={handleRemoveFocus} 
                showError={!errors.password.valid && !focussed.password}
                isValid={errors.password.valid && !focussed.password} disable={isPending}
                />

            {!errors.password.valid && !focussed.password && <ErrorParagraph value={errors.password.value} />}

            <Input value={currentFrom.confirmPassword} onChange={handleChange}
                type='password' name='confirmPassword' id='confirmPassword' label='confirm password :'
                onFocus={handleFocus} onBlur={handleRemoveFocus} 
                showError={!errors.confirmPassword.valid && !focussed.confirmPassword}
                isValid={errors.confirmPassword.valid && !focussed.confirmPassword} disable={isPending}
                />

            {!errors.confirmPassword.valid && !focussed.confirmPassword && <ErrorParagraph value={errors.confirmPassword.value} />}
            {isSuccess && <p className="text-green-800 text-xl mt-4 text-center">
                    Account has been created , welcome to Sewinger
                </p>}

            <p className="items-end mt-20 flex justify-end" >
                {!isPending && <Link to='/account/login' className="mb-8 mr-4  hover:text-orange-400 transition-colors duration-200" >
                    Login
                </Link>}
                {!isPending && <Button disable={errorExists} name='Signup'/>}
                {isPending && <span className="mb-8 mr-6  " >
                    ...submitting
                </span>}
            </p>   

        </form> 
    </div>
}