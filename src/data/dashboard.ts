import { Bell, Pizza, Truck, User } from "lucide-react";

export const dashboardTabsList = [
    {
        id: crypto.randomUUID(),
        path: "/profile",
        icon: User,
        linkText: "Profile",
        roles: ["user", "admin", "delivery man"],
    },
    {
        id: crypto.randomUUID(),
        path: "/profile/orders",
        icon: Pizza,
        linkText: "Orders",
        roles: ["admin", "user", "delivery man"],
    },
    {
        id: crypto.randomUUID(),
        path: "/profile/notifications",
        icon: Bell,
        linkText: "Notifications",
        roles: ["admin", "user", "delivery man"],
    },
    // {
    //   id: crypto.randomUUID(),
    //   path: "/profile/payment",
    //   icon: CreditCard,
    //   linkText: "Payment",
    //   roles: ["admin", "user", "delivery man"],
    // },
    // {
    //   id: crypto.randomUUID(),
    //   path: "/profile/points",
    //   icon: Percent,
    //   linkText: "Points",
    //   roles: ["admin", "user"],
    // },
    {
        id: crypto.randomUUID(),
        path: "/profile/delivery",
        icon: Truck,
        linkText: "Delivery",
        roles: ["admin", "delivery man"],
    },
];
