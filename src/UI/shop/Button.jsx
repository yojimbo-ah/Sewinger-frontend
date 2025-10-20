


export default function Button ({name , handleClick , disable}) {
    return <button disabled={disable} onClick={handleClick} className="bg-orange-400 shadow-md transition-colors duration-300 hover:text-orange-500 hover:bg-black w-20 h-8">
        {name}
    </button>
}