"use client";

import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaClock,
  FaChartLine,
  FaCheckCircle,
} from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      id: "conflict",
      title: "Smart Conflict Detection",
      desc: "Our automated backend logic cross-checks timestamps instantly to eliminate double bookings.",
      icon: <FaShieldAlt className="text-xl text-teal-600 dark:text-teal-400" />,
    },
    {
      id: "flexible",
      title: "Hourly Flexibility & Control",
      desc: "Book spaces for exactly how long you need. Full control for room owners.",
      icon: <FaClock className="text-xl text-teal-600 dark:text-teal-400" />,
    },
    {
      id: "dashboard",
      title: "Recruiter-Ready Dashboards",
      desc: "Personal dashboards to manage bookings, rooms, and analytics in real time.",
      icon: <FaChartLine className="text-xl text-teal-600 dark:text-teal-400" />,
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 🔥 NEW HEADING */}
        <div className="text-center mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-teal-600 dark:text-teal-400 bg-teal-100/50 dark:bg-teal-900/30 px-3 py-1 rounded-full">
            Why Choose Us
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-teal-800 dark:text-teal-400 mt-4">
            Built for Students, Designed for Productivity
          </h2>

          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto mt-3">
            StudyNook delivers a seamless booking experience with smart systems, flexibility, and real-time control.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-5 text-center lg:text-left"
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Built For Productivity
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
              A Quiet Workspace, Tailored To Your Schedule
            </h2>

            <p className="text-slate-600 dark:text-slate-400">
              StudyNook connects students with flexible, distraction-free study rooms.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-sm font-semibold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-teal-500" /> Secure System
              </span>
              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-teal-500" /> Fully Responsive
              </span>
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-slate-50/80 dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-md shadow-lg"
          >
            <div className="space-y-4">
              {features.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all"
                >
                  {/* ICON */}
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                    {item.icon}
                  </div>

                  {/* TEXT */}
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;