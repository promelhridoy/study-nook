"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Reusable Framer Motion Animations
const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const HeroPage = () => {
  return (
    <div className="relative h-screen flex items-center">
      
      {/* Background Image Wrapper with Zoom Animation */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/assets/banner.png"
          alt="StudyNook Library Banner"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-50/80 via-teal-50/50 to-transparent dark:from-slate-950/90 dark:via-slate-950/60 dark:to-transparent"></div>
      </motion.div>

      {/* Main Content Layout */}
      <motion.div 
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-10"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        
        {/* Left Side Content */}
        <div className="max-w-xl text-center md:text-left order-2 md:order-1 z-10">
          <motion.h1 
            className="font-bold text-4xl sm:text-5xl md:text-6xl text-teal-800 dark:text-teal-400 mb-4 leading-tight tracking-tight"
            variants={fadeInUp}
          >
            Find Your Perfect Study Room
          </motion.h1>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl mb-8 text-slate-700 dark:text-slate-300 font-medium"
            variants={fadeInUp}
          >
            Browse and book quiet, private study rooms in your library. List your own room and earn.
          </motion.p>

          <motion.div variants={fadeInUp}>
            <Link href="/rooms">
              <motion.button 
                className="px-8 py-3.5 bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-teal-500/20 w-full sm:w-auto text-lg"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
              >
                Explore Rooms
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Right Side Amenities Column */}
        <motion.div 
          className="w-full max-w-[320px] sm:max-w-[400px] flex flex-col gap-4 order-1 md:order-2 z-10"
          variants={staggerContainer} 
        >
         
        </motion.div>

      </motion.div>
    </div>
  );
};

export default HeroPage;