import { Button } from "@mantine/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getHomeRoute } from "../Header/navConfig";

const DreamJob = () => {
  const user = useSelector((state) => state.user);
  const startLabel =
    user?.accountType === "EMPLOYER" ? "Find Talent" : "Find Jobs";

  return (
    <section className="max-w-3xl mx-auto px-5 pt-20 pb-6 xs-mx:pt-12">
      <h1 className="text-5xl md-mx:text-4xl xs-mx:text-3xl font-bold leading-tight text-mine-shaft-50">
        Connecting talent, creating future.
      </h1>
      <p className="mt-4 max-w-xl !text-lg xs-mx:!text-base text-mine-shaft-300">
        Good life begins with a good company. Start exploring thousands of
        jobs in one place.
      </p>
      <div className="mt-8 flex gap-3 flex-wrap">
        {user ? (
          <Button component={Link} to={getHomeRoute(user.accountType)} size="md">
            {startLabel}
          </Button>
        ) : (
          <>
            <Button component={Link} to="/signup" size="md">
              Get Started
            </Button>
            <Button component={Link} to="/login" size="md" variant="outline">
              Login
            </Button>
          </>
        )}
      </div>
    </section>
  );
};

export default DreamJob;
