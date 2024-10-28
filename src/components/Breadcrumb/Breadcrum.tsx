import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type preLink = {
  link: string;
  name: string;
};

export type TLinks = {
  preLinks: preLink[];
  pageName: string;
};

const BreadcrumbComponent = ({ links }: { links: TLinks }) => {
  return (
    <Breadcrumb className="">
      <BreadcrumbList>
        {links.preLinks.map((preLink) => (
          <div className="flex text-lg items-center" key={preLink?.name}>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="hover:text-primary-orange font-medium"
                href={preLink.link}
              >
                {preLink?.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="mt-[2px] ml-[5px] " />
          </div>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage className="font-medium text-lg">
            {links?.pageName}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
