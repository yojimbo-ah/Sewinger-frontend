const REACT_APP_URL = import.meta.env.VITE_REACT_APP_URL ;

export async function editNameMutation ({jwtToken , name}) {
    const response = await fetch (`${REACT_APP_URL}/detail/name` , {
        method : 'PATCH' ,
        headers : {
            'Content-Type' : 'application/json' ,
            'Authorization' : `Bearer ${jwtToken}`
        } ,
        body : JSON.stringify({name : name})
    }) ;

    if (!response.ok) {
        const error = new Error('Error happened') ;
        error.info = await response.json() ;
        throw error ;
    }

    const resData = await response.json() ;

    // setting up the new json web token to be handeled by the useEffect middleware 
    // for handeling the name (the useEffect function will do the rest in the AuthContext)

    const expiryDate = Date.now() + 15 * 24 * 60 * 60 * 1000 ;
    const token = resData.jwtToken ;
    console.log(resData) ;
    
    localStorage.setItem('token' , token) ;
    localStorage.setItem('ExpiryToken' , expiryDate) ;

    return resData ;
}

export async function editProfileMutation ({jwtToken , image}) {
    const formData = new FormData() ;
    formData.append('image' , image) ;
    const response = await fetch (`${REACT_APP_URL}/detail/image` , {
        method : 'PATCH' ,
        headers : {
            'Authorization' : `Bearer ${jwtToken}`
        } ,
        body : formData

    })

    if (!response.ok) {
        const error = new Error ('Error happened') ;
        error.info = await response.json() ;
        throw error ;
    }

    const resData = await response.json() ;

    // setting up the new json web token to be handeled by the useEffect middleware :
    // for handeling the profileImage (the useEffect function will do the rest in the AuthContext)

    const expiryDate = Date.now() + 15 * 24 * 60 * 60 * 1000 ;
    const token = resData.jwtToken ;
    
    localStorage.setItem('token' , token) ;
    localStorage.setItem('ExpiryToken' , expiryDate) ;

    return resData ;
}

export async function editProfileLinksMutation ({jwtToken , data}) {
    const response = await fetch(`${REACT_APP_URL}/detail/links` , {
        method : 'PATCH' ,
        headers : {
            'Content-Type' : 'application/json' ,
            'Authorization' : `Bearer ${jwtToken}`
        } ,
        body : JSON.stringify({links : data})
    })

    if (!response.ok) {
        const error = new Error('Error happenend') ;
        error.info = await response.json() ;
        throw error ;
    }

    const resData = await response.json() ;

    // setting up the new json web token to be handeled by the useEffect middleware :
    // for handeling the social media links (the useEffect function will do the rest in the AuthContext)

    const expiryDate = Date.now() + 15 * 24 * 60 * 60 * 1000 ;
    const token = resData.jwtToken ;
    
    localStorage.setItem('token' , token) ;
    localStorage.setItem('ExpiryToken' , expiryDate) ;

    return resData ;
}

export async function getUserProfileDetailsQuery ({profileId , jwtToken}) {
    const response = await fetch(`${REACT_APP_URL}/detail/profile/${profileId}` , {
        method : 'get' ,
        headers : {
            'Authorization' : `Bearer ${jwtToken}`
        }
    }) ;
    if (!response.ok) {
        const error = new Error('Couldnt find user profile') ;
        error.info = await response.json() ;
        throw error
    } ;

    return response.json() ;
}