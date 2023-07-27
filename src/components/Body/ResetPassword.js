import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Login from "../forms/Login";

const ResetPassword = () => {
    const { usertype, userId, token } = useParams();
    //console.log(usertype, userId, token);
    const navigate = useNavigate();

    const [data, setData] = useState({
        password: "",
        re_password: "",
        userType: usertype || "",
    });

    const [res, setRes] = useState("");
    const [color, setColor] = useState("bg-white");
    const [statCode, setStatCode] = useState(null);
    const [text, setText] = useState(null);

    let name, value;

    const handleSubmit = (e) => {
        name = e.target.name;
        value = e.target.value;
        setData({ ...data, [name]: value });
        console.log(value);
    };
    const postData = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();

            for (let key in data) {
                formData.append(key, data[key]);
            }

            let response = await axios.put(
                `https://mobileaccbackend.onrender.com/${userId}/reset/password/${token}`,
                formData
            );

            setRes(response.data.message);
            setColor("bg-green-300");
            setStatCode(response?.status);
            console.log(response);
        } catch (error) {
            setRes(error?.response?.data.message);
            setColor("bg-red-300");
            setStatCode(error?.response?.status);
            console.log(error?.response);
        }
    };

    useEffect(() => {
        setColor("bg-white");
        setRes("");
    }, [data]);

    useEffect(() => {
        if (statCode == 200) {
            setText("go to the login page");
        }
    }, [statCode]);
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        reset your password
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={handleSubmit}
                                    required
                                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    re-enter password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    name="re_password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={data.re_password}
                                    onChange={handleSubmit}
                                    required
                                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                name="send_email"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={text ? <Login /> : postData}
                            >
                                {text || `reset password`}
                            </button>
                        </div>
                    </form>
                    <div className={`${color} h-14 mt-2 rounded-lg text-center pt-4`}>{res}</div>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
