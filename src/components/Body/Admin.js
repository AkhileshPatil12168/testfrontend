import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const Admin = () => {
    const cookies = new Cookies();
    const cToken = cookies.get("token");
    const cAdminId = cookies.get("admin");

    return (
        <div className="flex flex-wrap justify-center">
            <Link to={cToken && cAdminId ? "/admin/users/" : "/login"}>
                <div className="bg-blue-200 p-4 m-2 rounded-lg w-64">
                    <h2 className="text-lg font-bold text-center">Users</h2>
                </div>
            </Link>

            <Link to={cToken && cAdminId ? "/admin/orders/" : "/login"}>
                <div className="bg-blue-200 p-4 m-2 rounded-lg w-64">
                    <h2 className="text-lg font-bold text-center">Orders</h2>
                </div>
            </Link>

            <Link to={cToken && cAdminId ? "/admin/products/summery" : "/login"}>
                <div className="bg-blue-200 p-4 m-2 rounded-lg w-64">
                    <h2 className="text-lg font-bold text-center">Products</h2>
                </div>
            </Link>
        </div>
    );
};
export default Admin;
