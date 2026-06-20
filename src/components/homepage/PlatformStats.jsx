"use client";

import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaChair,
  FaBusinessTime,
  FaSmile,
} from "react-icons/fa";

const PlatformStats = () => {
  const stats = [
    {
      id: 1,
      count: "4,200+",
      label: "Active Student Users",
      desc: "Verified profiles booking spaces daily.",
      icon: <FaGraduationCap className="text-3xl text-teal-600 dark:text-teal-400" />,
    },
    {
      id: 2,
      count: "150+",
      label: "Total Listed Rooms",
      desc: "Private spaces across major blocks.",
      icon: <FaChair className="text-3xl text-teal-600 dark:text-teal-400" />,
    },
    {
      id: 3,
      count: "12,800+",
      label: "Successful Bookings",
      desc: "Hours of seamless study tracked safely.",
      icon: <FaBusinessTime className="text-3xl text-teal-600 dark:text-teal-400" />,
    },
    {
      id: 4,
      count: "99.4%",
      label: "Satisfaction Rate",
      desc: "Positive conflict-free booking experience.",
      icon: <FaSmile className="text-3xl text-teal-600 dark:text-teal-400" />,
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const statVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* 🔥 NEW HEADING ADDED */}
        <div className="text-center mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-teal-600 dark:text-teal-400 bg-teal-100/50 dark:bg-teal-900/30 px-3 py-1 rounded-full">
            Platform Overview
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-teal-800 dark:text-teal-400 mt-4">
            Real-Time Impact & Growth
          </h2>

          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto mt-3">
            StudyNook is growing rapidly with thousands of students actively using the platform every day.
          </p>
        </div>

        {/* STATS GRID */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={statVariants}
              className="flex flex-col items-center gap-2 p-6 rounded-2xl bg-slate-50/50 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-800/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-2 p-4 bg-teal-50 dark:bg-teal-950/40 rounded-full">
                {stat.icon}
              </div>

              <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white">
                {stat.count}
              </h3>

              <span className="text-base font-bold text-teal-800 dark:text-teal-400">
                {stat.label}
              </span>

              <p className="text-xs text-slate-400 dark:text-slate-500 max-w-[180px]">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default PlatformStats;