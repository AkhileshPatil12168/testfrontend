import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "universal-cookie";

const Items = (props) => {
    const { title, quantity, price, productImage, productId, cUserId, setStatCode, index } = props;

    const [errMessage, setErrMessage] = useState("");
    const [isNotWorking, setIsNotWorking] = useState(false);
    const [bgColor, setBgColor] = useState("");
    useEffect(() => {
        if (index % 2 == 0) setBgColor("bg-gray-200");
    });

    const addOrRemove = async (parameter) => {
        try {
            let data = {
                productId: productId,
            };
            if (parameter == "+") data["value"] = 1;
            if (parameter == "-") {
                data["value"] = -1;
                setErrMessage("");
                setIsNotWorking(false);
            }
            let response = await axios.put(`https://mobileaccbackend.onrender.com/user/${cUserId}/cart`, data);
            setStatCode(response.status);
        } catch (error) {
            console.log(error.response);
            if (error.response.status == 400) {
                setErrMessage(error.response.data.message);
                setIsNotWorking(true);
            }
        }
    };

    return (
        <div
            className={`cart-item flex flex-col md:flex-row items-center mb-4 p-4 ${bgColor} border border-gray-300 rounded`}
        >
            <img
                src={productImage[0]}
                alt="Product Image"
                className="w-20 h-20 mr-0 md:mr-4 rounded mb-4 md:mb-0 "
            />

            <Link to={"/products/" + productId}>
                <div className="cart-item-details ">
                    <h3 className="text-xl font-bold mb-2">{title}</h3>
                    <p className="text-gray-600 mb-1">Quantity: {quantity}</p>
                    <p className="font-bold">Price: ₹{price}</p>
                </div>
            </Link>
            <div className="px-40">
                <div className="text-red-600 text-xl">{errMessage}</div>
            </div>

            <div className="item-actions flex items-center ml-auto mt-4 md:mt-0">
                <button
                    onClick={() => addOrRemove("-")}
                    className="quantity-btn bg-gray-300 text-gray-600 hover:bg-slate-900 hover:text-white rounded-full w-8 h-8 flex items-center justify-center mr-2"
                >
                    -
                </button>
                <span className="item-quantity">{quantity}</span>
                <button
                    disabled={isNotWorking}
                    onClick={() => addOrRemove("+")}
                    className="quantity-btn bg-gray-300 hover:bg-slate-900 hover:text-white  text-gray-600 rounded-full w-8 h-8 flex items-center justify-center ml-2"
                >
                    +
                </button>
            </div>
        </div>
    );
};

const Cart = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const cUserId = cookies.get("user");

    const [cart, setCart] = useState(null);
    const [statCode, setStatCode] = useState(null);

    const getCart = async () => {
        try {
            let response = await axios.get(`https://mobileaccbackend.onrender.com/user/${cUserId}/cart`);

            console.log(response.data.data);

            setCart(response.data.data);
        } catch (error) {
            console.log(error.response.data.message);
        }
    };
    const emptyCart = async () => {
        try {
            const response = await axios.delete(`https://mobileaccbackend.onrender.com/user/${cUserId}/cart`);

            setStatCode(response.status);

            setCart(null);
        } catch (error) {
            console.log(error.response.data.message);
        }
    };
    const createOrder = () => {
        console.log(cart);
        if (cart.totalItems != 0) {
            navigate("/user/create/order");
        }
    };
    useEffect(() => {
        setStatCode(null);
        getCart();
    }, [statCode]);

    return !cUserId ? (
        navigate("/login")
    ) : (
        <div className="container mx-auto p-4 bg-white rounded-lg shadow">
            <h1 className="text-center text-2xl font-bold mb-4">Cart</h1>
            <div className="max-h-[420]	 overflow-auto">
                {cart?.items.map((i, index) => {
                    return (
                        <Items
                            {...{ ...i, cUserId: cUserId, index: index }}
                            setStatCode={setStatCode}
                            key={i.productId}
                        />
                    );
                })}
            </div>
            <div className=" flex  justify-between  total-price  mt-4">
                <div>
                    <div>total Items: {cart?.totalItems}</div>
                    <div>total quantity: {cart?.totalQuantity}</div>
                </div>
                <div className="pt-6">Total Price: ₹{cart?.totalPrice}</div>
            </div>

            <div className="flex flex-col md:flex-row justify-end mt-4">
                <button
                    onClick={createOrder}
                    className="btn bg-blue-500 hover:bg-green-500 text-white px-4 py-2 rounded mb-2 md:mr-2 md:mb-0"
                >
                    Process Order
                </button>
                <button
                    onClick={emptyCart}
                    className="btn btn-secondary bg-gray-600  hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                    Empty Cart
                </button>
            </div>
        </div>
    );
};

export default Cart;
