import { Link } from "react-router-dom";
import { timeAgo } from "../../Services/Utilities";

// Accept `selectedId` and `theme` from props instead of using useParams here
const PostedJobCard = ({ theme = 'dark', selectedId, ...props }) => {
  const isActive = props.id === selectedId;

  // --- STYLING FIX: Define classes based on the theme ---
  const activeClasses = {
    light: "bg-bright-sun-400 text-white",
    dark: "bg-bright-sun-400 text-white", // Active state can be the same for both
  };

  const inactiveClasses = {
    light: "bg-gray-100 hover:bg-gray-200 text-gray-700", // Light theme: light BG, dark text
    dark: "bg-mine-shaft-900 hover:bg-mine-shaft-800 text-mine-shaft-300", // Dark theme: dark BG, light text
  };

  const cardClasses = isActive ? activeClasses[theme] : inactiveClasses[theme];

  return (
    <Link
      data-aos="fade-up"
      to={`/posted-jobs/${props.id}`}
      className={`rounded-xl p-3 w-52 lg-mx:w-48 bs-mx:w-full border-l-4 cursor-pointer transition-colors duration-200 border-l-bright-sun-400 ${cardClasses}`}
    >
      <div className="text-sm font-semibold truncate">{props.jobTitle}</div>
      <div className="text-xs font-medium">{props.location}</div>
      <div className="text-xs">
        {props.jobStatus === "DRAFT" ? "Drafted" : props.jobStatus === "CLOSED" ? "Closed" : "Posted"}{" "}
        {timeAgo(props.postTime)}
      </div>
    </Link>
  );
};

export default PostedJobCard;

// import { Link, useParams } from "react-router-dom";
// import { timeAgo } from "../../Services/Utilities";

// const PostedJobCard = (props) => {
//     const { id } = useParams();
    
//     return (
//         <Link
//             data-aos="fade-up"
//             to={`/posted-jobs/${props.id}`}
//             className={`rounded-xl p-3 w-52 lg-mx:w-48 bs-mx:w-full border-l-4 hover:bg-opacity-80 cursor-pointer border-l-bright-sun-400 ${props.id === id ? "bg-bright-sun-400 text-black" : "bg-mine-shaft-900 text-mine-shaft-300"}`}
//         >
//             <div className={`text-sm font-semibold`}>{props.jobTitle}</div>
//             <div className="text-xs font-medium">{props.location}</div>
//             <div className="text-xs">
//                 {props.jobStatus === "DRAFT" ? "Drafted" : props.jobStatus === "CLOSED" ? "Closed" : "Posted"} {timeAgo(props.postTime)}
//             </div>
//         </Link>
//     );
// };

// export default PostedJobCard;
