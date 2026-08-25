import { Badge, Tabs } from "@mantine/core";
import Job from "../JobDesc/Job";
import TalentCard from "../FindTalent/TalentCard";
import { useEffect, useMemo, useState } from "react";

const PostedJobDesc = (props) => {
  const [tab, setTab] = useState("overview");

  // --- FIX 1: Performance - Memoize the filtered applicant lists ---
  // This logic now only runs when props.applicants changes, not on every tab click.
  const applicantLists = useMemo(() => {
    const applicants = props.applicants || [];
    return {
      APPLIED: applicants.filter((x) => x.applicationStatus === "APPLIED"),
      INTERVIEWING: applicants.filter((x) => x.applicationStatus === "INTERVIEWING"),
      OFFERED: applicants.filter((x) => x.applicationStatus === "OFFERED"),
      REJECTED: applicants.filter((x) => x.applicationStatus === "REJECTED"),
    };
  }, [props.applicants]);

  // --- FIX 2: Refined useEffect dependency ---
  // This now only resets the tab to overview when the job actually changes.
  useEffect(() => {
    setTab("overview");
  }, [props.jobTitle]);

  // The 'handleTab' function is no longer needed. 
  // We can pass `setTab` directly to the Tabs component's onChange.

  return (
    <div data-aos="zoom-out" className="w-3/4 md-mx:w-full px-5 md-mx:p-0">
      {props.jobTitle ? (
        <>
          <div className="text-2xl xs-mx:text-xl font-semibold flex items-center ">
            {props?.jobTitle}{" "}
            <Badge variant="light" ml="sm" color="gray" size="sm">
              {props?.jobStatus}
            </Badge>
          </div>
          <div className="font-medium xs-mx:text-sm text-mine-shaft-300 mb-5">
            {props?.location}
          </div>
          <div>
            <Tabs
              value={tab}
              onChange={setTab} // Simplified: Just update the tab state
              radius="lg"
              autoContrast
              variant="outline"
            >
              {/* Note: The styling here is hardcoded for a dark theme */}
              <Tabs.List className="font-semibold [&_button[data-active='true']]:!border-b-white-50 [&_button]:!text-xl ...">
                <Tabs.Tab value="overview">Overview</Tabs.Tab>
                <Tabs.Tab value="applicants">Applicants</Tabs.Tab>
                <Tabs.Tab value="invited">Invited</Tabs.Tab>
                <Tabs.Tab value="offered">Offered</Tabs.Tab>
                <Tabs.Tab value="rejected">Rejected</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="overview" className="[&>div]:w-full">
                <Job {...props} edit={true} closed={props.jobStatus === "CLOSED"} />
              </Tabs.Panel>
              
              {/* Simplified Panels using the memoized lists */}
              <Tabs.Panel value="applicants">
                <div className="flex mt-10 flex-wrap gap-5 justify-around">
                  {applicantLists.APPLIED.length > 0
                    ? applicantLists.APPLIED.map((talent) => (
                        <TalentCard key={talent.id} {...talent} posted={true} />
                      ))
                    : "No Applicants Yet"}
                </div>
              </Tabs.Panel>
              
              <Tabs.Panel value="invited">
                 <div className="flex mt-10 flex-wrap gap-5 justify-around">
                  {applicantLists.INTERVIEWING.length > 0
                    ? applicantLists.INTERVIEWING.map((talent) => (
                        <TalentCard key={talent.id} {...talent} invited />
                      ))
                    : "No Applicants Invited Yet"}
                </div>
              </Tabs.Panel>

              <Tabs.Panel value="offered">
                <div className="flex mt-10 flex-wrap gap-5 justify-around">
                  {applicantLists.OFFERED.length > 0
                    ? applicantLists.OFFERED.map((talent) => (
                        <TalentCard key={talent.id} {...talent} offered />
                      ))
                    : "No Applicants Offered Yet"}
                </div>
              </Tabs.Panel>

              <Tabs.Panel value="rejected">
                <div className="flex mt-10 flex-wrap gap-5 justify-around">
                  {applicantLists.REJECTED.length > 0
                    ? applicantLists.REJECTED.map((talent) => (
                        // --- FIX 3: Bug Fix ---
                        <TalentCard key={talent.id} {...talent} rejected />
                      ))
                    : "No Applicants Rejected Yet"}
                </div>
              </Tabs.Panel>
            </Tabs>
          </div>
        </>
      ) : (
        <div className="text-2xl font-semibold flex items-center justify-center min-h-[70vh]">
          Job Not Found.
        </div>
      )}
    </div>
  );
};

export default PostedJobDesc;


// import { Badge, Divider, Tabs } from "@mantine/core";
// import Job from "../JobDesc/Job";
// import TalentCard from "../FindTalent/TalentCard";
// import { useEffect, useState } from "react";

// const PostedJobDesc = (props) => {
//   const [tab, setTab] = useState("overview");
//   const [arr, setArr] = useState([]);

//   const handleTab = (value) => {
//     setTab(value);
//     if (value === "applicants")
//       setArr(
//         props.applicants?.filter((x) => x.applicationStatus === "APPLIED")
//       );
//     else if (value === "invited")
//       setArr(
//         props.applicants?.filter((x) => x.applicationStatus === "INTERVIEWING")
//       );
//     else if (value === "offered")
//       setArr(
//         props.applicants?.filter((x) => x.applicationStatus === "OFFERED")
//       );
//     else if (value === "rejected")
//       setArr(
//         props.applicants?.filter((x) => x.applicationStatus === "REJECTED")
//       );
//   };

//   useEffect(() => {
//     handleTab("overview");
//   }, [props]);

//   return (
//     <div data-aos="zoom-out" className="w-3/4 md-mx:w-full px-5 md-mx:p-0">
//       {props.jobTitle ? (
//         <>
//           <div className="text-2xl xs-mx:text-xl font-semibold flex items-center ">
//             {props?.jobTitle}{" "}
//             <Badge variant="light" ml="sm" color="black.4" size="sm">
//               {props?.jobStatus}
//             </Badge>
//           </div>
//           <div className="font-medium xs-mx:text-sm text-white-300 mb-5">
//             {props?.location}
//           </div>
//           <div>
//             <Tabs
//               value={tab}
//               onChange={handleTab}
//               radius="lg"
//               autoContrast
//               variant="outline"
//             >
//               <Tabs.List className="font-semibold [&_button[data-active='true']]:!border-b-white-50 [&_button]:!text-xl sm-mx:[&_button]:!text-lg xs-mx:[&_button]:!text-base xsm-mx:[&_button]:!text-sm xs-mx:[&_button]:!px-1.5 xs-mx:[&_button]:!py-2 mb-5 [&_button[data-active='true']]:text-bright-sun-400 xs-mx:font-medium">
//                 <Tabs.Tab value="overview">Overview</Tabs.Tab>
//                 <Tabs.Tab value="applicants">Applicants</Tabs.Tab>
//                 <Tabs.Tab value="invited">Invited</Tabs.Tab>
//                 <Tabs.Tab value="offered">Offered</Tabs.Tab>
//                 <Tabs.Tab value="rejected">Rejected</Tabs.Tab>
//               </Tabs.List>
//               <Tabs.Panel value="overview" className="[&>div]:w-full">
//                 {props.jobStatus === "CLOSED" ? (
//                   <Job {...props} edit={true} closed />
//                 ) : (
//                   <Job {...props} edit={true} />
//                 )}
//               </Tabs.Panel>
//               <Tabs.Panel value="applicants">
//                 <div className="flex mt-10 flex-wrap gap-5 justify-around">
//                   {arr?.length
//                     ? arr.map((talent, index) => (
//                         <TalentCard key={index} {...talent} posted={true} />
//                       ))
//                     : "No Applicants Yet"}
//                 </div>
//               </Tabs.Panel>
//               <Tabs.Panel value="invited">
//                 <div className="flex mt-10 flex-wrap gap-5 justify-around">
//                   {arr?.length
//                     ? arr.map((talent, index) => (
//                         <TalentCard key={index} {...talent} invited />
//                       ))
//                     : "No Applicants Invited Yet"}
//                 </div>
//               </Tabs.Panel>
//               <Tabs.Panel value="offered">
//                 <div className="flex mt-10 flex-wrap gap-5 justify-around">
//                   {arr?.length
//                     ? arr.map((talent, index) => (
//                         <TalentCard key={index} {...talent} offered />
//                       ))
//                     : "No Applicants Offered Yet"}
//                 </div>
//               </Tabs.Panel>
//               <Tabs.Panel value="rejected">
//                 <div className="flex mt-10 flex-wrap gap-5 justify-around">
//                   {arr?.length
//                     ? arr?.map((talent, index) => (
//                         <TalentCard key={index} {...talent} offered />
//                       ))
//                     : "No Applicants Rejected Yet"}
//                 </div>
//               </Tabs.Panel>
//             </Tabs>
//           </div>
//         </>
//       ) : (
//         <div className="text-2xl font-semibold flex items-center justify-center min-h-[70vh]">
//           Job Not Found.
//         </div>
//       )}
//     </div>
//   );
// };

// export default PostedJobDesc;
