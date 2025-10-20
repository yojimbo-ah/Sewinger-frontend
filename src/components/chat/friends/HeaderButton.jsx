


export default function HeaderButton ({text , icon , changePage , pageChanger , currentPage}) {
    let CSSclass = "hover:text-orange-500 transition-colors duration-200 flex gap-1" ;

    if (currentPage === pageChanger) {
        CSSclass = 'text-orange-500 flex gap-1'
    }

    return <button onClick={changePage}
     className={CSSclass}>
        {icon} {text}
    </button>
}