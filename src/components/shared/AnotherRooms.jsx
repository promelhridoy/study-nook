"use client";

import { useEffect, useState } from "react";
import RoomCard from "./RoomCard";

const AnotherRooms = ({ id }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms`);
        const data = await res.json();

        
        const filteredRooms = data.filter(
          (room) => room._id !== id
        );

        setRooms(filteredRooms);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRooms();
  }, [id]);

  return (
    <section className="py-10 px-4 container mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <RoomCard key={room._id} room={room} />
      ))}
    </div>
    </section>
  );
};

export default AnotherRooms;