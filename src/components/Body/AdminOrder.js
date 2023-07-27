import Cookies from "universal-cookie";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Items = (props) => {
    const { productImage, title, quantity, price, index } = props;
    const [bgColor, setBgColor] = useState("");

    useEffect(() => {
        if (index % 2 == 0) setBgColor("bg-gray-200");
    });
    return (
        <div className={`flex mb-2 ${bgColor}  `}>
            <img
                src={productImage[0]}
                alt={`Product Image ${productImage[0]}`}
                className="w-16 h-16 mr-2 m-4 "
            />
            <div>
                <p className="mb-2">
                    <strong>Title:</strong> {title}
                </p>
                <p className="mb-2">
                    <strong>Quantity:</strong> {quantity}
                </p>
                <p className="mb-2">
                    <strong>Price:</strong> ₹{price}
                </p>
            </div>
        </div>
    );
};
const AdminOrder = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const cAdminId = cookies.get("admin");
    const { orderId } = useParams();

    console.log(orderId);

    const [order, setOrder] = useState({});
    const [updateResponse, setUpdateResponse] = useState("");
    const orderDetails = async () => {
        try {
            const response = await axios.get(
                `https://mobileaccbackend.onrender.com/admin/${cAdminId}/order/${orderId}`
            );
            const order = response.data.data;
            setOrder(order);
            console.log(order);
        } catch (error) {
            console.log(error);
        }
    };
    const updateOrder = async (status) => {
        try {
            const response = await axios.put(
                `https://mobileaccbackend.onrender.com/admin/${cAdminId}/order/${orderId}`,
                { status: status }
            );

            const updatedOrder = response.data.data;
            const responseMessage = response.data.message;
            setOrder(updatedOrder);
            setUpdateResponse(responseMessage);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        orderDetails();
    }, [updateResponse]);

    useEffect(() => {
        orderDetails();
    }, []);
    console.log(order.cancellable);

    return !cAdminId ? (
        navigate("/login")
    ) : (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Order Details</h1>

            <div className="flex flex-wrap -mx-2">
                <div className="w-full px-2 mb-4">
                    <div className="border border-gray-300 rounded p-4 overflow-auto">
                        <h2 className="text-lg font-bold mb-4">Items</h2>
                        <div className="border max-h-52	 border-gray-300 rounded p-4 overflow-auto">
                            {order?.items?.map((item, index) => (
                                <Link to={"/products/" + item.productId}>
                                    <Items {...{ ...item, index: index }} key={index} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="w-full  px-2 mb-4">
                    <div className="border border-gray-300 rounded p-4">
                        <h2 className="text-lg font-bold mb-4">Order Information</h2>
                        <p className="mb-2">
                            <strong>Total Items:</strong> {order?.totalItems}
                        </p>
                        <p className="mb-2">
                            <strong>Total Quantity:</strong> {order?.totalQuantity}
                        </p>
                        <p className="mb-2">
                            <strong>Total Price:</strong> ₹{order?.totalPrice}
                        </p>
                        <p className="mb-2">
                            <strong>Free Shipping:</strong> {order?.isFreeShipping ? "Yes" : "No"}
                        </p>
                        <p className="mb-2">
                            <strong>Ordered Date:</strong> {order?.orderdedDate}
                        </p>
                        <p className="mb-2">
                            <strong>Cancellable:</strong> {order.cancellable ? "Yes" : "No"}
                        </p>
                        <p className="mb-2">
                            <strong>Status:</strong> {order?.status}
                        </p>
                    </div>
                </div>

                <div className="w-full  px-2 mb-4">
                    <div className="border border-gray-300 rounded p-4">
                        <h2 className="text-lg font-bold mb-4">Personal Information</h2>
                        <p className="mb-2">
                            <strong>Name:</strong> {order?.name}
                        </p>
                        <p className="mb-2">
                            <strong>Email:</strong> {order?.email}
                        </p>
                        <p className="mb-2">
                            <strong>Phone Number:</strong> {order?.phone}
                        </p>
                    </div>
                </div>

                <div className="w-full md:w-1/2 px-2 mb-4">
                    <div className="border border-gray-300 rounded p-4">
                        <h2 className="text-lg font-bold mb-4">Shipping Address</h2>
                        <p className="mb-2">
                            <strong>Street:</strong> {order?.address?.shipping?.street}
                        </p>
                        <p className="mb-2">
                            <strong>City:</strong> {order?.address?.shipping?.city}
                        </p>
                        <p className="mb-2">
                            <strong>Pincode:</strong> {order?.address?.shipping?.pincode}
                        </p>
                    </div>
                </div>

                <div className="w-full md:w-1/2 px-2 mb-4">
                    <div className="border border-gray-300 rounded p-4">
                        <h2 className="text-lg font-bold mb-4">Billing Address</h2>
                        <p className="mb-2">
                            <strong>Street:</strong> {order?.address?.billing?.street}
                        </p>
                        <p className="mb-2">
                            <strong>City:</strong> {order?.address?.billing?.city}
                        </p>
                        <p className="mb-2">
                            <strong>Pincode:</strong> {order?.address?.billing?.pincode}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex justify-end ">
                {order.status == "pending" ? (
                    <div className="pr-2">
                        <button
                            onClick={() => updateOrder("completed")}
                            className="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-500"
                        >
                            Complete Order
                        </button>
                    </div>
                ) : (
                    <></>
                )}

                {order.cancellable && order.status == "pending" ? (
                    <div>
                        <button
                            onClick={() => updateOrder("cancelled")}
                            className="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-red-600 "
                        >
                            Cancel Order
                        </button>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};
export default AdminOrder;
