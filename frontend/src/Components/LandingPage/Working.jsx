import { work } from "../../Data/Data";

const Working = () => {
  return (
    <section className="max-w-3xl mx-auto mt-16 px-5">
      <h2 className="text-2xl xs-mx:text-xl font-semibold text-mine-shaft-50 mb-6">
        How it works
      </h2>
      <ol className="!list-none !m-0 !p-0 border-t border-mine-shaft-700">
        {work.map((item, index) => (
          <li
            key={item.name}
            className="!ml-0 flex gap-5 py-5 border-b border-mine-shaft-700"
          >
            <span className="text-mine-shaft-400 font-medium w-6">
              {index + 1}
            </span>
            <div>
              <div className="font-semibold text-mine-shaft-50">{item.name}</div>
              <p className="!text-sm text-mine-shaft-300 mt-1">{item.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Working;

// import { Avatar } from "@mantine/core";
// import { work } from "../../Data/Data";

// const Working = () => {
//   return (
//     <div className="mt-20 pb-5 overflow-hidden">
//       <div
//
//         className="text-4xl md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl text-center font-semibold mb-3 text-mine-white-100"
//       >
//         How it <span className="text-bright-sun-400">Works</span>
//       </div>
//       <div
//
//         className="text-lg mb-10 sm-mx:text-base xs-mx:text-sm mx-auto text-mine-white-300 text-center w-1/2 sm-mx:w-11/12"
//       >
//         Effortlessly navigate through the process and land your dream job.
//       </div>
//       <div className="flex px-16 bs-mx:px-10 gap-2 md-mx:flex-col md-mx:px-5 justify-center items-center">
//         <div className="flex flex-col gap-10">
//           {work.map((item, index) => (
//             <div key={index} className="flex items-center gap-4">
//               <div className="p-2.5 bg-bright-sun-300 rounded-full">
//                 <img
//                   className="h-12 w-12 md-mx:w-9 md-mx:h-9 sm-mx:w-7 sm-mx:h-7"
//                   src={`/Working/${item.name}.png`}
//                   alt={item.name}
//                 />
//               </div>
//               <div>
//                 <div className="text-mine-white-200 text-xl md-mx:text-lg sm-mx:text-base font-semibold">
//                   {item.name}
//                 </div>
//                 <div className="text-mine-white-300 md-mx:text-sm sm-mx:text-xs">
//                   {item.desc}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Working;
