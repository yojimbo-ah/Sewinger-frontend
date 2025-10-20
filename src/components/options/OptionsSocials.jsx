import { useContext } from "react"
import { AuthContext } from "../../Contexts/AuthContext"

export default function OptionsName () {
    const {user} = useContext(AuthContext) ;

    return <div className="border-none flex  justify-center">
        <div className="flex flex-col">
            <h2 className="mt-6 text-2xl">
                Edit your socials here
            </h2>
            
        </div>
    </div>
}