import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

const Title = () => {
    return (
        <Link to="/">
            <img className="h-24  p-2 static " src={logo} alt="Mobile Accessorys"></img>
        </Link>
    );
};

export default Title;
