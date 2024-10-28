
//components
import Pageheader from '@/components/common/PageHeaderBanner/Pageheader';
import About_data from './_components/Blog_data';
import AdsBanner from '@/components/blog/AdsBanner';
import Blog_Search from './_components/Blog_Search';
import PopularBlog from '@/components/blog/PopularBlog';
import Blog_category from './_components/Blog_category';
import SocialLink from '@/components/blog/SocialLink';

const BlogPage = () => {
    return (
        <div>
            {/* Blog header Banner part */}
            <div>
               <Pageheader 
               img='https://utfs.io/f/oI7Ou0bdQ6rjyuWH9qZmawxvB8dF9SHPlQoWAbCuyU4hqriR'
                title='BLOG PAGE' activelink='blog page'/>
            </div>
            {/* blog main content part  */}
            <div className='container mt-5 md:mt-12 lg:mt-24 mb-14'>          
                <div className='grid grid-cols-5 gap-x-14 gap-y-14'>
                    {/* blog post part */}
                    <div className='col-span-5  lg:col-span-3'>
                        <About_data/>
                        <AdsBanner/>
                    </div>
                    {/* blog sidebar part */}
                    <div className='col-span-5  lg:mt-4 lg:col-span-2'>
                        <Blog_Search/>
                        <PopularBlog/>
                        <Blog_category/>
                        <SocialLink/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;