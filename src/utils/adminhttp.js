const REACT_APP_URL = import.meta.env.VITE_REACT_APP_URL ;

export async function getPendingProductsQuery ({jwtToken}) {
    const response = await fetch(`${REACT_APP_URL}/admin/product/request` , {
        method : 'GET' ,
        headers : {
            'Authorization' : `Bearer ${jwtToken}`
        }
    })

    if (!response.ok) {
        const error = new Error('couldnt fetch pending products') ;
        error.info = await response.json() ;
        throw error
    }

    return await response.json() ;
} 

export async function getSellerRequestQuery ({jwtToken}) {
    const response = await fetch(`${REACT_APP_URL}/admin/seller/request` , {
        method : 'GET' ,
        headers : {
            'Authorization' : `Bearer ${jwtToken}`
        }
    })

    if (!response.ok) {
        const error = new Error('couldnt fetch pending seller requests') ;
        error.info = await response.json() ;
        throw error
    }

    return await response.json() ;
} 

export async function adminPatchUserPowerMutation ({jwtToken , userId , status}) {
    const response = await fetch(`${REACT_APP_URL}/admin/user/power/${userId}` , {
        method : 'PATCH' ,
        headers : {
            'Authorization' : `Bearer ${jwtToken}` ,
            'Content-Type' : 'application/json'
        } ,
        body : JSON.stringify({status : status})
    })

    if (!response.ok) {
        const error = new Error('Error happened') ;
        error.info = await response.json() ;
        throw error ;
    }

    return await response.json();
}

export async function adminPatchProductStatusMutation ({jwtToken , productId}) {
    const response = await fetch(`${REACT_APP_URL}/admin/product/${productId}` , {
        method : 'PATCH' ,
        headers : {
            'Authorization' : `Bearer ${jwtToken}`
        }
    })

    if (!response.ok) {
        const error = new Error('error happened') ;
        error.info = await response.json() ;
        throw error
    }

    return await response.json() ;
}

export async function adminDeleteProductMutation ({jwtToken , productId}) {
    const response = await fetch(`${REACT_APP_URL}/admin/product/${productId}` , {
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