// import { ActionIcon, Avatar, Button, Checkbox, Divider, FileInput, Indicator, Overlay, Pill, TagsInput, Textarea } from "@mantine/core";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getProfile } from "../../Services/ProfileService";
// import Info from "./Info";
// import { changeProfile, setProfile } from "../../Slices/ProfileSlice";
// import About from "./About";
// import Skills from "./Skills";
// import Experience from "./Experience";
// import Certification from "./Certifications";
// import { useHover } from "@mantine/hooks";
// import { successNotification } from "../../Services/NotificationService";
// import { IconEdit } from "@tabler/icons-react";
// import { getBase64 } from "../../Services/Utilities";

import { Avatar, Divider } from "@mantine/core";
import { useSelector } from "react-redux";
import Info from "./Info";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Certification from "./Certifications";

const Profile = () => {
  const profile = useSelector((state) => state.profile);

  return (
    <div className="w-4/5 lg-mx:w-full mx-auto bg-white-100 rounded-lg shadow-md">
      <div>
        <div className="relative px-5">
          {/* Banner Image */}
          <img
            className="rounded-t-2xl xs-mx:h-32"
            src="/Profile/banner.jpg"
            alt="Profile Banner"
          />

          {/* Profile Avatar */}
          <div className="absolute -bottom-1/4 md-mx:-bottom-8 sm-mx:-bottom-12 left-6">
            <Avatar
              className="!w-48 !h-48 md-mx:!w-40 md-mx:!h-40 border-white-10  0 border-8 rounded-full sm-mx:!w-36 sm-mx:!h-36 xs-mx:!h-32 xs-mx:!w-32"
              src="/avatar.png"
              alt="Profile Picture"
            />
          </div>
        </div>

        {/* Profile Sections */}
        <div className="px-3 pt-2 mt-16">
          <Info />
          <Divider my="xl" className="border-white-200" /> {/* Updated divider color */}
          <About />
          <Divider my="xl" className="border-white-200" /> {/* Updated divider color */}
          <Skills />
          <Divider my="xl" className="border-white-200" /> {/* Updated divider color */}
          <Experience />
          <Divider my="xl" className="border-white-200" /> {/* Updated divider color */}
          <Certification />
        </div>
        {/* <div className="px-3 pt-2 mt-16">
          <Info />
          <Divider my="xl" />
          <About />
          <Divider my="xl" />
          <Skills />
          <Divider my="xl" />
          <Experience />
          <Divider my="xl" />
          <Certification />
        </div> */}
      </div>
    </div>
  );
};

export default Profile;
// const Profile = () => {
//     const dispatch = useDispatch();
//     const profile = useSelector((state) => state.profile);

//     const { hovered, ref } = useHover();
//     const handleFileChange = async (image) => {
//         let picture = await getBase64(image);
//         let updatedProfile = { ...profile, picture: picture.split(',')[1] };
//         dispatch(changeProfile(updatedProfile));
//         successNotification("Success", "Profile Picture Updated Successfully");
//     };

//     return (
//         <div className="w-4/5 lg-mx:w-full mx-auto">
//             <div className="">
//                 <div data-aos="zoom-out" className="relative px-5">
//                     <img className="rounded-t-2xl xs-mx:h-32" src="/Profile/banner.jpg" alt="" />
//                     <div ref={ref} className="absolute cursor-pointer flex items-center justify-center !rounded-full -bottom-1/3 md-mx:-bottom-10 sm-mx:-bottom-16 left-6">
//                         <Avatar className="!w-48 !h-48 md-mx:!w-40 md-mx:!h-40 border-mine-shaft-950 border-8 rounded-full sm-mx:!w-36 sm-mx:!h-36 xs-mx:!h-32 xs-mx:!w-32" src={profile.picture ? `data:image/jpeg;base64,${profile.picture}` : '/avatar.png'} alt="" />
//                         {hovered && <Overlay ref={ref} className="!rounded-full" color="#000" backgroundOpacity={0.75} />}
//                         {hovered && <IconEdit className="absolute z-[300] !w-16 !h-16" />}
//                         {hovered && <FileInput onChange={handleFileChange} className="absolute [&_*]:!rounded-full z-[301] [&_*]:!h-full w-full !h-full" variant="unstyled" accept="image/png,image/jpeg" />}
//                     </div>
//                 </div>
//                 <div className="px-3 pt-2 mt-16">
//                     <Info />
//                     <Divider my="xl" />
//                     <About />
//                     <Divider my="xl" />
//                     <Skills />
//                     <Divider my="xl" />
//                     <Experience />
//                     <Divider my="xl" />
//                     <Certification />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Profile;
