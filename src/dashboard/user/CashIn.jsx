import { useState } from "react";
import useUserInfo from "../../hooks/useUserInfo";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const CashIn = () => {


    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const [amountError, setAmountError] = useState(null);
    const [pinError, setPinError] = useState(null);

    const [user, refetch] = useUserInfo();


    const handelSend = async e =>{
        e.preventDefault();

        setAmountError('');
        setPinError('');

        const form = e.target;

        const userNumber = form.userNumber.value;
        const agentNumber = form.agentNumber.value;
        const amount = parseFloat(form.amount.value);
        const pin = form.pin.value;

        console.log({ userNumber, agentNumber, amount, pin });

        const res = await axiosSecure.post('/cashInRequest', { userNumber, agentNumber, amount, pin });

        console.log(res.data);

        if(res.data.insertedId){
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Your cash in request send successfully",
                showConfirmButton: false,
                timer: 1500
              });
        }
        if(res.data.pin && !res.data.agent){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid Agent.",
              });
        }
        if(!res.data.pin && !res.data.insertedId){
            setPinError('Invalid Pin')
        }
    }


    return (
        <div className="relative size-full bg-slate-950">
            <div className="flex items-center border min-h-screen absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_90%_at_50%_0%,#000_70%,transparent_100%)]">
                <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                    <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Send Money</h2>

                    <form onSubmit={handelSend}>
                        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                            <div>
                                <label className="text-gray-700 dark:text-gray-200">Your Number</label>
                                <input type="text" name="userNumber" defaultValue={user?.phone} readOnly className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label className="text-gray-700 dark:text-gray-200">Agent Number</label>
                                <input type="text" name="agentNumber" required className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label className="text-gray-700 dark:text-gray-200">Amount</label>
                                <input type="number" name="amount" required className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                                <h1 className="text-red-500 text-base">{amountError}</h1>
                            </div>

                            <div>
                                <label className="text-gray-700 dark:text-gray-200">Pin</label>
                                <input type="password" name="pin" required className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                                <h1 className="text-red-500 text-base">{pinError}</h1>
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">

                            <input type="submit" value="Send" className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600" />
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default CashIn;