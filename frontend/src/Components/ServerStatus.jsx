import { Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import { API_URL } from "../Interceptor/AxiosInterceptor";

// Wakes the backend as soon as the site opens. If it is still asleep after a
// few seconds (Render free plan), shows a note so users know why it is slow.
const ServerStatus = () => {
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    let done = false;
    const timer = setTimeout(() => !done && setSlow(true), 3000);
    const ping = (attempt) =>
      fetch(`${API_URL}/health`)
        .then((res) => {
          if (!res.ok) throw new Error(res.status);
          done = true;
          setSlow(false);
        })
        .catch(() => attempt < 10 && setTimeout(() => ping(attempt + 1), 5000));
    ping(0);
    return () => clearTimeout(timer);
  }, []);

  if (!slow) return null;
  return (
    <div role="status" className="w-full bg-mine-shaft-900 border-b border-mine-shaft-700 text-sm text-mine-shaft-200 px-4 py-2 flex items-center justify-center gap-2 text-center">
      <Loader size="xs" color="dark" />
      Starting the server. On the free hosting plan this can take up to a minute after a quiet period.
    </div>
  );
};

export default ServerStatus;
