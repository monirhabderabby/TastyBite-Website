const SectionHeader = ({
    heading,
    title,
    headingTextColor,
}: {
    heading: string;
    title: string;
    headingTextColor?: string;
}) => {
    return (
        <div>
            <p className="text-primary-orange text-center text-xl md:text-2xl lg:text-[30px] font-pacifico mb-2 md:mb-3 lg:mb-5">
                {title}
            </p>
            <h2
                className={`${
                    headingTextColor ? headingTextColor : "text-primary-black"
                } text-center text-5xl md:text-6xl lg:text-[70px] uppercase font-bold tracking-wide`}
            >
                {heading}
            </h2>
        </div>
    );
};

export default SectionHeader;
