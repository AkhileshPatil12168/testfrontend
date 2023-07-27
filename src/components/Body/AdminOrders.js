import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Cookies from "universal-cookie";

const Order = (props) => {
    const { orderdedDate, _id, status, cancelledDate, deliveredDate } = props;

    return (
        <>
            {status == "pending" ? (
                <div className="order-item mb-4 bg-white border  border-gray-300 rounded p-4">
                    <p className="order-id font-bold">Order ID: {_id}</p>

                    <p className="order-date text-blue-500">
                        Order Date:{" "}
                        {orderdedDate.slice(0, 10) + " time : " + orderdedDate.slice(11, 16)}
                    </p>
                </div>
            ) : (
                <></>
            )}
            {status == "completed" ? (
                <div className="order-item mb-4 bg-white border  border-gray-300 rounded p-4">
                    <p className="order-id font-bold">Order ID: {_id}</p>

                    <p className="order-date text-gray-500">
                        Order Date:{" "}
                        {orderdedDate.slice(0, 10) + " time : " + orderdedDate.slice(11, 16)}
                    </p>
                    <p className="order-date text-green-500">
                        Delivered Date:{" "}
                        {deliveredDate.slice(0, 10) + " time : " + deliveredDate.slice(11, 16)}
                    </p>
                </div>
            ) : (
                <></>
            )}
            {status == "cancelled" ? (
                <div className="order-item mb-4 bg-white border  border-gray-300 rounded p-4">
                    <p className="order-id font-bold">Order ID: {_id}</p>

                    <p className="order-date text-gray-500">
                        Order Date:{" "}
                        {orderdedDate.slice(0, 10) + " time: " + orderdedDate.slice(11, 16)}
                    </p>
                    <p className="order-date text-red-500">
                        Canceled Date:{" "}
                        {cancelledDate.slice(0, 10) + " time: " + cancelledDate.slice(11, 16)}
                    </p>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

const AdminOrders = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const cAdminId = cookies.get("admin");

    const [orders, setOrders] = useState([]);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    const [recentOrders, setRecentOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const [pendingOrders, setPendingOrders] = useState([]);
    const [canceledOrders, setCanceledOrders] = useState([]);

    const [filteredCompletedOrders, setFilteredCompletedOrders] = useState([]);
    const [filteredPendingOrders, setFilteredPendingOrders] = useState([]);
    const [filteredCanceledOrders, setFilteredCanceledOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`https://mobileaccbackend.onrender.com/admin/${cAdminId}/orders`);
            const allOrders = response.data.data;
            setOrders(allOrders);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // console.log(fromDate, "formdate");
        // console.log(toDate, "todate");

        const pendingOrders = orders
            .filter((order) => order.status === "pending")
            .sort((a, b) => new Date(a.orderdedDate) - new Date(b.orderdedDate));
        setPendingOrders(pendingOrders);
        setFilteredPendingOrders(pendingOrders);

        const completedOrders = orders.filter((order) => order.status === "completed");
        setCompletedOrders(completedOrders);
        setFilteredCompletedOrders(completedOrders);

        const canceledOrders = orders.filter((order) => order.status === "cancelled");
        setCanceledOrders(canceledOrders);
        setFilteredCanceledOrders(canceledOrders);

        setRecentOrders(orders.slice(0, 5));

        if (fromDate || toDate) {
            if (fromDate && toDate) {
                setFilteredPendingOrders(
                    pendingOrders.filter(
                        (order) =>
                            new Date(order.orderdedDate) >= new Date(fromDate) &&
                            new Date(order.orderdedDate) <= new Date(toDate)
                    )
                );
                setFilteredCompletedOrders(
                    completedOrders.filter(
                        (order) =>
                            new Date(order.orderdedDate) >= new Date(fromDate) &&
                            new Date(order.orderdedDate) <= new Date(toDate)
                    )
                );
                setFilteredCanceledOrders(
                    canceledOrders.filter(
                        (order) =>
                            new Date(order.orderdedDate) >= new Date(fromDate) &&
                            new Date(order.orderdedDate) <= new Date(toDate)
                    )
                );
            } else if (fromDate) {
                setFilteredPendingOrders(
                    pendingOrders.filter(
                        (order) => new Date(order.orderdedDate) >= new Date(fromDate)
                    )
                );
                setFilteredCompletedOrders(
                    completedOrders.filter(
                        (order) => new Date(order.orderdedDate) >= new Date(fromDate)
                    )
                );
                setFilteredCanceledOrders(
                    canceledOrders.filter(
                        (order) => new Date(order.orderdedDate) >= new Date(fromDate)
                    )
                );
            } else if (toDate) {
                setFilteredPendingOrders(
                    pendingOrders.filter(
                        (order) => new Date(order.orderdedDate) <= new Date(toDate)
                    )
                );
                setFilteredCompletedOrders(
                    completedOrders.filter(
                        (order) => new Date(order.orderdedDate) <= new Date(toDate)
                    )
                );
                setFilteredCanceledOrders(
                    canceledOrders.filter(
                        (order) => new Date(order.orderdedDate) <= new Date(toDate)
                    )
                );
            }
        }
    }, [orders, fromDate, toDate]);

    useEffect(() => {
        fetchOrders();
        console.log("api call");
    }, []);

    return !cAdminId ? (
        navigate("/login")
    ) : (
        <div className="mx-20 ">
            <div className="flex  py-4">
                <div className=" p-4  bg-white  h-[500px] ">
                    <p className="text-lg font-bold mb-4 text-center">Summery</p>
                    <div className="bg-gray-200 p-4 rounded overflow-y-auto  h-[400px] w-[400px]">
                        <p>total pending orders: {pendingOrders.length}</p>
                        <p>total completed orders: {completedOrders.length}</p>
                        <p>total canceled orders: {canceledOrders.length}</p>
                        <p>total orders: {orders.length}</p>
                    </div>
                </div>
                <div className="w-full">
                    <div className="border border-gray-300 rounded p-4  bg-white min-h-[50px] max-h-[500px]  ">
                        <p className="text-lg font-bold mb-4 text-center">Recent 5 Orders</p>
                        <div className="bg-blue-200 p-4 rounded overflow-y-auto min-h-[50px] max-h-[400px] ">
                            {recentOrders.map((order) => (
                                <Link to={`/admin/order/${order._id}`} key={order._id}>
                                    <Order {...order} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-200 ">
                <div className="flex justify-center space-x-4 my-4 pl-4">
                    <div className="flex p-4">
                        <label className="text-black font-medium">From:</label>{" "}
                        <DatePicker
                            onChange={(date) => setFromDate(new Date(date).getTime())}
                            dateFormat="yyyy-MM-dd"
                            todayButton="Select Today"
                            placeholderText={
                                fromDate
                                    ? new Date(fromDate).toLocaleDateString("en-CA")
                                    : "select date"
                            }
                        />
                        <div className="ml-2">
                            {" "}
                            <button
                                type="reset"
                                name="remove"
                                className="      w-10 bg-gray-600 text-white"
                                onClick={() => setFromDate(null)}
                            >
                                X
                            </button>
                        </div>
                    </div>

                    <div className="flex p-4">
                        <label className="text-black font-medium">To: </label>
                        <DatePicker
                            onChange={(date) => setToDate(new Date(date).getTime())}
                            dateFormat="yyyy-MM-dd"
                            todayButton="Select Today"
                            placeholderText={
                                toDate
                                    ? new Date(toDate).toLocaleDateString("en-CA")
                                    : "select date"
                            }
                        />
                        <div className="ml-2">
                            {" "}
                            <button
                                type="reset"
                                name="remove"
                                className="      w-10 bg-gray-600 text-white"
                                onClick={() => setToDate(null)}
                            >
                                X
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between mr-2 p-4 ">
                    <div className="">
                        <div className="border border-gray-300 rounded p-4  bg-white min-h-[50px] max-h-[500px] ">
                            <p className="text-lg font-bold mb-4 text-center">
                                Pending Orders ({filteredPendingOrders.length})
                            </p>
                            <div className="bg-blue-200 p-4 rounded overflow-y-auto min-h-[50px] max-h-[400px] w-[400px]">
                                {filteredPendingOrders.map((order) => (
                                    <Link to={`/admin/order/${order._id}`} key={order._id}>
                                        <Order {...order} key={order._id} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="border border-gray-300 rounded p-4  bg-white min-h-[50px] max-h-[500px] ">
                            <p className="text-lg font-bold mb-4 text-center">
                                completed Orders ({filteredCompletedOrders.length})
                            </p>
                            <div className="bg-blue-200 p-4 rounded overflow-y-auto min-h-[50px] max-h-[400px] w-[400px]">
                                {filteredCompletedOrders.map((order) => (
                                    <Link to={`/admin/order/${order._id}`} key={order._id}>
                                        <Order {...order} key={order._id} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="border border-gray-300 rounded p-4  bg-white min-h-[50px] max-h-[500px] ">
                            <p className="text-lg font-bold mb-4 text-center">
                                canceled Orders ({filteredCanceledOrders.length})
                            </p>
                            <div className="bg-blue-200 p-4 rounded overflow-y-auto min-h-[50px] max-h-[400px] w-[400px]">
                                {filteredCanceledOrders.map((order) => (
                                    <Link to={`/admin/order/${order._id}`} key={order._id}>
                                        <Order {...order} key={order._id} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;
