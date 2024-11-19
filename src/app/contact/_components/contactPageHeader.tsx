import Pageheader from "@/components/common/PageHeaderBanner/Pageheader";

const ContactPageHeader = () => {
  const breadcrumbLinks = {
    mode: "dark",
    preLinks: [{ link: "/", name: "Home" }],
    pageName: "Contact",
  };

  const img =
    "https://foodking-react.vercel.app/assets/img/banner/breadcrumb.jpg";

  return <Pageheader breadLink={breadcrumbLinks} img={img} title="Contact Us" />;
};

export default ContactPageHeader;
