import { companies } from "../../Data/Data";

const Companies = () => {
  return (
    <section className="mt-20 pb-5 px-5">
      <h2 className="text-4xl md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl text-center font-semibold mb-10 text-mine-shaft-50">
        Trusted By <span className="text-bright-sun-400">Genuine</span> Companies
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6 max-w-5xl mx-auto">
        {companies.map((company) => (
          <img
            key={company}
            src={`/Companies/${company}.png`}
            alt={company}
            title={company}
            className="h-8 sm-mx:h-6 w-auto object-contain [filter:brightness(0)] opacity-60 hover:opacity-100 transition-opacity"
          />
        ))}
      </div>
    </section>
  );
};

export default Companies;
