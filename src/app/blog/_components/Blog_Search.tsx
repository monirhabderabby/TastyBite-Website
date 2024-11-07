//components
import SidebarTitle from "@/components/blog/SidebarTitle";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Blog_Search = () => {
  return (
    <div>
      <SidebarTitle title="SEARCH" />

      <div className="w-full mt-5 bg-slate-100 h-[68px] flex justify-between gap-x-4 items-center">
        <input
          type="text"
          placeholder="SEARCH YOUR KEYWORD..."
          className="hover:outline-0 text-black  pl-4 flex-1 bg-transparent text-base outline-0 border-0 hover:border-0"
        />
        <div className="w-1/4 h-full">
          <Button className="bg-primary-gray hover:bg-primary-gray w-full h-full flex items-center justify-center">
            <Search size={64} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Blog_Search;
