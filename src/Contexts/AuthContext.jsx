import { createContext } from "react"

const AuthContext = createContext({
    token : undefined  ,
    login : () => {} ,
    logout : () => {} ,
    setSellerRequestToTrue : () => {} ,
    user : undefined ,
    loading : undefined
})

export {AuthContext}