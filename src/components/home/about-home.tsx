import Image from "next/image";
import aboutImg from "../../../public/images/about-us.png";
import ButtonPrimary from "../common/button/buttonPrimary";
import SectionHeader from "../common/sectionHeader/sectionHeader";

const AboutHome = () => {
    return (
        <div className="my-6 md:my-20 container">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <div className="mb-5">
                        <SectionHeader
                            heading="ABOUT TASTYBITE"
                            title="Delicious Restaurant"
                            textPosition="left"
                        />
                    </div>
                    <p className="text-sm mb-6 text-primary-black max-w-[480px] text-center md:text-left">
                        Founded on a passion for delivering not just pizzas, but
                        memorable moments, Pizzon is more than a pizza
                        place—it&apos;s a culinary journey. Join us in savoring
                        the artistry of flavors, where every bite tells a story
                        of quality, creativity, and devotion. Come, indulge in
                        the pizza experience you deserve. Welcome to the home of
                        extraordinary pizzas, where every slice is an invitation
                        to culinary delight.
                    </p>
                    <div className="flex justify-center md:justify-start items-center">
                        <ButtonPrimary text="View More" />
                    </div>
                </div>
                <div>
                    <Image
                        src={aboutImg}
                        alt="About image"
                        width={300}
                        height={578}
                    />
                </div>
            </div>
        </div>
    );
};

export default AboutHome;
