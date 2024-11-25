/* eslint-disable @typescript-eslint/no-explicit-any */

import Pageheader from "@/components/common/PageHeaderBanner/Pageheader";
import BookOnline from "@/components/home/book-online";
import CustomerReviews from "@/components/home/customer-reviews";
import Image from "next/image";
import Link from "next/link";
import WhyBest from "@/components/home/why-best";
import MarqueeSec from "@/components/common/Marquee/MarqueeSec";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import ButtonPrimary from "@/components/common/button/buttonPrimary";

export default async function ChefDetails({ params }: any) {
  const { chefId } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/staff/${chefId}`
  );
  const data = await res.json();
  const chef = data.data;

  const breadcrumbLinks = {
    mode: "dark",
    preLinks: [
      { link: "/", name: "Home" },

      { link: "/chefs", name: "Chefs" },
    ],
    pageName: chef.name,
  };
  const img =
    "https://foodking-react.vercel.app/assets/img/banner/breadcrumb.jpg";

  return (
    <div>
      <Pageheader img={img} title="CHEF DETAILS" breadLink={breadcrumbLinks} />
      <div className="container pt-10 mx-auto text-black p-6">
        <div className="grid md:grid-cols-2 justify-center items-center gap-8 lg:gap-20 ">
          <div className="relative">
            <Image
              alt="Restaurant manager holding a plate of pasta"
              className="rounded-lg  h-[500px]   w-full"
              height={600}
              src={chef.image}
              width={500}
            />
          </div>
          <div className="space-y-4 ">
            <h1 className="text-4xl uppercase lg:text-5xl font-bold tracking-tight">
              {chef.name}
            </h1>
            <p className="text-lg text-muted-foreground">{chef.designation}</p>

            <p className="text-muted-foreground">{chef.bio}</p>

            {/* Social media icons */}
            <div className="flex  items-center gap-6 py-6 relative z-10">
              <div className="mt-5">
                <ul className="flex items-center  gap-x-4">
                  <li>
                    {chef.facebookLink && (
                      <Link href={chef.facebookLink || "#"}>
                        <FaFacebook className="text-5xl hover:bg-primary-orange hover:text-white bg-[#e9e6e6] text-black rounded-full p-3" />
                      </Link>
                    )}
                  </li>
                  <li>
                    {chef.linkedinLink && (
                      <Link href={chef.linkedinLink || "#"}>
                        <FaLinkedin className="text-5xl hover:bg-primary-orange hover:text-white bg-[#e9e6e6] text-black rounded-full p-3" />
                      </Link>
                    )}
                  </li>
                  <li>
                    {chef.youtubeLink && (
                      <Link href={chef.youtubeLink || "#"}>
                        <FaYoutube className="text-5xl hover:bg-primary-orange hover:text-white bg-[#e9e6e6] text-black rounded-full p-3" />
                      </Link>
                    )}
                  </li>
                  <li>
                    {chef.instagramLink && (
                      <Link href={chef.instagramLink || "#"}>
                        <FaInstagram className="text-5xl hover:bg-primary-orange hover:text-white bg-[#e9e6e6] text-black rounded-full p-3" />
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            </div>

            <Link href={"/contact"}>
              <div className="flex justify-center md:justify-start items-center">
                <ButtonPrimary text="Book Contact with me" btnType="submit" />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <BookOnline />
      <MarqueeSec />
      <CustomerReviews />
      <WhyBest />
    </div>
  );
}
