import { companies } from "../../Data/Data";

const Companies = () => {
  return (
    <div className="mt-20 pb-5">
      <div className="text-4xl md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl text-center font-semibold mb-10 text-black-700">
        Trusted By Geniune Companies
      </div>
      

      <div className="flex flex-wrap justify-center gap-4">
        {companies.map((company, index) => (
          <span key={index} className="text-lg font-medium">
            {company}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Companies;
