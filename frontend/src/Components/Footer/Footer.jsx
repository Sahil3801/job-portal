import { IconBriefcaseFilled } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getNavLinks } from "../Header/navConfig";

const Footer = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user);

  // Only link to pages that exist and that this user is allowed to open
  const exploreLinks = user ? getNavLinks(user.accountType) : [];
  const accountLinks = user
    ? [{ name: "My Profile", url: "/profile" }]
    : [
        { name: "Login", url: "/login" },
        { name: "Sign up", url: "/signup" },
      ];
  const columns = [
    { title: "Explore", links: [{ name: "Home", url: "/" }, ...exploreLinks] },
    { title: "Account", links: accountLinks },
  ];

  return location.pathname !== "/signup" && location.pathname !== "/login" ? (
    <footer className="bg-mine-shaft-900 border-t border-mine-shaft-700">
      <div className="px-6 xs-mx:px-4 pt-14 pb-8 flex gap-10 justify-around flex-wrap">
        <div className="max-w-xs">
          <Link to="/" className="flex gap-1 items-center text-mine-shaft-50">
            <IconBriefcaseFilled className="h-6 w-6 text-bright-sun-400" stroke={2.5} />
            <span className="text-2xl font-semibold">HireHub</span>
          </Link>
          <p className="mt-3 !text-sm text-mine-shaft-300">
            Connecting talent with opportunity. Find your next job or your next hire.
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <div className="text-lg font-semibold mb-3 text-mine-shaft-50">
              {column.title}
            </div>
            <ul className="!list-none !m-0 !p-0 flex flex-col gap-2">
              {column.links.map((link) => (
                <li key={link.url} className="!ml-0">
                  <Link
                    to={link.url}
                    className="text-sm text-mine-shaft-300 hover:text-bright-sun-400 hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-mine-shaft-700 text-sm text-center text-mine-shaft-300 p-5">
        Designed by Sahil S. Shinde
      </div>
    </footer>
  ) : null;
};

export default Footer;
