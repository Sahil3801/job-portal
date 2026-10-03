import { Tabs } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import PostedJobCard from "./PostedJobCard";
import { useParams } from "react-router-dom";

const newestFirst = (a, b) => new Date(b.postTime).getTime() - new Date(a.postTime).getTime();

const PostedJob = (props) => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(props.job?.jobStatus || "ACTIVE");

  useEffect(() => {
    if (props.job?.jobStatus) setActiveTab(props.job.jobStatus);
  }, [props.job]);

  const jobsByStatus = useMemo(() => {
    const groups = { ACTIVE: [], DRAFT: [], CLOSED: [] };
    for (const job of props.jobList) groups[job?.jobStatus]?.push(job);
    Object.values(groups).forEach((list) => list.sort(newestFirst));
    return groups;
  }, [props.jobList]);

  // Switching tabs opens the newest job in that tab, or an empty state
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    props.onTabChange?.(tab, jobsByStatus[tab][0]);
  };

  const jobsToRender = jobsByStatus[activeTab] || [];

  return (
    <div className="w-1/5 lg-mx:w-full">
      <div className="text-2xl font-semibold mb-5">Jobs</div>
      <Tabs variant="pills" value={activeTab} onChange={handleTabChange}>
        <Tabs.List className="font-medium">
          <Tabs.Tab value="ACTIVE">Active [{jobsByStatus.ACTIVE.length}]</Tabs.Tab>
          <Tabs.Tab value="DRAFT">Drafts [{jobsByStatus.DRAFT.length}]</Tabs.Tab>
          <Tabs.Tab value="CLOSED">Closed [{jobsByStatus.CLOSED.length}]</Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <div className="flex flex-col flex-wrap mt-5 gap-5">
        {jobsToRender.length > 0 ? (
          jobsToRender.map((item) => (
            <PostedJobCard key={item.id} {...item} selectedId={id} theme="dark" />
          ))
        ) : (
          <div className="text-sm text-mine-shaft-300">No jobs here.</div>
        )}
      </div>
    </div>
  );
};

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
