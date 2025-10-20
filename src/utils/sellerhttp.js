const REACT_APP_URL = import.meta.env.REACT_APP_URL ;


export async function getUserWhoBoughtProductQuery ({jwtToken , productId}) {
    const response = await fetch(`${REACT_APP_URL}/seller/${productId}` , {
        method : 'GET' ,
        headers : {
            'Authorization' : `Bearer ${jwtToken}`
        }
    })

    if (!response.ok) {
        const error = new Error ('Couldnt copmlete task') ;
        error.info = await response.json() ;
        throw error ;
    }

    return response.json() ;
}

export async function getUserWhoBoughtMyProductSingleQuery ({jwtToken , productId , userId}) {
    const response = await fetch(`${REACT_APP_URL}/seller/details/${userId}/${productId}` ,{
        method : 'GET' ,
        headers : {
            'Authorization' : `Bearer ${jwtToken}`
        }
    }) ;

    if (!response.ok) {
        const error = new Error("Error happaned try agaon later") ;
        error.info = await response.json() ;
        throw error ;
    }

    return response.json() ;
}