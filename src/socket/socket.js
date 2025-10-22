import io from 'socket.io-client' ;
const REACT_APP_URL = import.meta.env.VITE_REACT_APP_URL ;

let socket ;

export const initSocket = (token) => {
    socket = io(REACT_APP_URL , {
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
