import { Button, Tabs } from "@mantine/core";
import { Link } from "react-router-dom";
import Card from "./Card";
import { useCallback, useEffect, useState } from "react";
import { getAllJobs } from "../../Services/JobService";
import { useDispatch, useSelector } from "react-redux";
import { hideOverlay, showOverlay } from "../../Slices/OverlaySlice";

// Which application statuses each tab shows
const tabs = [
    { value: "APPLIED", label: "Applied", statuses: ["APPLIED"] },
    { value: "INTERVIEWING", label: "In Progress", statuses: ["INTERVIEWING"] },
    { value: "OFFERED", label: "Offered", statuses: ["OFFERED", "ACCEPTED"] },
    { value: "REJECTED", label: "Closed", statuses: ["REJECTED", "DECLINED"] },
    { value: "SAVED", label: "Saved" },
];

const JobHistory = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const profile = useSelector((state) => state.profile);
    const [activeTab, setActiveTab] = useState("APPLIED");
    const [jobList, setJobList] = useState([]);

    const loadJobs = useCallback((showLoader = true) => {
        if (showLoader) dispatch(showOverlay());
        getAllJobs()
            .then((res) => setJobList(res))
            .catch((err) => console.log(err))
            .finally(() => showLoader && dispatch(hideOverlay()));
    }, [dispatch]);

    useEffect(() => {
        loadJobs();
    }, [loadJobs]);

    const myApplication = (job) => job.applicants?.find((applicant) => applicant.applicantId === user.id);
    const tab = tabs.find((t) => t.value === activeTab);
    const showList = activeTab === "SAVED"
        ? jobList.filter((job) => profile?.savedJobs?.includes(job.id))
        : jobList.filter((job) => tab.statuses.includes(myApplication(job)?.applicationStatus));

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-5">Job History</h1>
            <Tabs value={activeTab} onChange={setActiveTab} radius="lg" variant="outline">
                <Tabs.List className="font-semibold [&_button]:!text-lg sm-mx:[&_button]:!text-base xs-mx:[&_button]:!px-2 mb-5">
                    {tabs.map((t) => <Tabs.Tab key={t.value} value={t.value}>{t.label}</Tabs.Tab>)}
                </Tabs.List>
            </Tabs>
            <div className="flex mt-6 flex-wrap gap-5">
                {showList.length > 0 ? (
                    showList.map((job) => (
                        <Card key={job.id} {...job} application={myApplication(job)} onUpdate={() => loadJobs(false)} />
                    ))
                ) : (
                    <div className="w-full text-center py-12 bg-mine-shaft-900 rounded-xl">
                        <div className="text-lg font-medium text-mine-shaft-100">Nothing here yet</div>
                        <div className="text-mine-shaft-300 mt-1">Jobs you apply to or save will show up here.</div>
                        <Button component={Link} to="/find-jobs" mt="md">Find Jobs</Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobHistory;
