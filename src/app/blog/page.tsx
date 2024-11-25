//components
import AdsBanner from "@/components/blog/AdsBanner";
import PopularBlog from "@/components/blog/PopularBlog";
import SocialLink from "@/components/blog/SocialLink";
import Pageheader from "@/components/common/PageHeaderBanner/Pageheader";
import Blog_category from "./_components/Blog_Category";
import About_data from "./_components/Blog_Data";

const breadcrumbLinks = {
    mode: "dark",
    preLinks: [{ link: "/", name: "Home" }],
    pageName: "Blog Page",
};

const BlogPage = () => {
    return (
        <div>
            {/* Blog header Banner part */}
            <div>
                <Pageheader
                    img="https://utfs.io/f/oI7Ou0bdQ6rjyuWH9qZmawxvB8dF9SHPlQoWAbCuyU4hqriR"
                    title="BLOG PAGE"
                    breadLink={breadcrumbLinks}
                />
            </div>
            {/* blog main content part  */}
            <div className="container mt-5 md:mt-12 lg:mt-24 mb-14">
                <div className="grid grid-cols-5 gap-x-20 gap-y-14">
                    {/* blog post part */}
                    <div className="col-span-5  lg:col-span-3">
                        <About_data />
                        <AdsBanner />
                    </div>

                    {/* blog sidebar part */}
                    <div className="col-span-5  lg:mt-4 lg:col-span-2 space-y-20">
                        {/* <Blog_Search /> */}
                        <PopularBlog blogId="" />
                        <Blog_category />
                        <SocialLink />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
