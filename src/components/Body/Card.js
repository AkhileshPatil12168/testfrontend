import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Card = (props) => {
    const navigate = useNavigate();
    const { _id, productImage, title, price, cUserId } = props;
    const [text, setText] = useState("Add to cart");
    const [color, setColor] = useState("bg-blue-500");
    const [hcolor, setHColor] = useState("bg-blue-700");
    const [res, setRes] = useState();
    console.log(_id);

    async function addToCart() {
        try {
            if (!cUserId) navigate("/login");
            else {
                let response = await axios.put(`https://mobileaccbackend.onrender.com/user/${cUserId}/cart`, {
                    productId: _id,
                    value: 1,
                });
                setRes(response.status);
            }
        } catch (error) {
            console.log(error);
            setRes(error.response.status);
        }
    }
    useEffect(() => {
        if (res == 201) {
            setText("Added");
            setColor("bg-green-500");
            setHColor("bg-green-500");
            setTimeout(() => {
                setText("Add to cart");
                setColor("bg-blue-500");
                setHColor("bg-blue-700");
                setRes();
            }, 1000 / 2);
        }
    }, [res]);

    return (
        <div className="box-border  h-[420px] w-80 bg-blue-300  border-4 m-4 hover:scale-110 duration-1000">
            <Link to={"/product/" + _id}>
                <img src={productImage[0]} className="h-72 w-72 bg-white m-2.5"></img>
            </Link>
            <div className="m-2 pb-4">
                <Link to={"/product/" + _id}>
                    <p className="h-[58px]">
                        {title.length >= 70 ? title.slice(0, 70) + "..." : title}
                    </p>
                </Link>
                <div className="flex ">
                    <p className="w-32 pt-2">price : {price + " ₹"}</p>
                    {cUserId ? (
                        <div
                            onClick={addToCart}
                            className={`cursor-pointer h-10 w-28 ${color}  text-white hover:${hcolor} ml-20  text-center pt-2`}
                        >
                            {text}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Card;
