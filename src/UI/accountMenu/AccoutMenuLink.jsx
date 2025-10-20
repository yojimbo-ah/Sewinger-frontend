import { NavLink } from "react-router-dom";

export default function AccountMenuLink({ name, link, icon }) {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        isActive
          ? "text-orange-500 flex justify-between items-center px-4 py-2 bg-gray-100"
          : "hover:text-orange-500 transition-colors duration-300 flex justify-between items-center px-4 py-2 hover:bg-gray-100"
      }
    >
      <span>{name}</span>
      <span>{icon}</span>
    </NavLink>
  );
}
