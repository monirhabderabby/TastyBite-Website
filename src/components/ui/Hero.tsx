"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Hero = () => {
  return (
    <div className=" inset-x-0 bottom-0 flex justify-center container absolute">
      <div className="relative">
        <motion.div
          initial={{
            y: 200, // Start off-screen (from the bottom)
          }}
          animate={{
            y: 0, // Animate to the final position
            transition: {
              duration: 0.6,
              ease: "easeIn",
              bounceStiffness: true,
            },
          }}
        >
          <Image
            src="/images/banner.png"
            width={1000}
            height={344}
            alt="pizza"
            className=" lg:scale-100 "
          />

          {/* leaf - 1 */}
          <motion.div
            initial={{
              y: -20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.7,
                delay: 0.7,
              },
            }}
          >
            <Image
              src="/images/leaf1.png"
              width={200}
              height={200}
              alt="leaf"
              className="bg-cover w-[150px] h-[150px] absolute bottom-0 right-0"
            />
          </motion.div>
          {/* leaf - 2 */}
          <motion.div
            initial={{
              y: -20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.7,
                delay: 0.8,
              },
            }}
          >
            <Image
              src="/images/leaf2.png"
              width={350}
              height={350}
              alt="leaf"
              className="bg-cover absolute bottom-[80px] md:bottom-[50px] lg:bottom-[120px] w-[100px] h-[100px] right-20 md:right-0 md:h-[250px] md:w-[300px] lg:h-[300px] lg:w-[350px]"
            />
          </motion.div>
          {/* leaf - 3 */}
          <motion.div
            initial={{
              y: -20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.7,
                delay: 0.8,
              },
            }}
          >
            <Image
              src="/images/leaf3.png"
              width={100}
              height={100}
              alt="leaf"
              className="bg-cover absolute bottom-0 h-[50px] w-[50px]  left-[100px] lg:left-[200px]"
            />
          </motion.div>
          {/* leaf - 4 */}
          <motion.div
            initial={{
              y: -20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.7,
                delay: 0.8,
              },
            }}
          >
            <Image
              src="/images/leaf4.png"
              width={250}
              height={250}
              alt="leaf"
              className="bg-cover absolute bottom-[50px] md:bottom-[100px] h-[50px] w-[100px] left-0  md:translate-x-12 md:h-auto lg:w-auto"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
