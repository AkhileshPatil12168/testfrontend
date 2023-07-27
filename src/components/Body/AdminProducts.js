import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Cookies from "universal-cookie";

const Product = (props) => {
    const { productImage, title, available_Quantity, price, index } = props;
    console.log(available_Quantity);
    const [bgColor, setBgColor] = useState("bg-white");
    useEffect(() => {
        if (index % 2 == 0) setBgColor("bg-gray-200");
    });
    return (
        <div className={`flex mb-2 ${bgColor} border border-gray-500 `}>
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
                    <strong>Quantity left:</strong> {available_Quantity}
                </p>
                <p className="mb-2">
                    <strong>Price:</strong> ₹{price}
                </p>
            </div>
        </div>
    );
};

const AdminProducts = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const cAdminId = cookies.get("admin");

    const [products, setProducts] = useState([]);

    const [recentProducts, setRecentProducts] = useState([]);
    const [outOfStock, setOutOfstock] = useState([]);
    const [nearToOutOfStock, setNearToOutOfStock] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`https://mobileaccbackend.onrender.com/products`);
            const allProducts = response.data.data;
            console.log(allProducts);
            setProducts(allProducts);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setRecentProducts(products.slice(0, 5));
        setOutOfstock(products.filter((product) => product.available_Quantity == 0));
        setNearToOutOfStock(
            products.filter(
                (product) => product.available_Quantity <= 10 && product.available_Quantity > 0
            )
        );
    }, [products]);

    useEffect(() => {
        fetchProducts();
    }, []);

    return !cAdminId ? (
        navigate("/login")
    ) : (
        <div className="mx-20 ">
            <div className="flex  py-4">
                <div className=" p-4  bg-white  h-[500px] ">
                    <p className="text-lg font-bold mb-4 text-center">Summery</p>
                    <div className="bg-gray-200 p-4 rounded overflow-y-auto  h-[300px] w-[400px]">
                        <p>total out of stock products: {outOfStock.length}</p>
                        <p>near to out of stock products: {nearToOutOfStock.length}</p>
                        <p>total products: {products.length}</p>
                    </div>
                    <div className="bg-white border border-gray-300 h-[100px] w-[300px] mt-2 ml-12 flex justify-evenly">
                        <Link to="/admin/create/product">
                            <div className="h-[70px] w-[270px]  mt-4 bg-green-300 hover:bg-green-500">
                                <p className="text-center pt-6 text-xl font-bold">
                                    ADD NEW PRODUCT
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="w-full">
                    <div className="border border-gray-300 rounded p-4  bg-white min-h-[50px] max-h-[500px]  ">
                        <p className="text-lg font-bold mb-4 text-center">Recent 5 products</p>
                        <div className="p-4 rounded overflow-y-auto min-h-[50px] max-h-[400px] ">
                            {recentProducts.map((product, index) => (
                                <Link to={`/admin/product/${product._id}`} key={product._id}>
                                    <Product {...product} index={index} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-200 p-4 h-[600px]">
                <div className="flex justify-around">
                    <div>
                        <div className="border border-gray-300 rounded p-4  bg-white min-h-[50px] max-h-[500px] w-auto">
                            <p className="text-lg font-bold mb-4 text-center">
                                out of stock products ({outOfStock.length})
                            </p>
                            <div className="flex justify-between mr-2 p-4 ">
                                <div className="bg-blue-200 p-4 rounded overflow-y-auto min-h-[50px] max-h-[400px] w-[500px]">
                                    {outOfStock.map((product, index) => (
                                        <Link
                                            to={`/admin/product/${product._id}`}
                                            key={product._id}
                                        >
                                            <Product {...product} index={index} />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="border border-gray-300 rounded p-4  bg-white min-h-[50px] max-h-[500px] w-auto">
                            <p className="text-lg font-bold mb-4 text-center">
                                near to out of stock ({nearToOutOfStock.length})
                            </p>
                            <div className="flex justify-between mr-2 p-4 ">
                                <div className="bg-blue-200 p-4 rounded overflow-y-auto min-h-[50px] max-h-[400px] w-[500px]">
                                    {nearToOutOfStock.map((product, index) => (
                                        <Link
                                            to={`/admin/product/${product._id}`}
                                            key={product._id}
                                        >
                                            <Product {...product} index={index} />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProducts;
