import { Divider, Tabs } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AboutComp from "./AboutComp";
import CompanyJobs from "./CompanyJobs";
import { getAllJobs } from "../../Services/JobService";
import { logoFallback } from "../../Services/Utilities";

const Company = () => {
    const { name } = useParams();
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        getAllJobs()
            .then((res) => setJobs(res.filter((job) => job.company === name && job.jobStatus === "ACTIVE")))
            .catch((err) => console.log(err));
    }, [name]);

    return (
        <div className="w-3/4 lg-mx:w-full">
            <div className="relative">
                <img className="rounded-t-2xl w-full h-48 xs-mx:h-32 object-cover" src="/Profile/banner.jpg" alt="" />
                <img
                    className="w-28 h-28 xs-mx:w-24 xs-mx:h-24 p-3 bg-white border border-mine-shaft-700 shadow-sm absolute -bottom-14 xs-mx:-bottom-12 left-5 rounded-3xl object-contain"
                    src={`/Icons/${name}.png`}
                    onError={logoFallback}
                    alt={`${name} logo`}
                />
            </div>
            <div className="px-5 mt-20 xs-mx:mt-16">
                <h1 className="text-3xl xs-mx:text-2xl font-semibold text-mine-shaft-50">{name}</h1>
                <div className="text-mine-shaft-300 mt-1">
                    {jobs.length} open job{jobs.length === 1 ? "" : "s"}
                </div>
            </div>
            <Divider my="xl" />
            <Tabs variant="outline" radius="md" defaultValue="about">
                <Tabs.List className="font-semibold [&_button]:!text-lg xs-mx:[&_button]:!text-base mb-5">
                    <Tabs.Tab value="about">About</Tabs.Tab>
                    <Tabs.Tab value="jobs">Jobs ({jobs.length})</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="about">
                    <AboutComp name={name} />
                </Tabs.Panel>
                <Tabs.Panel value="jobs">
                    <CompanyJobs jobs={jobs} name={name} />
                </Tabs.Panel>
            </Tabs>
        </div>
    );
};

export default Company;
