import Image from "next/image";
import Pageheader from "@/components/common/PageHeaderBanner/Pageheader";
import PopularBlog from "@/components/blog/PopularBlog";
import Blog_category from "../_components/Blog_Category";
import SocialLink from "@/components/blog/SocialLink";
import BlogHeaderInfo from "@/components/blog/BlogHeaderInfo";
import BlogCommentForm from "./_components/BlogCommentForm";
import BlogCommentDisplay from "./_components/BlogCommentDisplay";
import dynamic from "next/dynamic";

const RichTextViewer = dynamic(
  () => import("@/components/common/textEditor/richTextViewer"),
  { ssr: false }
);

export default async function BlogDetailsPage({
  params,
}: {
  params: Record<string, string>;
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/${params.blogId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch blog data");
  }
  const data = await res.json();
  const blogData = data?.data;

  const breadcrumbLinks = {
    mode: "dark",
    preLinks: [
      { link: "/", name: "Home" },
      { link: "/blog", name: "Blog Page" },
    ],
    pageName: "Blog Details",
  };

  return (
    <div>
      <div>
        <Pageheader
          img="https://foodking-react.vercel.app/assets/img/banner/breadcrumb.jpg"
          title="BLOG PAGE"
          breadLink={breadcrumbLinks}
        />
      </div>

      <div className="container  mt-5 md:mt-12 lg:mt-24 mb-14 mx-auto px-4 py-8">
        <div className="grid grid-cols-5 gap-x-20 gap-y-14">
          {/* blog post part */}
          <div className="col-span-5  lg:col-span-3">
            <article className="space-y-6">
              <h1 className="text-[30px] md:text-[44px] leading-[1.4] text-black font-extrabold  ">
                {blogData?.title}
              </h1>

              {/* for author name , blog total comments and publish date */}
              <BlogHeaderInfo blog={blogData!} />
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                <Image
                  src={
                    blogData?.image ||
                    "https://foodking-react.vercel.app/assets/img/news/post-1.jpg"
                  }
                  alt="Delicious burger with chicken nuggets"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <p className="text-[18px] leading-[28px]  text-[#5c5c5b] primary-gray font-normal">
                <RichTextViewer
                  type="details"
                  content={blogData?.description || ""}
                />
              </p>
            </article>
            <div className="text-black col-span-5 mx-5 lg:col-span-3">
              <BlogCommentDisplay blogData={blogData} />
            </div>
            <div className="text-black col-span-5 mx-5 lg:col-span-3">
              <BlogCommentForm blog={blogData!} />
            </div>
          </div>

          {/* blog sidebar part */}
          <div className=" col-span-5 lg:mt-4 lg:col-span-2">
            <PopularBlog blogId={params.blogId} />
            <Blog_category />
            <SocialLink />
          </div>
        </div>
      </div>
    </div>
  );
}
