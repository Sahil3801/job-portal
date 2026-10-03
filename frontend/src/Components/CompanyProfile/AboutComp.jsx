import { companyDetails } from "../../Data/Company";

const AboutComp = ({ name }) => {
    const company = companyDetails[name];
    if (!company)
        return <div className="text-mine-shaft-300">We don't have more details about {name} yet.</div>;

    return (
        <div className="flex flex-col gap-5">
            {Object.keys(company).map((key) => (
                <div key={key}>
                    <div className="text-xl mb-2 font-semibold">{key}</div>
                    {key === "Website" ? (
                        <a target="_blank" rel="noopener noreferrer" href={company[key]} className="text-sm underline">
                            {company[key]}
                        </a>
                    ) : (
                        <div className="text-sm text-mine-shaft-300">
                            {key === "Specialties" ? company[key].join(" • ") : company[key]}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default AboutComp;
