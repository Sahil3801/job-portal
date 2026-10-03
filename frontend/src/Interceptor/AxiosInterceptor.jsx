// import axios from "axios";
// import { removeUser } from "../Slices/UserSlice";
// import { removeJwt } from "../Slices/JwtSlice";

// const axiosInstance = axios.create({
//     baseURL: 'http://localhost:8080'
// });

// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// export const setupResponseInterceptor = (navigate, dispatch) => {
//     axiosInstance.interceptors.response.use(
//         (response) => {
//             return response;
//         },
//         (error) => {
//             if (error.response?.status === 401) {
//                 dispatch(removeUser());
//                 dispatch(removeJwt());
//                 navigate('/login');
//             }
//             return Promise.reject(error);
//         }
//     );
// };

// export default axiosInstance;

import axios from "axios";
import { removeUser } from "../Slices/UserSlice";
import { removeJwt } from "../Slices/JwtSlice";
import { toLocalDateTime } from "../Services/Utilities";

export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Converts Date objects in request bodies to local date-time strings
const serializeDates = (value) => {
  if (value instanceof Date) return toLocalDateTime(value);
  if (Array.isArray(value)) return value.map(serializeDates);
  if (value && typeof value === "object" && !(value instanceof File) && !(value instanceof Blob)) {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, serializeDates(v)]));
  }
  return value;
};

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.data) config.data = serializeDates(config.data);
    let token = localStorage.getItem("token");
    if (token) {
      // FIX: Remove any accidental double quotes from the token string
      token = token.replace(/"/g, "");
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const setupResponseInterceptor = (navigate, dispatch) => {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        dispatch(removeUser());
        dispatch(removeJwt());
        navigate("/login");
      }
      return Promise.reject(error);
    },
  );
};

export default axiosInstance;
