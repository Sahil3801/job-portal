import Sort from "./Sort";
import JobCard from "./JobCard";
import { useEffect, useState } from "react";
import { getAllJobs } from "../../Services/JobService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../../Slices/FilterSlice";
import { resetSort } from "../../Slices/SortSlice";
import { hideOverlay, showOverlay } from "../../Slices/OverlaySlice";
import { Button } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

const Jobs = () => {
    const dispatch = useDispatch();
    const [jobList, setJobList] = useState([]);
    const filter = useSelector((state) => state.filter);
    const sort = useSelector((state) => state.sort);
    const [filteredJobs, setFilteredJobs] = useState([]);

    useEffect(() => {
        dispatch(resetSort());
        dispatch(showOverlay());
        getAllJobs()
            .then((res) => {
                setJobList(res.filter((job) => job.jobStatus === "ACTIVE"));
            })
            .catch((err) => console.log(err))
            .finally(() => dispatch(hideOverlay()));

        return () => {
            if (!filter.page) dispatch(resetFilter());
        };
    }, []);

    useEffect(() => {
        let sortedJobs = [...jobList];
        if (sort === "Most Recent") {
            sortedJobs.sort((a, b) => new Date(b.postTime).getTime() - new Date(a.postTime).getTime());
        } else if (sort === "Salary: Low to High") {
            sortedJobs.sort((a, b) => a.packageOffered - b.packageOffered);
        } else if (sort === "Salary: High to Low") {
            sortedJobs.sort((a, b) => b.packageOffered - a.packageOffered);
        }
        setJobList(sortedJobs);
    }, [sort]);

    useEffect(() => {
        let filtered = jobList;
        if (filter["Job Title"] && filter["Job Title"].length > 0) {
            filtered = filtered.filter((job) =>
                filter["Job Title"].some((x) => job.jobTitle?.toLowerCase().includes(x.toLowerCase()))
            );
        }
        if (filter.Location && filter.Location.length > 0) {
            filtered = filtered.filter((job) =>
                filter.Location.some((x) => job.location?.toLowerCase().includes(x.toLowerCase()))
            );
        }
        if (filter.Experience && filter.Experience.length > 0) {
            filtered = filtered.filter((job) =>
                filter.Experience.some((x) => job.experience?.toLowerCase().includes(x.toLowerCase()))
            );
        }
        if (filter["Job Type"] && filter["Job Type"].length > 0) {
            filtered = filtered.filter((job) =>
                filter["Job Type"].some((x) => job.jobType?.toLowerCase().includes(x.toLowerCase()))
            );
        }
        if (filter.salary && filter.salary.length > 0) {
            filtered = filtered.filter(
                (job) => filter.salary[0] <= job.packageOffered && job.packageOffered <= filter.salary[1]
            );
        }
        setFilteredJobs(filtered);
    }, [filter, jobList]);

    return (
        <div className="px-5 py-5">
            <div className="flex justify-between flex-wrap mt-5">
                <div className="text-2xl xs-mx:text-xl flex gap-3 items-center font-semibold">
                    Recommended jobs{" "}
                    {Object.keys(filter).length > 0 && (
                        <Button
                            onClick={() => dispatch(resetFilter())}
                            className="font-body transition duration-300"
                            size="compact-sm"
                            leftSection={<IconX stroke={1.5} size={20} />}
                            variant="filled"
                            color="brightSun.4"
                            autoContrast
                        >
                            Clear Filters
                        </Button>
                    )}
                </div>
                <Sort sort="job" />
            </div>
            <div className="flex mt-10 flex-wrap gap-5">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map((job, index) => <JobCard key={index} {...job} />)
                ) : (
                    <div className="font-medium text-lg">No job found</div>
                )}
            </div>
        </div>
    );
};

export default Jobs;
