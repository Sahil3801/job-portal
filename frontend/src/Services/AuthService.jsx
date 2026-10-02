import axios from "axios";
import { API_URL } from "../Interceptor/AxiosInterceptor";
const base_url = `${API_URL}/auth/`;
const loginUser = async (login) => {
  return axios
    .post(`${base_url}login`, login)
    .then((result) => result.data)
    .catch((error) => {
      throw error;
    });
};

export { loginUser };
