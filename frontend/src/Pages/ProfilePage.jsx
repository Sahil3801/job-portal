import { Divider } from "@mantine/core";
import Profile from "../Components/Profile/Profile";

const ProfilePage = () => {
  return (
    <div className="min-h-[90vh] bg-white-100 font-['poppins']">
      <Divider mx="md" mb="xl" className="border-gray-200" />
          <Profile />
    </div>
  );
};

export default ProfilePage;
