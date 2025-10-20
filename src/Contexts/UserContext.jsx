import {  useState , useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { initSocket } from "../socket/socket";

function AuthProvider ({children}) {
    const [token , setToken] = useState(undefined) ;
    const [user , setUser] = useState({
        firstName : undefined ,
        lastName : undefined ,
        email : undefined , 
        profileImage : undefined ,
        id : undefined ,
        power : undefined ,
        sentRequest : false
    })
    const [loading , setLoading] = useState(true) ;

    function setUserUndefined () {
        setUser(() => {
            return {
                firstName : undefined ,
                lastName : undefined ,
                email : undefined , 
                id : undefined ,
                power : undefined ,
                sentRequest : undefined  ,
                profileImage : undefined
            }
        })
    }

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const expiryDate = localStorage.getItem('ExpiryToken');

        if (storedToken && expiryDate && Date.now() < Number(expiryDate)) {
            setToken(storedToken);
        } else {
            setToken(null) ;
        }
    }, []);


    useEffect(() => {
        async function reseting () {

            if (token === undefined) return ;
            if (token === null) {
                setLoading(false) ;
                return ;
            }

            if (token) {
                const ExpiryDate = localStorage.getItem('ExpiryToken') ;
                if (Date.now() > Number(ExpiryDate)) {
                    logout() ;
                    setLoading(false)
                    return ;
                }
                const response = await fetch('http://localhost:3000/account/jwtVer' , {
                    method : 'POST' ,
                    headers : {
                        'Content-Type' : 'application/json' ,
                        'Authorization' : `Bearer ${token}`
                    } 
                })

                if (!response.ok) {
                    logout() ;
                    setLoading(false) ;
                    return ;
                }

                const data = await response.json() ;
                if (!data.valid) {
                    logout() ;
                    setLoading(false);
                    return ;
                }

                //joining ths user room in the backend
                initSocket(token) ;
                setUser({
                    email : data.user.email ,
                    firstName : data.user.name.firstName ,
                    lastName : data.user.name.lastName ,
                    id : data.user.id ,
                    power : data.user.power ,
                    sentRequest : data.user.sentRequest ,
                    profileImage : data.user.profileImage
                })
                setLoading(false) ;
            } else {
                logout() ;
                setLoading(false) ;
                return ;
            }
        }
        reseting() ;
    } , [token]) ;

    function login ({token , user }) {
        setToken(token);
        setUser({...user}) ;
    }

    function logout () {
        setToken(null) ;
        setUserUndefined();
        localStorage.removeItem('ExpiryToken') ;
        localStorage.removeItem('token') ;
    }

    function setSellerRequestToTrue () {
        setUser((prev) => {
            return {
                ...prev ,
                sentRequest : true
            }
        })
    }


    const authContext = {
        token : token  ,
        login : login ,
        logout : logout ,
        setSellerRequestToTrue : setSellerRequestToTrue ,
        user : user ,
        loading : loading
    }

    return <AuthContext.Provider value={authContext} >
        {children}
    </AuthContext.Provider>
}

export {AuthProvider}

