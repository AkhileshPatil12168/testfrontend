import Title from "./Title";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Header = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();

    const cToken = cookies.get("token");
    const cUserId = cookies.get("user");
    const cAdminId = cookies.get("admin");
    console.log(cUserId);
    const handleLogout = () => {
        cookies.remove("token", { path: "/" });
        cookies.remove("user", { path: "/" });
        cookies.remove("admin", { path: "/" });
        navigate("/");
    };

    return (
        <div className="flex flex-col md:flex-row justify-between bg-blue-200 w-full h-full">
            <Title />
            {cAdminId ? (
                <ul className="flex py-7">
                    <Link className="hover:text-2xl duration-300 hover:font-bold" to="/">
                        <li className="px-2">Home</li>
                    </Link>
                    <Link
                        className="hover:text-2xl duration-300 hover:font-bold"
                        to={cToken && cAdminId ? "/admin/users" : "/login"}
                    >
                        <li className="px-2">Users</li>
                    </Link>
                    <Link
                        className="hover:text-2xl duration-300 hover:font-bold"
                        to={cToken && cAdminId ? "/admin/orders" : "/login"}
                    >
                        <li className="px-2">Orders</li>
                    </Link>
                    <Link
                        className="hover:text-2xl duration-300 hover:font-bold"
                        to={cToken && cAdminId ? "/admin/products/summery" : "/login"}
                    >
                        <li className="px-2">Products</li>
                    </Link>
                    <Link
                        className="hover:text-2xl duration-300 hover:font-bold"
                        to={cToken && cAdminId ? "/user/account" : "/login"}
                    >
                        <li className="px-2">Your Account</li>
                    </Link>
                </ul>
            ) : (
                <ul className="flex py-7">
                    <li className="px-2">
                        <Link to="/" className="hover:text-2xl duration-300 hover:font-bold">
                            Home
                        </Link>
                    </li>
                    <Link
                        className="hover:text-2xl duration-300 hover:font-bold"
                        to={cToken && cUserId ? "/orders" : "/login"}
                    >
                        <li className="px-2">Orders</li>
                    </Link>
                    <Link
                        className="hover:text-2xl duration-300 hover:font-bold"
                        to={cToken && cUserId ? "/cart" : "/login"}
                    >
                        <li className="px-2">Cart</li>
                    </Link>
                    <Link
                        className="hover:text-2xl duration-300 hover:font-bold"
                        to={cToken && cUserId ? "/contactus" : "/login"}
                    >
                        <li className="px-2">Contact Us</li>
                    </Link>
                    <Link
                        className="hover:text-2xl duration-300 hover:font-bold"
                        to={cToken && cUserId ? "/user/account" : "/login"}
                    >
                        <li className="px-2">Your Account</li>
                    </Link>
                </ul>
            )}

            {cToken && (cUserId || cAdminId) ? (
                <button
                    className="m-2 mr-4 w-24 h-16 bg-blue-500 text-white rounded-md"
                    onClick={() => {
                        handleLogout();
                    }}
                >
                    Logout
                </button>
            ) : (
                <div className="pt-4">
                    <Link to="/login">
                        <button className="w-20 h-12 bg-blue-500 text-white">Login</button>
                    </Link>
                    <Link to="/signup">
                        <button className="m-2 w-20 h-12 bg-blue-500 text-white">Signup</button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Header;
