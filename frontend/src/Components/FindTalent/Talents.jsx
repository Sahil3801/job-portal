import { useEffect, useState } from "react";
import { talents } from "../../Data/TalentData";
import Sort from "../FindJobs/Sort";
import TalentCard from "./TalentCard";
import { getAllProfiles } from "../../Services/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../../Slices/FilterSlice";
import { hideOverlay, showOverlay } from "../../Slices/OverlaySlice";

const Talents = () => {
    const dispatch = useDispatch();
    const [talents, setTalents] = useState([]);
    const filter = useSelector((state) => state.filter);
    const sort = useSelector((state) => state.sort);
    const [filteredTalents, setFilteredTalents] = useState([]);

    useEffect(() => {
        dispatch(resetFilter());
        dispatch(showOverlay());
        getAllProfiles()
            .then((res) => {
                setTalents(res);
            })
            .catch((err) => console.log(err))
            .finally(() => dispatch(hideOverlay()));
    }, []);

    useEffect(() => {
        if (sort === "Experience: Low to High") {
            setTalents([...talents].sort((a, b) => a.totalExp - b.totalExp));
        } else if (sort === "Experience: High to Low") {
            setTalents([...talents].sort((a, b) => b.totalExp - a.totalExp));
        }
    }, [sort]);

    useEffect(() => {
        let filtered = talents;

        if (filter.name) filtered = filtered.filter((talent) => talent.name.toLowerCase().includes(filter.name.toLowerCase()));
        if (filter["Job Title"] && filter["Job Title"].length > 0) filtered = filtered.filter((talent) => filter["Job Title"]?.some((x) => talent.jobTitle?.toLowerCase().includes(x.toLowerCase())));
        if (filter.Location && filter.Location.length > 0) filtered = filtered.filter((talent) => filter.Location?.some((x) => talent.location?.toLowerCase().includes(x.toLowerCase())));
        if (filter.Skills && filter.Skills.length > 0) filtered = filtered.filter((talent) => filter.Skills?.some((x) => talent.skills?.some((y) => y.toLowerCase().includes(x.toLowerCase()))));
        if (filter.exp && filter.exp.length > 0) filtered = filtered.filter((talent) => filter.exp[0] <= talent.totalExp && talent.totalExp <= filter.exp[1]);

        setFilteredTalents(filtered);
    }, [filter, talents]);

    return (
        <div className="px-5 py-5">
            <div className="flex justify-between mt-5">
                <div className="text-2xl font-semibold">Talents</div>
                <Sort />
            </div>
            <div className="flex mt-10 flex-wrap gap-5 justify-between">
                {filteredTalents.map((talent, index) => <TalentCard key={index} {...talent} />)}
            </div>
        </div>
    );
};

export default Talents;
