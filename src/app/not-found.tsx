import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div>
      <div className="mt-10 mx-auto space-y-6 p-20">
        <div className=" max-w-[900px]  mx-auto">
          <Image
            src={
              "https://pizzon.myshopify.com/cdn/shop/files/404_cc1c69c6-3b2d-4bd1-8b02-a3d806cb8194_720x.jpg?v=1715432684"
            }
            alt="notfound"
            className="mx-auto"
            width={1200}
            height={600}
          />
        </div>

        <p className="text-black text-3xl md:text-5xl lg:text-6xl text-center font-bold">
          page not found
        </p>
        <p className="text-3xl text-center text-primary-gray">
          We&apos;re sorry, The page you are looking for on longer exists.
        </p>
        <div className="flex justify-center items-center mt-5">
          <Link href={"/"}>
            {" "}
            <Button className="uppercase text-white hover:text-primary-orange bg-primary-orange hover:bg-transparent rounded-[50px] text-base px-[41px] py-[14px] h-[50px] tracking-wide border-[1px] border-primary-orange font-semibold duration-300">
              Back To Home
            </Button>{" "}
          </Link>
        </div>

        {/* <ButtonPrimary text="Back To Home"   onClick={()=> redirect("/")} /> */}
      </div>
    </div>
  );
};

export default NotFoundPage;
