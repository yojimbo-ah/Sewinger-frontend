
export function isEmail (value) {
    return value.trim().includes('@') ;
}

export function isEmpty (value) {
    return value.trim().length === 0 ;
}

export function isLength (value , min , max) {
    return value.trim().length >= min && value.trim().length <= max
}

export function validPrice (price) {

    const str = price.toString() ;
    const parts = str.split(".") ;
    if (parts.length === 1) return true ;
    const rightSide = parts[1] ;
    const rightSideLength = rightSide.length ;

    if (rightSideLength <= 2) {
        return true ;
    } else {
        return false ;
    }
}
