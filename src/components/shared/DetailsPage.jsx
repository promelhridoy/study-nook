"use client";

import { useEffect, useState } from "react";
import { Card, Button, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import BookingCard from "./BookingCard";
import {
  FaUsers,
  FaMapMarkerAlt,
  FaShoppingCart,
} from "react-icons/fa";
import Image from "next/image";
import { EditModal } from "./EditModal";
import { DeleteAlert } from "./DeleteAlert";
import { authClient } from "@/lib/auth-client";

const DetailsPage =  ({ id }) => {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchRoom = async () => {
    try {


      const tokenData  = await authClient.token();
      const token = tokenData.data.token
      console.log(token);
      
      
      
      
      const res = await fetch(`https://study-nook-server-murex.vercel.app/rooms/${id}`, {
        method: "GET",
        // headers: {
        //   authorization: `Bearer ${token}`,
        // },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch room");
      }

      const data = await res.json();
      setRoom(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  fetchRoom();
}, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!room) return <p className="text-center mt-10">No room found</p>;

  return (
    <div className="container mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-5 shadow-lg rounded-2xl">

          <div className="grid md:grid-cols-2 gap-6 items-center">

            {/* IMAGE SECTION */}
            <div className="relative group">

  <Image
    src={room.image}
    alt={room.name}
    width={800}
    height={500}
    className="w-full h-80 object-cover rounded-xl"
  />

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 rounded-xl"></div>

  {/* BADGE */}
  <Chip className="absolute top-3 left-3 bg-[#00897b] text-white z-10">
    {room.badge}
  </Chip>

  {/* TOP RIGHT STATUS */}
  <div className="px-3 pt-6 py-1 space-y-3">
    <h2 className="text-green-600 text-2xl font-bold">Available</h2>
    <p className="text-xl font-medium"> ⭐ Rating: 4.5/5</p>
    <p className="text-xl font-medium">💬 2000+ Reviews</p>
  </div>

  

</div>

            {/* TEXT SECTION */}
            <div>

              {/* TOP BUTTONS */}
              <div className="flex justify-end gap-3 mb-3">
                <EditModal room={room} />

                <DeleteAlert room={room} />
              </div>

              {/* TITLE */}
              <h1 className="text-3xl font-bold">{room.name}</h1>

              {/* DESCRIPTION */}
              <p className="text-gray-600 mt-2">{room.description}</p>

              {/* INFO */}
              <div className="mt-4 space-y-2">
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt /> {room.floor}
                </p>

                <p className="flex items-center gap-2">
                  <FaUsers /> {room.capacity}
                </p>
              </div>

              {/* AMENITIES */}
              <div className="flex flex-wrap gap-2 mt-4">
                {room.amenities?.map((a, i) => (
                  <Chip key={i} variant="flat">
                    {a}
                  </Chip>
                ))}
              </div>

              {/* BOOK BUTTON */}
              <div className="mt-6">
                <BookingCard room={room} />
              </div>

            </div>
          </div>

        </Card>
      </motion.div>
    </div>
  );
};

export default DetailsPage;