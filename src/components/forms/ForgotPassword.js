import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        userType: "",
    });

    const [res, setRes] = useState("");
    const [color, setColor] = useState("bg-white");
    const [statCode, setStatCode] = useState(null);
    const [text, setText] = useState("");
    let [timex, setTimex] = useState(5);
    const [btnNotWork, setbtnNotWork] = useState(false);
    const [btnLoginC, setBtnLoginC] = useState({ bg: "bg-indigo-600", hoverBg: "bg-indigo-500" });

    let name, value;

    const handleSubmit = (e) => {
        name = e.target.name;
        value = e.target.value;
        setData({ ...data, [name]: value });
    };
    const postData = async (e) => {
        try {
            e.preventDefault();

            const response = await axios.post("https://mobileaccbackend.onrender.com/request/resetpassword/", data);
            setRes(response.data.message);
            setColor("bg-green-300");
            setStatCode(response?.status);
            console.log(response);
        } catch (error) {
            setRes(error?.response?.data.message);
            setColor("bg-red-300");
            setStatCode(error?.response?.status);
        }
    };

    function decrement() {
        if (timex == 0) {
            setTimex(5);
            setbtnNotWork(false);
            setBtnLoginC({ bg: "bg-indigo-600", hoverBg: "bg-indigo-500" });
        }
        if (timex > 0) {
            setTimex(timex--);
            setTimeout(() => decrement(), 1000);
            setText("resend email in " + timex);
        }
    }

    useEffect(() => {
        setColor("bg-white");
        setRes("");
    }, [data]);
    useEffect(() => {
        if (statCode == 200) {
            setBtnLoginC({ bg: "bg-gray-500", hoverBg: "bg-gray-500" });

            setbtnNotWork(true);
            setStatCode(null);
            decrement();
        }
    }, [statCode]);
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        request to reset password
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900 ">
                                Email address
                            </label>
                            <div className="mt-4 -mb-4">
                                <input
                                    name="email"
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={handleSubmit}
                                    required
                                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div onClick={handleSubmit} className="space-x-3">
                            <input type="radio" value="user" name="userType" />
                            user
                            <input type="radio" value="admin" name="userType" className="ml-2 " />
                            admin
                        </div>

                        <div>
                            <button
                                type="submit"
                                name="login"
                                className={`flex w-full  justify-center rounded-md ${btnLoginC.bg} px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:${btnLoginC.hoverBg} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 -mt-4`}
                                onClick={postData}
                                disabled={btnNotWork}
                            >
                                send email
                            </button>
                        </div>
                        <Link to="/login">
                            <div className="text-sm">
                                <p className="font-semibold text-indigo-600 hover:text-indigo-500 p-2 text-right">
                                    Login
                                </p>
                            </div>
                        </Link>

                        <div className="">
                            <p className="font-semibold text-indigo-600 hover:text-indigo-500  text-center -mt-4">
                                {text}
                            </p>
                        </div>
                    </form>
                    <div className={`${color} h-14 mt-2 rounded-lg text-center pt-4`}>{res}</div>
                </div>
            </div>
        </>
    );
};
export default ForgotPassword;
