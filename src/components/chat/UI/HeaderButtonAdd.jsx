


export default function HeaderButtonAdd ({onClick , icon , text}) {

    return <button className="hover:text-orange-500 transition-colors duration-200 flex gap-2" onClick={onClick}>
        {icon} {text}
    </button>
}