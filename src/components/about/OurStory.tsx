import Image from 'next/image';
import React from 'react';

const OurStory = () => {
    return (
        <div className='py-28 bg-slate-200 mt-20'>
            <div className='flex justify-center container items-center flex-col space-y-3 md:space-y-6'>
                {/* heading */}
                <h4 className='text-xl md:text-4xl font-bold text-center font-pacifico text-primary-orange'>Discover</h4>
               {/* title */}
                <h2 className='text-center text-3xl lg:text-6xl font-bold text-primary-black'>
                    OUR STORY
                </h2>
                {/* subtitle */}
                <p className='text-balance text-center  text-black'>
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which do not look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator
                    on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful
                </p>
                {/* image */}
                <Image src={'https://utfs.io/f/oI7Ou0bdQ6rjbXGvnHPwY7olNctKITnZOQkPhFezgR96CLX3'} alt='Image' width={100} height={100}/>
            </div>
        </div>
    );
};

export default OurStory;