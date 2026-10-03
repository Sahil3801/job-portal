import JobCard from "../FindJobs/JobCard";

const CompanyJobs = ({ jobs, name }) => {
    if (jobs.length === 0)
        return <div className="text-mine-shaft-300">{name} has no open jobs right now.</div>;

    return (
        <div className="flex flex-wrap gap-5">
            {jobs.map((job) => <JobCard key={job.id} {...job} />)}
        </div>
    );
};

export default CompanyJobs;
