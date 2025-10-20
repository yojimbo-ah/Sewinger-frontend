
export default function Button ({active , onClick , name}) {
    let CSSclass = 'bg-transparent border-none hover:text-orange-500 transition-colors duration-300' ;
    if (active) {
        CSSclass = 'bg-transparent border-none text-orange-500'
    }
    return <button className={CSSclass} onClick={onClick}>
        {name}
    </button>
}
