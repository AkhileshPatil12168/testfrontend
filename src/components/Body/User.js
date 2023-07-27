import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import noProfile from "../../images/noProfile.png";

const User = () => {
    const cookies = new Cookies();
    const cUserId = cookies.get("user");

    const [data, setData] = useState(null);

    const getData = async () => {
        try {
            let response = await axios.get(`https://mobileaccbackend.onrender.com/user/${cUserId}/profile`);

            console.log(response.data.data);
            setData(response.data.data);
        } catch (error) {
            console.log(error.response.data.message);
        }
    };
    console.log(data?.profileImage);
    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="container mx-auto p-4 bg-white rounded-lg shadow">
            <h1 className="text-center text-2xl font-bold mb-4">Account details </h1>

            <div className="cart-item mb-4 flex items-center p-4 bg-white border border-gray-300 rounded">
                <img
                    src={data?.profileImage ? data?.profileImage : noProfile}
                    alt="Profile Image"
                    className="w-20 h-20 mr-4 rounded"
                />
                <div className="cart-item-details">
                    <h3 className="text-xl font-bold mb-2">
                        {data?.fname} {data?.lname}
                    </h3>
                    <p className="text-gray-600 mb-1">Email: {data?.email}</p>
                    <p className="text-gray-600 mb-1">Phone: {data?.phone}</p>
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="shippingAddress" className="block mb-2 font-bold">
                    Shipping Address
                </label>
                <textarea
                    id="shippingAddress"
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    rows="4"
                    value={`${data?.address?.shipping?.street || ""}, ${
                        data?.address?.shipping?.city || ""
                    }, ${data?.address?.shipping?.pincode || ""}`}
                    readOnly
                ></textarea>
            </div>

            <div className="mb-4">
                <label htmlFor="billingAddress" className="block mb-2 font-bold">
                    Billing Address
                </label>
                <textarea
                    id="billingAddress"
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    rows="4"
                    value={`${data?.address?.billing?.street || ""}, ${
                        data?.address?.billing?.city || ""
                    }, ${data?.address?.billing?.pincode || ""}`}
                    readOnly
                ></textarea>
            </div>

            <div className="flex justify-end">
                <button className="btn bg-red-500 text-white px-4 py-2 rounded mr-2">
                    Delete Account
                </button>
                <button className="btn bg-blue-500 text-white px-4 py-2 rounded">
                    Update Details
                </button>
            </div>
        </div>
    );
};

export default User;
