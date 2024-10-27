
//components
import Pageheader from '@/components/common/PageHeaderBanner/Pageheader';
import React from 'react';

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
            <div className='container'>
                <div>
                    {/* blog post part */}
                    <div></div>
                    {/* blog sidebar part */}
                    <div></div>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;