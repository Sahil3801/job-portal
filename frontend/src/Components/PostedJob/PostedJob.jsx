import { Tabs } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import PostedJobCard from "./PostedJobCard";
import { useParams } from "react-router-dom";

const PostedJob = (props) => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(props.job?.jobStatus || "ACTIVE");

  useEffect(() => {
    setActiveTab(props.job?.jobStatus || "ACTIVE");
  }, [props.job]);

  const { activeJobs, draftJobs, closedJobs } = useMemo(() => {
    const activeJobs = [];
    const draftJobs = [];
    const closedJobs = [];

    for (const job of props.jobList) {
      if (job?.jobStatus === "ACTIVE") activeJobs.push(job);
      else if (job?.jobStatus === "DRAFT") draftJobs.push(job);
      else if (job?.jobStatus === "CLOSED") closedJobs.push(job);
    }

    return { activeJobs, draftJobs, closedJobs };
  }, [props.jobList]);

  // --- FIX #2: Added the missing definition for jobsToRender ---
  const jobsToRender =
    {
      ACTIVE: activeJobs,
      DRAFT: draftJobs,
      CLOSED: closedJobs,
    }[activeTab] || [];

  return (
    <div className="w-1/5 lg-mx:w-full">
      <div className="text-2xl font-semibold mb-5">Jobs</div>
      <div>
        <Tabs
          variant="pills"
          autoContrast
          value={activeTab}
          onChange={setActiveTab}
        >
          <Tabs.List className="font-medium">
            <Tabs.Tab value="ACTIVE">Active [{activeJobs.length}]</Tabs.Tab>
            <Tabs.Tab value="DRAFT">Drafts [{draftJobs.length}]</Tabs.Tab>
            <Tabs.Tab value="CLOSED">Closed [{closedJobs.length}]</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </div>
      <div className="flex flex-col flex-wrap mt-5 gap-5">
        {jobsToRender
          .sort(
            (a, b) =>
              new Date(b.postTime).getTime() - new Date(a.postTime).getTime()
          )
          .map((item) => (
            <PostedJobCard
              key={item.id}
              {...item}
              selectedId={id}
              theme="dark" // Change this to "light" if the page has a white background
            />
          ))}
      </div>
    </div>
  );
};

// --- FIX #1: Added the missing default export ---
export default PostedJob;

// import { Tabs } from "@mantine/core";
// import { useEffect, useState } from "react";
// import PostedJobCard from "./PostedJobCard";

// const PostedJob = (props) => {

//     const [activeTab, setActiveTab] = useState(props.job?.jobStatus || "ACTIVE");
    
//     useEffect(() => {
//         setActiveTab(props.job?.jobStatus || "ACTIVE");
//     }, [props.job]);

//     return (
//         <div className="w-1/5">
//             <div className="text-2xl font-semibold mb-5">Jobs</div>
//             <div>
//                 <Tabs variant="pills" autoContrast value={activeTab} onChange={setActiveTab}>
//                     <Tabs.List className="[&_button[aria-selected='false']]:bg-mine-shaft-900 font-medium">
//                         <Tabs.Tab value="ACTIVE">Active [{props.jobList.filter((job) => job?.jobStatus === "ACTIVE").length}]</Tabs.Tab>
//                         <Tabs.Tab value="DRAFT">Drafts [{props.jobList.filter((job) => job?.jobStatus === "DRAFT").length}]</Tabs.Tab>
//                         <Tabs.Tab value="CLOSED">Closed [{props.jobList.filter((job) => job?.jobStatus === "CLOSED").length}]</Tabs.Tab>
//                     </Tabs.List>
//                 </Tabs>
//             </div>
//             <div className="flex flex-col flex-wrap mt-5 gap-5">
//                 {
//                     props.jobList.filter((job) => job?.jobStatus === activeTab)
//                         .sort((a, b) => new Date(b.postTime).getTime() - new Date(a.postTime).getTime())
//                         .map((item, index) => <PostedJobCard key={index} {...item} />)
//                 }
//             </div>
//         </div>
//     );
// };

// export default PostedJob;
