import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

const CreateOrder = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const cUserId = cookies.get("user");

    const [summery, setSummery] = useState({});
    const [userData, setUserData] = useState({});
    const [info, setInfo] = useState({
        name: "",
        email: "",
        phone: "",
        shippingAddressStreet: "",
        shippingAddressCity: "",
        shippingAddressPincode: "",
        billingAddressStreet: "",
        billingAddressCity: "",
        billingAddressPincode: "",
    });
    const [checked, setChecked] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [orderId, setOrderId] = useState("");

    const handleChange = () => {
        setChecked(!checked);
        if (checked == true) {
            setInfo({
                ...info,
                billingAddressStreet: info.shippingAddressStreet,
                billingAddressCity: info.shippingAddressCity,
                billingAddressPincode: info.shippingAddressPincode,
            });
        }
    };

    const handleClick = () => {
        setIsDisabled(!isDisabled);
    };

    const handleSubmit = (e) => {
        let name, value;
        name = e.target.name;
        value = e.target.value;
        setInfo({ ...info, [name]: value });
        console.log(e.target.value);
        console.log(e.target.name);
        console.log(info);
    };

    const getSummery = async () => {
        try {
            const response = await axios.get(`https://mobileaccbackend.onrender.com/user/${cUserId}/order/summery`);
            setSummery(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getInfo = async () => {
        try {
            const response = await axios.get(`https://mobileaccbackend.onrender.com/user/${cUserId}/profile`);
            //let { fname, lname, email, phone, address } = response.data.data;
            setUserData(response.data.data);
            // setInfo({ ...info, name: fname + " " + lname, email: email, phone: phone });
            // setInfo({
            //     ...info,
            //     shippingAddressStreet: address.shipping.street,
            //     shippingAddressCity: address.shipping.city,
            //     shippingAddressPincode: address.shipping.pincode,
            // });
            // setInfo({
            //     ...info,
            //     billingAddressStreet: address.billing.street,
            //     billingAddressCity: address.billing.city,
            //     billingAddressPincode: address.billing.pincode,
            // });

            console.log(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    console.log(info);

    const createOrder = async () => {
        try {
            const data = {
                name: info.name,
                email: info.email,
                phone: info.phone,
                address: {
                    shipping: {
                        street: info.shippingAddressStreet,
                        city: info.shippingAddressCity,
                        pincode: info.shippingAddressPincode,
                    },
                    billing: {
                        street: info.billingAddressStreet,
                        city: info.billingAddressCity,
                        pincode: info.billingAddressPincode,
                    },
                },
            };

            const response = await axios.post(`https://mobileaccbackend.onrender.com/user/${cUserId}/order/`, data);
            console.log(response.data.data["_id"]);
            setOrderId(response.data.data["_id"]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSummery();
        getInfo();

        console.log("apicall");
    }, []);
    useEffect(() => {
        setInfo({
            ...info,
            name: userData.fname + " " + userData.lname,
            email: userData.email,
            phone: userData.phone,
            shippingAddressStreet: userData?.address?.shipping?.street,
            shippingAddressCity: userData?.address?.shipping?.city,
            shippingAddressPincode: userData?.address?.shipping?.pincode,
            billingAddressStreet: userData?.address?.billing?.street,
            billingAddressCity: userData?.address?.billing?.city,
            billingAddressPincode: userData?.address?.billing?.pincode,
        });
    }, [userData]);

    useEffect(() => {}, [info, checked]);

    useEffect(() => {
        if (orderId) {
            navigate(`/user/order/${orderId}`);
        }
    }, [orderId]);

    return !cUserId ? (
        navigate("/login")
    ) : (
        <div className="container mx-auto p-4 bg-white rounded-lg shadow">
            <h1 className="text-center text-2xl font-bold mb-4">Order Summary</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-300 rounded p-4 mb-4 md:mb-0">
                    <h2 className="text-lg font-bold mb-4">Order Information</h2>
                    <div className="mb-4">
                        <p className="font-bold">Total Items: {summery.totalItems}</p>
                        <p className="font-bold">Total Quantity: {summery.toatlQuantity}</p>
                        <p className="font-bold">Total Price: ₹{summery.totalPrice}</p>
                        <p className="font-bold">
                            Free Shipping: {summery.isFreeShipping ? "Yes" : "No"}
                        </p>
                    </div>
                </div>
                <div className="border border-gray-300 rounded p-4 mb-4 md:mb-0">
                    <h2 className="text-lg font-bold mb-4">Personal Information</h2>
                    <div className="mb-4">
                        <label htmlFor="Name" className="block mb-2 font-bold">
                            Name
                        </label>
                        <input
                            id="Name"
                            type="text"
                            name="name"
                            value={info.name}
                            onChange={handleSubmit}
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="Email" className="block mb-2 font-bold">
                            Email
                        </label>
                        <input
                            id="Email"
                            type="email"
                            name="email"
                            value={info.email}
                            onChange={handleSubmit}
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="Phone" className="block mb-2 font-bold">
                            Phone Number
                        </label>
                        <input
                            id="Phone"
                            type="tel"
                            name="phone"
                            value={info.phone}
                            onChange={handleSubmit}
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="border border-gray-300 rounded p-4 mb-4 md:mb-0">
                    <h2 className="text-lg font-bold mb-4">Shipping Address</h2>
                    <div className="mb-4">
                        <label htmlFor="shippingAddressStreet" className="block mb-2 font-bold">
                            Street
                        </label>
                        <input
                            id="shippingAddressStreet"
                            type="text"
                            name="shippingAddressStreet"
                            value={info.shippingAddressStreet}
                            onChange={handleSubmit}
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="shippingAddressCity" className="block mb-2 font-bold">
                            City
                        </label>
                        <input
                            id="shippingAddressCity"
                            type="text"
                            name="shippingAddressCity"
                            value={info.shippingAddressCity}
                            onChange={handleSubmit}
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="shippingAddressPincode" className="block mb-2 font-bold">
                            Pincode
                        </label>
                        <input
                            id="shippingAddressPincode"
                            type="text"
                            name="shippingAddressPincode"
                            value={info.shippingAddressPincode}
                            onChange={handleSubmit}
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                    </div>
                </div>

                <div className="border border-gray-300 rounded p-4">
                    <div className="flex justify-between mb-4">
                        <div>
                            <h2 className="text-lg font-bold mb-2">Billing Address</h2>
                        </div>
                        <div>
                            <label htmlFor="sameAddress" className="flex items-center font-bold">
                                Same as Shipping Address
                                <input
                                    id="sameAddress"
                                    type="checkbox"
                                    className="ml-2"
                                    checked={!checked}
                                    onChange={() => {
                                        handleChange(), handleClick();
                                    }}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="billingAddressStreet" className="block mb-2 font-bold">
                            Street
                        </label>
                        <input
                            id="billingAddressStreet"
                            type="text"
                            name="billingAddressStreet"
                            value={info.billingAddressStreet}
                            onChange={handleSubmit}
                            disabled={isDisabled}
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="billingAddressCity" className="block mb-2 font-bold">
                            City
                        </label>
                        <input
                            id="billingAddressCity"
                            type="text"
                            name="billingAddressCity"
                            value={info.billingAddressCity}
                            onChange={handleSubmit}
                            disabled={isDisabled}
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="billingAddressPincode" className="block mb-2 font-bold">
                            Pincode
                        </label>
                        <input
                            id="billingAddressPincode"
                            type="text"
                            name="billingAddressPincode"
                            value={info.billingAddressPincode}
                            onChange={handleSubmit}
                            disabled={isDisabled}
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end mt-4">
                <button
                    onClick={createOrder}
                    className="btn bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Place Order
                </button>
            </div>
        </div>
    );
};

export default CreateOrder;
