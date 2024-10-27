interface Props {
    heading: string;
    title: string;
    headingTextColor?: string;
    textPosition?: "left" | "center" | "right";
}

const SectionHeader = ({
    heading,
    title,
    headingTextColor,
    textPosition,
}: Props) => {
    return (
        <div>
            <p
                className={`text-primary-orange text-center md:text-${
                    textPosition ? textPosition : "center"
                } text-xl md:text-2xl lg:text-[30px] font-pacifico mb-2 md:mb-3 lg:mb-5`}
            >
                {title}
            </p>
            <h2
                className={`${
                    headingTextColor ? headingTextColor : "text-primary-black"
                } text-center md:text-${
                    textPosition ? textPosition : "center"
                } text-5xl md:text-6xl lg:text-[70px] uppercase font-bold tracking-wide`}
            >
                {heading}
            </h2>
        </div>
    );
};

export default SectionHeader;
