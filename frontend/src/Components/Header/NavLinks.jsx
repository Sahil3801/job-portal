import { Link, useLocation } from "react-router-dom";

const NavLinks = () => {
  const links = [
    { name: "Find Jobs", url: "find-jobs" },
    { name: "Find Talent", url: "find-talent" },
    { name: "Post Job", url: "post-job/0" },
    { name: "Posted Jobs", url: "posted-jobs/0" },
    { name: "Job History", url: "job-history" },
  ];
  const location = useLocation();
  return (
    <div className="flex bs-mx:!hidden gap-5 text-black-750 h-full items-center">
      {links.map((link, index) => (
        <div
          key={index}
          className={`${
            location.pathname === "/" + link.url
              ? "border-white-800 text-black-800"
              : "border-transparent text-black-950"
          } border-t-[3px] h-full flex items-center`}
        >
          <Link className=" hover:text-white-400 " key={index} to={link.url}>
            {link.name}
          </Link>
        </div>
      ))}
    </div>
  );
};
export default NavLinks;

// import { Link, useLocation } from "react-router-dom";

// const NavLinks = () => {
//   const links = [
//     { name: "Find Jobs", url: "/find-jobs" },
//     { name: "Find Talent", url: "/find-talent" },
//     { name: "Post Job", url: "/post-job/0" },
//     { name: "Posted Jobs", url: "/posted-jobs/0" },
//     { name: "Job History", url: "/job-history" },
//   ];

//   const location = useLocation();

//   return (
//     <div className="flex bs-mx:!hidden gap-7 text-black-950 h-full items-center">
//       {links.map((link, index) => (
//         <div
//           key={index}
//           className={`${
//             location.pathname.includes(link.url)
//               ? "font-semibold text-black-900 border-b-[2px] border-black-500"
//               : "text-gray-600"
//           } h-full flex items-center`}
//         >
//           <Link className="hover:text-black-700 px-3 py-2" to={link.url}>
//             {link.name}
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default NavLinks;
