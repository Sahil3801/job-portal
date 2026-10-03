
import { similar } from "../../Data/Company";
import CompanyCard from "./CompanyCard";
import { useParams } from "react-router-dom";

const SimilarCompanies = () => {
    const { name } = useParams();
    return <div className="w-1/4 lg-mx:w-full">
        <div className="text-xl font-semibold mb-5">Similar Companies</div>
        <div className="flex flex-col flex-wrap gap-5">
        {
            similar.filter((company) => company.name !== name).map((company) => <CompanyCard key={company.name} {...company} />
        )}
    </div>
    </div>
}
export default SimilarCompanies;