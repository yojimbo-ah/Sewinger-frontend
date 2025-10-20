import io from 'socket.io-client' ;

let socket ;

export const initSocket = (token) => {
    socket = io('http://localhost:3000' , {
        auth : {token} ,
        autoConnect : true
    })

    socket.on('connect' , () => {
        console.log('Connected')
    })
} 

export function getSocket () {
    return socket ;
}
