import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const DreamJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState("");
  const [type, setType] = useState("");

  // const handleClick = () => {
  //   dispatch(
  //     updateFilter({
  //       "Job Title": jobTitle ? [jobTitle] : null,
  //       "Job Type": type ? [type] : null,
  //       page: 1,
  //     })
  //   );
  //   navigate("/find-jobs");
  // };

  return (
    // className="flex sm-mx:flex-col-reverse items-center justify-center text-center px-16 bs-mx:px-10 md-mx:px-5 "
    // <div className="flex flex-col-reverse sm:flex-row items-center justify-center text-center px-5 sm:px-10 lg:px-16">
    //   <div className="flex flex-col w-[45%] sm-mx:w-full gap-3">
    //     <div className="text-6xl bs-mx:text-5xl md-mx:text-4xl sm-mx:text-3xl font-bold leading-tight text-white-700 [&>span]:text-bright-black-400">
    //       <span className="block">Connecting Talent,</span>
    //       <span className="block">Creating Future</span>{" "}
    //     </div>
    //     <div className="text-lg md-mx:text-base sm-mx:text-sm text-white-600">
    //       Good life begins with a good company. Start exploring thousands of
    //       jobs in one place.
    //     </div>
    //     <div className="flex gap-3 mt-5 items-center">
    //       <div className="flex items-center justify-center h-full w-20 bg-bright-black-200 text-white-100 rounded-lg p-2 hover:bg-bright-black-500 cursor-pointer"></div>
    //     </div>
    //   </div>
    // </div>
    <div className="flex flex-col-reverse sm:flex-row items-center justify-center text-center px-5 sm:px-10 lg:px-16">
      <div className="flex flex-col gap-3 w-full sm:w-[45%]">
        <div className="text-6xl sm:text-7xl font-bold leading-tight text-white-700">
          <span className="block">Connecting Talent,</span>
          <span className="block">Creating Future</span>
        </div>
        <div className="text-lg sm:text-sm text-white-600">
          Good life begins with a good company. Start exploring thousands of
          jobs in one place.
        </div>
      </div>
    </div>
  );
};

export default DreamJob;
