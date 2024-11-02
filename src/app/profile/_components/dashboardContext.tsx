"use client";
// Packages
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Components
import { dashboardTabsList } from "@/data/dashboard";
import { useUser } from "@clerk/nextjs";

const DashboardContent = ({ children }) => {
  const pathname = usePathname();
  const { isLoaded, user } = useUser();

  if (!isLoaded) return null;

  const currentRole = user?.publicMetadata?.role;

  // Filter tabs based on the user's role
  const filteredTabs = dashboardTabsList.filter((tab) =>
    tab.roles.includes(currentRole)
  );

  return (
    <div>
      <div className="md:hidden flex items-center gap-x-3 mb-4">
        {filteredTabs.map(({ icon: Icon, id, path }) => (
          <Link
            key={id}
            href={path}
            className={clsx(
              "rounded-lg p-2 text-gray-500 transition-all hover:text-gray-900 border border-white",
              {
                "rounded-lg bg-gray-200 p-2 text-gray-900  transition-all hover:text-gray-900 border border-tourHub-title":
                  pathname === path,
              }
            )}
          >
            <Icon />
          </Link>
        ))}
      </div>
      {children}
    </div>
  );
};

export default DashboardContent;
