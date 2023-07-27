import { useEffect } from "react";
import { useState } from "react";

const TestCss = () => {
    const [isHovered, setIsHovered] = useState(false);
    useEffect(() => {
        console.log(isHovered);
    }, [isHovered]);

    return (
        <div className="p-10 ">
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                //onMouseOut={() => setIsHovered(false)}
                className="h-20 w-1/2 bg-black   pr-4 py-4 border-gray-300 rounded-e-full "
            >
                <div
                    className={`h-full    ${
                        isHovered ? "scale-x-100 duration-1000 " : "scale-x-0 duration-500"
                    } rounded-e-full   origin-left  bg-green-500`}
                ></div>
            </div>
        </div>
    );
};
export default TestCss;
