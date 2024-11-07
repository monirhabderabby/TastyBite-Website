/* eslint-disable @typescript-eslint/no-explicit-any */
import { Facebook, Linkedin, Youtube, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import Pageheader from "@/components/common/PageHeaderBanner/Pageheader";
import BookOnline from "@/components/home/book-online";
import CustomerReviews from "@/components/home/customer-reviews";
import Image from "next/image";
import Link from "next/link";
import WhyBest from "@/components/home/why-best";
import MarqueeSec from "@/components/common/Marquee/MarqueeSec";

export default async function ChefDetails({ params }: any) {
  const { chefId } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/staff/${chefId}`
  );
  const data = await res.json();
  const chef = data.data;
  console.log(chef);

  const breadcrumbLinks = {
    mode: "dark",
    preLinks: [{ link: "/", name: "Home" }],
    pageName: "Chefs",
  };
  const img =
    "https://foodking-react.vercel.app/assets/img/banner/breadcrumb.jpg";

  return (
    <div>
      <Pageheader img={img} title="CHEF DETAILS" breadLink={breadcrumbLinks} />
      <div className="container pt-10 mx-auto text-black p-6">
        <div className="grid md:grid-cols-2  gap-8 items-start">
          <div className="relative">
            <Image
              alt="Restaurant manager holding a plate of pasta"
              className="rounded-lg object-cover w-full"
              height={400}
              src={chef.image}
              width={500}
            />
          </div>
          <div className="space-y-4 md:mt-40">
            <h1 className="text-4xl uppercase lg:text-5xl font-bold tracking-tight">
              {chef.name}
            </h1>
            <p className="text-lg text-muted-foreground">{chef.designation}</p>

            <p className="text-muted-foreground">{chef.bio}</p>

            {/* Social media icons */}
            <div className="flex  items-center gap-6 py-6 relative z-10">
              {chef.facebookLink && (
                <Link
                  href={chef.facebookLink || "#"}
                  className="text-primary-orange hover:opacity-80"
                >
                  <Facebook size={24} />
                </Link>
              )}
              {chef.linkedinLink && (
                <Link
                  href={chef.linkedinLink || "#"}
                  className="text-primary-orange  hover:opacity-80"
                >
                  <Linkedin size={24} />
                </Link>
              )}
              {chef.youtubeLink && (
                <Link
                  href={chef.youtubeLink || "#"}
                  className="text-primary-orange hover:opacity-80"
                >
                  <Youtube size={24} />
                </Link>
              )}
              {chef.instagramLink && (
                <Link
                  href={chef.instagramLink || "#"}
                  className="text-primary-orange hover:opacity-80"
                >
                  <Instagram size={24} />
                </Link>
              )}
            </div>

            <Link href={"/contact"}>
              <Button className="w-full py-6 text-xl font-bold text-black hover:bg-primary-orange bg-primary-orange">
                CONTACT WITH ME
              </Button>
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
