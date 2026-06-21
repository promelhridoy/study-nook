"use client";

import { motion } from "framer-motion";
import { Card, Button } from "@heroui/react";
import Image from "next/image";
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
} from "react-icons/fa";
import { BookingCancelAlert } from "./BookingCancelAlert";

const BookingList = ({ booking, index }) => {
  if (!booking) return null;

  const { roomName, userName, imageUrl, date, startTime, endTime, price } = booking;

  const totalPrice = (endTime.split(":")[0] - startTime.split(":")[0]) * price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <Card className="shadow-md hover:shadow-xl transition">
        <div className="flex flex-col md:flex-row gap-5 p-5">

          <Image
            src={imageUrl}
            alt={roomName}
            width={260}
            height={180}
            className="rounded-xl object-cover"
          />

          <div className="flex-1 space-y-3">

            <h2 className="text-2xl font-bold">
              {roomName}
            </h2>

            <div className="flex text-lg font-semibold items-center gap-2 text-gray-600">
              <FaUser />
              <span>{userName}</span>
            </div>

            <div className="flex text-lg font-semibold items-center gap-2 text-gray-600">
              <FaCalendarAlt />
              <span>
                {new Date(date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="flex text-lg font-semibold items-center gap-2 text-gray-600">
              <FaClock />
              <span>
                {startTime} - {endTime}
              </span>
            </div>

            <p className="text-2xl font-bold text-gray-800">
              Total Price: ${totalPrice.toFixed(2)}
            </p>
            

           

          </div>
           <BookingCancelAlert bookingId={booking._id} />
        </div>
      </Card>
    </motion.div>
  );
};

export default BookingList;