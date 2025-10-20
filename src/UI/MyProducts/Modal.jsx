import { forwardRef , useRef , useImperativeHandle} from "react"


const Modal = forwardRef(({content , children} , ref) => {

    const modalRef = useRef()
    useImperativeHandle(ref, () => ({
        open: () => modalRef.current.showModal(),
        close: () => modalRef.current.close()
    }));

    return <dialog ref={modalRef} className="w-2/3 h-2/3 shadow-xl" >
        {children}
    </dialog>
})

export default Modal ;