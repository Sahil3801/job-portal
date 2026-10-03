import { useEffect, useState } from "react";
import { getAllJobs } from "../../Services/JobService";
import { useParams } from "react-router-dom";
import JobCard from "../FindJobs/JobCard";

const RecommendedJob = () => {
    const [jobList, setJobList] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        getAllJobs().then((res) => {
            // Only open jobs, excluding the one being viewed
            setJobList(res.filter((job) => job.jobStatus === "ACTIVE" && String(job.id) !== String(id)).slice(0, 6));
        }).catch((err) => console.log(err));
    }, [id]);

    return (
        <div>
            <div className="text-xl font-semibold mb-5">Recommended Job</div>
            <div className="flex bs:flex-col flex-wrap gap-5 justify-between bs-mx:justify-start">
                {
                    jobList.map((job) => <JobCard key={job.id} {...job} />)
                }
            </div>
        </div>
    );
};

export default RecommendedJob;
