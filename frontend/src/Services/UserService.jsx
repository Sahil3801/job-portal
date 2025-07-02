import axiosInstance from "../Interceptor/AxiosInterceptor";

const registerUser = async (user) => {
    return axiosInstance.post(`/users/register`, user)
        .then((result) => result.data)
        .catch((error) => { throw error; });
}

const loginUser = async (login) => {
    return axiosInstance.post(`/users/login`, login)
        .then((result) => result.data)
        .catch((error) => { throw error; });
}

const sendOtp = async (email) => {
    return axiosInstance.post(`/users/sendOtp/${email}`)
        .then((result) => result.data)
        .catch((error) => { throw error; });
}

const verifyOtp = async (email, otp) => {
    return axiosInstance.get(`/users/verifyOtp/${email}/${otp}`)
        .then((result) => result.data)
        .catch((error) => { throw error; });
}

const resetPassword = async (email, password) => {
    return axiosInstance.post(`/users/changePass`, { email, password })
        .then((result) => result.data)
        .catch((error) => { throw error; });
}

export { registerUser, loginUser, sendOtp, verifyOtp, resetPassword };
