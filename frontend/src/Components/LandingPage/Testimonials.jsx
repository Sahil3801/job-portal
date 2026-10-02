import { Avatar, Rating } from "@mantine/core";
import { testimonials } from "../../Data/Data";

const Testimonials = () => {
  return (
    <div className="mt-20 pb-5 p-5 overflow-hidden">
      {/* --- FIX 1: Changed heading to a high-contrast dark gray --- */}
      <div
        className="text-4xl md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl text-center font-semibold mb-3 text-gray-900"
      >
        {/* --- FIX 2: Used a darker, more readable accent color --- */}
        What <span className="text-bright-sun-600">User</span> says about us?
      </div>

      <div className="flex justify-evenly gap-5 md-mx:flex-wrap mt-10">
        {testimonials.map((data, index) => (
          <div
            key={index}
            // A subtle opacity on the border color can look nice on a light theme
            className="flex flex-col gap-3 w-[23%] md-mx:w-[48%] xs-mx:w-full border-bright-sun-400/80 p-3 border rounded-xl"
          >
            <div className="flex gap-2 items-center">
              <Avatar className="!h-14 !w-14" src="avatar.png" alt="it's me" />
              <div>
                {/* --- FIX 3: Changed user name to a dark, readable color --- */}
                <div className="text-lg sm-mx:text-base xs-mx:text-sm text-gray-800 font-semibold">
                  {data.name}
                </div>
                <Rating value={data.rating} fractions={2} readOnly />
              </div>
            </div>
            {/* --- FIX 4: Changed testimonial quote to a standard body text color --- */}
            <div className="text-sm text-gray-600">{data.testimonial}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;

// import { Avatar, Rating } from "@mantine/core";
// import { testimonials } from "../../Data/Data";

// const Testimonials = () => {
//     return (
//         <div className="mt-20 pb-5 p-5 overflow-hidden">
//             <div className="text-4xl md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl text-center font-semibold mb-3 text-mine-shaft-100">
//                 What <span className="text-bright-sun-400">User</span> says about us?
//             </div>
//             <div className="flex justify-evenly gap-5 md-mx:flex-wrap mt-10">
//                 {testimonials.map((data, index) => (
//                     <div key={index} className="flex flex-col gap-3 w-[23%] md-mx:w-[48%] xs-mx:w-full border-bright-sun-400 p-3 border rounded-xl">
//                         <div className="flex gap-2 items-center">
//                             <Avatar className="!h-14 !w-14" src="avatar.png" alt="it's me" />
//                             <div>
//                                 <div className="text-lg sm-mx:text-base xs-mx:text-sm text-mine-shaft-100 font-semibold">
//                                     {data.name}
//                                 </div>
//                                 <Rating value={data.rating} fractions={2} readOnly />
//                             </div>
//                         </div>
//                         <div className="text-xs text-mine-shaft-300">{data.testimonial}</div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Testimonials;
