import HeaderLink from './HeaderLink'
import { Outlet, Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../Contexts/AuthContext'
import AccountMenu from './accountMenu/AccountMenu'
import Modal from './Modal'
import { useRef } from 'react'
import { Store, CircleEllipsis, LineSquiggle, LogIn, MessageCircleMore, BookUser, Menu, X } from 'lucide-react'

export default function Header() {
  const modelRef = useRef()
  const { token } = useContext(AuthContext)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="h-full w-full">
      <div className="bg-white items-center h-16 md:h-20 fixed w-full z-50 flex flex-row border-b-2 border-b-black shadow-lg">
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center pl-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-orange-50 rounded-lg transition-colors duration-200"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Desktop Left Links */}
        <div className="hidden md:flex basis-1/4 justify-start items-center pl-4">
          <HeaderLink direction="left" icon={<Store />} link="/shop">
            shop
          </HeaderLink>
          <HeaderLink direction="left" icon={<LineSquiggle />} link="/patterns">
            Patterns
          </HeaderLink>
          <HeaderLink direction="left" icon={<MessageCircleMore />} link="/chat/private">
            Chat
          </HeaderLink>
          <HeaderLink direction="left" icon={<BookUser />} link="/friends">
            Friends
          </HeaderLink>
        </div>

        {/* Logo - Hidden on mobile */}
        <div className="hidden md:flex basis-1/2 justify-center items-center text-4xl hover:text-3xl transition-all duration-500">
          <Link to="/">
            <span className="text-orange-500">Sew</span>inger
          </Link>
        </div>

        {/* Right side - Always visible */}
        <div className="flex-1 md:basis-1/4 flex justify-end items-center pr-4 gap-2 md:gap-4">
          <div className="flex items-center">
            {!token && (
              <HeaderLink direction="right" icon={<LogIn />} link="/account/signup">
                <span className="hidden sm:inline">connect</span>
              </HeaderLink>
            )}
            {token && <AccountMenu />}
          </div>
          <div className="flex items-center">
            <HeaderLink link="/options" icon={<CircleEllipsis />} />
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-white border-b-2 border-gray-200 shadow-lg z-40 animate-slide-down">
          <div className="flex flex-col py-2">
            <div className="px-4 py-3 hover:bg-orange-50 transition-colors duration-200" onClick={() => setMobileMenuOpen(false)}>
              <HeaderLink direction="left" icon={<Store />} link="/shop">
                Shop
              </HeaderLink>
            </div>
            <div className="px-4 py-3 hover:bg-orange-50 transition-colors duration-200" onClick={() => setMobileMenuOpen(false)}>
              <HeaderLink direction="left" icon={<LineSquiggle />} link="/patterns">
                Patterns
              </HeaderLink>
            </div>
            <div className="px-4 py-3 hover:bg-orange-50 transition-colors duration-200" onClick={() => setMobileMenuOpen(false)}>
              <HeaderLink direction="left" icon={<MessageCircleMore />} link="/chat/private">
                Chat
              </HeaderLink>
            </div>
            <div className="px-4 py-3 hover:bg-orange-50 transition-colors duration-200" onClick={() => setMobileMenuOpen(false)}>
              <HeaderLink direction="left" icon={<BookUser />} link="/friends">
                Friends
              </HeaderLink>
            </div>
          </div>
        </div>
      )}

      <Modal ref={modelRef} />

      <div className="pt-16 md:pt-24 h-[calc(100vh-64px)] md:h-[calc(100vh-80px)]">
        <Outlet />
      </div>
    </div>
  )
}