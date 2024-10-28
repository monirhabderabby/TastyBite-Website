import React from 'react';
import SidebarTitle from './SidebarTitle';
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';
import { IoLogoInstagram } from 'react-icons/io5';
import Link from 'next/link';

const SocialLink = () => {
    return (
        <div className='mt-20'>
            <SidebarTitle title='NEVER MISS BLOG' />
            {/* social link */}
            <div className='mt-5'>
                <ul className='flex items-center  gap-x-4'>
                    <li>
                        <Link href='#'>
                            <FaFacebook className='text-5xl hover:bg-green-700 hover:text-white bg-[#e9e6e6] text-black rounded-full p-3' />
                        </Link>
                    </li>
                    <li>
                        <Link href='#'>
                            <FaTwitter className='text-5xl hover:bg-green-700 hover:text-white bg-[#e9e6e6] text-black rounded-full p-3'/>
                        </Link>
                    </li>
                    <li>
                        <Link href='#'>
                            <IoLogoInstagram className='text-5xl hover:bg-green-700 hover:text-white bg-[#e9e6e6] text-black rounded-full p-3'/>
                        </Link>
                    </li>
                    <li>
                        <Link href='#'>
                            <FaYoutube className='text-5xl hover:bg-green-700 hover:text-white bg-[#e9e6e6] text-black rounded-full p-3'/>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SocialLink;