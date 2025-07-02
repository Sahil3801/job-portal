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

import { Burger, Button, Drawer } from "@mantine/core";
import { IconBriefcaseFilled, IconX } from "@tabler/icons-react";
import NavLinks from "./NavLinks";
import ProfileMenu from "./ProfileMenu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback } from "react";
import { getProfile } from "../../Services/ProfileService";
import { setProfile } from "../../Slices/ProfileSlice";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../../Slices/UserSlice";
import { setupResponseInterceptor } from "../../Interceptor/AxiosInterceptor";
import { useDisclosure } from "@mantine/hooks";

const links = [
  { name: "Find Jobs", url: "find-jobs" },
  { name: "Find Talent", url: "find-talent" },
  { name: "Post Job", url: "post-job/0" },
  { name: "Posted Jobs", url: "posted-jobs/0" },
  { name: "Job History", url: "job-history" },
];

const Header = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.jwt);
  const location = useLocation();
  const navigate = useNavigate();

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

  return location.pathname !== "/signup" && location.pathname !== "/login" ? (
    <div className="w-full bg-white-50 px-6 text-white h-20 flex justify-between items-center font-['poppins']">
      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        className="flex gap-1 cursor-pointer items-center"
      >
        <IconBriefcaseFilled className="h-7 w-7 text-black-950" stroke={2.5} />
        <div className="xs-mx:hidden text-3xl font-semibold text-black-950">
          HireHub
        </div>
      </div>

      {/* Navigation Links */}

      {user && <NavLinks />}

      {/* Profile & Burger Menu */}
      <div className="flex gap-3 items-center">
        {user ? (
          <ProfileMenu />
        ) : (
          <Link to="/login" className="text-white-200 hover:text-white-400">
            <Button color="black.9" variant="subtle">
              Login
            </Button>
          </Link>
        )}

        {/* Mobile Menu Button */}
        <Burger
          className="bs:hidden"
          opened={opened}
          onClick={open}
          aria-label="Toggle navigation"
          color="black"
        />

        {/* Drawer for Mobile Navigation */}
        <Drawer
          size="xs"
          overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
          position="right"
          opened={opened}
          onClose={close}
          closeButtonProps={{ icon: <IconX size={30} /> }}
          styles={{
            content: {
              backgroundColor: "white", // Set drawer background to white
            },
            header: {
              backgroundColor: "white", // Set header background to white
            },
          }}
        >
          <div className="flex flex-col gap-6 items-center">
            {links.map((link, index) => (
              <div key={index} className="h-full flex items-center">
                <div
                  className={`text-xl cursor-pointer ${
                    location.pathname.includes(link.url)
                      ? "text-black-100 font-bold"
                      : "text-black-950" // Set default text color to black
                  }`}
                  onClick={() => handleClick(link.url)}
                >
                  {link.name}
                </div>
              </div>
            ))}
          </div>
        </Drawer>
      </div>
    </div>
  ) : null;
};

export default Header;
