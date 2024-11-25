import { Facebook, Instagram, LucideIcon, TwitterIcon } from "lucide-react";

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
    id: 2,
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com",
  },
  {
    id: 3,
    name: "X",
    icon: TwitterIcon,
    href: "https://x.com/home",
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
        name: "Menu",
        href: "/menu",
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
    title: "TOP ITEMS",
    links: [
      {
        id: 1,
        name: "Burrata Pizza",
        href: "/",
      },
      {
        id: 2,
        name: "Cheese pizza",
        href: "/",
      },
      {
        id: 3,
        name: "Italian Pizza",
        href: "/",
      },
      {
        id: 4,
        name: "Sollow Burger",
        href: "/",
      },
      {
        id: 5,
        name: "Double Cheese Pizza",
        href: "/",
      },
    ],
  },
  {
    id: 3,
    title: "USEFUL LINKS",
    links: [
      {
        id: 1,
        name: "Privacy Policy",
        href: "/",
      },
      {
        id: 2,
        name: "Shipping Plicy",
        href: "/",
      },
      {
        id: 3,
        name: "Return Policy",
        href: "/",
      },
      {
        id: 4,
        name: "Contact",
        href: "/contact",
      },
      {
        id: 5,
        name: "My account",
        href: "/",
      },
    ],
  },
] as footerLinksProps[];
