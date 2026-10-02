import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getNavLinks, isActiveLink } from "./navConfig";

const NavLinks = () => {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const links = getNavLinks(user?.accountType);

  return (
    <nav className="flex bs-mx:!hidden gap-8 h-full items-center">
      {links.map((link) => {
        const active = isActiveLink(location.pathname, link.url);
        return (
          <Link
            key={link.url}
            to={link.url}
            aria-current={active ? "page" : undefined}
            className={`h-full flex items-center border-b-[3px] pt-[3px] transition-colors ${
              active
                ? "border-bright-sun-400 text-bright-sun-400 font-semibold"
                : "border-transparent text-mine-shaft-200 hover:text-bright-sun-400"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavLinks;
