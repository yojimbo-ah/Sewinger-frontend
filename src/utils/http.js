import {QueryClient} from '@tanstack/react-query'
const REACT_APP_URL = import.meta.env.REACT_APP_URL ;

export const queryClient = new QueryClient() ;


export async function fetchLogin ({data}) {
    const response = await fetch(`${REACT_APP_URL}/account/login` , {
        method : 'POST' ,
        headers : {
            'Content-Type' : 'application/json'
        } ,
        body : JSON.stringify(data) 
    })

    if (!response.ok) {
        const error = new Error('error happened') ;
        error.info = await response.json() ;
        throw error
    }

    const result = await response.json() ;
    const expiryDate = Date.now() + 15 * 24 * 60 * 60 * 1000 ;
    const token = result.token ;
    localStorage.setItem('token' , token) ;
    localStorage.setItem('ExpiryToken' , expiryDate) ;
    return  {...result , expiryDate} ;
}

export async function fetchSignup ({data}) {
    const response = await fetch(`${REACT_APP_URL}/account/signup` , {
        method : 'POST' ,
        headers : {
            'Content-Type' : 'application/json'
        } ,
        body : JSON.stringify({...data})
    })

    if (!response.ok) {
        const error = new Error('error happened') ;
        error.info = await response.json() ;
        throw error
    }

    return await response.json()
    
}

export async function fetchResetAccount ({email}) {
    const response = await fetch(`${REACT_APP_URL}/account/forgot` , {
        method : 'POST' ,
        headers : {
            'Content-Type' : 'application/json'
        } ,
        body : JSON.stringify({email : email})
    })

    if (!response.ok) {
        const error = new Error('error happened') ;
        error.info = await response.json() ;
        throw error
    }    


    return await response.json() ;
}

export async function fetchResetAccountVer ({data , token}) {
    const response = await fetch(`${REACT_APP_URL}/account/forgot/${token}` , {
        method : 'PATCH' ,
        headers : {
            'Content-Type' : 'application/json'
        } ,
        body : JSON.stringify({...data})
    })

    if (!response.ok) {
        const error = new Error('error Accured') ;
        error.info = await response.json() ;
        throw error ;
    }

    return await response.json() ;
}


export async function fetchSignupVer ({token , status}) {
    console.log(status)
    console.log(token)
    const response = await fetch(`${REACT_APP_URL}/account/signup/${token}` , {
        method : 'PUT' ,
        body : JSON.stringify({status : status}) ,
        headers : {
            'Content-Type' : 'application/json'
        }
    })

    if (!response.ok) {
        const error = new Error('error accured')
        error.info = await response.json() ;
        throw error
    }

    return await response.json() ;
}

export async function fetchProducts () {
    const response = await fetch(`/api/product/normal`) ;
    if (!response.ok) {
        const error = new Error('error happened') ;
        error.info = await response.json() ;
    }
    const {products} = await response.json() ;
    return await products ;
}

export async function fetchUserProducts ({token , valid , signal}) {
    const response = await fetch(`${REACT_APP_URL}/product/user/${valid}` , {
        method : 'GET' ,
        headers : {
            'Authorization' : `Bearer ${token}` ,
            'Content-Type' : 'application/json'
        } ,
        signal : signal
    }) ;

    if (!response.ok) {
        const error = new Error('couldnt fetch user products') ;
        error.info = await response.json() ;
        throw error
    }

    return await response.json() ;
}


export async function deleteProductMutation ({productId , jwtToken}) {
    const response = await fetch(`${REACT_APP_URL}/product/delete/${productId}` , {
        method : 'DELETE' ,
        headers : {
            'Authorization' : `Bearer ${jwtToken}`
        } ,

    })

    if (!response.ok) {
        const error = new Error('Error happened when deleting product') ;
        error.info = await response.json() ;
        throw error ;
    }

    return await response.json() ;
}

export async function createProductMutation ({data , jwtToken }) {
    const formData = new FormData() ;
    formData.append('name' , data.name) ;
    formData.append('description' , data.description) ;
    formData.append('price' , data.price) ;
    formData.append('quantity' , data.quantity) ;
    formData.append('type' , data.type) ;

    if (data.categories && Array.isArray(data.categories)) {
        data.categories.forEach((cat , index) => {
            formData.append('categories[]', cat)
        })
    }

    if (data.images && data.images.length > 0) {
        data.images.forEach((image , index) => {
            formData.append('images' , image) ;
        })
    }


    const response = await fetch(`${REACT_APP_URL}/product/create` , {
        method : 'POST' ,
        headers : {
            'Authorization' : `Bearer ${jwtToken}` 
        } ,
        body : formData
    })

    if (!response.ok) {
        const error = new Error('error happened when creating a product') ;
        error.info = await response.json() ;
        throw error
    }

    return await response.json() ;
}

export async function updateProductMutation ({data , jwtToken , productId}) {
    const formData = new FormData() ;
    formData.append('name' , data.name) ;
    formData.append('description' , data.description) ;
    formData.append('price' , data.price) ;
    formData.append('availbleItems' , data.quantity) ;
    formData.append('type' , data.type) ;
    if (data.categories && Array.isArray(data.categories)) {
        data.categories.forEach((cat , index) => {
            formData.append('categories[]' , cat)
        })
    }

    if (data.images && data.images.length > 0) {
        data.images.forEach((image , index) => {
            formData.append('images' , image)
        })
    }

    const response = await fetch(`${REACT_APP_URL}/product/edit/${productId}` , {
        method : 'PATCH' ,
        headers : {
            'Authorization' : `Bearer ${jwtToken}`
        } ,
        body : formData
    })

    if (!response.ok) {
        const error = new Error('couldnt update product') ;
        error.info = await response.json() ;
        throw error
    }

    return await response.json() ;
}


export async function fetchProductDetails ({productId}) {

    const response = await fetch(`${REACT_APP_URL}/product/details/${productId}`) ;

    if (!response.ok) {
        const error = new Error('couldnt find product with similair id') ;
        error.info = await response.json() ;
        throw error ;
    }


    return await response.json()
}

export async function getCartQuery ({jwtToken}) {
    const response = await fetch(`${REACT_APP_URL}/cart` , {
        method : 'GET' ,
        headers : {
            'Authorization' : `Bearer ${jwtToken}`
        }
    })


    if (!response.ok) {
        const error = new Error('error happened') ;
        error.info = await response.json() ;
        throw error
    }

    return await response.json()
}

export async function buyProductMutation ({jwtToken , productId , quantity }) {
    const response = await fetch(`${REACT_APP_URL}/cart/buy/${productId}` , {
        method : 'PUT' ,
        headers : {
            'Content-Type' : 'application/json' ,
            'Authorization' : `Bearer ${jwtToken}`
        } ,
        body : JSON.stringify({quantity : quantity})
    })

    if (!response.ok) {
        const error = new Error('error happend') ;
        error.info = await response.json() ;
        throw error ;
    }

    return await response.json() ;
}


export async function deleteCartMutation ({jwtToken}) {
    const response = await fetch(`${REACT_APP_URL}/cart/delete` , {
        method : 'DELETE' ,
        headers : {
            'Authorization' : `Bearer ${jwtToken}`
        }
    })

    if (!response.ok) {
        const error = new Error('error happened') ;
        error.info = await response.json() ;
        throw error ;
    }


    return await response.json() ;
}

export async function deleteProductFromCartMutation ({jwtToken , productId}) {
    const response = await fetch(`${REACT_APP_URL}/cart/delete/${productId}` , {
        method : 'DELETE' ,
        headers : {
            'Authorization' : `Bearer ${jwtToken}`
        }
    })

    if (!response.ok) {
        const error = new Error('error happened') ;
        error.info = await response.json() ;
        throw error ;
    }

    return await response.json() ;
}

export async function createOrderMutation ({jwtToken}) {
    const response = await fetch(`${REACT_APP_URL}/order/create` , {
        method : 'PUT' ,
        headers : {
            'Authorization' : `Bearer ${jwtToken}`
        }
    })

    if (!response.ok) {
        const error = new Error('error happened') ;
        error.info = await response.json() ;
        throw error ;
    }

    return await response.json() ;
}

export async function getOrderQuery ({jwtToken}) {
    const response = await fetch(`${REACT_APP_URL}/order` , {
        method : 'GET' ,
        headers : {
            'Authorization' : `Bearer ${jwtToken}`
        }
    })

    if (!response.ok) {
        const error = new Error('couldnt fetch orders') ;
        error.info = await response.json() ;
        throw error ;
    }

    return await response.json() ;
}

export async function deleteOrderMutation ({jwtToken , orderId}) {
    const response = await fetch(`${REACT_APP_URL}/order/delete/${orderId}` , {
        method : 'DELETE' ,
        headers : {
            'Authorization' : `Bearer ${jwtToken}`
        }
    })

    if (!response.ok) {
        const error = new Error('error happened') ;
        error.info = await response.json() ;
        throw error ;
    }

    return await response.json() ;
}


export async function updateItemCartQuantity ({jwtToken , quantity , productId}) {
    const response = await fetch(`${REACT_APP_URL}/cart/update/${productId}` , {
        method : 'PATCH' ,
        headers : {
            'Content-Type' : 'application/json' ,
            'Authorization' : `Bearer ${jwtToken}`
        } ,
        body : JSON.stringify({quantity : quantity})
    })

    if (!response.ok) {
        const error = new Error('error') ;
        error.info = await response.json() ;
        throw error ;
    }

    return await response.json() ;
}

export async function getPDF({jwtToken , orderId}) {
  const response = await fetch(`${REACT_APP_URL}/order/invoice/${orderId}` , {
    method : 'GET' ,
    headers : {
        'Authorization' : `Bearer ${jwtToken}`
    }
  });
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);

  window.open(url, '_blank');
}

export async function userSendSellerRequest ({jwtToken , description}) {
    const response = await fetch(`${REACT_APP_URL}/account/request/seller` , {
        method : 'PUT' ,
        headers : {
            'Authorization' :`Bearer ${jwtToken}` ,
            'Content-Type' : 'application/json'
        } ,
        body : JSON.stringify({description : description})
    }) ;

    if (!response.ok) {
        const error = new Error('Error happened') ;
        error.info = await response.json() ;
        throw error ;
    }

    return await response.json()
}
