import React from 'react';

type Props={
    title: string,
    subtitle: string
}

const AboutSectionHeading = ({title, subtitle}: Props) => {
    return (
        <div className='space-y-4'>
            {/* heading */}
            <h4 className='text-xl md:text-2xl lg:text-3xl font-medium text-center md:text-start font-pacifico text-primary-orange'>{title}</h4>
            {/* title */}
            <h2 className='text-center text-3xl md:text-5xl lg:text-6xl md:text-start font-bold text-primary-black'>
                {subtitle}
            </h2>
        </div>
    );
};

export default AboutSectionHeading;