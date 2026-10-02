import { Divider } from "@mantine/core";
import Profile from "../Components/Profile/Profile";

const ProfilePage = () => {
  return (
    <div className="min-h-[90vh] bg-mine-shaft-900 pb-10 px-4 xs-mx:px-2 font-['poppins']">
      <Divider mx="md" mb="xl" className="border-gray-200" />
          <Profile />
    </div>
  );
};

export default ProfilePage;
