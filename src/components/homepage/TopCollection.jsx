"use client";

import { useEffect, useState } from "react";
import RoomCard from "../shared/RoomCard";

const TopCollection = () => {
    const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await fetch(`https://study-nook-server-murex.vercel.app/rooms`);
      const data = await res.json();
        setRooms(data);

    };

    fetchRooms();
  }, []);


  return (
    <section className="py-10 px-4 container mx-auto">
      <h2 className="text-2xl font-bold mb-6">Top Collection</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rooms.slice(0, 6).map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </section>
  );
};

export default TopCollection;