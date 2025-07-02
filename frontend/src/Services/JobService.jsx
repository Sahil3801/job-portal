import axiosInstance from "../Interceptor/AxiosInterceptor";

const postJob = async (job) => {
  console.log("Job Data being sent:", job); // Log job data before sending

  return axiosInstance
    .post(`/jobs/post`, job)
    .then((result) => result.data)
    .catch((error) => {
      throw error;
    });
};

const getAllJobs = async () => {
  return axiosInstance
    .get(`/jobs/getAll`)
    .then((result) => result.data)
    .catch((error) => {
      throw error;
    });
};

const getJob = async (id) => {
  return axiosInstance
    .get(`/jobs/get/${id}`)
    .then((result) => result.data)
    .catch((error) => {
      throw error;
    });
};

const applyJob = async (job, id) => {
  return axiosInstance
    .post(`/jobs/apply/${id}`, job)
    .then((result) => result.data)
    .catch((error) => {
      throw error;
    });
};

const getHistory = async (id, status) => {
  return axiosInstance
    .get(`/jobs/history/${id}/${status}`)
    .then((result) => result.data)
    .catch((error) => {
      throw error;
    });
};

const getJobsPostedBy = async (id) => {
  return axiosInstance
    .get(`/jobs/postedBy/${id}`)
    .then((result) => result.data)
    .catch((error) => {
      throw error;
    });
};

const changeAppStatus = async (interview) => {
  return axiosInstance
    .post(`/jobs/changeAppStatus`, interview)
    .then((result) => result.data)
    .catch((error) => {
      throw error;
    });
};

export {
  postJob,
  getAllJobs,
  getJob,
  applyJob,
  getHistory,
  getJobsPostedBy,
  changeAppStatus,
};
