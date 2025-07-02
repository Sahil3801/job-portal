import { useEffect, useState } from "react";
import TalentCard from "../FindTalent/TalentCard";
import { useParams } from "react-router-dom";

const RecommendTalent = (props) => {
    const { id } = useParams();
    return (
        <div data-aos="zoom-out">
            <div className="text-xl font-semibold mb-5">Recommended Talent</div>
            <div className="flex flex-col flex-wrap gap-5 justify-between">
                {
                    props.talents?.map((talent, index) => index < 4 && id !== talent.id && <TalentCard key={index} {...talent} />)
                }
            </div>
        </div>
    );
}

export default RecommendTalent;
