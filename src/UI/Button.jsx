
export default function Button ({ handleClick , name , disable}) {
    let CSSclass = 'w-24 mr-6 mb-6 h-10 text-xl rounded  transition-colors duration-300 ease-in-out bg-orange-300 shadow-lg'
    if (!disable) {
        CSSclass += ' hover:text-orange-300 hover:bg-black hover:shadow-xl'
    }

    return <button disabled={disable} onClick={handleClick} 
    className={CSSclass}> 
        {name}
    </button>
}