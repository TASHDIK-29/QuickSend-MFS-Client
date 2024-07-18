import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useBalanceCheck = () => {

    const axiosSecure = useAxiosSecure();



    const { data: balance = {} } = useQuery({
        queryKey: ['balance'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/balance?credential=${localStorage.credential}`);

            return res.data;
        }
    })

    // console.log(balance);

    return balance;
};

export default useBalanceCheck;