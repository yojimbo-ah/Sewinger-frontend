import { AuthContext } from "../Contexts/AuthContext"
import { useContext } from "react"

export default function FrontPage () {
    const {user} = useContext(AuthContext) ;
    console.log(user);

    return <h2>this is the front page</h2>
}