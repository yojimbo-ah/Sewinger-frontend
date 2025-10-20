import { useNavigate } from "react-router-dom"



export default function HeaderButton ({icon , text , to}) {
    const navigate = useNavigate() ;
    let CSSclass = "hover:text-orange-500 transition-colors duration-200 flex gap-2"

    return <button onClick={() => {
        navigate(to) ;
    }}
    className={CSSclass} >
        {icon} {text}
    </button>
}