
import { Burger, Button, Divider, Drawer } from "@mantine/core";
import { IconBriefcaseFilled, IconLogout2, IconUserCircle } from "@tabler/icons-react";
import NavLinks from "./NavLinks";
import ProfileMenu from "./ProfileMenu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback } from "react";
import { getProfile } from "../../Services/ProfileService";
import { setProfile } from "../../Slices/ProfileSlice";
import { jwtDecode } from "jwt-decode";
import { removeUser, setUser } from "../../Slices/UserSlice";
import { removeJwt } from "../../Slices/JwtSlice";
import { setupResponseInterceptor } from "../../Interceptor/AxiosInterceptor";
import { useDisclosure } from "@mantine/hooks";
import { getNavLinks, isActiveLink } from "./navConfig";

const Header = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.jwt);
  const location = useLocation();
  const navigate = useNavigate();
  const links = getNavLinks(user?.accountType);

  // Setup Axios Interceptor once on component mount
  useEffect(() => {
    setupResponseInterceptor(navigate, dispatch);
  }, [navigate, dispatch]);

  // Function to handle navigation inside Drawer
  const handleClick = useCallback(
    (url) => {
      navigate(url);
      close();
    },
    [navigate, close]
  );

  const handleLogout = () => {
    close();
    dispatch(removeUser());
    dispatch(removeJwt());
  };

  // Decode token and fetch profile
  useEffect(() => {
    if (token && localStorage.getItem("token")) {
      const decoded = jwtDecode(localStorage.getItem("token"));
      dispatch(setUser({ ...decoded, email: decoded.sub }));
    }

    if (user?.profileId) {
      getProfile(user.profileId)
        .then((res) => dispatch(setProfile(res)))
        .catch((err) => console.log(err));
    }
  }, [token, dispatch, user?.profileId]);

  const drawerItemClass = (active) =>
    `w-full text-left text-lg px-4 py-3 rounded-lg ${
      active
        ? "bg-bright-sun-50 text-bright-sun-400 font-semibold"
        : "text-mine-shaft-100 hover:bg-mine-shaft-900"
    }`;

  return location.pathname !== "/signup" && location.pathname !== "/login" ? (
    <header className="w-full bg-white border-b border-mine-shaft-700 px-6 xs-mx:px-4 h-20 flex justify-between items-center font-['poppins']">
      {/* Logo */}
      <Link to="/" className="flex gap-1 items-center text-mine-shaft-50">
        <IconBriefcaseFilled className="h-7 w-7 text-bright-sun-400" stroke={2.5} />
        <span className="text-3xl xs-mx:text-2xl font-semibold">HireHub</span>
      </Link>

      {/* Navigation Links */}
      {user && <NavLinks />}

      {/* Profile & Burger Menu */}
      <div className="flex gap-3 items-center">
        {user ? (
          <ProfileMenu />
        ) : (
          <Button component={Link} to="/login" variant="filled">
            Login
          </Button>
        )}

        {/* Mobile Menu Button: only useful when there are links to show */}
        {user && (
          <Burger
            className="bs:hidden"
            opened={opened}
            onClick={open}
            aria-label="Open navigation menu"
          />
        )}

        {/* Drawer for Mobile Navigation */}
        <Drawer
          size="xs"
          overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
          position="right"
          opened={opened}
          onClose={close}
          title={<span className="text-lg font-semibold">Menu</span>}
        >
          <nav className="flex flex-col gap-1">
            {links.map((link) => {
              const active = isActiveLink(location.pathname, link.url);
              return (
                <button
                  key={link.url}
                  className={drawerItemClass(active)}
                  aria-current={active ? "page" : undefined}
                  onClick={() => handleClick(link.url)}
                >
                  {link.name}
                </button>
              );
            })}
            <Divider my="sm" />
            <button
              className={`${drawerItemClass(location.pathname === "/profile")} flex items-center gap-2`}
              onClick={() => handleClick("/profile")}
            >
              <IconUserCircle size={20} /> Profile
            </button>
            <button
              className={`${drawerItemClass(false)} flex items-center gap-2`}
              onClick={handleLogout}
            >
              <IconLogout2 size={20} /> Logout
            </button>
          </nav>
        </Drawer>
      </div>
    </header>
  ) : null;
};

export default Header;



// import { Avatar, Burger, Button, Drawer } from "@mantine/core";
// import { IconBriefcaseFilled, IconSettings, IconX } from "@tabler/icons-react";
// import NavLinks from "./NavLinks";
// import ProfileMenu from "./ProfileMenu";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useCallback } from "react";
// import { getProfile } from "../../Services/ProfileService";
// import { setProfile } from "../../Slices/ProfileSlice";
// import { jwtDecode } from "jwt-decode";
// import { setUser } from "../../Slices/UserSlice";
// import { setupResponseInterceptor } from "../../Interceptor/AxiosInterceptor";
// import { useDisclosure } from "@mantine/hooks";
// import NotiMenu from "./NotiMenu";

// const links = [
//   { name: "Find Jobs", url: "find-jobs" },
//   { name: "Find Talent", url: "find-talent" },
//   { name: "Post Job", url: "post-job/0" },
//   { name: "Posted Jobs", url: "posted-jobs/0" },
//   { name: "Job History", url: "job-history" },
// ];

// const Header = () => {
//   const [opened, { open, close }] = useDisclosure(false);
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user);
//   const token = useSelector((state) => state.jwt);
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Setup Axios Interceptor once on component mount
//   useEffect(() => {
//     setupResponseInterceptor(navigate, dispatch);
//   }, [navigate, dispatch]);
//   // Function to handle navigation inside Drawer
//   const handleClick = useCallback(
//     (url) => {
//       navigate(url);
//       close();
//     },
//     [navigate, close]
//   );
//   // Decode token and fetch profile
//   useEffect(() => {
//     if (token && localStorage.getItem("token")) {
//       const decoded = jwtDecode(localStorage.getItem("token"));
//       dispatch(setUser({ ...decoded, email: decoded.sub }));
//     }

//     if (user?.profileId) {
//       getProfile(user.profileId)
//         .then((res) => dispatch(setProfile(res)))
//         .catch((err) => console.log(err));
//     }
//   }, [token, navigate, dispatch, user?.profileId]);

//   // // Handle navigation from drawer menu
//   // const handleClick = (url) => {
//   //   close(); // Close the drawer before navigating
//   //   navigate(url);
//   // };

//   return location.pathname !== "/signup" && location.pathname !== "/login" ? (
//     <div className="w-full bg-white-50 px-6 text-white h-20 flex justify-between items-center font-['poppins']">
//       {/* Logo */}
//       <div
//         onClick={() => navigate("/")}
//         className="flex gap-1 cursor-pointer items-center"
//       >
//         <IconBriefcaseFilled className="h-7 w-7 text-black-950" stroke={2.5} />
//         <div className="xs-mx:hidden text-3xl font-semibold text-black-950">
//           HireHub
//         </div>
//       </div>

//       {/* Navigation Links */}
//       <NavLinks />

//       {/* Profile & Burger Menu */}
//       <div className="flex gap-3 items-center">
//         {user ? (
//           <ProfileMenu />
//         ) : (
//           <Link
//             to="/login"
//             className="text-white-200 hover:text-white-400"
//           >
//             <Button color="black" variant="subtle">
//               Login
//             </Button>
//           </Link>
//         )}

//         {/* Mobile Menu Button */}
//         <Burger
//           className="bs:hidden"
//           opened={opened}
//           onClick={open}
//           aria-label="Toggle navigation"
//           color="black"
//         />

//         {/* Drawer for Mobile Navigation */}
//         <Drawer
//           size="xs"
//           overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
//           position="right"
//           opened={opened}
//           onClose={close}
//           closeButtonProps={{ icon: <IconX size={30} /> }}
//         >
//           <div className="flex flex-col gap-6 items-center">
//             {links.map((link, index) => (
//               <div key={index} className="h-full flex items-center">
//                 <div
//                   className={`text-xl cursor-pointer ${
//                     location.pathname.includes(link.url)
//                       ? "text-blue-500 font-bold"
//                       : ""
//                   }`}
//                   onClick={() => handleClick(link.url)}
//                 >
//                   {link.name}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Drawer>
//       </div>
//     </div>

//   ) : null;
// };

// export default Header;

//////////////////////////////////////////////////////////////////////
