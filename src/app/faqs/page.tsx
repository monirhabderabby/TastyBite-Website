import Pageheader from "@/components/common/PageHeaderBanner/Pageheader";
import FaqComponent from "./faqComponent";

const Page = () => {
  const breadcrumbLinks = {
    mode: "dark",
    preLinks: [{ link: "/", name: "Home" }],
    pageName: "FAQ PAGE",
  };
  return (
    <div>
      <Pageheader
        img="https://utfs.io/f/oI7Ou0bdQ6rjyuWH9qZmawxvB8dF9SHPlQoWAbCuyU4hqriR"
        title="FAQ PAGE"
        breadLink={breadcrumbLinks}
      />
      <FaqComponent/>
    </div>
  );
};

export default Page;
