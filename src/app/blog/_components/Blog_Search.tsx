//components
import SidebarTitle from '@/components/blog/SidebarTitle';
import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
import { IoSearchOutline } from "react-icons/io5";

const Blog_Search = () => {
    return (
        <div>
            <SidebarTitle title='SEARCH'/>
            {/* search input */}
            <div className='w-full mt-5 bg-slate-50 h-[68px] flex justify-between gap-x-4 items-center'>
                <input type="text" placeholder="SEARCH YOUR KEYWORD..." className='hover:outline-0 text-black  pl-4 flex-1 bg-transparent text-base outline-0 border-0 hover:border-0'/>
                <Button className='bg-green-700 hover:bg-green-700 w-1/4 h-full flex items-center justify-center'>
                    <IoSearchOutline className='text-white text-6xl font-bold'/>
                </Button>
            </div>
        </div>
    );
};

export default Blog_Search;