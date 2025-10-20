import { useState, useRef, useEffect , useContext} from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import Modal from "../Modal";
import AccountMenuLink from "./AccoutMenuLink";
import { ShoppingCart , Shield , Package , Pen , LogOut , CircleUser , LogIn} from "lucide-react";

export default function AccountMenu() {

  const {user , loading} = useContext(AuthContext) ;
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  const modelRef = useRef() ;

  console.log(user) ;
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center justify-between gap-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
          isOpen ? 'text-orange-500' : 'text-black hover:text-orange-500'
        }`}
      >
        <span>{user.lastName} {user.firstName}</span>
        <span>{!user.profileImage && <CircleUser />}{user.profileImage && <img src={user.profileImage} 
          className="w-12 h-12 rounded-full aspect-square"
        />}</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <ul className="flex flex-col py-2">
            {user.power === 'admin' &&  <li>
              <AccountMenuLink icon={<Shield />} name='Admin' link='/admin/sellerVer' />
            </li>}
            <li>
              <AccountMenuLink icon={<Pen />} name='My products' link='/myProducts/posted' />
            </li>
            <li>
              <AccountMenuLink icon={<ShoppingCart />} name='Cart' link='/cart' />
            </li>
            <li>
              <AccountMenuLink icon={<Package />} name='Orders' link='/orders' />
            </li>
            <li>
              <button
                onClick={() => modelRef.current.open()}
                className="flex justify-between items-center w-full px-4 py-2 transition-colors duration-300 hover:bg-gray-100 hover:text-orange-500"
              >
                <span>Logout</span>
                <span><LogOut /></span>
              </button>
            </li>
          </ul>
        </div>
      )}
    <Modal ref={modelRef}/>
    </div>
  );
}