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
            <div className='md:space-y-6 space-y-3'>
                <h4 className='text-base md:text-2xl font-bold font-pacifico text-primary-orange'>Delicious Restaurant</h4>
                <h2 className='text-3xl lg:text-7xl font-narrow font-bold text-primary-black'>ABOUT TASTYBITE</h2>
                <p className='text-base font-normal text-primary-black'>
                    TastyBite is a well-loved brand offering an extensive range of ready-to-eat meals inspired by diverse global cuisines, including Indian, Asian, and Mexican flavors. Known for its commitment to natural ingredients and authentic taste, TastyBite brings flavorful, convenient dining solutions to homes. Their meals are crafted to deliver quality,
                    satisfying experiences in minutes, perfect for busy lifestyles.
                </p>
            </div>
        </div>
    );
};

export default AboutTastybite;