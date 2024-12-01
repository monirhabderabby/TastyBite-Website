import Image from "next/image";
import AboutImage from "../../../public/images/about-page-1.webp";
import AboutSectionHeading from "./AboutSectionHeading";

const AboutTastybite = () => {
    return (
        <div className="grid grid-cols-1 container mt-6 md:mt-14 md:grid-cols-2 gap-5 md:gap-5 items-center">
            {/* about img part add*/}
            <div>
                <Image
                    src={AboutImage}
                    width={700}
                    height={700}
                    alt="Tastybite image"
                />
            </div>
            {/* about tastybite details part add*/}
            <div>
                {/* heading */}
                <AboutSectionHeading
                    title="Delicious Restaurant"
                    subtitle="ABOUT TASTYBITE"
                />
                {/* details */}
                <p className="text-base pt-4 text-center md:text-start font-normal text-primary-black">
                    TastyBite is a well-loved brand offering an extensive range
                    of ready-to-eat meals inspired by diverse global cuisines,
                    including Indian, Asian, and Mexican flavors. Known for its
                    commitment to natural ingredients and authentic taste,
                    TastyBite brings flavorful, convenient dining solutions to
                    homes. Their meals are crafted to deliver quality,
                    satisfying experiences in minutes, perfect for busy
                    lifestyles.
                </p>
            </div>
        </div>
    );
};

export default AboutTastybite;
