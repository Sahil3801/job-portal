import { Divider, Tabs } from "@mantine/core";
import Card from "./Card";
import { useEffect, useState } from "react";
import { getAllJobs } from "../../Services/JobService";
import { useDispatch, useSelector } from "react-redux";
import { hideOverlay, showOverlay } from "../../Slices/OverlaySlice";

const JobHistory = () => { 
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const profile = useSelector((state) => state.profile);
    const [activeTab, setActiveTab] = useState('APPLIED');
    const [jobList, setJobList] = useState([]);
    const [showList, setShowList] = useState([]);

    useEffect(() => {
        dispatch(showOverlay());
        getAllJobs().then((res) => {
            setJobList(res);
            setShowList(res.filter((job) => {
                let found = false;
                job.applicants?.forEach((applicant) => {
                    if (applicant.applicantId === user.id && applicant.applicationStatus === "APPLIED") found = true;
                });
                return found;
            }));
        }).catch((err) => console.log(err))
        .finally(() => dispatch(hideOverlay()));
    }, [dispatch, user.id]);

    const handleTabChange = (value) => {
        if (value === "SAVED") {
            setShowList(jobList.filter((job) => profile?.savedJobs?.includes(job.id)));
        } else {
            setShowList(jobList.filter((job) => {
                let found = false;
                job.applicants?.forEach((applicant) => {
                    if (applicant.applicantId === user.id && applicant.applicationStatus === value) found = true;
                });
                return found;
            }));
        }
        setActiveTab(value);
    };

    return (
        <div>
            <div className="text-2xl font-semibold mb-5">Job History</div>
            <div>
                <Tabs value={activeTab} onChange={handleTabChange} radius="lg" autoContrast variant="outline">
                    <Tabs.List className="font-semibold [&_button[data-active='true']]:!border-b-mine-shaft-950 [&_button]:!text-xl sm-mx:[&_button]:!text-lg xs-mx:[&_button]:!text-base xsm-mx:[&_button]:!text-sm xs-mx:[&_button]:!px-1.5 xs-mx:[&_button]:!py-2 mb-5 [&_button[data-active='true']]:text-bright-sun-400 xs-mx:font-medium">
                        <Tabs.Tab value="APPLIED">Applied</Tabs.Tab>
                        <Tabs.Tab value="SAVED">Saved</Tabs.Tab>
                        <Tabs.Tab value="OFFERED">Offered</Tabs.Tab>
                        <Tabs.Tab value="INTERVIEWING">In Progress</Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value={activeTab} className="[&>div]:w-full">
                        <div className="flex mt-10 flex-wrap gap-5">
                            {
                                showList.length > 0 ? showList.map((item, index) => <Card key={index} {...item} {...{ [activeTab.toLowerCase()]: true }} />) : <div className="text-lg font-medium">Nothing to show..</div>
                            }
                        </div>
                    </Tabs.Panel>
                </Tabs>
            </div>
        </div>
    );
};
export default JobHistory;
