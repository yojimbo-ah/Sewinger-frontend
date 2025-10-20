

export default function ButtonText ({name , handleClick , type }) {
    if (type === 'button') {
        return <button type={type} onClick={handleClick} className="hover:text-orange-400 transition-colors duration-300">
        {name}
    </button>
    }
    return <button onClick={handleClick} className="hover:text-orange-400 transition-colors duration-300">
        {name}
    </button>
}