"use client";

import { useEffect, useState } from "react";
import { Card, Button, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaMapMarkerAlt,
  FaShoppingCart,
} from "react-icons/fa";
import Image from "next/image";
import { EditModal } from "./EditModal";
import { DeleteAlert } from "./DeleteAlert";

const DetailsPage = ({ id }) => {
  console.log("ID:", id);

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchRoom = async () => {
      try {
        const res = await fetch(`http://localhost:5000/rooms/${id}`);
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
            <div className="relative">

              <Image
                src={room.image}
                alt={room.name}
                width={800}
                height={500}
                className="w-full h-80 object-cover rounded-xl"
              />

              {/* BADGE OVER IMAGE */}
              <Chip className="absolute top-3 left-3 bg-[#00897b] text-white">
                {room.badge}
              </Chip>

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

                <p className="text-green-600 font-bold">
                  💰 ${room.hourlyRate}/hr
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
                <Button
                  className="bg-[#00897b] text-white w-full"
                  startContent={<FaShoppingCart />}
                >
                  Book Now
                </Button>
              </div>

            </div>
          </div>

        </Card>
      </motion.div>
    </div>
  );
};

export default DetailsPage;