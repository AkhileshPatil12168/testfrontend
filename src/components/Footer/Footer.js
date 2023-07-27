import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto flex justify-center items-center">
                <div className="flex space-x-4">
                    <div>
                        <Link to="/aboutus" className="hover:text-gray-500">
                            About Us
                        </Link>
                    </div>
                    <div className="pl-10 flex ">
                        <Link to="https://www.facebook.com" className="mr-5">
                            <p className="text-white hover:text-gray-500">Facebook</p>
                        </Link>
                        <Link to="https://www.twitter.com" className="mr-5">
                            <p className="text-white hover:text-gray-500">Twitter</p>
                        </Link>
                        <Link to="https://www.instagram.com" className="mr-5">
                            <p className="text-white hover:text-gray-500">Instagram</p>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
