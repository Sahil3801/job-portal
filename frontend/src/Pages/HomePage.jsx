import DreamJob from "../Components/LandingPage/DreamJob";
import Working from "../Components/LandingPage/Working";

const HomePage = () => {
  return (
    <main className="min-h-[70vh] bg-white font-['poppins'] pb-20">
      <DreamJob />
      <Working />
    </main>
  );
};

export default HomePage;