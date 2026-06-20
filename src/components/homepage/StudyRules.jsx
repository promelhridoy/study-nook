"use client";

import { motion } from "framer-motion";
import { Card } from "@heroui/react";
import {
  FaVolumeMute,
  FaHands,
  FaBan,
  FaUsers,
} from "react-icons/fa";

const StudyRules = () => {
  const rules = [
    {
      id: 1,
      title: "Maintain Absolute Quietness",
      desc: "All study rooms are soundproofed to an extent, but users must keep voices low to avoid disturbing others.",
      icon: <FaVolumeMute className="text-2xl text-teal-600 dark:text-teal-400" />,
    },
    {
      id: 2,
      title: "Keep It Clean & Hygienic",
      desc: "No heavy meals or messy beverages allowed. Dispose of trash before leaving your room.",
      icon: <FaHands className="text-2xl text-teal-600 dark:text-teal-400" />,
    },
    {
      id: 3,
      title: "No Slot Sharing or Selling",
      desc: "Bookings are strictly personal and tied to verified accounts. Sharing or selling slots is prohibited.",
      icon: <FaBan className="text-2xl text-teal-600 dark:text-teal-400" />,
    },
    {
      id: 4,
      title: "Respect Room Capacity",
      desc: "Do not exceed the maximum allowed capacity of any study room under any circumstances.",
      icon: <FaUsers className="text-2xl text-teal-600 dark:text-teal-400" />,
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 bg-slate-50/60 dark:bg-slate-950/60 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-teal-600 dark:text-teal-400 bg-teal-100/50 dark:bg-teal-900/30 px-3 py-1 rounded-full">
            StudyNook Guidelines
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-teal-800 dark:text-teal-400 mt-4">
            Library Study Room Rules
          </h2>

          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto mt-3">
            Follow these simple rules to maintain a productive, peaceful, and respectful study environment for everyone.
          </p>
        </div>

        {/* RULES GRID */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {rules.map((rule) => (
            <motion.div key={rule.id} variants={itemVariants}>
              <Card className="p-6 flex gap-4 border border-slate-200/60 dark:border-slate-800/60 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm hover:shadow-lg hover:border-teal-500/40 transition-all duration-300">

                {/* ICON */}
                <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950 border border-teal-100/50 dark:border-teal-900/50 shrink-0">
                  {rule.icon}
                </div>

                {/* CONTENT */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    {rule.title}
                  </h3>

                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {rule.desc}
                  </p>
                </div>

              </Card>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default StudyRules;