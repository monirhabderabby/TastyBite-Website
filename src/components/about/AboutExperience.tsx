import Image from "next/image";
import AboutSectionHeading from "./AboutSectionHeading";

const AboutExperience = () => {
    return (
        <div className="grid grid-cols-1 container my-12 md:my-16 md:grid-cols-2 gap-5 items-center">
            {/* about tastybite experience details */}
            <div>
                {/* heading dynamic part add */}
                <AboutSectionHeading
                    title="Modern Cuisine"
                    subtitle="Experience"
                />
                {/* details part*/}
                <p className="text-base pt-4 md:text-start text-center font-normal text-primary-black">
                    Sit amet, consectetur adipiscing elit quisque eget maximus
                    velit, non eleifend libero curabitur dapibus mauris sed leo
                    cursus aliquetcras suscipit. Sit amet, consectetur
                    adipiscing elit quisque eget maximus velit, non eleifend
                    libero curabitur Sit amet, consectetur adipiscing elit
                    quisque eget maximus velit, non eleifend libero curabitur
                    dapibus mauris sed leo cursus aliquetcras suscipit. Sit
                    amet.
                </p>
            </div>
            {/* about img part */}
            <div>
                <Image
                    src={
                        "https://utfs.io/f/oI7Ou0bdQ6rjN216ksh6KsLtupkQUaxmXrdCbOHyZcgD1Vi3"
                    }
                    width={700}
                    height={700}
                    alt="Tastybite image"
                />
            </div>
        </div>
    );
};

export default AboutExperience;
