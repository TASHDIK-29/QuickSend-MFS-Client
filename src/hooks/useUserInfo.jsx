import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUserInfo = () => {

    const axiosSecure = useAxiosSecure();

    const { data: user = {} , refetch} = useQuery({
        queryKey: ['userInfo'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user?credential=${localStorage.credential}`);

            return res.data;
        }
    })

    console.log(user);

    return [user, refetch];
};

export default useUserInfo;