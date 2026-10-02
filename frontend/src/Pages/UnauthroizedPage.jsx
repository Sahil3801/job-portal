import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate=useNavigate();
  return (
    <div className="bg-mine-shaft-900 flex items-center justify-center min-h-[70vh] px-4">
      <div className="text-center p-8 xs-mx:p-6 bg-white border border-mine-shaft-700 rounded-2xl shadow-sm max-w-md">
        <h1 className="text-5xl font-bold text-bright-sun-400 mb-3">403</h1>
        <h2 className="text-2xl font-semibold text-mine-shaft-50 mb-3">Unauthorized Access</h2>
        <p className="text-mine-shaft-300 mb-6">
          Sorry, you don’t have permission to view this page.
        </p>
        <Button onClick={()=>navigate('/')}>
          Go to Homepage
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
