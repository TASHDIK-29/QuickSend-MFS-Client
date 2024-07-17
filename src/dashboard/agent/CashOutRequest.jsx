import { useQuery } from "@tanstack/react-query";
import useUserInfo from "../../hooks/useUserInfo";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const CashOutRequest = () => {

    const axiosSecure = useAxiosSecure();

    const [user, refetch] = useUserInfo();

    const { data: cashOutRequests = [], refetch: reload } = useQuery({
        queryKey: ['cashOutRequest'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/cashOutRequest?agentNumber=${user.phone}`);

            return res.data;
        }
    })

    console.log(cashOutRequests);


    const handelAccept = async (id) => {
        const res2 = await axiosSecure.patch(`/cashOutAccept?id=${id}`)

        console.log(res2.data);

        if (!res2.data.balance) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Insufficient Balance !!",
            });
        }
        else {
            refetch();
            reload();
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Cash Out Successful",
                showConfirmButton: false,
                timer: 2500
            });
        }
    }


    return (
        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
            <h2 className="mb-4 text-2xl font-semibold leading-tight">Invoices</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                    <colgroup>
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col className="w-24" />
                    </colgroup>
                    <thead className="dark:bg-gray-300">
                        <tr className="text-left">
                            <th className="p-3">ID</th>
                            <th className="p-3">Request From</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3 text-right"></th>
                            <th className="p-3"></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            cashOutRequests.map(request => <tr key={request._id} className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                <td className="p-3">
                                    <p>{request?._id}</p>
                                </td>
                                <td className="p-3">
                                    <p>{request?.senderNumber}</p>
                                </td>
                                <td className="p-3">
                                    <p>{request?.date}</p>
                                </td>
                                <td className="p-3">
                                    <p>{request?.amount}</p>
                                </td>
                                <td className="p-3 text-right">
                                </td>
                                <td className="p-3 text-right">
                                    <button onClick={() => handelAccept(request?._id)}>
                                        <span className="px-3 py-1 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">
                                            <span>Accept</span>
                                        </span>
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CashOutRequest;