import { IconBriefcaseFilled, IconArrowLeft } from "@tabler/icons-react";
import SignUp from "../Components/SignUpLogin/SignUp";
import Login from "../Components/SignUpLogin/Login";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, LoadingOverlay } from "@mantine/core";

const SignUpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="h-[100vh] w-[100vw] overflow-hidden sm-mx:overflow-y-auto relative bg-white-100">
      <Button
        size="sm"
        className="!absolute left-5 z-10"
        onClick={() => navigate("/")}
        my="lg"
        color="black"
        leftSection={<IconArrowLeft size={20} />}
        variant="light"
      >
        Home
      </Button>

      <div
        className={`
                flex 
                [&>*]:flex-shrink-0 
                transition-all 
                relative 
                duration-500 
                ${
                  location.pathname === "/signup"
                    ? "-translate-x-1/2 sm-mx:-translate-x-full"
                    : "translate-x-0"
                }
            `}
      >
        <Login />
        <div
          className={`
                    w-1/2 
                    h-[100vh] 
                    sm-mx:hidden 
                    sm-mx:min-h-full 
                    transition-all 
                    duration-500 
                    flex 
                    items-center 
                    gap-5 
                    justify-center 
                    flex-col 
                    ${
                      location.pathname === "/signup"
                        ? "rounded-r-[200px]"
                        : "rounded-l-[200px]"
                    } 
                    // bg-white-100
                `}
        >
          <div className="flex gap-1 items-center text-black-950">
            <IconBriefcaseFilled className="h-16 w-16" stroke={2.5} />
            <div className="text-6xl bs-mx:text-5xl md-mx:text-4xl sm-mx:text-3xl font-semibold">
              HireHub
            </div>
          </div>
          <div className="text-2xl bs-mx:text-xl md-mx:text-lg text-black-800 font-semibold">
            Discover the perfect job for you
          </div>
        </div>
        <SignUp />
      </div>
    </div>
  );
};

export default SignUpPage;
