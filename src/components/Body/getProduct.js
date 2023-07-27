import Cookies from "universal-cookie";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Product = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const cUserId = cookies.get("user");
    const { id } = useParams();
    console.log(id);

    const [product, setProduct] = useState();
    const [text, setText] = useState("");

    async function getProduct() {
        try {
            const response = await axios.get("https://mobileaccbackend.onrender.com/products/" + `${id}`);
            setProduct(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }
    async function addToCart() {
        if (!cUserId) navigate("/login");
        else {
            let response = await axios.put(`https://mobileaccbackend.onrender.com/user/${cUserId}/cart`, {
                productId: id,
                value: 1,
            });
            function message() {
                setText("add into cart");
            }
            added();
            function added() {
                setText("added into cart");
                setTimeout(() => setText(""), 2000);
            }
        }
    }
    useEffect(() => {
        getProduct();
    }, []);

    return product ? (
        // <div className="mt-24">
        //     <img src={product?.productImage[0]}></img>
        //     <h1>{product?.title}</h1>
        // </div>
        <div className="m-0 p-0">
            <div className="w-full max-w-[1200px] bg-white flex mx-auto my-0 p-5">
                <div className="flex-[0_0_50%] mr-5">
                    <img
                        className="max-w-full h-auto"
                        src={product?.productImage[0]}
                        alt="Product Image"
                    />
                </div>
                <div className="flex-1">
                    <h1 className="text-[28px] mb-2.5">{product?.title}</h1>
                    <p className="leading-[1.6] text-[#555] mb-5">
                        Description : {product?.description}
                    </p>
                    <p className="text-2xl text-[#ff5722] mb-2.5">Price: {product?.price}</p>
                    <p className="product-category">Category: {product?.category.join(", ")}</p>
                    <p className="product-compatible-models">
                        Compatible Models: {product?.compatible_models.join(", ")}
                    </p>
                    <p className="product-shipping">
                        Free Shipping: {product?.isFreeShipping ? "yes" : "no"}
                    </p>
                    <p className="product-quantity">
                        Available Quantity: {product?.available_Quantity}
                    </p>
                    {/* <a href="#" className="inline-block bg-[#ff5722] text-white no-underline rounded text-lg transition-[background-color] duration-[0.3s] px-5 py-2.5 hover:bg-[#f44336]">
                        Add to Cart
                    </a> */}
                    <div>
                        <button
                            type="submit"
                            name="addOne"
                            className="inline-block bg-[#ff5722] text-white no-underline rounded text-lg transition-[background-color] duration-[0.3s] px-5 py-2.5 hover:bg-[#f44336]"
                            onClick={addToCart}
                        >
                            Add to Cart
                        </button>
                    </div>
                    <div>
                        <p className="text-green-500 ">{text}</p>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <h1>no data </h1>
    );
};

export default Product;
