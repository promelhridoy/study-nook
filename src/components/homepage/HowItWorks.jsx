"use client";

import { motion } from "framer-motion";
import { Card } from "@heroui/react";
import { FaUserPlus, FaSearch, FaCalendarCheck, FaDoorOpen } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Create an Account",
      desc: "Sign up securely using your university email or your Google account in seconds.",
      icon: <FaUserPlus className="text-3xl text-teal-600 dark:text-teal-400" />,
    },
    {
      id: 2,
      title: "Find Your Space",
      desc: "Filter study rooms by floor, capacity, hourly rate, or required amenities like high-speed Wi-Fi.",
      icon: <FaSearch className="text-3xl text-teal-600 dark:text-teal-400" />,
    },
    {
      id: 3,
      title: "Book Instantly",
      desc: "Select an available date and time slot. Our real-time system prevents any double-booking conflicts.",
      icon: <FaCalendarCheck className="text-3xl text-teal-600 dark:text-teal-400" />,
    },
    {
      id: 4,
      title: "Unlock & Study",
      desc: "Check into your private room or list your own controlled room to start earning effortlessly.",
      icon: <FaDoorOpen className="text-3xl text-teal-600 dark:text-teal-400" />,
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 bg-slate-50/50 dark:bg-slate-950/50 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-teal-800 dark:text-teal-400 mb-4">
            How StudyNook Works
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Get your private library workspace ready in just 4 simple steps.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step) => (
            <motion.div key={step.id} variants={cardVariants}>
              <Card className="relative h-full border border-slate-200/60 dark:border-slate-800/60 shadow-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center gap-4">

                {/* Step Badge */}
                <div className="absolute top-3 right-4 font-bold text-xs bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 px-2.5 py-1 rounded-full">
                  Step 0{step.id}
                </div>

                {/* Icon */}
                <div className="p-4 bg-teal-50 dark:bg-teal-950 rounded-2xl border border-teal-100 dark:border-teal-900 shadow-inner">
                  {step.icon}
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {step.title}
                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {step.desc}
                </p>

              </Card>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorks;