import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const NotFoundPage= () => {
    const navigate=useNavigate();
  return (
    <div className="bg-mine-shaft-900 flex items-center justify-center min-h-[70vh] px-4">
      <div className="text-center p-8 xs-mx:p-6 bg-white border border-mine-shaft-700 rounded-2xl shadow-sm max-w-md">
        <h1 className="text-5xl font-bold text-bright-sun-400 mb-3">404</h1>
        <h2 className="text-2xl font-semibold text-mine-shaft-50 mb-3">Page Not Found</h2>
        <p className="text-mine-shaft-300 mb-6">
          Sorry, the page you are looking for does not exist.
        </p>
        <Button onClick={()=>navigate('/')}>
          Go to Homepage
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
