const ShimmerCard = () => {
    return (
        <div className="box-border  h-fit w-72 bg-blue-300  border-4 ml-14">
            <div className="h-72 w-64 bg-gray-200 m-2.5"></div>
            <div>
                <h1></h1>
                <h3></h3>
            </div>
        </div>
    );
};

const ShimmerBody = () => {
    return (
        <>
            <div className="flex flex-wrap w-fit p-10  ">
                {Array(4)
                    .fill("")
                    .map((s) => (
                        <ShimmerCard key={Math.random()} />
                    ))}
            </div>
        </>
    );
};
export default ShimmerBody;
