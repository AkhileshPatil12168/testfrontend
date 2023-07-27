import Cookies from "universal-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const CreateProduct = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const cAdminId = cookies.get("admin");

    const [details, setDetails] = useState({
        title: "",
        description: "",
        price: 0,
        category: "",
        compatible_models: "",
        available_Quantity: 0,
        isFreeShipping: false,
    });

    const [uploadedImage, setUploadedImage] = useState(null);
    const [renderImage, setRenderImage] = useState(null);
    const [res, setRes] = useState("");
    const [statCode, setStatCode] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setRenderImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
        setUploadedImage(e.target.files);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let id, value;
        id = e.target.id;
        value = e.target.value;

        setDetails({ ...details, [id]: value });
        console.log(e.target.id);
    };
    const handelFreeShipping = (e) => {
        setDetails((prevDetails) => ({
            ...prevDetails,
            isFreeShipping: !prevDetails.isFreeShipping,
        }));
        console.log(details);
    };

    const postData = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();

            formData.append("image", uploadedImage[0]);
            for (let key in details) {
                formData.append(key, details[key]);
            }

            let response = await axios.post(
                `https://mobileaccbackend.onrender.com/admin/${cAdminId}/create/product`,
                formData
            );
            console.log(response);
            setRes(response.data.message);
            setStatCode(response?.status);

            if (response) setSignupData(response?.data?.data);
        } catch (error) {
            setRes(error?.response?.data.message);

            console.log(error?.response?.data.message);
        }
    };

    useEffect(() => {
        if (statCode == 201) {
        }
    }, [statCode]);

    return !cAdminId ? (
        navigate("/login")
    ) : (
        <div className="container mx-auto px-4 py-8  ">
            <h2 className="text-2xl font-bold mb-4 text-center">Create Product</h2>
            <div className="flex justify-center">
                <div className="h-auto w-3/4 bg-gray-200 ">
                    <form className="max-w-4xl mx-auto m-4">
                        <div className="flex p-4">
                            <div className="w-1/2 pr-4">
                                <label
                                    htmlFor="productImage"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Product Image
                                </label>
                                <input
                                    type="file"
                                    id="productImage"
                                    className="form-input w-full border bg-white border-gray-300 rounded py-2 px-3 mb-2"
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                    required
                                />
                                {uploadedImage && (
                                    <div className="w-full bg-white border border-gray-300 rounded overflow-hidden mb-4">
                                        <img
                                            src={renderImage}
                                            alt="Product"
                                            className="w-full h-auto"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="w-1/2 pl-4">
                                <div className="mb-4">
                                    <label
                                        htmlFor="title"
                                        className="block text-gray-700 font-medium mb-2"
                                    >
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        className="form-input w-full border border-gray-300 rounded py-2 px-3"
                                        value={details.title}
                                        onChange={handleSubmit}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="description"
                                        className="block text-gray-700 font-medium mb-2"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        className="form-textarea w-full border border-gray-300 rounded py-2 px-3"
                                        value={details.description}
                                        onChange={handleSubmit}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="price"
                                        className="block text-gray-700 font-medium mb-2"
                                    >
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        id="price"
                                        className="form-input w-full border border-gray-300 rounded py-2 px-3"
                                        value={details.price}
                                        onChange={handleSubmit}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="category"
                                        className="block text-gray-700 font-medium mb-2"
                                    >
                                        Category
                                    </label>
                                    <input
                                        type="text"
                                        id="category"
                                        className="form-input w-full border border-gray-300 rounded py-2 px-3"
                                        value={details.category}
                                        onChange={handleSubmit}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Compatible Models
                                    </label>
                                    <input
                                        type="text"
                                        id="compatible_models"
                                        className="form-input w-full border border-gray-300 rounded py-2 px-3"
                                        value={details.compatible_models}
                                        onChange={handleSubmit}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="availableQuantity"
                                        className="block text-gray-700 font-medium mb-2"
                                    >
                                        Available Quantity
                                    </label>
                                    <input
                                        type="number"
                                        id="available_Quantity"
                                        className="form-input w-full border border-gray-300 rounded py-2 px-3"
                                        value={details.available_Quantity}
                                        onChange={handleSubmit}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="isFreeShipping"
                                        className="block text-gray-700 font-medium mb-2"
                                    >
                                        Free Shipping
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="isFreeShipping"
                                        className="form-checkbox h-4 w-4 text-blue-500"
                                        checked={details.isFreeShipping}
                                        onChange={handelFreeShipping}
                                    />
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        onClick={postData}
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
                                    >
                                        Create
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;
