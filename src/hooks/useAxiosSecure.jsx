import axios from "axios";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})


const useAxiosSecure = () => {

    const navigate = useNavigate();

    // Interceptor for request access token
    axiosSecure.interceptors.request.use(function (config) {
        // Do something before request is sent
        const token = localStorage.getItem('token');
        // console.log('stoped', token);
        config.headers.authorization = `Bearer ${token}`

        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    //Interceptor for response
    // axiosSecure.interceptors.response.use(function (response) {
    //     // Any status code that lie within the range of 2xx cause this function to trigger
    //     // Do something with response data
    //     return response;
    // }, async (error)=> {
    //     // Any status codes that falls outside the range of 2xx cause this function to trigger
    //     // Do something with response error
    //     const status = error.response.status;
    //     // console.log('error from interceptor', status);

    //     if(status === 401 || status === 403){
    //         await logoutUser();
    //         navigate('/login');
    //     }
    //     return Promise.reject(error);
    // });



    return axiosSecure;
};

export default useAxiosSecure;