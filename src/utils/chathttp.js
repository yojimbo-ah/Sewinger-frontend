const REACT_APP_URL = import.meta.env.REACT_APP_URL ;

export async function getfriendsQuery ({jwtToken}) {
    const response = await fetch (`${REACT_APP_URL}/friend` , {
        method : 'GET' ,
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

export async function getUserGroupChats ({jwtToken}) {
    const response = await fetch(`${REACT_APP_URL}/chat/public` , {
        method : 'GET' ,
        headers : {
            'Authorization' : `Bearer ${jwtToken}`
        }
    })

    if (!response.ok) {
        const error = new Error('Error happned') ;
        error.info = await response.json() ;
        throw error
    }
    
    return await response.json() ;
}

export async function getChatGroup ({jwtToken , chatId}) {
    const response = await fetch(`${REACT_APP_URL}/chat/public/${chatId}` , {
        method : 'GET' ,
        headers : {
            'Authorization' : `Bearer ${jwtToken}`
        }
    }) ;

    if (!response.ok) {
        const error = new Error('error happened') ;
        error.info = await response.json() ;
        throw error
    }

    return await response.json() ;
}

export async function getUserChat ({jwtToken , friendId}) {
    const response = await fetch(`${REACT_APP_URL}/chat/private/${friendId}` , {
        method : 'GET' ,
        headers : {
            'Authorization' : `Bearer ${jwtToken}`
        }
    })

    if (!response.ok) {
        const error = new Error('Error happened cant continue') ;
        error.info = await response.json() ;
        throw error ;
    }
    
    return await response.json() ;
}


export async function getUserPendingRequests ({jwtToken}) {
    const response = await fetch(`${REACT_APP_URL}/friend/requests/pending` , {
        method : 'GET' ,
        headers : {
            'Authorization' : `Bearer ${jwtToken}`
        }
    })

    if (!response.ok) {
        const error = new Error('Error happened , ooops') ;
        error.info = await response.json() ;
        throw error ;
    }

    return await response.json() ;
}


export async function getUserFriendRequests ({jwtToken}) {
    const response = await fetch(`${REACT_APP_URL}/friend/requests` , {
        method : 'GET' ,
        headers : {
            'Authorization' : `Bearer ${jwtToken}`
        }
    }) ;

    if (!response.ok) {
        const error = new Error('Error happened , ooops') ;
        error.info = await response.json() ;
        throw error ;
    }

    return await response.json() ;
}


export async function deleteFriendMutation ({jwtToken , friendId}) {
    const response = await fetch (`${REACT_APP_URL}/friend/delete` , {
        method : 'DELETE' ,
        headers : {
            'Content-Type' : 'application/json' ,
            'Authorization' : `Bearer ${jwtToken}`
        } ,
        body : JSON.stringify({friendId : friendId})
    }) ;

    if (!response.ok) {
        const error = new Error('Error happened') ;
        error.info = await response.json() ;
        throw error ;
    }

    return await response.json() ;

}

export async function approveFriendRequest ({jwtToken , friendId , approve}) {
    const response = await fetch (`${REACT_APP_URL}/friend/approve` , {
        method : 'PUT' ,
        headers : {
            'Content-Type' : 'application/json' ,
            'Authorization' : `Bearer ${jwtToken}`
        } ,
        body : JSON.stringify({
            friendId : friendId ,
            approve : approve
        })
    }) ;

    if (!response.ok) {
        const error = new Error('Error happened') ;
        error.info = await response.json() ;
        throw error ;
    }

    return await response.json() ;
}

export async function deleteFriendRequestMutation ({jwtToken , friendId}) {
    const response = await fetch (`${REACT_APP_URL}/friend/delete/request` , {
        method : 'DELETE' ,
        headers : {
            'Content-Type' : 'application/json' ,
            'Authorization' : `Bearer ${jwtToken}`
        } ,
        body : JSON.stringify({friendId : friendId})
    }) ;

    if (!response.ok) {
        const error = new Error('Errror happened') ;
        error.info = await response.json() ;
        throw error ;
    }

    return response.json() ;
}


export async function addFriendReqeustMutation ({jwtToken , friendId}) {
    const response = await fetch (`${REACT_APP_URL}/friend/create` , {
        method : 'POST' ,
        headers : {
            'Content-Type' : 'application/json' ,
            'Authorization' : `Bearer ${jwtToken}`
        } ,
        body : JSON.stringify({friendId : friendId})
    }) ;

    if (!response.ok) {
        const error = new Error('Error happenned') ;
        error.info = await response.json() ;
        throw error ;
    }
    return await response.json() ;
}


export async function getUsers ({jwtToken , tag}) {
    const response = await fetch (`${REACT_APP_URL}/friend/users` , {
        method : 'PUT' ,
        headers : {
            "Authorization" : `Bearer ${jwtToken}` ,
            'Content-Type' : 'application/json'
        } ,
        body : JSON.stringify({tag : tag})
    })

    if (!response.ok) {
        const error = new Error('Error happened') ;
        error.info = await response.json() ;
        throw error ;
    }

    return await response.json() ;
}

export async function createGroupMutation ({jwtToken , friendGroups , name , image}) {

    const formData = new FormData () ;
    formData.append('name' , name) ;
    friendGroups.forEach(friend => {
        formData.append('friendGroups[]' , friend) ;
    })
    formData.append('image' , image) ;

    const response = await fetch(`${REACT_APP_URL}/chat/message/public` ,{
        method : 'PUT' ,
        headers : {
            'Authorization' : `Bearer ${jwtToken}`
        } ,
        body : formData
    })

    if (!response.ok) {
        const error = new Error('Error happened') ;
        error.info = await response.json() ;
        throw error ;
    }

    return await response.json() ;
}

export async function editGroupChatMutation ({jwtToken , name , image}) {
    const formData = new FormData() ;
    formData.append('name' , name) ;
    formData.append('image' , image) ;

    const response = await fetch(`${REACT_APP_URL}/chat/public` , {
        method : 'PATCH' ,
        headers : {
            'Authorization' : `Bearer ${jwtToken}`
        } ,
        body : formData
    })

    if (!response.ok) {
        const error = new Error('Error happened') ;
        error.info = await response.json() ;
        throw error ;
    }

    return await response.json() ;
}


export async function imagesToPublicMutations ({jwtToken , images , chatId}) {
    const formData = new FormData() ;
    formData.append('chatId' , chatId) ;
    images.forEach(image => {
        formData.append('images' , image) ;
    })
    const response = await fetch (`${REACT_APP_URL}/chat/images/public` , {
        method : 'POST' ,
        headers : {
            'Authorization' : `Bearer ${jwtToken}`
        } ,
        body : formData
    })
    
    if (!response.ok) {
        const error = new Error('Error happened') ;
        error.info = await response.json() ;
        throw error ;
    }
    return response.json() ;
}