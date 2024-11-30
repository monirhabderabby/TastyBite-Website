import { Facebook, Linkedin, LucideIcon } from "lucide-react";

export type socialLinkProps = {
    id: number;
    name: string;
    icon: LucideIcon;
    href: string;
};
export type footerLinkProps = {
    id: number;
    name: string;
    href: string;
};
export type footerLinksProps = {
    id: number;
    title: string;
    links: footerLinkProps[];
};

// social links
export const socialLinks = [
    {
        id: 1,
        name: "Facebook",
        icon: Facebook,
        href: "https://www.facebook.com",
    },
    {
        id: 3,
        name: "LinkedIn",
        icon: Linkedin,
        href: "https://www.linkedin.com/feed/",
    },
] as socialLinkProps[];

// footer links
export const footerLinks = [
    {
        id: 1,
        title: "INFORMATION",
        links: [
            {
                id: 1,
                name: "Home",
                href: "/",
            },
            {
                id: 2,
                name: "Blog",
                href: "/blog",
            },
            {
                id: 3,
                name: "About Us",
                href: "/about",
            },
            {
                id: 4,
                name: "Foods",
                href: "/foods",
            },
            {
                id: 5,
                name: "Contact Us",
                href: "/contact",
            },
        ],
    },
    {
        id: 2,
        title: "USEFUL LINKS",
        links: [
            {
                id: 1,
                name: "Privacy Policy",
                href: "/privacy-policy",
            },

            {
                id: 3,
                name: "Return Policy",
                href: "/return-policy",
            },
            {
                id: 4,
                name: "Contact",
                href: "/contact",
            },
            {
                id: 5,
                name: "My account",
                href: "/profile",
            },
        ],
    },
] as footerLinksProps[];
