import Image from 'next/image';
import React from 'react';
import { FaQuoteLeft } from "react-icons/fa";

const AdsBanner = () => {
    return (
        <div className='relative w-full rounded-md mt-12'>
            <Image src={'https://utfs.io/f/oI7Ou0bdQ6rjs17dVcNRboEhypDvIajWZOcSlXNJ6HGtq1um'}
                alt='Ads Image'
                width={300}
                height={300}
                className='w-full object-cover'
            />
            {/* overlav color */}
            <div className='absolute top-0 inset-0 bg-primary-orange opacity-70'></div>
            {/* content */}
            <div className='absolute  top-1/2 -translate-x-1/2  -translate-y-1/2  left-1/2'>
                <div className='flex items-center gap-x-4 md:gap-x-12  text-white'>
                    <FaQuoteLeft className='w-24 h-24 font-bold' />
                    <h3 className='text-xl lg:text-4xl lg:w-[400px] font-bold'>
                        &quot;Good food is the foundation of genuine happiness. Cooking is love made visible&quot;
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default AdsBanner;