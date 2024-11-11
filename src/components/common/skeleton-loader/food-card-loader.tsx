const FoodCardLoader = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-y-3 overflow-hidden w-[160px] md:w-[240px] h-auto mx-auto animate-pulse">
            <div className="relative w-full h-40 md:h-60 bg-gray-300 rounded-md" />
            <div className="mt-3 space-y-2 w-full">
                <div className="h-6 bg-gray-300 rounded-md w-3/4 mx-auto" />
                <div className="h-5 bg-gray-300 rounded-md w-1/2 mx-auto" />
            </div>
        </div>
    );
};

export default FoodCardLoader;
