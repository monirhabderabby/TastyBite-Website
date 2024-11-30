"use client";

// Packages
import Link from "next/link";

// Local imports
import Logo from "@/components/common/logo/Logo";
import { footerLinks, socialLinks } from "@/data/footer";
import { setMenu } from "@/redux/features/filter/filterSlice";
import { useGetAllMenusQuery } from "@/redux/features/menu/menuApi";
import { TMenu } from "@/types";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const Footer = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { data: menuData } = useGetAllMenusQuery({});

    const handleMenuChange = (_id: string) => {
        dispatch(setMenu(_id));
        router.push(`/foods`);
    };

    return (
        <footer className="bg-primary-black">
            <section className="border-b border-white/10 py-[50px] md:py-[100px]">
                <div className="container grid grid-cols-2 md:grid-cols-4 gap-5 lg:gap-x-8 xl:gap-x-16">
                    {/* 1st item */}
                    <div className="space-y-5">
                        <div className="space-y-2">
                            <Logo />
                            <p className="text-[14px] text-white">
                                20 Carrochan Rd, Balloch, Alexandria G83 8EG, UK
                                69QJ+2F Alexandria, United Kingdom
                            </p>
                        </div>
                        <div className="space-y-2">
                            <p>PHONE: +8801956306002</p>
                            <p>EMAIL: info@tastybite.com</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white text-[20px]">TOP ITEMS</h3>
                        <div className="flex flex-col gap-y-2 mt-[20px]">
                            {menuData?.data.map((menu: TMenu) => (
                                <p
                                    key={menu.name}
                                    className={`hover:text-primary-orange transition-colors duration-300 w-fit cursor-pointer`}
                                    onClick={() => handleMenuChange(menu._id)}
                                >
                                    {menu.name}
                                </p>
                            ))}
                        </div>
                    </div>

                    {footerLinks.map(({ id, links, title }) => (
                        <div key={id}>
                            <h3 className="text-white text-[20px]">{title}</h3>
                            <div className="flex flex-col gap-y-2 mt-[20px]">
                                {links.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={item.href}
                                        className="hover:text-primary-orange transition-colors duration-300 w-fit"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <CopyRightMarker />
        </footer>
    );
};

export default Footer;

const CopyRightMarker = () => {
    return (
        <section className="h-[80px] w-full container flex justify-between items-center">
            <h6 className="text-[14px]">
                &copy; TastyBite all Rights Reserved. Designed by{" "}
                <span className="text-primary-orange">NextGen Dev</span>
            </h6>
            <div className="flex items-center gap-x-3">
                {socialLinks.map(({ href, icon: Icon, id, name }) => (
                    <a key={id} href={href} target={`_${name}`}>
                        <Icon className="h-5 w-5 text-white/80 transition-colors duration-300 hover:text-primary-orange" />
                    </a>
                ))}
            </div>
        </section>
    );
};
