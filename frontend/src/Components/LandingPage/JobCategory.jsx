import { Carousel } from "@mantine/carousel";
import { jobCategory } from "../../Data/Data";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

const JobCategory = () => {
  return (
    <div className="mt-20 pb-5 overflow-hidden">
      {/* --- FIX 1: Changed heading to a standard dark gray for consistency --- */}
      <div className="text-4xl text-center font-semibold md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl mb-3 text-gray-900">
        Browse Job Category
      </div>
      {/* --- FIX 2: Changed subheading to a darker, readable gray --- */}
      <div className="text-lg sm-mx:text-base xs-mx:text-sm mb-10 mx-auto text-gray-600 text-center w-1/2 sm-mx:w-11/12">
        Discover your dream job and take the first step toward a brighter future
        today!
      </div>
      <Carousel
        slideSize="22%"
        slideGap="md"
        loop
        className="focus-visible:[&_button]:!outline-none [&_button]:!bg-bright-sun-400 [&_button]:!border-none [&_button]:hover:opacity-75 [&_button]:opacity-0 hover:[&_button]:opacity-100"
        nextControlIcon={<IconArrowRight className="h-8 w-8" />}
        previousControlIcon={<IconArrowLeft className="h-8 w-8" />}
      >
        {jobCategory.map((category, index) => (
          <Carousel.Slide key={index}>
            {/* --- FIX 3: Replaced custom shadows with standard, softer Tailwind shadows --- */}
            <div className="flex flex-col items-center w-64 sm-mx:w-56 xs-mx:w-48 gap-2 border border-bright-sun-400/50 p-5 rounded-xl hover:cursor-pointer shadow-lg hover:shadow-xl my-5 transition duration-300 ease-in-out">
              <div className="p-2 bg-bright-sun-300 rounded-full">
                <img
                  className="h-8 w-8 sm-mx:h-6 sm-mx:w-6 xs-mx:h-4 xs-mx:w-4"
                  src={`/Category/${category.name}.png`}
                  alt={category.name}
                />
              </div>
              {/* --- FIX 4 (CRITICAL): Changed card title to be dark and readable --- */}
              <div className="text-gray-800 text-xl sm-mx:text-lg xs-mx:text-base font-semibold">
                {category.name}
              </div>
              {/* --- FIX 5: Changed card description to a darker, readable gray --- */}
              <div className="text-sm xs-mx:text-xs text-center text-gray-600">
                {category.desc}
              </div>
              {/* --- FIX 6: Used a darker shade of the accent color for better contrast --- */}
              <div className="text-bright-sun-500 text-lg sm-mx:text-base xs-mx:text-sm font-medium">
                {category.jobs}+ new job posted
              </div>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default JobCategory;

// import { Carousel } from "@mantine/carousel";
// import { jobCategory } from "../../Data/Data";
// import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

// const JobCategory = () => {
//   return (
//     <div className="mt-20 pb-5 overflow-hidden">
//       <div className="text-4xl text-center font-semibold md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl mb-3 text-mine-shaft-800">
//         Browse Job Category
//       </div>
//       <div className="text-lg sm-mx:text-base xs-mx:text-sm mb-10 mx-auto text-mine-shaft-600 text-center w-1/2 sm-mx:w-11/12">
//       Discover your dream job and take the first step toward a brighter future today!
//       </div>
//       <Carousel
//         slideSize="22%"
//         slideGap="md"
//         loop
//         className="focus-visible:[&_button]:!outline-none [&_button]:!bg-bright-sun-400 [&_button]:!border-none [&_button]:hover:opacity-75 [&_button]:opacity-0 hover:[&_button]:opacity-100"
//         nextControlIcon={<IconArrowRight className="h-8 w-8" />}
//         previousControlIcon={<IconArrowLeft className="h-8 w-8" />}
//       >
//         {jobCategory.map((category, index) => (
//           <Carousel.Slide key={index}>
//             <div className="flex flex-col items-center w-64 sm-mx:w-56 xs-mx:w-48 gap-2 border border-bright-sun-400 p-5 rounded-xl hover:cursor-pointer hover:shadow-[0_0_5px_2px_black] my-5 transition duration-300 ease-in-out !shadow-bright-sun-300">
//               <div className="p-2 bg-bright-sun-300 rounded-full">
//                 <img
//                   className="h-8 w-8 sm-mx:h-6 sm-mx:w-6 xs-mx:h-4 xs-mx:w-4"
//                   src={`/Category/${category.name}.png`}
//                   alt={category.name}
//                 />
//               </div>
//               <div className="text-mine-shaft-100 text-xl sm-mx:text-lg xs-mx:text-base font-semibold">
//                 {category.name}
//               </div>
//               <div className="text-sm xs-mx:text-xs text-center text-mine-shaft-300">
//                 {category.desc}
//               </div>
//               <div className="text-bright-sun-300 text-lg sm-mx:text-base xs-mx:text-sm">
//                 {category.jobs}+ new job posted
//               </div>
//             </div>
//           </Carousel.Slide>
//         ))}
//       </Carousel>
//     </div>
//   );
// };

// export default JobCategory;
