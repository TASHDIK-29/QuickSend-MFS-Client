import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";

const UserHome = () => {

    const [balance, setBalance] = useState(null);

    const axiosSecure = useAxiosSecure();

    const handelCheck = async e => {
        e.preventDefault();

        setBalance(null);

        const pin = e.target.pin.value;
        console.log({ pin });

        const res = await axiosSecure.get(`/balance?pin=${pin}&credential=${localStorage.getItem('credential')}`);

        console.log(res.data);

        if (res.data.pin) {
            setBalance(res.data.balance)
        }
        else {
            setBalance('Invalid Pin')
        }

    }
    return (
        <div className="relative size-full bg-slate-950">
            <div className="flex items-center border min-h-screen absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_90%_at_50%_0%,#000_70%,transparent_100%)]">
                <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                    <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white text-center">Check Balance</h2>

                    <form onSubmit={handelCheck}>
                        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">

                            <div>
                                <label className="text-gray-700 dark:text-gray-200">Pin</label>
                                <input type="password" name="pin" required className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                                {/* <h1 className="text-red-500 text-base">{pinError}</h1> */}
                            </div>
                            <div className="flex justify-end mt-6">

                                <input type="submit" value="Check" className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600" />
                            </div>
                        </div>

                        <div className="mt-6 p-4 border border-slate-600">
                            {
                                !balance ? <h1 className="text-lg font-semibold text-center text-gray-200">Balance</h1> :
                                    <h1 className={`text-lg font-semibold text-center ${balance === 'Invalid Pin' ? 'text-red-600' : 'text-blue-600'}`}>
                                        {balance}
                                    </h1>
                            }
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default UserHome;