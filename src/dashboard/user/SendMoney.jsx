import { useState } from "react";
import { bcrypt } from "bcryptjs";
import useUserInfo from "../../hooks/useUserInfo";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SendMoney = () => {

    const axiosSecure = useAxiosSecure();

    const [amountError, setAmountError] = useState(null);
    const [pinError, setPinError] = useState(null);

    const user = useUserInfo();

    const handelSend = async e =>{
        e.preventDefault();

        setAmountError('');
        setPinError('');

        const form = e.target;

        const userNumber = form.userNumber.value;
        const receiverNumber = form.receiverNumber.value;
        const amount = parseFloat(form.amount.value);
        const pin = form.pin.value;

        console.log({userNumber,receiverNumber,amount,pin});

        if(amount >= 50 && amount <= user?.balance-5){
            console.log('amount ok');

            const res = await axiosSecure.patch('/sendMoney', {userNumber,receiverNumber,amount,pin});
            console.log(res.data);
            
        }
        else{
            {
                amount < 50 ? setAmountError('You can not send less than 50') : setAmountError('Insufficient Balance')
            }
        }
    }

    return (
        <div className="flex items-center border min-h-screen">
            <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Send Money</h2>

                <form onSubmit={handelSend}>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-gray-700 dark:text-gray-200">Your Number</label>
                            <input type="text" name="userNumber" defaultValue={user?.phone} readOnly className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200">Receiver Number</label>
                            <input type="text" name="receiverNumber" required className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
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
                        
                        <input type="submit" value="Send" className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"/>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default SendMoney;