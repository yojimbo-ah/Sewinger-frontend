import { useContext , useState} from "react"
import { AuthContext } from "../../Contexts/AuthContext"
import { useMutation } from "@tanstack/react-query"
import { editNameMutation } from "../../utils/detailhttp";

import { isLength , isEmpty } from "../../utils/helper";

import Input from "../../UI/Input";

export default function OptionsName ({ref}) {
    const {user , token , login} = useContext(AuthContext) ;

    const [name , setName] = useState({
        firstName : user.firstName ,
        lastName : user.lastName
    })
    const [errors , setErrors] = useState({
        firstName : {
            value : '' ,
            valid : true
        } ,
        lastName : {
            value : '' ,
            valid : true
        }
    }) ;
    const [focus , setFocus] = useState({
        firstName : true ,
        lastName : true
    })

    function handleChange (event , name) {
        setName(prev => {
            return {
                ...prev ,
                [name] : event.target.value
            }
        })
        if (name === 'firstName') {
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

    function handleClick () {
        mutate () ;
    }

    const {mutate , data , isPending , isError} = useMutation({
        mutationFn : () => {
            return editNameMutation({jwtToken : token , name : name})
        } ,
        onSuccess : (data) => {
            // setting the new token and the new user details after saving them in the backend 
            // since when changing the user name the json web token will change so we have to reset 
            // both the token and the user
            
            login({token : data.jwtToken , user : data.user}) ;
            setTimeout(() => {
                ref.current.close() ;
            } , 3000)
        }
    })

    const validMutate = !errors.firstName.valid || !errors.lastName.valid ;
    return <div className="border-none flex justify-center">
        <div className="flex flex-col">
            <h2 className="mt-6 text-2xl">
                Edit your name here
            </h2>

            <Input disable={isPending} value={name.firstName} onChange={handleChange} 
                type='text' name='firstName' id='firstName' label='First name :' 
                onFocus={handleFocus} onBlur={handleRemoveFocus} 
                showError={!errors.firstName.valid && !focus.firstName}
                isValid={errors.firstName.valid && !focus.firstName}
                />

            <Input disable={isPending} value={name.lastName} onChange={handleChange} 
                type='text' name='lastName' id='lastName' label='Last name :' 
                onFocus={handleFocus} onBlur={handleRemoveFocus} 
                showError={!errors.lastName.valid && !focus.lastName}
                isValid={errors.lastName.valid && !focus.lastName}
                />
            {!data && <div className="flex justify-center items-center gap-8 mt-5 mr-6">
                <button onClick={() => ref.current.close()}>
                    Close
                </button>
                <button onClick={handleClick} disabled={validMutate}
                className={`bg-gray-200 h-10 w-16 flex justify-center items-center shadow-lg
                hover:bg-orange-300 transition-all duration-300 hover:shadow-orange-400 hover:font-bold`}
                >
                    Apply
                </button>
            </div>}
            {data && <div className="mt-10 text-green-700">
                    Name has been Changed
                </div>}
            {isPending && data && <div className="mt-10">
                    Submitting edit request
                </div>}
        </div>
    </div>
}