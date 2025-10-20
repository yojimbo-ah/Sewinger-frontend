
import React, { forwardRef, useImperativeHandle, useRef , useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';


const Modal = forwardRef((props, ref) => {
  const {logout} = useContext(AuthContext) ;
  const modalRef = useRef()
  useImperativeHandle(ref, () => ({
    open: () => modalRef.current.showModal(),
    close: () => modalRef.current.close()
  }));


  return (
<dialog ref={modalRef} className="w-[calc(50%)] h-[calc(40%)]">
  <div className="bg-white p-6 rounded-lg flex flex-col shadow-lg h-full">
    <h2>do you wanna logout ?</h2>
    <div className="flex justify-end gap-2 mt-auto">
      <button
        className="px-4 py-2 hover:text-orange-500 transition-colors duration-300"
        onClick={() => modalRef.current.close()}
      >
        Close
      </button>
      <button onClick={() => {
        logout() ;
        modalRef.current.close();
      }}
      className="px-4 py-2 bg-orange-500 hover:bg-black hover:text-orange-500 transition-colors duration-300">
        Logout
      </button>
    </div>
  </div>
</dialog>

  );
});

export default Modal;