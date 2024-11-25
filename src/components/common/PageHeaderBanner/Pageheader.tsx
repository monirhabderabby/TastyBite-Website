/* eslint-disable @typescript-eslint/no-explicit-any */
import BreadcrumbComponent from "@/components/Breadcrumb/Breadcrum";
import Image from "next/image";
// shadcnUI

type Props = {
  img: string;
  title: string;
  breadLink: any;
};

const Pageheader = ({ img, title, breadLink }: Props) => {
  return (
    <div className="overflow-hidden relative mt-[60px]">
      <Image
        src={img}
        alt="About-Img"
        width={500}
        height={500}
        className="h-[220px] md:h-[235px] lg:h-[250px] bg-cover bg-no-repeat bg-gray-100"
        sizes="(min-height: 808px) 50vw, 100vw"
        style={{
          width: "100%",
        }}
      />
      {/* overlap bg color */}
      <div className="absolute top-0 inset-0 bg-black opacity-75"></div>
      {/* title or breadcrumb */}
      <div className="lg:text-5xl md:text-4xl text-3xl text-white font-bold absolute top-1/2 -translate-x-1/2  -translate-y-1/2  left-1/2">
        <div className="flex justify-center items-center flex-col">
          <h2 className="text-white">{title}</h2>
         <div  className="md:pt-4 pt-3">

          <BreadcrumbComponent  links={breadLink} />
         </div>

        
        </div>
      </div>
    </div>
  );
};

export default Pageheader;
