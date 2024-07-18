import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useContext, useState } from "react";
import { AuthContext } from "../../provider/UserProvider";
import useUserInfo from "../../hooks/useUserInfo";

const Login = () => {

    const { login } = useContext(AuthContext);

    const [pinError, setPinError] = useState(null)
    const [credentialError, setCredentialError] = useState(null)

    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    // const [user, refetch] = useUserInfo()
    // console.log('user info from login =', user);

    const handelLogin = async e =>{
        e.preventDefault();

        setCredentialError(null);
        setPinError(null);

        const form = e.target;

        const emailOrNumber = form.emailOrNumber.value;
        const pin = form.pin.value;

        const loginInfo = {emailOrNumber, pin}

        console.log(loginInfo);

        const res= await login(emailOrNumber, pin)
        console.log('response from login page', res);


        // const res = await axiosPublic.get(`/login?emailOrNumber=${emailOrNumber}&pin=${pin}`)
        // console.log(res.data);

        // if(res.data.user){
        //     if(res.data.pin){
        //         navigate('/dashboard/userHome');
        //     }
        //     else{
        //         setPinError('Invalid Pin')
        //     }
        // }
        // else{
        //     setCredentialError('Invalid credential')
        // }

        if(res.type){
            
            {
                res?.type === 'Admin' ? navigate('/dashboard/adminHome') : res?.type === 'User' ? navigate('/dashboard/userHome') : navigate('/dashboard/agentHome')
            }
            // navigate('/dashboard/userHome');
        }
        else if(res.user && !res.pin){
            setPinError('Invalid Pin')
        }
        else{
            setCredentialError('Invalid credential')
        }

        
        
    }

    return (
        <section className="bg-white dark:bg-gray-900 min-h-screen">
            <div className="container px-6 py-24 mx-auto lg:py-32">
                <div className="lg:flex">
                    <div className="lg:w-1/2">
                        <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />

                        <h1 className="mt-4 text-gray-600 dark:text-gray-300 md:text-lg">Welcome back</h1>

                        <h1 className="mt-4 text-2xl font-medium text-gray-800 capitalize lg:text-3xl dark:text-white">
                            login to your account
                        </h1>
                    </div>

                    <div className="mt-8 lg:w-1/2 lg:mt-0">
                        <form onSubmit={handelLogin} className="w-full lg:max-w-xl">
                            <div className="relative flex items-center">
                                <span className="absolute">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </span>

                                <input type="text" name="emailOrNumber" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email / Number" />
                            </div>
                            {credentialError && <h1 className="text-red-600 text-lg">{credentialError}</h1> }
                            
                           
                            <div className="relative flex items-center mt-4">
                                <span className="absolute">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>

                                <input type="password" name="pin" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Pin" />
                            </div>
                            {pinError && <h1 className="text-red-600 text-lg">{pinError}</h1> }

                            <div className="mt-8 md:flex md:items-center">

                                <input type="submit" value="Login" className="w-1/2 px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg md:w-1/2 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50" />

                                {/* <a href="#" className="inline-block mt-4 text-center text-blue-500 md:mt-0 md:mx-6 hover:underline dark:text-blue-400">
                                    Forgot your password?
                                </a> */}
                                <Link to='/register' className="inline-block mt-4 text-center text-blue-500 md:mt-0 md:mx-6  border border-blue-500 px-6 py-3 w-1/2 rounded-lg text-sm">Register</Link>
                            </div>
                        </form>
                    </div>
                </div>

                
            </div>
        </section>
    );
};

export default Login;