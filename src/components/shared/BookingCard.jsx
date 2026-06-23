"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaMoneyBillWave,
  FaClock,
  FaCalendarCheck,
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const BookingCard = ({ room }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const { hourlyRate, _id, name, image } = room;

  const handleBooking = async () => {
    if (!user) return toast.error("Please login first!");
    if (!date || !startTime || !endTime)
      return toast.error("Please select date and time!");

    const bookingData = {
      userId: user?.id,
      userImage: user?.image,
      userName: user?.name,
      roomId: _id,
      roomName: name,
      price: hourlyRate,
      imageUrl: image,
      date,
      startTime,
      endTime,
    };

    const {data:tokenData} = await authClient.token()
    console.log(tokenData);
    

    try {
      const res = await fetch(`https://study-nook-server-murex.vercel.app/bookings`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${tokenData?.token}`
        },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Room Booked Successfully!");
      } else {
        toast.error(data.message || "Booking failed!");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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
        ${hourlyRate}/hr
      </div>

      {/* DATE */}
      <div className="mt-4">
        <label className="block text-sm font-medium mb-1">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border p-2 rounded-lg"
        />
      </div>

      {/* START TIME */}
      <div className="mt-3">
        <label className="block text-sm font-medium mb-1">
          Start Time
        </label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-full border p-2 rounded-lg"
        />
      </div>

      {/* END TIME */}
      <div className="mt-3">
        <label className="block text-sm font-medium mb-1">
          End Time
        </label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="w-full border p-2 rounded-lg"
        />
      </div>

      {/* INFO */}
      <p className="flex items-center gap-2 mt-3 text-gray-600">
        <FaClock />
        Flexible hourly booking available
      </p>

      {/* BUTTON */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleBooking}
        className="mt-4 w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700"
      >
        Book Now
      </motion.button>
    </motion.div>
  );
};

export default BookingCard;