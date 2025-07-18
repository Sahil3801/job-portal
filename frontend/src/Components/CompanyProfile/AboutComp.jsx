import { companyData } from "../../Data/Company";

const AboutComp = () => {
    const company = companyData;

    return (
        <div className="flex flex-col gap-5">   
            {Object.keys(company).map((key, index) =>
                key !== "Name" && (
                    <div key={index}>
                        <div className="text-xl mb-3 font-semibold">{key}</div>
                        {key !== "Website" && (
                            <div className="text-sm text-mine-shaft-300 text-justify">
                                {key !== "Specialties"
                                    ? company[key]
                                    : company[key].map((item, index) => (
                                          <span key={index}> &bull; {item}</span>
                                      ))}
                            </div>
                        )}
                        {key === "Website" && (
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={company[key]}
                                className="text-sm text-bright-sun-400 hover:text-bright-sun-300"
                            >
                                {company[key]}
                            </a>
                        )}
                    </div>
                )
            )}
        </div>
    );
};

export default AboutComp;
