import Input from "./Input"
import TextArea from "./TextArea"
import TextButton  from "../../components/user-stuff/myProducts/Button"
import Button from "../shop/Button"
import Errorp from "./Errorp"

import { Upload, Image, X } from 'lucide-react';
import { isEmpty , isLength , validPrice } from "../../utils/helper"
import { useState , useContext } from "react"
import { useMutation } from "@tanstack/react-query"
import { createProductMutation, queryClient } from "../../utils/http"
import { AuthContext } from "../../Contexts/AuthContext"

const categories = ["Sewing", "Crochet", "Male", "Female", "Clothing" ,"Cute" ] ;

export default function ProductForm ({modalRef}) {

    const {token} = useContext(AuthContext) ;

    const [defaultError , setDefaultError] = useState() ;
    const [formData , setFormData] = useState({
        name : '' ,
        description : '' ,
        price : 0 ,
        quantity : 0 ,
        categories : [] ,
        type : 'raw' ,
        images : []
    })

    const [focus , setFocus] = useState({
        name : true ,
        description : true ,
        price : true ,
        quantity : true ,
        images : true
    })


    const [error , setError] = useState({
        name : {
            valid : false ,
            value : ''
        } ,
        description : {
            valid : false ,
            value : ''
        } ,
        price : {
            valid : false ,
            value : ''
        } ,
        quantity : {
            valid : false ,
            value : ''
        } ,
        categories : {
            valid : false ,
            value : ''
        } ,
        images : {
            valid : false ,
            value : ''
        }
    })

    function handleNameChange (event) {
        setFormData((prev) => {
            return {
                ...prev ,
                name : event.target.value
            }
        })

        const name = event.target.value ;
        if (isEmpty(name)) {
            setError((prev) =>{
                return {
                    ...prev ,
                    name : {
                        valid : false ,
                        value : 'Cant leave it empty'
                    }
                }
            })
        } else if (!isLength(name , 3 , 40 )) {
            setError((prev) => {
                return {
                    ...prev ,
                    name : {
                        valid : false ,
                        value : 'the lenght must be bewteen 3 and 40 characters'
                    }
                }
            })
        } else {
            setError((prev) => {
                return {
                    ...prev ,
                    name : {
                        valid : true ,
                        value : ''
                    }
                }
            })
        }
    }

    function handleDescriptionChange (event) {
        setFormData((prev) => {
            return {
                ...prev ,
                description : event.target.value
            }
        })

        const description = event.target.value ;

        if (isEmpty(description)) {
            setError((prev) => {
                return {
                    ...prev ,
                    description : {
                        valid : false ,
                        value : 'cant leave the description empty'
                    }
                }
            })
        } else if (!isLength(description , 10 , 150)) {
            setError((prev) => {
                return {
                    ...prev ,
                    description : {
                        valid : false ,
                        value : 'the description must be between 10 and 150 characters'
                    }
                }
            })
        } else {
            setError((prev) => {
                return {
                    ...prev ,
                    description : {
                        valid : true , 
                        value : ''
                    }
                }
            })
        }
    }

    function handlePriceChange (event) {
        setFormData((prev) => {
            return {
                ...prev ,
                price : event.target.value
            }
        })
        
        const price = event.target.value ;
        if (price <= 0) {
            setError((prev) => {
                return {
                    ...prev ,
                    price : {
                        valid : false ,
                        value : 'the price cant be less then zero'
                    }
                }
            })
        } else if (!validPrice(price)) {
            setError((prev) => {
                return {
                    ...prev ,
                    price : {
                        valid : false ,
                        value : 'invalid price , it should have max two digits after the point'
                    }
                }
            })
        } else {
            setError((prev) => {
                return {
                    ...prev ,
                    price : {
                        valid : true ,
                        value : ''
                    }
                }
            })
        }
    }

    function handleQuantityChange (event) {
        setFormData((prev) => {
            return {
                ...prev ,
                quantity : event.target.value
            }
        })

        const quantity = event.target.value ;
        if (quantity <= 0) {
            setError((prev) => {
                return {
                    ...prev ,
                    quantity : {
                        valid : false ,
                        value : 'the quantity should be a positive integer'
                    }
                }
            })
        } else if (Number.isInteger(quantity)) {
            setError((prev) => {
                return {
                    ...prev ,
                    quantity : {
                        valid : false ,
                        value : 'the quantity should be a integer (no decimal value )'
                    }
                }
            })
        } else {
            setError((prev) => {
                return {
                    ...prev ,
                    quantity : {
                        valid : true ,
                        value : ''
                    }
                }
            })
        }
    }

    function handleCategorieChange (event) {
        if (event.target.checked) {
            setFormData((prev) => {
                return {
                    ...prev ,
                    categories : [...prev.categories , event.target.value]
                }
            })
        } else {
            setFormData((prev) => {
                return {
                    ...prev ,
                    categories : prev.categories.filter((item) => {
                        return item !== event.target.value
                    })
                }
            })
        }
        const categories = formData.categories ;
        if (categories.length > 3) {
            setError((prev) => {
                return {
                    ...prev ,
                    categories : {
                        valid : false ,
                        value : 'you are allowed to choose only 4 categories at max'
                    }
                }
            })
        } else {
            setError((prev) => {
                return {
                    ...prev ,
                    categories : {
                        valid : true ,
                        value : ''
                    }
                }
            })
        }
    }
    
    function handleTypeChange (event) {
        setFormData((prev) => {
            return {
                ...prev ,
                type : event.target.value
            }
        })
    }

    function handleFocus (name) {
        setFocus((prev) => {
            return {
                ...prev ,
                [name] : true
            }
        })
    }

    function handleBlur (name) {
        setFocus((prev) => {
            return {
                ...prev ,
                [name] : false
            }
        })
    }

    function handleImageChange (event) {
        const files = Array.from(event.target.files);
        setFormData((prev) => {
            return {
                ...prev ,
                images : [...prev.images , ...files]
            }
        });

        const imagesLength = formData.images.length ;
        if (imagesLength < 1 || imagesLength > 4) {
            setError((prev) => {
                return {
                    ...prev ,
                    images : {
                        value : 'you are allowed to upload only 4 images' ,
                        valid : false
                    }
                }
            })
        } else {
            setError((prev) => {
                return {
                    ...prev ,
                    images : {
                        valid : true ,
                        value : ''
                    }
                }
            })
        }
    }

    function handleImageRemove (index) {
        setFormData((prev) => {
            return {
                ...prev ,
                images : prev.images.filter((image , i) => {
                    return index !== i
                })
            }
        })
    }

    function handleFormAction () {
        mutate({data : formData})
    }

    const {mutate , data , isPending } = useMutation({
        mutationFn : ({data}) => {
            return createProductMutation({data : data , jwtToken : token })
        } ,
        onSuccess : () => {
            queryClient.invalidateQueries(['products' , 'notValid']) ;
            setTimeout(() => {
                setFormData(() => {
                    return {
                        name : '' ,
                        description : '' ,
                        price : 0 ,
                        quantity : 0 ,
                        categories : [] ,
                        type : 'raw' ,
                        images : []
                    }
                })
                modalRef.current.close() ;
            } , 4000) ;
        } ,
        onError : (error) => {
            console.log('error :' + error) ;
            const errors = Object.entries(error.info.errors) ;
            errors.forEach(([title , value] , index) => {
                setError((prev) => {
                    return {
                        ...prev ,
                        [title] : {
                            value : value ,
                            valid : false
                        }
                    }
                })
            })
        }
    })
    const validInputs = !error.name.valid || !error.description.valid || !error.categories.valid ||
        error.price.valid || !error.quantity.valid || !error.images.valid
    return <>
        <form action={handleFormAction} className="w-full h-full flex flex-col ">
            <h2 className="ml-8 mt-8 mb-8 text-2xl">
                Create your product
            </h2>

            <TextArea name='name' id='name' cols={30} rows={2} value={formData.name} isValid={error.name.valid} showError={!error.name.valid && !focus.name}
            handleChange={handleNameChange} onBlur={handleBlur} onFocus={handleFocus} focus={focus.name} tag='Add the title :'
                />

            {!error.name.valid && !focus.name && <Errorp value={error.name.value} />}

            <TextArea name='description' id='description' cols={40} rows={3} value={formData.description} isValid={error.description.valid} focus={focus.description}
            handleChange={handleDescriptionChange} onBlur={handleBlur} onFocus={handleFocus} showError={!error.description.valid && !focus.description} tag='Add the description'
                />

            {!error.description.valid && !focus.description && <Errorp value={error.description.value} />}

            <div className="ml-8 flex mt-9 flex-wrap gap-4">

                <Input onBlur={() => handleBlur('price')} onFocus={() => handleFocus('price')} type='number' showError={!error.price.valid && !focus.price}
                value={formData.price} name='price' id='price' focus={focus.price} onChange={handlePriceChange} isValid={error.price.valid} tag='Price :'
                />

                {!error.price.valid && !focus.price && <Errorp value={error.price.value} />}

                <Input onBlur={() => handleBlur('quantity')} onFocus={() => handleFocus('quantity')} value={formData.quantity} type='number' tag='Quantity :'
                name='quantity' id='quantity' focus={focus.quantity} onChange={handleQuantityChange} showError={!error.quantity.valid && !focus.quantity} isValid={error.quantity.valid}
                />

                {!error.quantity.valid && !focus.quantity && <Errorp value={error.quantity.value} />}

            </div>
            <div className="ml-8 mt-8">
                <h3 className="block mb-2 font-medium">Select categories:</h3>
                <div className="flex flex-wrap gap-4">
                {categories.map((category) => (
                    <label key={category} className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        value={category}
                        checked={formData.categories.includes(category)}
                        onChange={handleCategorieChange}
                    />
                    {category}
                    </label>
                ))}
                </div>
            </div>
            <div className="ml-8 mt-6 w-1/3 flex items-center gap-3">
                <label className="block mb-2 font-medium">Type :</label>
                <select
                    value={formData.type}
                    onChange={handleTypeChange}
                    name="category"
                    className="w-32 h-8 border border-b-2 border-t-2 border-t-orange-500 border-x-2 border-x-orange-500 shadow-lg  border-b-black"
                >
                    <option value="raw">Raw</option>
                    <option value="custom">Custom</option>
                    <option value="normal">Normal</option>
                </select>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="mt-4 ml-4 border-l-4 border-orange-500 pl-4">
                    <label className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg cursor-pointer hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105">
                        <Upload className="w-5 h-5 mr-2" />
                        Upload Images
                        <input 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        onChange={handleImageChange}
                        className="hidden"
                        name="images"
                        onClick={() => handleFocus('images')}
                        onMouseLeave={() => handleBlur('images')}
                        />
                    </label>
                    
                    {formData.images.length > 0 && (
                        <div className="mt-4 space-y-2">-
                        <p className="text-sm font-medium text-gray-700">Selected files:</p>
                        <div className="space-y-2">
                            {formData.images.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                                <div className="flex items-center">
                                <Image className="w-4 h-4 mr-2 text-gray-500" />
                                <span className="text-sm text-gray-700 truncate max-w-xs">{file.name}</span>
                                </div>
                                <button 
                                type="button"
                                onClick={() => handleImageRemove(index)}
                                className="text-red-500 hover:text-red-700 p-1"
                                >
                                <X className="w-4 h-4" />
                                </button>
                            </div>
                            ))}
                        </div>
                        </div>
                    )}
                    </div>
                </div>
                {!error.images.valid && !focus.images && <Errorp value={error.images.value} />}
                {data && <p className="text-green-500 text-center text-xl">
                        Product created , it will be waiting for the admin rectification
                    </p>}
            <div className="mt-auto mr-6 mb-6 flex gap-4 justify-end">
                <TextButton onClick={() => modalRef.current.close() } name='close' disable={validInputs} />
                <Button name='Create' />
            </div>
        </form>
    </>
}