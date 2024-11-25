import Pageheader from "@/components/common/PageHeaderBanner/Pageheader";

const ChefsPageHeader = () => {
  const breadcrumbLinks = {
    mode: "dark",
    preLinks: [{ link: "/", name: "Home" }],
    pageName: "Chefs",
  };

  const img =
    "https://foodking-react.vercel.app/assets/img/banner/breadcrumb.jpg";

  return <Pageheader breadLink={breadcrumbLinks} img={img} title="OUR TEAM" />;
};

export default ChefsPageHeader;
