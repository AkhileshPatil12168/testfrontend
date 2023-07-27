import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const ConnectUs = () => {
    const cookies = new Cookies();
    const cUserId = cookies.get("user");

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isMessageSent, setIsMessageSent] = useState(false);
    const [errorResponse, setErrorResponse] = useState("");
    const [color, setColor] = useState("bg-gray-100");

    const getUserDetails = async () => {
        try {
            const response = await axios.get(`https://mobileaccbackend.onrender.com/user/${cUserId}/profile`);
            const userData = response.data.data;
            setUserName(userData.fname + " " + userData.lname);
            setUserEmail(userData.email);
        } catch (error) {
            console.log(error);
        }
    };

    const sendMessage = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(`https://mobileaccbackend.onrender.com/user/${cUserId}/contactus`, {
                name: userName,
                email: userEmail,
                message: message,
            });
            console.log(response.data.data.message);

            if (response.status == 200) setIsMessageSent(true);
        } catch (error) {
            console.log(error);
            setErrorResponse(error.response.data.message);
            setColor("bg-red-300");
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    useEffect(() => {
        setErrorResponse("");
        setColor("bg-gray-100");
    }, [userName, userEmail, message]);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="mb-4">
                If you have any questions or inquiries, please feel free to reach out to us.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-100 p-4 rounded">
                    <h3 className="text-lg font-bold mb-2">Contact Information</h3>
                    <p>Email: camas.in.service@gmail.com</p>
                    <p>Phone: +91 9075888941</p>
                </div>

                <div className="bg-gray-100 p-4 rounded">
                    <h3 className="text-lg font-bold mb-2">Send us a Message</h3>
                    {!isMessageSent ? (
                        <form className="space-y-6">
                            <div className="mb-4">
                                <label className="block font-bold mb-2">Your Name</label>
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    className="border border-gray-300 rounded px-4 py-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block font-bold mb-2">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    className="border border-gray-300 rounded px-4 py-2 w-full"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="message" className="block font-bold mb-2">
                                    Message
                                </label>
                                <textarea
                                    rows="4"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="border border-gray-300 rounded px-4 py-2 w-full"
                                ></textarea>
                            </div>

                            <div className="flex">
                                <button
                                    type="submit"
                                    name="submit"
                                    className="btn bg-blue-500 text-white px-4 py-2 rounded"
                                    onClick={sendMessage}
                                >
                                    submit
                                </button>
                                <div className={`${color} h-10 w-full ml-4 rounded-md`}>
                                    <p className="pt-2 pl-2 text-center">{errorResponse}</p>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <div className="bg-green-100 border  border-green-500 text-green-700 px-4 py-2 rounded">
                            Message sent successfully!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConnectUs;
