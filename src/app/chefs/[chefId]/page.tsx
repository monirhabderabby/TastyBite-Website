import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Pageheader from "@/components/common/PageHeaderBanner/Pageheader";
import BookOnline from "@/components/home/book-online";
import CustomerReviews from "@/components/home/customer-reviews";
import Image from "next/image";

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
      <div className="container pt-20 mx-auto text-black p-6">
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
          <div className="space-y-4 mt-20">
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="text-sm text-muted-foreground">(5k)</span>
            </div>

            <h1 className="text-4xl uppercase lg:text-5xl font-bold tracking-tight">
              {chef.name}
            </h1>
            <p className="text-lg text-muted-foreground">{chef.designation}</p>

            <p className="text-muted-foreground">{chef.bio}</p>

            <div className="flex  gap-4">
              <Button variant="outline" size="icon">
                <FacebookIcon className="w-4 h-4" />
                <span className="sr-only">Share on Facebook</span>
              </Button>
              <Button variant="outline" size="icon">
                <TwitterIcon className="w-4 h-4" />
                <span className="sr-only">Share on Twitter</span>
              </Button>
              <Button variant="outline" size="icon">
                <VimeoIcon className="w-4 h-4" />
                <span className="sr-only">Share on Vimeo</span>
              </Button>
              <Button variant="outline" size="icon">
                <PinterestIcon className="w-4 h-4" />
                <span className="sr-only">Share on Pinterest</span>
              </Button>
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700">
              CONTACT WITH ME
            </Button>
          </div>
        </div>
      </div>
      <BookOnline />
      <CustomerReviews />
    </div>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function VimeoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 7s-2.9 8.8-5 8.8c-3.8 0-3.8-11.3-7.5-11.3C5.8 4.5 2 13.3 2 13.3" />
    </svg>
  );
}

function PinterestIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="17" y2="22" />
      <path d="M12 17c5 0 8-3.134 8-7s-3-7-8-7-8 3.134-8 7 3 7 8 7Z" />
      <line x1="12" x2="12" y1="3" y2="17" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12" y1="3" y2="17" />
    </svg>
  );
}
