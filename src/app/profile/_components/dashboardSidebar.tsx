"use client";

// Packages
import { useUser } from "@clerk/nextjs";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Components
import { dashboardTabsList } from "@/data/dashboard";

export default function DashboardSideBar() {
  const pathname = usePathname();

  const { isLoaded, user } = useUser();

  if (!isLoaded) return null;

  const currentRole = user?.publicMetadata?.role;

  // Filter tabs based on the user's role
  const filteredTabs = dashboardTabsList.filter((tab) =>
    tab.roles.includes(currentRole as string)
  );

  return (
    <div className="md:block hidden h-full">
      <div className="flex h-full max-h-screen flex-col gap-2 ">
        <div className="flex-1 overflow-auto">
          <nav className="grid items-start pr-6 text-sm font-medium space-y-2">
            {filteredTabs.map(({ id, path, icon: Icon, linkText }) => (
              <Link
                key={id}
                className={clsx(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                  {
                    "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50":
                      pathname === path,
                  }
                )}
                href={path}
              >
                <div className="border rounded-lg border-gray-400 p-1 bg-white">
                  <Icon className="h-4 w-4" />
                </div>
                {linkText}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
