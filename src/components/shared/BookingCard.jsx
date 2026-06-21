"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaMoneyBillWave,
  FaClock,
  FaCalendarCheck,
} from "react-icons/fa";

const BookingCard = ({ room }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.03 }}
      className="p-5 rounded-xl shadow-lg border bg-white"
    >
      {/* Title */}
      <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
        <FaCalendarCheck className="text-teal-600" />
        Book This Room
      </h2>

      {/* Price */}
      <div className="flex items-center gap-2 text-lg font-semibold text-green-600">
        <FaMoneyBillWave />
        ${room?.hourlyRate}/hr
      </div>

      {/* Start Date */}
      <div className="mt-4">
        <label className="block text-sm font-medium mb-1">
          Date
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Info */}
      <p className="flex items-center gap-2 mt-3 text-gray-600">
        <FaClock />
        Flexible hourly booking available
      </p>

      {/* Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="mt-4 w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition"
      >
        Book Now
      </motion.button>
    </motion.div>
  );
};

export default BookingCard;