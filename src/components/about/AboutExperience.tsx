import Image from 'next/image';
import React from 'react';

const AboutExperience = () => {
    return (
        <div className='grid grid-cols-1 container pt-20 md:grid-cols-2 gap-3 md:gap-8 items-center'>
            {/* about tastybite experience details */}
            <div className='md:space-y-6 flex justify-center md:justify-start md:items-start items-center flex-col space-y-3'>
                <h4 className='text-base md:text-2xl font-bold font-pacifico text-primary-orange'>Modern Cuisine</h4>
                <h2 className='text-3xl lg:text-7xl font-courgette font-bold text-primary-black'>Experience</h2>
                <p className='text-base md:text-start text-center font-normal text-primary-black'>
                    Sit amet, consectetur adipiscing elit quisque eget maximus velit, non eleifend libero curabitur dapibus mauris sed leo cursus aliquetcras suscipit. Sit amet, consectetur adipiscing elit quisque eget maximus velit, non eleifend libero curabitur Sit amet, consectetur adipiscing elit quisque eget maximus velit, non eleifend libero curabitur dapibus mauris sed leo cursus aliquetcras suscipit. Sit amet.
                </p>
            </div>
            {/* about img part */}
            <div>
                <Image src={'https://utfs.io/f/oI7Ou0bdQ6rjN216ksh6KsLtupkQUaxmXrdCbOHyZcgD1Vi3'}
                 width={700}
                 height={700}
                 className='rounded-md'
                 alt='Tastybite image' />
            </div>
        </div>
    );
};

export default AboutExperience;