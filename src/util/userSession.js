// import { useState, useEffect } from "react";
// import Title from "./Title";
// import { Link, useNavigate  } from "react-router-dom";
// import Cookies from "universal-cookie";

// const userSession=()=>{
// const cookies = new Cookies();
//     const navigate = useNavigate();
    
//     const [isLogedIn, setLogedIn] = useState(false);
//     const [token, setToken] = useState(false);
//     const handleLogout=()=>{
//         cookies.remove("token", { path: "/" });
//         setLogedIn(false)
//        // navigate("/");
//     }

//    useEffect(() => {
//     const cToken = cookies.get("token");
//     if (cToken) {
//       setLogedIn(true);
//       setToken(cToken);
//     }
//     }, []);


// }