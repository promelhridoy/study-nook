"use client";

import { motion } from "framer-motion";
import { Card } from "@heroui/react";
import Image from "next/image";
import { FaCalendarAlt, FaClock, FaUser } from "react-icons/fa";
import { BookingCancelAlert } from "./BookingCancelAlert";

const BookingList = ({ booking, index, onDelete }) => {
  if (!booking) return null;

  const { roomName, userName, imageUrl, date, startTime, endTime, price } = booking;

  // Added parsing fallback protection in case strings are incomplete during parsing
  const startHour = parseInt(startTime?.split(":")[0]) || 0;
  const endHour = parseInt(endTime?.split(":")[0]) || 0;
  const duration = endHour - startHour;
  const totalPrice = (duration > 0 ? duration : 1) * price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <Card className="shadow-md hover:shadow-xl transition border border-gray-100 bg-white text-black">
        <div className="flex flex-col md:flex-row gap-5 p-5 items-center md:items-start">
          
          <div className="relative w-[260px] h-[180px] shrink-0">
            <Image
              src={imageUrl || "https://i.ibb.co/4pDNDk1/avatar.png"}
              alt={roomName}
              fill
              sizes="260px"
              className="rounded-xl object-cover"
            />
          </div>

          <div className="flex-1 space-y-3 w-full">
            <h2 className="text-2xl font-bold text-gray-800">
              {roomName}
            </h2>

            <div className="flex text-base font-semibold items-center gap-2 text-gray-600">
              <FaUser className="text-cyan-600" />
              <span>{userName}</span>
            </div>

            <div className="flex text-base font-semibold items-center gap-2 text-gray-600">
              <FaCalendarAlt className="text-teal-600" />
              <span>
                {date ? new Date(date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }) : "N/A"}
              </span>
            </div>

            <div className="flex text-base font-semibold items-center gap-2 text-gray-600">
              <FaClock className="text-indigo-600" />
              <span>
                {startTime} - {endTime} ({duration > 0 ? duration : 1} hrs)
              </span>
            </div>

            <p className="text-2xl font-extrabold text-teal-600 mt-2">
              Total Price: ${totalPrice.toFixed(2)}
            </p>
          </div>

          <div className="mt-4 md:mt-0 self-center md:self-start">
            {/* Communication route secure holding */}
            <BookingCancelAlert bookingId={booking._id.toString()} onDelete={onDelete} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default BookingList;