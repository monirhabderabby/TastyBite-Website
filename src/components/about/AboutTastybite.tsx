import Image from 'next/image';
import React from 'react';

const AboutTastybite = () => {
    return (
        <div className='grid grid-cols-1 container pt-14 md:grid-cols-2 gap-3 md:gap-8 items-center'>
            {/* about img part */}
            <div>
                <Image src={'https://utfs.io/f/oI7Ou0bdQ6rjwmghpGpDRo0qZfncSaKkXtLpHNGEmgxCAJP7'}
                 width={700}
                 height={700}
                 className='rounded-md'
                 alt='Tastybite image' />
            </div>
            {/* about tastybite details */}
            <div className='space-y-6'>
                <h4 className='text-base md:text-2xl font-bold font-pacifico text-primary-orange'>Delicious Restaurant</h4>
                <h2 className='text-base sm:text-2xl lg:text-6xl font-bold text-primary-black'>ABOUT TASTYBITE</h2>
                <p className='text-base font-normal text-primary-black'>
                    Sit amet, consectetur adipiscing elit quisque eget maximus velit, non eleifend libero curabitur dapibus mauris sed leo cursus aliquetcras suscipit. Sit amet, consectetur adipiscing elit quisque eget maximus velit, non eleifend libero curabitur Sit amet, consectetur adipiscing elit quisque eget maximus velit, non eleifend libero curabitur dapibus mauris sed leo cursus aliquetcras suscipit. Sit amet.
                </p>
            </div>
        </div>
    );
};

export default AboutTastybite;