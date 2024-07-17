import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/dashboard/Navbar";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../provider/UserProvider";
import UserNav from "../components/dashboard/UserNav";
import AdminNav from "../components/dashboard/AdminNav";
import AgentNav from "../components/dashboard/AgentNav";
import useUserInfo from "../hooks/useUserInfo";


const DashboardLayout = () => {

    const navigate = useNavigate();

    const { logout } = useContext(AuthContext);

    const handelLogout = () => {
        logout();

        navigate('/');
    }


    // const axiosSecure = useAxiosSecure();

    // const { data: user = {} } = useQuery({
    //     queryKey: ['userInfo'],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/user?credential=${localStorage.credential}`);

    //         return res.data;
    //     }
    // })

    // console.log(user);

    const user = useUserInfo();

    return (
        <div className="flex">
            {/* <Navbar user={user}></Navbar>
            <Outlet></Outlet> */}
            <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
                <a href="#" className="mx-auto">
                    <img className="w-auto h-6 sm:h-7" src="https://merakiui.com/images/full-logo.svg" alt="" />
                </a>

                <div className="flex flex-col items-center mt-6 -mx-2">
                    <img className="object-cover w-24 h-24 mx-2 rounded-full" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="avatar" />
                    <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">{user?.name} / <span className="text-sm text-blue-600">{user?.type}</span></h4>
                    <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">{user?.phone} / {user?.email}</p>
                    {
                        user?.type !== 'Admin' && <>
                            <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">Status : {user?.status}</p>
                            <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">Balance : {user?.balance}</p>
                        </>
                    }

                </div>

                <div className="flex flex-col justify-between flex-1 mt-6">
                    {
                        user?.type === 'Admin' ? <AdminNav /> : user?.type === 'User' ? <UserNav /> :
                            user?.type === 'Agent' ? <AgentNav /> : ''
                    }
                </div>
                <div>
                    <button onClick={handelLogout} className="text-white font-bold">Logout</button>
                </div>
            </aside>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashboardLayout;