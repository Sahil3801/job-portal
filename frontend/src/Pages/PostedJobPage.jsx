import { Button, Divider, Drawer } from "@mantine/core";
import PostedJob from "../Components/PostedJob/PostedJob";
import PostedJobDesc from "../Components/PostedJob/PostedJobDesc";
import { useCallback, useEffect, useState } from "react";
import { getJobsPostedBy } from "../Services/JobService";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { hideOverlay, showOverlay } from "../Slices/OverlaySlice";

const PostedJobPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [opened, { open, close }] = useDisclosure(false);
  const [jobList, setJobList] = useState([]);
  const [job, setJob] = useState(null);
  const matches = useMediaQuery("(max-width: 767px)");

  const [loaded, setLoaded] = useState(false);
  const loadJobs = useCallback(
    (showLoader = true) => {
      if (showLoader) dispatch(showOverlay());
      return getJobsPostedBy(user.id)
        .then((res) => {
          setJobList(res);
          setLoaded(true);
          if (res && res.length > 0 && Number(id) === 0) {
            const firstActive = res.find((x) => x.jobStatus === "ACTIVE") || res[0];
            navigate(`/posted-jobs/${firstActive.id}`, { replace: true });
          }
          setJob(res.find((item) => String(item.id) === String(id)) || null);
        })
        .catch((err) => console.log(err))
        .finally(() => showLoader && dispatch(hideOverlay()));
    },
    [id, user.id, navigate, dispatch]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    loadJobs();
  }, [loadJobs]);

  // Tab with no jobs to show on the right (e.g. "CLOSED"), or null
  const [emptyTab, setEmptyTab] = useState(null);
  useEffect(() => {
    setEmptyTab(null);
    close();
  }, [id, close]);

  const handleTabChange = (tab, firstJob) => {
    setEmptyTab(firstJob ? null : tab);
    if (firstJob) navigate(`/posted-jobs/${firstJob.id}`);
  };

  const tabNames = { ACTIVE: "active", DRAFT: "draft", CLOSED: "closed" };

  return (
    <div className="min-h-[90vh] bg-white font-['poppins'] px-5 xs-mx:px-3">
      <Divider />
      {matches && (
        <Button my="md" size="sm" variant="light" onClick={open}>
          All Jobs ({jobList.length})
        </Button>
      )}
      <Drawer
        opened={opened}
        size={290}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        onClose={close}
        title="All Jobs"
      >
        <PostedJob job={job} jobList={jobList} onTabChange={handleTabChange} />
      </Drawer>
      <div className="flex gap-5 justify-around py-5">
        {!matches && <PostedJob job={job} jobList={jobList} onTabChange={handleTabChange} />}
        {emptyTab || (loaded && jobList.length === 0) ? (
          <div className="w-3/4 md-mx:w-full flex flex-col items-center justify-center gap-4 min-h-[50vh] bg-mine-shaft-900 rounded-xl text-center px-4">
            <div className="text-xl font-semibold">
              {jobList.length === 0 ? "You haven't posted any jobs yet" : `No ${tabNames[emptyTab]} jobs yet`}
            </div>
            <Button component={Link} to="/post-job/0">Post a Job</Button>
          </div>
        ) : (
          <PostedJobDesc {...job} onUpdate={() => loadJobs(false)} />
        )}
      </div>
    </div>
  );
};

export default PostedJobPage;

// import { Button, Divider, Drawer } from "@mantine/core";
// import PostedJob from "../Components/PostedJob/PostedJob";
// import PostedJobDesc from "../Components/PostedJob/PostedJobDesc";
// import { useEffect, useState } from "react";
// import { getJobsPostedBy } from "../Services/JobService";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDisclosure, useMediaQuery } from "@mantine/hooks";
// import { hideOverlay, showOverlay } from "../Slices/OverlaySlice";

// const PostedJobPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   const user = useSelector((state) => state.user);
//   const [opened, { open, close }] = useDisclosure(false);
//   const [jobList, setJobList] = useState([]);
//   const [job, setJob] = useState(null);
//   const matches = useMediaQuery("(max-width: 767px)");

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     dispatch(showOverlay());
//     getJobsPostedBy(user.id)
//       .then((res) => {
//         setJobList(res);
//         if (res && res.length > 0 && Number(id) == 0) {
//           res.forEach((x) => {
//             if (x.jobStatus == "ACTIVE") {
//               navigate(`/posted-jobs/${x.id}`);
//             }
//           }, []);
//         }
//         res.forEach((item) => {
//           if (id == item.id) setJob(item);
//         });
//         window.scrollTo(0, 0);
//       })
//       .catch((err) => console.log(err))
//       .finally(() => dispatch(hideOverlay()));
//   }, [id]);
//   return (
//     <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] px-5  ">
//       <Divider />
//       {matches && (
//         <Button my="xs" size="sm" autoContrast onClick={open}>
//           All Jobs
//         </Button>
//       )}
//       <Drawer
//         opened={opened}
//         size={290}
//         overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
//         onClose={close}
//         title="All Jobs"
//       >
//         <PostedJob job={job} jobList={jobList} />
//       </Drawer>
//       <div className="flex gap-5 justify-around py-5">
//         {!matches && <PostedJob job={job} jobList={jobList} />}
//         <PostedJobDesc {...job} />
//       </div>
//     </div>
//   );
// };
// export default PostedJobPage;
