import { NavLink } from "react-router-dom"

export default function HeaderLink({ link, children, icon, direction }) {
    const baseClasses = "flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ease-in-out"
    const activeClasses = "text-orange-500 bg-orange-50"
    const inactiveClasses = "text-gray-700 hover:text-orange-500 hover:bg-orange-50"

    if (direction === 'right') {
        return (
            <NavLink 
                to={link} 
                className={({ isActive }) => 
                    `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
                }
            >
                {children && <span className="whitespace-nowrap">{children}</span>}
                <span className="flex-shrink-0">{icon}</span>
            </NavLink>
        )
    }

    return (
        <NavLink 
            to={link} 
            className={({ isActive }) => 
                `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
            }
        >
            <span className="flex-shrink-0">{icon}</span>
            {children && <span className="whitespace-nowrap">{children}</span>}
        </NavLink>
    )
}