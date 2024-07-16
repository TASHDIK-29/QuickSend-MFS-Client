import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AgentRequest = () => {

    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const { data: pendingAgent = [], refetch } = useQuery({
        queryKey: ['pendingAgent'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/agentRequest`);

            return res.data;
        }
    })

    console.log(pendingAgent);


    const handleActivate = async (email) => {
        const res = await axiosPublic.patch(`/agentRequest?email=${email}`);
        console.log(res.data);

        if (res.data.modifiedCount) {
            refetch();
        }
    }


    return (
        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
            <h2 className="mb-4 text-2xl font-semibold leading-tight">Agent Request List</h2>
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
                            <th className="p-3">User Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Phone</th>
                            <th className="p-3 text-right">Balance</th>
                            <th className="p-3"></th>
                            <th className="p-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pendingAgent.map(user => <tr key={user._id} className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                <td className="p-3">
                                    <p>{user?._id}</p>
                                </td>
                                <td className="p-3">
                                    <p>{user?.name}</p>
                                </td>
                                <td className="p-3">
                                    <p>{user?.email}</p>
                                </td>
                                <td className="p-3">
                                    <p>{user?.phone}</p>
                                </td>
                                <td className="p-3 text-right">
                                    <p>{user?.balance}</p>
                                </td>
                                <td></td>
                                <td className="p-3 text-right">
                                    <button onClick={() => handleActivate(user?.email)}>
                                        <span className="px-3 py-1 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">
                                            <span>Activate</span>
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

export default AgentRequest;